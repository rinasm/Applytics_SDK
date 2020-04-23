import '../Helpers/DocReady';
import {getSID, loadJS, parseURL} from '../Helpers/Helpers';
import Recorder from '../Recorder/Recorder';
import {host} from '../Constants/Constants'; 

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
                this.socket = io.connect(host, {transports:['websocket']});
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
        this.socket.emit('beacon', "test yo1");
        console.log("Socket connection status", this.socket.connected);
        /**
         *  Sending Session Meta
         */
        this.socket.emit('beacon', "test yo2");
        let sessionMetaData = this.getSessionMeta();
        this.socket.emit('beacon', sessionMetaData);
        console.log("Socket connection status", this.socket.connected);
        this.socket.emit('beacon', "test yo3");
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
                let packet = {
                    sid: this.sid,
                    cid: this.cid,
                    aid: this.aid,
                    pid: this.getPID(),
                    index: this.packetIndex,
                    type: 'event',
                    timestamp: Date.now(),
                    data: this.rcDataBuffer
                };
                this.packetIndex+=1;
                if((window as any).ARCDev) {
                    let size:any =  JSON.stringify(packet).length * 2;
                    (window as any).log('[ARC] Sending Data', this.rcDataBuffer.length);
                    (window as any).log('[ARC] Packet size', size, 'Bytes, ', Math.ceil(size/1024), 'kb');
                    (window as any).log(packet);
                }
                console.log("Socket connection status", this.socket.connected);
                this.socket.emit('beacon', packet);
                this.rcDataBuffer = [];
            }
        }, 1000);
    }

    getPID =()=> window.location.pathname

    sendToServer =(event: any)=> {
        if(!this.initiated)
            return;

        this.rcDataBuffer.push(event);
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