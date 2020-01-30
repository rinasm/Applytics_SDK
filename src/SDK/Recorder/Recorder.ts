const MutationObserver = (<any>window).MutationObserver || (<any>window).WebKitMutationObserver || (<any>window).MozMutationObserver;
const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,  
};

let observer;
let currentNodeId = 1;
let data: Array<any> = [];
let dataBuffer: Array<any> = []
let eventListener:any = null;
let cssRules: String = '';
let inputNodeNames: Array<String> = ['TEXTAREA', 'INPUT']; 
let initialSnapshotSend: Boolean = false;
(<any>window).rcData = []

let eventTypes = {
    snapshot: 'snapshot',
    characterData: 'characterData',
    childList: 'childList',
    attributes: 'attributes',
    scroll: 'scroll',
    inputValue: 'inputValue',
    mouseClick: 'mouseClick',
    mouseMove: 'mouseMove',
    assetLoaded: 'assetLoaded',
    styleSheetsLoadReq: 'styleSheetsLoadReq',
    xmlHttpReq: 'xmlHttpReq',
    console: 'console',
    browserMeta: 'browserMeta',
    windowResize: 'windowResize',
    consoleStatusChanged: 'consoleStatusChanged',
    commandExecuted: 'commandExecuted',
    hashChanged: 'hashChanged'
}

let commands = {
    PASTE: "PASTE",
    COPY: "COPY",
    BOOKMARK: "BOOKMARK",
    SAVE: "SAVE"
}

// let blacklistedElByClass = ['LineBarChart', 'map-gm']
let blacklistedElByClass: Array<String> = [];
let consoleTrackList: Array<any> = ['info', 'log', 'warn', 'error']
let blacklistedAttrs: Array<String> = ['srcset']

export default class Recorder {

    cid: String;
    sid: String;
    aid: String;
    blacklistedNodes: Array<any>;
    skippedMutations: any;
    readImageSrc: Boolean;
    consoleStatus: any;
    tempConsole: any;
    os: any;
    resizeDebounce: any;
    ctrlKeyStatus: any;


    constructor(args: any) {
        this.cid = args.cid;
        this.sid = args.sid;
        this.aid = args.aid;
        this.blacklistedNodes = [];
        this.skippedMutations = 0;
        this.readImageSrc = false;
        this.trackAllReq();
        this.trackAllConsoleActivity();
        this.getAllMetaData();
        this.trackWindowResize();
        this.trackWindowCommands();
        this.trackHashChange();
        console.log('Recorder Initiated');
    }    

    start =(node: any)=> {
        this.recordStyle();
        this.bindScroll(window);
        this.bindMouseEvent(document);
        this.checkConsoleStatus(false);
        this.takeSnapshot(node, true);
        observer = new MutationObserver((mutations:any)=> {
            this.handleMutations(mutations);
        });
        observer.observe(node, config); 
        console.log('Started Recording');
    }

    /**
     * 
     *  Helpers
     * 
     */

    getRCIDFromEl =(el:any)=> el.rcid;

    recordStyle =()=> {
        cssRules = '';
        for(let idx=0; idx<document.styleSheets.length; idx++) {
            try {
                for(let jdx=0; jdx<(<any>document.styleSheets[idx]).rules.length; jdx++) {
                    cssRules += (<any>document.styleSheets[idx]).rules[jdx].cssText;
                }
            } catch (e) { 
                this.generateEvent({
                    type: eventTypes.styleSheetsLoadReq,
                    href: document.styleSheets[idx].href
                });
            }
        }
    }

    bindScroll =(node:any)=> {
        if(node.addEventListener) {
            node.isScroll = true;
            node.addEventListener('scroll', this.handleOnScroll);
        }
    }

    bindOnKeyup =(node:any)=> {
        if(node.addEventListener) {
            node.isOnKeyup = true;
            node.addEventListener('keyup', this.handleOnKeyup);
        }
    }

    bindMouseEvent =(node:any)=> {
        node.addEventListener('mousemove', this.handleMouseMove);
        node.addEventListener('click', this.handleMouseClick);
    }

    unbindFromAllEvent =(node:any)=> {
        if(node.isScroll && node.removeEventListener) {
            node.isScroll = false;
            node.removeEventListener('scroll', this.handleOnScroll);
        }
        if(node.isOnKeyup && node.removeEventListener) {
            node.isOnKeyup = false;
            node.removeEventListener('keyup', this.handleOnKeyup);
        }
    }

    getBase64Image(img:any) {
        let dataURL = '';
        try {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx:any = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            dataURL = canvas.toDataURL("image/png");
        } catch(e) {
            return false;
        } 
        return dataURL;
    }

