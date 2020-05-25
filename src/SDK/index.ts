import RecorderHandler from './RecorderHandler/RecorderHandler';


const startARC=(clientId:String, appId:String, src:any, arccsrc=false)=> {
    console.log('[ARC] Recorder Handler Initiated, Client ID', clientId, 'App ID', appId, performance.now());
    if(src) {
        localStorage.setItem('arccsrc', src);
    }
    new RecorderHandler({clientId, appId, arccsrc});
}

(window as any).startARC = startARC;


export default startARC;