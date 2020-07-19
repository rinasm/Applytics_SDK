import RecorderHandler from './RecorderHandler/RecorderHandler';


const startARC=(clientId:String, appId:String, src:any, arccsrc=false)=> {
    let host = atob((appId||'').split('-')[0]);
    if(!host || window.location.host.indexOf(host) === -1) {
        console.error('[ARC] Invalid host ' + host + '. This host don\'t have permission to run Applytics SDK.');
    } else {
        console.log('[ARC] Recorder Handler Initiated, Client ID', host, clientId, 'App ID', appId, performance.now());
        new RecorderHandler({clientId, appId, arccsrc});
    }
    if(src) {
        localStorage.setItem('arccsrc', src);
    }
}

(window as any).startARC = startARC;


export default startARC;