    readSrc =(node:any, url:any)=> {
        if(node.complete) {
            return this.getBase64Image(node);
        } else {
            node.addEventListener('load', ()=> {
                this.generateEvent({
                    rcid: node.rcid,
                    url,
                    src: this.getBase64Image(node),
                    type: eventTypes.assetLoaded
                })
            })
        }
    }

    recursivelyCheckTargetHasClickEvents:any =(target:any)=> {
        if(target.onclick || target.onmousedown || target.onmouseup || target.onchange || 
            ['INPUT'].indexOf(target.tagName) !== -1) {
            return true;
        } else if(target.tagName !== 'BODY' && target.parentNode){
            return this.recursivelyCheckTargetHasClickEvents(target.parentNode);
        }
        return false;
    }

    /**
     * 
     *  Mutaion Handler
     * 
     */

    handleMutations =(mutations:any)=> {
        mutations.forEach((mutation:any)=> {
            if(!mutation.target) 
                return;

            for(let idx in this.blacklistedNodes) {
                if(this.blacklistedNodes[idx].contains(mutation.target)) {
                    this.skippedMutations++;
                    return;
                }
            }

            console.log(this.skippedMutations);

            switch(mutation.type) {
                case eventTypes.characterData:
                    this.handleCharacterDataMutation(mutation);
                    break;

                case eventTypes.childList:
                    this.handleChildList(mutation);
                    break;

                case eventTypes.attributes:
                    this.handleAttributes(mutation);
                    break;
        
                default:
                    break;
            }
        })
    }

    handleCharacterDataMutation =(mutation:any)=> {
        this.generateEvent({
            rcid: mutation.target.rcid,
            type: eventTypes.characterData,
            text: mutation.target.data
        })
    }

    handleChildList =(mutation:any)=> {
        let removedNodes = [];
        let addedNodes = [];
        for(let idx=0; idx < mutation.removedNodes.length; idx++) {
            if(mutation.removedNodes[idx].rcid != null) {
                removedNodes.push(mutation.removedNodes[idx].rcid);
                this.unbindFromAllEvent(mutation.removedNodes[idx]);
            }
        }
        for(let idx=0; idx < mutation.addedNodes.length; idx++) {
            this.populateId(mutation.addedNodes[idx]);
            addedNodes.push(this.getHTML(mutation.addedNodes[idx]));
        }
        this.generateEvent({
            parent: mutation.target.rcid,
            type: eventTypes.childList,
            addedNodes,
            removedNodes,
            nextSibling: mutation.nextSibling ? mutation.nextSibling.rcid : null,
            previousSibling: mutation.previousSibling ? mutation.previousSibling.rcid : null,
        })
    }

    handleAttributes =(mutation:any)=> {
        this.generateEvent({
            rcid: mutation.target.rcid,
            type: eventTypes.attributes,
            attributeName: mutation.attributeName,
            attributeValue: mutation.target.getAttribute(mutation.attributeName)
        });
    }

    /**
     *  Event Handlers
     */

    handleOnScroll =(event:any)=> {
        let node = event.target || event;

        if(!node)
            return;

        let scroll = {}

        if(node.rcid == null) {
            scroll = {
                scrollTop: node.documentElement.scrollTop,
                scrollLeft: node.documentElement.scrollLeft,
                rcid: -1,
            }
        } else {
            scroll = {
                scrollTop: node.scrollTop,
                scrollLeft: node.scrollLeft,
                rcid: node.rcid
            }
        }
        (<any>scroll).type = eventTypes.scroll;
        this.generateEvent(scroll);
    }

    handleOnKeyup =(event:any)=> {
        this.generateEvent({
            rcid: event.target.rcid,
            value: event.target.value,
            type: eventTypes.inputValue
        });        
    }

    handleMouseMove =(event:any)=> {
        this.generateEvent({
            mouseX: event.pageX - document.documentElement.scrollLeft,
            mouseY: event.pageY - document.documentElement.scrollTop,
            type: eventTypes.mouseMove
        });     
    }

    handleMouseClick =(event:any)=> {
        let target = event && event.target ? event.target : null;
        let isResponsive = target !== null ? this.recursivelyCheckTargetHasClickEvents(target) : false;
        let isLink = target !== null && target.href ? true : false;
        this.generateEvent({
            mouseX: event.pageX,
            mouseY: event.pageY,
            type: eventTypes.mouseClick,
            isResponsive,
            isLink
        });     
    }

    /**
     * 
     *  The Snapshot
     * 
     */
 
    populateId =(node:any)=> {
        node.rcid = currentNodeId;
        currentNodeId++;
        if(node.childNodes && node.childNodes) {
            node.childNodes.forEach((child:any)=> {
                this.populateId(child);
            })
        }
    }

    checkNodeIsValid =(node:any)=> {
        if(node.className && node.className.indexOf && blacklistedElByClass.filter(d=> node.className.indexOf(d) !== -1).length) {
            this.blacklistedNodes.push(node);
            return false;
        }
        return true;
    }

