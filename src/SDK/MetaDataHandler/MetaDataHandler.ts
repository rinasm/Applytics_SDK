import { eventTypes } from '../Constants/Constants';

export default class MetaDataHandler {

    getRecorder: Function;

    constructor(args: any) {
        this.getRecorder =()=> args.getRecorder();
        this.getAllMetaData();
    }

    getAllMetaData =(generateEvent=true)=> {
        let browserMeta  = this.getBrowser().split(' ');
        let browser = browserMeta.slice(0, Math.max(browserMeta.length-1, 1)).join(' ');
        let browserVersion = browserMeta[Math.max(1, browserMeta.length-1)] || 'NA'
        let event = {
            type: eventTypes.browserMeta,
            browser,
            browserVersion,
            os: this.getOS(),
            core: navigator.hardwareConcurrency,
            cookieEnabled: navigator.cookieEnabled,
            language: navigator.language,
            deviceMemory: (navigator as any).deviceMemory,
            isTouchDevice: this.getIsTouchDevice(),
            referrer: this.getReferrer(),
            appVersion: navigator.appVersion,
            userAgent: navigator.userAgent,
            deviceType: this.getDeviceType()
        };
        if(generateEvent)
            this.getRecorder().generateEvent(event)
        
        return event;
    }

    getReferrer =()=> ((document.referrer||'').split('//')[1] || '').split('/')[0] || '';

    getIsTouchDevice() {
        return  'ontouchstart' in document.documentElement || (('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0))
    }

    isMobileDevice() {
        // return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerHeight / 1.5 > window.innerWidth);
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    isTablet() {
        const userAgent = navigator.userAgent.toLowerCase();
        return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    }

    getDeviceType =()=> {
        if(this.isTablet()) {
            return 'tablet';
        }
        if(this.isMobileDevice()) {
            return 'mobile';
        } 
        return 'desktop';
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
        let browser = M.join(' ');
        if(browser && browser.length > 10) {
            if(browser.indexOf('BingPreview') !== -1) {
                return 'Bing Preview SG'
            }
            return browser.split(' ')[0] || 'Other';
        }
        return browser || ''
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