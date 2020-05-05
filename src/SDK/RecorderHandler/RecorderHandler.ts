import '../Helpers/DocReady';
import {getSID, loadJS, parseURL} from '../Helpers/Helpers';
import Recorder from '../Recorder/Recorder';
import {host, eventTypes} from '../Constants/Constants'; 

interface RHArgs {
    clientId: String,
    appId: String
}

export default class RecorderHandler {

    sid: String;
    cid: String;
    aid: String;
    rcDataBuffer: Array<any> = [];
    recorderData: Array<any> = [];
    recorder: any = null;
    socket: any;
    socketInter: any;
    initiated: Boolean = false;
    packetIndex: any = 0; 

    constructor(args: RHArgs) {

        this.sid = getSID();
        this.aid = args.appId;
        this.cid = args.clientId;

        console.log('[ARC] Waiting for document ready state');

        (window as any).docReady(()=> {
            loadJS('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js', ()=>{
                console.log('[ARC] Socket loaded');
                this.recorderData = [];
                this.recorder = new Recorder({
                    sid: this.sid,
                    cid: this.cid,
                    aid: this.aid
                });
                this.recorder.getLiveUpdate(this.onRecorderUpdater);
                this.recorder.start(document.body);

                let io = (window as any).io;
                this.socket = io.connect(host, {
                     query: {sid:65},
                    transports:['websocket'],
                });
                this.socket.once('connect', this.onConnect);
                this.socket.once('reconnect', this.onConnect);
                this.socket.once('disconnect', this.onDisconnect);
            })
        }, window)

    }
 
    onDisconnect =()=> {
        console.log("socket disconnected from client");
        this.initiated = false;
    }

    onConnect =()=> {
        console.log('[ARC] Connected to Socket');
        this.initiated = true;
        console.log("Socket connection status", this.socket.connected);
        
        /**
         *  Sending Session Meta
         */

        let sessionMetaData = this.getSessionMeta();
        this.socket.emit('beacon', JSON.stringify(sessionMetaData));

        /**
         *  Sending Buffered Data
         */
        for(let idx in this.recorderData) {
            this.sendToServer(this.recorderData[idx]);
        }
        this.recorderData = [];

        /**
         *  Initiating Sender
         */
        this.socketInter = setInterval(()=> {
            if(this.rcDataBuffer && this.rcDataBuffer.length) {
                this.emitToSocket('event', this.rcDataBuffer);
                this.rcDataBuffer = [];
            }
        }, 1000);
    }

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
            (window as any).log('[ARC] Sending Data', this.rcDataBuffer.length);
            (window as any).log('[ARC] Packet size', size, 'Bytes, ', Math.ceil(size/1024), 'kb');
            (window as any).log(packet);
        }
        this.socket.emit('beacon', JSON.stringify(packet));
    }

    getPID =()=> window.location.pathname

    sendToServer =(event: any)=> {
        if(!this.initiated)
            return;

        // if(event && event.type === eventTypes.snapshot && ) {
        //     this.emitToSocket(event.type, event);
        // } else if(event) {
            this.rcDataBuffer.push(event);
        // }
    }

    onRecorderUpdater =(event:any)=> {
        this.recorderData.push(event);
        this.sendToServer(event);
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
            deviceType: 'desktop',
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