    convertToAbsolutePath =(path:any)=> {
        if(path==null)
            return 'nopath';
        return new URL(path, window.location.origin).href; 
    }

    getHTML =(node:any)=> {
        let el:any = {};

        if(node.nodeName === '#text') {
            el.nodeName = node.nodeName;
            el.value = node.nodeValue;
            el.type = 'text';
        } else {
            el.tagName = ['BODY'].indexOf(node.tagName) !== -1 ? 'DIV' : node.tagName;
            el.attributes = {};
            el.type = 'element';
            if(node.tagName === 'IFRAME') {
                el.style = {
                    width: node.clientWidth,
                    height: node.clientHeight,
                }
            }
            if(node.attributes) {
                for(let attrIndex=0; attrIndex<node.attributes.length; attrIndex++) {
                    if(blacklistedAttrs.indexOf(node.attributes[attrIndex].localName) === -1) {
                        if(node.attributes[attrIndex].localName === 'src' && node.tagName !== 'IFRAME') {
                            if(this.readImageSrc) {
                                el.src = this.readSrc(node, node.attributes[attrIndex].value);
                                el.srcURL = this.convertToAbsolutePath(node.attributes[attrIndex].value);
                            } else {
                                el.src = this.convertToAbsolutePath(node.attributes[attrIndex].value);
                            }
                        } else {
                            el.attributes[node.attributes[attrIndex].localName] = node.attributes[attrIndex].value;
                        }
                    }
                }
            } 

            /**
             *  Event Binding
             */
            let style = window.getComputedStyle(node);
            if(['', 'X', 'Y'].map(d=>['scroll', 'auto'].indexOf((<any>style)['overflow'+d]) !== -1).filter(d=>d).length) {
                this.bindScroll(node);
            }

            if(inputNodeNames.indexOf(node.nodeName) !== -1) {
                this.bindOnKeyup(node);
            }
        }
        el.rcid = node.rcid;
        el.childNodes = []
        if(node.childNodes) {
            node.childNodes.forEach((child:any)=> {
                if(child.nodeName !== 'SCRIPT' && child.nodeName !== 'NOSCRIPT' && child.nodeName !== '#comment' && this.checkNodeIsValid(child))  {
                    el.childNodes.push(this.getHTML(child))
                }
            })
        }
        return el;
    }

    takeSnapshot =(node:any, initial:any)=> {
        this.populateId(node);
        let clone = this.getHTML(node);
        this.generateEvent({
            type: eventTypes.snapshot, 
            dom: clone, 
            cssRules, 
            initial,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            scrollTop: document.documentElement.scrollTop,
            scrollLeft: document.documentElement.scrollLeft,
            consoleStatus: this.consoleStatus,
            location: this.getURLDetails()
        })
    }

    /**
     *  Web Request Tracker
     */

    trackAllReq =()=> {

        const trackXMLReq = this.trackXMLReq;

        /**
         *  xmlHttpReq
         */

        let open = XMLHttpRequest.prototype.open;
        (<any>XMLHttpRequest).prototype.open = function(method:any, url:string, async:boolean) {
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

        (<any>window).__fetch__ = window.fetch;
        (<any>window).fetch =(url:String, params:any)=> {
            let req = (<any>window).__fetch__(url, params);
            handleFetch(req.then(), url, params);
            return req;
        }
    }

    trackXMLReq =(args:any)=> {
        this.generateEvent({
            type: eventTypes.xmlHttpReq,
            ...args
        })
    }

    /**
     *  Meta Data
     */

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
            this.generateEvent(event)
        
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
        this.os = os;
        return os;
    }

    /**
     *  Track Console
     */

    trackConsole =(params:any, type:any)=> {
        let args = [];
        for(let idx=0; idx < params.length; idx++) {
            args.push(params[idx]);
        }
        this.generateEvent({
            type: eventTypes.console,
            consoleType: type,
            args
        })
    }

    trackAllConsoleActivity =()=> { 
        let tempConsole = {};
        const trackConsole = this.trackConsole;
        for (let idx in consoleTrackList) {
            if (typeof (<any>console)[consoleTrackList[idx]] === 'function') {
                (<any>tempConsole)[consoleTrackList[idx]] = (<any>console)[consoleTrackList[idx]];
            }
        } 
        this.tempConsole = tempConsole;
        const cloneConsole = function (key:any = null) {
            if (key !== null && key in tempConsole) {
                (<any>console)[key] = function () {
                    trackConsole(arguments, key);
                    (<any>console)[key] = Function.prototype.bind.call((<any>tempConsole)[key], console);
                    (<any>console)[key].apply(console, arguments);
                    cloneConsole(key);
                };
            } else if (key === null) {
                for (let idx in tempConsole) {
                    (<any>console)[idx] = function () {
                        trackConsole(arguments, idx);
                        (<any>console)[idx] = Function.prototype.bind.call((<any>tempConsole)[idx], console);
                        (<any>console)[idx].apply(console, arguments);
                        cloneConsole(idx);
                    };
                }
            }
        }
        cloneConsole();
        window.onerror = function(error, url, line) {
            trackConsole([error, url, line], 'newError');
        }; 
    }

