import RecorderHandler from './RecorderHandler/RecorderHandler';
import {SDK_VERSION} from './Constants/Constants'

(window as any).log = console.log;

const checkHost =( host: any )=> {
    if(!host)
        return host;
    host = host.replace('https://', '')
    host = host.replace('http://', '')
    host = host.replace('*.', '')
    return window.location.host.indexOf(host) !== -1;
}

const startARC=(clientId:String, appId:String, src:any, arccsrc=false)=> {
    let host = atob((appId||'').split('-')[0]);

    /**
     *  Dev Options
     */

    (window as any).__setARCDevMode = (state: any) => localStorage.setItem('__ARC_DEV__', state);
    let __ARC_DEV__:any = localStorage.getItem('__ARC_DEV__');
    try {
        __ARC_DEV__ = JSON.parse(__ARC_DEV__); 
    } catch (e) {
        __ARC_DEV__ = false;
    }
    (window as any).__ARC_DEV__ = __ARC_DEV__;

    if((window as any).__ARC_DEV__) (window as any).log('[ARC] SDK VERSION ', SDK_VERSION)

    /**
     *  Validating SDK Host persmission
     */

    if(!checkHost(host)) {
        if((window as any).__ARC_DEV__) console.error('[ARC] Invalid host ' + host + '. This host don\'t have permission to run Applytics SDK.');
    } else {
        if((window as any).__ARC_DEV__) (window as any).log('[ARC] Recorder Handler Initiated, Client ID', host, clientId, 'App ID', appId, performance.now());

        (window as any).ARC = {};
        (window as any).ARC.stop = () => {
            if((window as any).__rec__) {
                (window as any).__rec__.stop() 
            }
            if((window as any).__ARC_DEV__) (window as any).log('[ARC] Stopping Recorder');

            (window as any).recorderStopped = true;
            localStorage.removeItem('arcsid');
            (window as any).__rec__ = null;
            delete (window as any).__rec__;
        }

        (window as any).ARC.start = () => {
            if(!(window as any).__rec__ || !(window as any).__rec__.recorder) {
                if((window as any).__ARC_DEV__) (window as any).log('[ARC] Starting Recorder');
                (window as any).__rec__ = new RecorderHandler({clientId, appId, arccsrc});
            } else {
                console.error('[ARC] Cannot Initilize multiple ARC instances, stop current instance by using window.ARC.stop() method');
            }
        }

        (window as any).ARC.start();
    }
    if(src) {
        localStorage.setItem('arccsrc', src);
    }
}

(window as any).startARC = startARC;


export default startARC;