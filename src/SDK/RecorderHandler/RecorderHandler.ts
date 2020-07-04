import '../Helpers/DocReady';
import {getSID, loadJS, parseURL, getStore, addStoreLog, newBeacon, beaconSendSuccess, saveStore, initStore} from '../Helpers/Helpers';
import Recorder from '../Recorder/Recorder';
// import {host, eventTypes} from '../Constants/Constants'; 
// import Socket from './Socket';
import { MessageHandler } from './MessageHandler';

interface RHArgs {
    clientId: String,
    appId: String,
    arccsrc: Boolean
}

export default class RecorderHandler {

    sid: String;
    cid: String;
    aid: String;
    rcDataBuffer: Array<any> = [];
    recorderData: Array<any> = [];
    recorder: any = null;
    socket: any;
    initiated: Boolean = false;
    packetIndex: any = 0;  
    messageHandler: any;


    constructor(args: RHArgs) {

        this.sid = getSID();
        this.aid = args.appId;
        this.cid = args.clientId;

        initStore(this.sid);
        (window as any).dataSendQList = {};

        if(!(window as any).ARCNavigation && args.arccsrc) {
            console.log('[ARC] Exiting Cached SDK');
            return;
        } else if(args.arccsrc) {
            console.log('[ARC] Using Cached SDK');
            (window as any).ARCSDKRU = true;
        }

        console.log('[ARC] Waiting for document ready state, SID', this.sid);

        (window as any).docReady(()=> {
            console.log('[ARC] Doc Ready', performance.now());
            this.recorderData = [];
            this.recorder = new Recorder({
                sid: this.sid,
                cid: this.cid,
                aid: this.aid
            });
            this.recorder.getLiveUpdate(this.onRecorderUpdater);
            this.messageHandler = new MessageHandler(this.sid, this.aid, {
                sessionMeta: this.getSessionMeta(),
                onBeforeUnload: ()=> this.setSessionDataToLS()
            });
            this.recorder.start(document.body); 
            this.setSessionDataToLS();

            setInterval(()=> {
                if(this.rcDataBuffer && this.rcDataBuffer.length) {
                    this.emitToSocket('event', this.rcDataBuffer);
                    this.rcDataBuffer = [];
                }
                this.setSessionDataToLS();
            }, 1000);

            // this.socket = new Socket(host, this.sid, this.aid);
            // this.socket.on('Accepted', this.onConnect);
            // this.socket.once('reconnect', this.onConnect);
            // this.socket.once('disconnect', this.onDisconnect);
            // this.socket.on('ack', this.onACK)
        }, window)


        // window.onbeforeunload =()=> {
        //     this.emitToSocket('event', this.rcDataBuffer, false); 
        //     saveStore(this.sid);
        //     this.setSessionDataToLS();
        // }
    }

    getARCSIDMeta =(onClose: any)=> {
        return {
            createdAt: Date.now(),
            location: window.location,
            sid: this.sid,
            onClose,
        }
    }

    setSessionDataToLS =()=> {
        if(!this.sid)
            return;

        let meta = this.getARCSIDMeta(false) as any;
        localStorage.setItem('arcsid', JSON.stringify(meta));
    }
 
    // onDisconnect =()=> {
    //     console.log("socket disconnected from client");
    //     this.initiated = false;
    // }

    // onConnect =()=> {
    //     console.log('[ARC] Connected to Socket');
    //     this.initiated = true;
        
    //     /**
    //      *  Sending Session Meta
    //      */

    //     if(!(window as any).ARCNavigation) {

    //         /**
    //          *  Emiting Session Meta 
    //          */

    //         let sessionMetaData = this.getSessionMeta();
    //         this.socketEmit('beacon', JSON.stringify(sessionMetaData));
    //         console.log('[ARC] Sending Session Meta');

    //     } else {

    //         /**
    //          *  Sending Pre-Bufferer
    //          */
    //         let store = getStore();
    //         console.log('Pre-Buffered Data', store, store.length, JSON.stringify(store).length / 1024)
    //         this.sendDataToServer();
    //     }

    //     /**
    //      *  Sending Buffered Data
    //      */
    //     for(let idx in this.recorderData) {
    //         this.addToBuffer(this.recorderData[idx]);
    //     }
    //     this.recorderData = [];

    //     /**
    //      *  Initiating Sender
    //      */
    // }

    // onACK =(pid: any)=> {
    //     if(pid) {
    //         addStoreLog(pid, 'ack', this.sid);
    //         beaconSendSuccess(pid);
    //         delete (window as any).dataSendQList[pid];
    //     }
    // }

    // socketEmit =(topic:string, data: any, sendToServer=true)=> {
    //     this.messageHandler.newBeacon(topic, data, this.sid);
    //     // if(sendToServer) {
    //     //     this.sendDataToServer();
    //     // }
    // }

    // sendDataToServer =()=> {
    //     let store = getStore();
    //     let beaconsToSend = [];
    //     for(let idx in store) {
    //         if(!(window as any).dataSendQList[store[idx].bid]) {
    //             beaconsToSend.push(store[idx]);
    //         }
    //     }
    //     for(let idx in beaconsToSend) {
    //         (window as any).dataSendQList[beaconsToSend[idx].bid] = Date.now();
    //         addStoreLog(beaconsToSend[idx].bid, 'sendToServer', this.sid);
    //         this.socket.emit(beaconsToSend[idx].topic, beaconsToSend[idx].data, beaconsToSend[idx].bid);
    //     }
    // }
    

    emitToSocket =(type:String, data:any, sendToServer=true)=> {
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
            (window as any).log('[ARC] Sending Data', this.rcDataBuffer.length);
            (window as any).log('[ARC] Packet size', size, 'Bytes, ', Math.ceil(size/1024), 'kb');
            (window as any).log(packet);
        }
        let msgstr = JSON.stringify(packet);
        if(sendToServer) {
            // this.socketEmit('beacon', msgstr);
            this.messageHandler.emit('beacon', msgstr, this.sid);
        }
        return packet;
    }

    getPID =()=> window.location.pathname
 

    addToBuffer =(event: any)=> {
        if(!this.initiated)
            return;

        this.rcDataBuffer.push(event);
    }

    onRecorderUpdater =(event:any)=> {
        this.recorderData.push(event);
        this.addToBuffer(event);
    }

    getSessionMeta =()=> {
        if(!this.recorder) {
            console.error('[ARC] FATAL ERR: Recorder not Found')
            return;
        }
        let meta:any = this.recorder.getAllMetaData(false);
        return {
            sid: this.sid,
            cid: this.cid,
            aid: this.aid,
            type:'session',
            deviceType: meta.deviceType,
            createdAt: Date.now(),
            metaData: {
              browserName: meta.browser,
              pageURL: parseURL(window.location.href),
              os: meta.os,
              cpuCore: meta.core,
              deviceMemory: meta.deviceMemory,
              screenType: meta.isTouchDevice,
              language: meta.language,
              cookieEnabled: meta.cookieEnabled,
              referrer: parseURL(meta.referrer || null),
              browserVersion: meta.browser,
              osVersion: meta.os,
              userAgent: navigator.userAgent
            },
        }
    }

}