    /**
     *  Window Resize and Others
     */

    trackWindowResize =()=> {
        window.addEventListener('resize', ()=> {
            clearTimeout(this.resizeDebounce);
            this.resizeDebounce = setTimeout(()=> {
                this.generateEvent({
                    type: eventTypes.windowResize,
                    screenWidth: window.innerWidth,
                    screenHeight: window.innerHeight,
                    scrollTop: document.documentElement.scrollTop,
                    scrollLeft: document.documentElement.scrollLeft,
                })
                this.checkConsoleStatus(true);
            }, 400)
        })
    }

    checkConsoleStatus =(generateEvent=false)=> {
        let devtools: Function = function(){};
        (<any>devtools).toString = function() { this.opened = true }
        console.log('%c', devtools);

        let prevStatus = this.consoleStatus || false;
        let currentStatus = (<any>devtools).opened &&
                            ((window.outerHeight - window.innerHeight > 150) || 
                            (window.outerWidth - window.innerWidth > 150));
        if(prevStatus !== currentStatus) {
            this.consoleStatus = currentStatus;
            if(generateEvent) {
                this.generateEvent({
                    type: eventTypes.consoleStatusChanged,
                    consoleStatus: this.consoleStatus,
                })
            }
            return true;
        }
        return false;
    }

    /**
     *  Window Commands
     */

    trackWindowCommands =()=> {
        const trackWindowCommand =(e: any)=> {
            let code = (document.all) ? (<any>window.event).keyCode : e.which; 
            let cmd = null;
            if (this.ctrlKeyStatus && code == 86) {
                cmd = commands.PASTE;
            } else if (this.ctrlKeyStatus && code == 67) { 
                cmd = commands.COPY;
            } else if (this.ctrlKeyStatus && code == 83) { 
                cmd = commands.SAVE;
            } else if (this.ctrlKeyStatus && code == 68) { 
                cmd = commands.BOOKMARK;
            }

            if(cmd !== null) {
                this.generateEvent({
                    type: eventTypes.commandExecuted,
                    cmd
                })
            }
        }

        const trackCtrl =(e: any, isKeyDown:Boolean)=> {
            let code = e.keyCode || e.which;
            let isMac = (this.os||'').toLocaleLowerCase().indexOf('mac') !== -1;
            if((code === 91 && isMac) || (!isMac && code === 17)) {
                this.ctrlKeyStatus = isKeyDown;
            }
        }
        document.addEventListener('keydown', e=>trackCtrl(e, true), false);
        document.addEventListener('keyup', e=>trackCtrl(e, false), false);
        document.addEventListener('keydown', trackWindowCommand, false);
    }

    /**
     *  Track Hash Change
     */

    trackHashChange =()=> {
        window.onhashchange = ()=> { 
            let event:any = this.getURLDetails();
            event.type = eventTypes.hashChanged;
            this.generateEvent(event);
        }
    }

    getURLDetails =()=> {
        return {
            origin: window.location.origin,
            protocol: window.location.protocol,
            host: window.location.host,
            hostname: window.location.hostname,
            port: window.location.port,
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            href: window.location.href
        }
    }

    /**
     *  The Event Generator
     */

    generateEvent =(action:any)=> {
        let event:any = {
            time: parseFloat(performance.now().toFixed(4))
        } 
        event = {
            ...event,
            ...action
        } 
        if(!initialSnapshotSend && event.initial) {
            initialSnapshotSend = true;
            setTimeout(()=> {
                if(dataBuffer.length && initialSnapshotSend) {
                    for(let idx in dataBuffer) {
                        this.generateEvent(dataBuffer[idx]);
                    }
                    dataBuffer = []
                }
            }, 1)
        }
        if(initialSnapshotSend) {
            data.push(event);
            this.publishLiveUpdate(event);
        } else if([eventTypes.attributes, eventTypes.characterData, eventTypes.childList].indexOf(event.type) === -1){
            dataBuffer.push(event);
        }
    }

    publishLiveUpdate =(event: any)=> {
        if(eventListener) {
            let msg:any = this.wrapEvent(event); 
            (<any>window).rcData.push(msg);
            eventListener(msg, data);
        }   
    }

    getLiveUpdate =(listener:any)=> {
        if(typeof listener === 'function') {
            eventListener = listener;
            if(data.length) {
                let msg = this.wrapEvent(data[data.length-1])
                eventListener(msg, data);
            }
        }
    }

    wrapEvent =(data:any)=> {
        return data; 
    }

}