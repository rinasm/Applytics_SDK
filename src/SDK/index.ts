import RecorderHandler from './RecorderHandler/RecorderHandler';


const startARC=(clientId:String, appId:String)=> {
    console.log('[ARC] Recorder Handler Initiated, Client ID', clientId, 'App ID', appId, performance.now())
    new RecorderHandler({clientId, appId});
}

(window as any).startARC = startARC;


export default startARC;