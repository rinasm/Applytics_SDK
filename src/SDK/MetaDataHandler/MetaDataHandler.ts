import { eventTypes } from '../Constants/Constants';

export default class MetaDataHandler {

    getRecorder: Function;

    constructor(args: any) {
        this.getRecorder =()=> args.getRecorder();
        this.getAllMetaData();
    }

    getAllMetaData =(generateEvent=true)=> {
        let event = {
            type: eventTypes.browserMeta,
            browser: this.getBrowser(),
            os: this.getOS(),
            core: navigator.hardwareConcurrency,
            cookieEnabled: navigator.cookieEnabled,
            language: navigator.language,
            deviceMemory: (<any>navigator).deviceMemory,
            isTouchDevice: this.getIsTouchDevice(),
            referrer:document.referrer,
            appVersion: navigator.appVersion,
            userAgent: navigator.userAgent
        };
        if(generateEvent)
            this.getRecorder().generateEvent(event)
        
        return event;
    }

    getIsTouchDevice() {
        return  'ontouchstart' in document.documentElement || (('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0))
    }

    getBrowser(){
        var ua = navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge?)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge ');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }

    getOS() {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;
      
        if (macosPlatforms.indexOf(platform) !== -1) {
          os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
          os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
          os = 'Windows';
        } else if (/Android/.test(userAgent)) {
          os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
          os = 'Linux';
        }
        this.getRecorder().os = os;
        return os;
    }
} 