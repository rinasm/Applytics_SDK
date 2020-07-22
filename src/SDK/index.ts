import RecorderHandler from './RecorderHandler/RecorderHandler';


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
    new RecorderHandler({clientId, appId, arccsrc});

    /**
     *  Validating SDK Host persmission
     */

    if(!host || window.location.host.indexOf(host) === -1) {
        if((window as any).__ARC_DEV__) console.error('[ARC] Invalid host ' + host + '. This host don\'t have permission to run Applytics SDK.');
    } else {
        if((window as any).__ARC_DEV__) console.log('[ARC] Recorder Handler Initiated, Client ID', host, clientId, 'App ID', appId, performance.now());
        
    }
    if(src) {
        localStorage.setItem('arccsrc', src);
    }
}

(window as any).startARC = startARC;


export default startARC;