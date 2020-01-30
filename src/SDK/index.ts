import RecorderHandler from './RecorderHandler/RecorderHandler';


const startARC=(clientId:String, appId:String)=> {
    console.log('Recorder Handler Initiated, Client ID', clientId, 'App ID', appId)
    new RecorderHandler({clientId, appId});
}

(<any>window).startARC = startARC;


export default startARC;