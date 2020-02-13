import { eventTypes } from '../Constants/Constants';

export default class WebRequestHandler {

    getRecorder: Function;

    constructor(args: any) {
        this.getRecorder =()=> args.getRecorder();


        const trackXMLReq = this.trackXMLReq;

        /**
         *  xmlHttpReq
         */

        let open = XMLHttpRequest.prototype.open;
        (XMLHttpRequest as any).prototype.open = function(method:any, url:string, async:boolean) {
            let req = this;
            this.onprogress = function(d:any) {
                if(req.readyState === 3) {
                    trackXMLReq({
                        status: req.status,
                        method,
                        url,
                        async
                    })
                }
            }
            open.call(this, method, url, async);
        }; 


        /**
         *  Fetch
         */
        async function handleFetch(promise:any, url:String, params:any) {
            let resp = await promise; 
            trackXMLReq({
                status: resp.status,
                url,
                method: params.method || 'GET',
                async: false
            })
        }

        (window as any).__fetch__ = window.fetch;
        (window as any).fetch =(url:String, params:any)=> {
            let req = (window as any).__fetch__(url, params);
            handleFetch(req.then(), url, params);
            return req;
        }
    }

    trackXMLReq =(args:any)=> {
        this.getRecorder().generateEvent({
            type: eventTypes.xmlHttpReq,
            ...args
        })
    }

}