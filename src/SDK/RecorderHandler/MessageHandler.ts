import Compressor from '../Compressor/Compressor';
import {host} from '../Constants/Constants'; 
import Socket from './Socket';

export class MessageHandler {

    socket: any;
    sessionMeta: any;
    onBeforeUnload: any;
    socketConnect: any;
    dataBuffer: Array<any> = [];
    sid:any;
    aid:any;
    cid:any;
    packetIndex:any = 0;
    rapidStoreId:any = 0;

    constructor(sid: any, aid:any, cid:any, args: any) {

        this.sid = sid;
        this.aid = aid;
        this.cid = cid;
        this.sessionMeta = args.sessionMeta;
        this.onBeforeUnload = args.onBeforeUnload;

        /**
         *  Init Store
         */
        this.initStore(sid);

        /**
         *  Init Socker
         */

        this.socket = new Socket(host, sid, aid);
        this.socket.on('Accepted', this.onConnect);
        this.socket.on('ack', this.onACK)

        /**
         *  Save
         */

        window.onbeforeunload =()=> { 
            this.onBeforeUnload();
            this.saveStore();
        }


        setInterval(()=> {
            if(this.dataBuffer && this.dataBuffer.length) {
                this.emitToSocket('event', this.dataBuffer);
                this.dataBuffer = [];
                this.cleanRapidStore();
            }
        }, 1000); 
    }

    saveStore =()=> {
        let data = this.getMemStore().data.
            filter((beacon:any)=> !beacon.ack).
            map((beacon:any)=> {
                beacon.sendToServer = false;
                return beacon;
            });

        this.getMemStore().data = [];
        for(let idx=data.length-1; idx>=0; idx--) {
            this.getMemStore().data.push(data[idx]);
            let localStore = JSON.stringify(this.getMemStore());
            try {
                localStorage.setItem('ms_store', localStore);
            } catch (e) {
                this.addStoreLog(data[idx].beaconId, 'failedLS');
                break;
            }
        }
        for(let idx in data) {
            this.addStoreLog(data[idx].beaconId, 'addedToLS');
        }
    }

    initStore =(sid: any)=> {
        let localStore:any = localStorage.getItem('ms_store');
        let storeLog:any = localStorage.getItem('ms_store_log'); 
        try  {
            localStore = JSON.parse(localStore);
            storeLog = JSON.parse(storeLog);
        } catch(e) {
            storeLog = null;
            localStore = null;
        }

        if(localStore == null || storeLog == null || localStore.sid !== sid) {
            localStore = {
                sid, 
                data: [],
                dataStatus: {},
            }
            storeLog = {}
        }
        console.log('[ARC] Initial Store', localStore.data.length, storeLog);

        (window as any).localStore = localStore; 
        localStorage.setItem('ms_store_log', JSON.stringify(storeLog))

        /**
         * 
         *  Rapid Store
         * 
         */

        let rsData = this.getRapidStore();
        console.log('[ARC] Rapid Store Data', rsData);
        this.emitToSocket('event', rsData);

    }

    generateRandomString =(length: Number)=> {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let idx = 0; idx < length; idx++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    emit =(topic:any, data: any, prepend=false)=> {
        let beaconId: any = this.generateRandomString(5);
        let beacon: any = {
            beaconId,
            data: Compressor.compressToBase64(data),
            topic,
            prepend,
            sendToServer: false,
            ack: false
        };
        if(prepend) {
            this.getMemStore().data.unshift(beacon);
        } else {
            this.getMemStore().data.push(beacon);
        }
        this.addStoreLog(beaconId, 'created'); 
        if(this.socketConnect)
        this.requestDataUpload();
    }

    getMemStore =()=> (window as any).localStore;

    getBeaconsForUpload =()=> {
        let data:any = [];
        let length:any = 0;
        let storeData = this.getMemStore().data;
        let beaconId:any;
        for(let idx in storeData) {
            beaconId = storeData[idx].beaconId;
            if(!storeData[idx].sendToServer) {
                length++;
                data[beaconId] = storeData[idx]
            }
        }
        return { data, length };
    }

    addStoreLog =(beaconId:string, event:string)=> {
        let storeLog:any = localStorage.getItem('ms_store_log');
        try  {
            storeLog = JSON.parse(storeLog);
        } catch(e) {
            storeLog = {};
        }
        if(!storeLog[beaconId]) {
            storeLog[beaconId] = { created: false, addedToLS: false, sendToServer: false, ack: false, failedLS: false };
        }
        storeLog[beaconId][event] = Date.now();
        localStorage.setItem('ms_store_log', JSON.stringify(storeLog));
    }

    /**
     * 
     *  Socket
     *  
     */

    onConnect =()=> {
        this.socketConnect = true;
        if(!(window as any).ARCNavigation) {
            this.emit('beacon', JSON.stringify(this.sessionMeta), true);
        }
        this.requestDataUpload();

    }

    onACK =(beaconId: any)=> {
        let storeData = this.getMemStore().data;
        for(let idx in storeData) {
            if(beaconId === storeData[idx].beaconId) {
                storeData[idx].ack = true;
                this.addStoreLog(beaconId, 'ack');
                break;
            }
        }
    }

    /**
     * 
     *  Data Upload
     * 
     */

    requestDataUpload =()=> {
        let dataToBeUploaded = this.getBeaconsForUpload();
        if(dataToBeUploaded.length && this.socketConnect) {
            for(let beaconId in dataToBeUploaded.data) {
                dataToBeUploaded.data[beaconId].sendToServer = true;
                this.socket.emit(dataToBeUploaded.data[beaconId].topic, dataToBeUploaded.data[beaconId].data, beaconId); 
                this.addStoreLog(beaconId, 'sendToServer');
            }
        }
    }

    /**
     * 
     *  Message Wrap
     * 
     */

    onMessage =(event: any)=> {
        this.dataBuffer.push(event);
        this.addToRapidStore(event);
    }

    addToRapidStore =(event:any)=> {
        localStorage.setItem('rs_'+ this.rapidStoreId, JSON.stringify(event));
        this.rapidStoreId++;
    }

    cleanRapidStore =()=> {
        for(let idx=0; idx<=this.rapidStoreId; idx++) {
            localStorage.removeItem('rs_'+idx);
        }
        this.rapidStoreId = 0;
    }

    getRapidStore =()=> {
        let data = [];
        let event = null;
        let rsid = 0;

        while(true) {
            event = localStorage.getItem('rs_'+rsid);
            if(!event)
                break;
            
            try {
                event = JSON.parse(event)
            } catch (e) {
                break;
            }

            data.push(event);
            rsid++;
        }

        return data;
    }

    getPID =()=> window.location.pathname

    emitToSocket =(type:String, data:any)=> {
        let packet = {
            sid: this.sid,
            cid: this.cid,
            aid: this.aid,
            pid: this.getPID(),
            index: this.packetIndex,
            type,
            timestamp: Date.now(),
            data
        };
        this.packetIndex+=1;
        if((window as any).ARCDev) {
            let size:any =  JSON.stringify(packet).length * 2;
            (window as any).log('[ARC] Sending Data', this.dataBuffer.length);
            (window as any).log('[ARC] Packet size', size, 'Bytes, ', Math.ceil(size/1024), 'kb');
            (window as any).log(packet);
        }
        let msgstr = JSON.stringify(packet);
        this.emit('beacon', msgstr);
    }


}