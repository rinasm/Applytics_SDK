import '../Helpers/DocReady';
import {getSID, parseURL} from '../Helpers/Helpers';
import Recorder from '../Recorder/Recorder'; 
import { MessageHandler } from './MessageHandler';
import { SDK_VERSION } from '../Constants/Constants';
import StatsHandler from '../StatsHandler/StatsHandler';
import UserDataHandler from '../UserDataHandler/UserDataHandler';

interface RHArgs {
    clientId: String,
    appId: String,
    arccsrc: Boolean
}

export default class RecorderHandler {

    sid: String;
    cid: String;
    aid: String;
    recorderData: Array<any> = [];
    recorder: any = null;
    socket: any;
    initiated: Boolean = false; 
    messageHandler: any;
    statsHandler: any;
    userDataHandler: any;

    constructor(args: RHArgs) {

        this.sid = getSID();
        this.aid = args.appId;
        this.cid = args.clientId;
        (window as any).dataSendQList = {};

        if(!(window as any).ARCNavigation && args.arccsrc) {
            if((window as any).__ARC_DEV__) (window as any).log('[ARC] Exiting Cached SDK');
            (window as any).ARC.stop();
            return;
        } else if(args.arccsrc) {
            if((window as any).__ARC_DEV__) (window as any).log('[ARC] Using Cached SDK');
            (window as any).ARCSDKRU = true;
        }

        if((window as any).__ARC_DEV__) (window as any).log('[ARC] Waiting for document ready state, SID', this.sid);

        (window as any).docReady(()=> {
            if((window as any).__ARC_DEV__) (window as any).log('[ARC] Doc Ready', performance.now());
            this.recorderData = [];
            this.recorder = new Recorder({
                sid: this.sid,
                cid: this.cid,
                aid: this.aid
            });
            this.messageHandler = new MessageHandler(this.sid, this.aid, this.cid, {
                sessionMeta: this.getSessionMeta(),
                onBeforeUnload: ()=> this.setSessionDataToLS()
            });
            this.recorder.getLiveUpdate(this.onRecorderUpdater);
            this.statsHandler = new StatsHandler({
                messageHandler: this.messageHandler,
                recorder: this.recorder,
                sid: this.sid
            });

            this.userDataHandler = new UserDataHandler({
                messageHandler: this.messageHandler,
                sid: this.sid
            })

            this.recorder.start(document.body); 
            this.setSessionDataToLS();
            setInterval(this.setSessionDataToLS, 1000); 
        }, window) 
    }

    stop =()=> {
        if(this.recorder) this.recorder.stop();
        this.recorder = null;
        if(this.messageHandler) this.messageHandler.stop();
        this.messageHandler = null;
        this.userDataHandler = null;
        this.statsHandler = null;
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
 

    onRecorderUpdater =(event:any)=> {
        this.recorderData.push(event);
        this.messageHandler.onMessage(event);
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
            startTime: Date.now(),

            os: meta.os,
            referrer: parseURL(meta.referrer || null),
            browserName: meta.browser,

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
              browserVersion: meta.browserVersion,
              osVersion: meta.os,
              userAgent: navigator.userAgent,
              SDK_VERSION,
              appStartTime: performance.now(),
              screenWidth: window.innerWidth,
              screenHeight: window.innerHeight,
              scrollTop: document.documentElement.scrollTop,
              scrollLeft: document.documentElement.scrollLeft,
            },
        }
    }

}
