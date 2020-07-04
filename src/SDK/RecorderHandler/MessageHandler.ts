import Compressor from '../Compressor/Compressor';
import {host} from '../Constants/Constants'; 
import Socket from './Socket';

export class MessageHandler {

    socket: any;
    sessionMeta: any;
    onBeforeUnload: any;
    socketConnect: any;

    constructor(sid: any, aid:any, args: any) {

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
    }

    saveStore =()=> {
        this.getMemStore().data = this.getMemStore().data.filter((beacon:any)=> !beacon.ack);
        let localStore = JSON.stringify(this.getMemStore());
        localStorage.setItem('ms_store', localStore);
        for(let idx in this.getMemStore().data) {
            this.addStoreLog(this.getMemStore().data[idx].beaconId, 'addedToLS');
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

        if(!localStore || !storeLog || localStore.sid !== sid) {
            localStore = {
                sid, 
                data: [],
                dataStatus: {},
            }
            storeLog = {}
        }
        console.log('[ARC] Initial Store', localStore.data.length, storeLog);

        (window as any).localStore = localStore; 
        localStorage.setItem('ms_store', localStore)
        localStorage.setItem('ms_store_log', storeLog)
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
        console.log('[ARC] MessageHandler : ', topic);
        let beaconId: any = this.generateRandomString(5);
        let beacon: any = {
            beaconId,
            data: Compressor.compressToBase64(data),
            topic,
            sendToServer: false,
            ack: false
        };
        if(prepend) {
            this.getMemStore().data.unshift(beacon);
        } else {
            this.getMemStore().data.push(beacon);
        }
        this.addStoreLog(beaconId, 'created'); 
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
            storeLog[beaconId] = { created: false, addedToLS: false, sendToServer: false, ack: false };
        }
        storeLog[beaconId][event] = Date.now();
        localStorage.setItem('ms_store_log', storeLog);
    }

    /**
     * 
     *  Socket
     *  
     */

    onConnect =()=> {
        this.socketConnect = true;
        if(!(window as any).ARCNavigation) {
            console.log('[ARC] Sending Session Meta');
            this.emit('beacon', this.sessionMeta, true);
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
        console.log('[ARC] MessageHandler : RDU', dataToBeUploaded);
        if(dataToBeUploaded.length && this.socketConnect) {
            for(let beaconId in dataToBeUploaded.data) {
                dataToBeUploaded.data[beaconId].sendToServer = true;
                this.socket.emit(dataToBeUploaded.data[beaconId].topic, dataToBeUploaded.data[beaconId].data, beaconId);
                this.addStoreLog(beaconId, 'sendToServer');
            }
        }
    }

}