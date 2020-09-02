import { eventTypes, SDK_VERSION } from '../Constants/Constants';
import {recorderConfig} from '../Constants/Config';
import MutationHandler from '../MutationHandler/MutationHandler';
import ConsoleHandler from '../ConsoleHandler/ConsoleHandler';
import WindowEventHandler from '../WindowEventHandler/WindowEventHandler';
import DomParser from '../DomParser/DomParser';
import WebRequestHandler from '../WebRequestHandler/WebRequestHandler';
import MetaDataHandler from '../MetaDataHandler/MetaDataHandler';
import { recursivelyCheckTargetHasClickEvents } from './utils';

const MutationObserver = (window as any).MutationObserver || (window as any).WebKitMutationObserver || (window as any).MozMutationObserver;

let observer:any;
let currentNodeId = 1;
let data: Array<any> = [];
let dataBuffer: Array<any> = []
let eventListener:any = null;
let initialSnapshotSend: Boolean = false;
(window as any).rcData = [];
(window as any).rcidMap = {}

export default class Recorder {

    cid: String;
    sid: String;
    aid: String;
    blacklistedNodes: Array<any>;
    consoleStatus: any;
    os: any;
    ctrlKeyStatus: any;
    mutaionHandler: any;
    domParser: any;
    consoleHandler: any;
    windowEventHandler: any;
    webRequestHandler: any;
    metaDataHandler: any;
    mouseMoveThreshold: any = 33;
    lastMouseMoveEventGenerated: any = window.performance.now();
    onEvent: any = null;
    paused: any = false;
    __root_node__: any;
    eventNodes:any = {}

    constructor(args: any) {
        this.cid = args.cid;
        this.sid = args.sid;
        this.aid = args.aid;
        this.blacklistedNodes = [];
        this.domParser = new DomParser({ getRecorder: ()=> this });
        this.consoleHandler = new ConsoleHandler({ getRecorder: ()=> this })
        this.mutaionHandler = new MutationHandler({ getRecorder: ()=> this })
        this.windowEventHandler = new WindowEventHandler({ getRecorder: ()=> this });
        this.webRequestHandler = new WebRequestHandler({ getRecorder: ()=> this });
        this.metaDataHandler = new MetaDataHandler({ getRecorder: ()=> this });
        if((window as any).__ARC_DEV__) (window as any).log('[ARC] Recorder Initiated. V '+ SDK_VERSION);

        (window as any).ARC.pause = () => {
            this.paused = true;
        }

        (window as any).ARC.continue = () => {
            this.paused = false;
            if(this.__root_node__) {
                this.domParser.takeSnapshot(this.__root_node__, !(window as any).ARCNavigation); 
            }
        }
    }    

    stop =()=> {
        if(observer && observer.disconnect) {
            observer.disconnect();
        }
        eventListener = null;
        this.unbindAllNodesFromAllEvents();
        this.unbindMouseEvent(document);
        this.domParser = null;
        this.consoleHandler = null;
        this.mutaionHandler = null;
        if(this.windowEventHandler) this.windowEventHandler.stop();
        this.windowEventHandler = null;
        this.webRequestHandler = null;
        this.metaDataHandler = null;
    }

    start =(node: any)=> {
        if((window as any).__ARC_DEV__) (window as any).log('[ARC] Started Recording', performance.now());
        this.domParser.recordStyle();
        this.bindScroll(window);
        this.bindMouseEvent(document);
        this.windowEventHandler.checkConsoleStatus(false);
        this.__root_node__ = node;
        this.domParser.takeSnapshot(node, !(window as any).ARCNavigation); 
        observer = new MutationObserver((mutations:any)=> {
            this.mutaionHandler.handleMutations(mutations);
        });
        observer.observe(node, recorderConfig); 
        this.recordeParentElementProps(node)
    } 

    /**
     * 
     * Recorde Parent Element Props 
     * 
     */

    recordeParentElementProps =(node: any)=> {
        if(node.parentElement) {
            let attributes: any = {};
            let parent = node.parentElement;
            parent.rcid = -2;
            let parentObserver = new MutationObserver((mutations:any)=> {
                this.mutaionHandler.handleMutations(mutations);
            });
            parentObserver.observe(parent, {attributes: true}); 

            for(let idx in parent.attributes) {
                attributes[parent.attributes[idx].localName] = parent.attributes[idx].value
            }
            let event = {
                attributes,
                type: eventTypes.parentProps
            }
            this.generateEvent(event)
        }
    }


    /**
     * 
     *  Helpers
     * 
     */

    bindScroll =(node:any)=> {
        if(node.addEventListener) {
            node.isScroll = true;
            node.addEventListener('scroll', this.handleOnScroll);
            this.eventNodes[node.rcid] = node;
        }
    }

    bindOnKeyup =(node:any)=> {
        if(node.addEventListener) {
            node.isOnKeyup = true;
            node.addEventListener('keyup', this.handleOnKeyup);
            this.eventNodes[node.rcid] = node;
        }
    }

    bindMouseEvent =(node:any)=> {
        node.addEventListener('mousemove', this.handleMouseMove);
        node.addEventListener('touchstart', this.handleTouchStart);
        node.addEventListener('touchmove', this.handleTouchMove);
        node.addEventListener('touchend', this.handleTouchEnd);
        node.addEventListener('click', this.handleMouseClick);
    }

    unbindMouseEvent =(node:any)=> {
        node.removeEventListener('mousemove', this.handleMouseMove);
        node.removeEventListener('touchstart', this.handleTouchStart);
        node.removeEventListener('touchmove', this.handleTouchMove);
        node.removeEventListener('touchend', this.handleTouchEnd);
        node.removeEventListener('click', this.handleMouseClick);
    }

    unbindAllNodesFromAllEvents =()=> {
        for(let idx in this.eventNodes) {
            this.unbindFromAllEvent(this.eventNodes[idx])
        }
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

    

    /**
     *  Event Handlers
     */

    handleOnScroll =(event:any)=> {
        let node = event.target || event;

        if(!node)
            return;

        let scroll = {}


        if(node.rcid == null) {
            if(!(window as any).scrollTarget) {
                if(node.documentElement.scrollTop) {
                    (window as any).scrollTarget = 'doc'
                } else if(node.body && node.body.scrollTop) {
                    (window as any).scrollTarget = 'body'
                }
            }
            let el:any;
            if((window as any).scrollTarget === 'doc') {
                el = node.documentElement
            } else if ((window as any).scrollTarget = 'body') {
                el = node.body
            } else {
                el = {}
            }
            scroll = {
                scrollTop: el.scrollTop || 0,
                scrollLeft: el.scrollLeft || 0,
                rcid: -1,
            }
        } else {
            scroll = {
                scrollTop: node.scrollTop,
                scrollLeft: node.scrollLeft,
                rcid: node.rcid,
                scrollTarget: (window as any).scrollTarget
            }
        }
        (scroll as any).type = eventTypes.scroll;
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
        if((window as any).__ARC_DEV__) (window as any).log('[ARC] [1] INTIAIATING MOUSE EVENT')
        
        if(window.performance.now() - this.lastMouseMoveEventGenerated > this.mouseMoveThreshold) {
            this.lastMouseMoveEventGenerated = window.performance.now();
            if((window as any).__ARC_DEV__) (window as any).log('[ARC] [2] GENERATING MOUSE EVEN')
            this.generateEvent({
                mouseX: event.pageX - document.documentElement.scrollLeft,
                mouseY: event.pageY - document.documentElement.scrollTop,
                type: eventTypes.mouseMove
            });     
        }
    }

    handleTouchStart =(event:any)=> {
        this.handleTouch(eventTypes.touchStart, event);  
    }

    handleTouchEnd =(event:any)=> { 
        this.handleTouch(eventTypes.touchEnd, event);  
    }

    handleTouchMove =(event:any)=> {
        if(window.performance.now() - this.lastMouseMoveEventGenerated > this.mouseMoveThreshold) {
            this.lastMouseMoveEventGenerated = window.performance.now();
            this.handleTouch(eventTypes.touchMove, event);
        }
    }

    handleTouch =(type:any, event:any)=> {
        let touches:any = {};
        let touch:any;
        for(let idx=0; idx<event.touches.length; idx++) {
            touch = {
                x: event.touches[idx].pageX - document.documentElement.scrollLeft,
                y: event.touches[idx].pageY - document.documentElement.scrollTop,
            }
            if(type === eventTypes.touchStart) {
                let target = event && event.target ? event.target : null;
                let isResponsive = target !== null ? recursivelyCheckTargetHasClickEvents(target) : false;
                let isLink = target !== null && target.href ? true : false;
                touch = {
                    isResponsive,
                    isLink,
                    ...touch
                }
            } 
            touches[event.touches[idx].identifier] = touch
        }
        this.generateEvent({
            touches,
            type
        });     
    }

    handleMouseClick =(event:any)=> {
        let target = event && event.target ? event.target : null;
        let isResponsive = target !== null ? recursivelyCheckTargetHasClickEvents(target) : false;
        let isLink = target !== null && target.href ? true : false;
        this.generateEvent({
            mouseX: event.pageX,
            mouseY: event.pageY,
            type: eventTypes.mouseClick,
            isResponsive,
            isLink
        });     
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
     * 
     *  Populate Id
     * 
     */
 
    populateId =(node:any)=> {
        node.rcid = currentNodeId;
        currentNodeId++;
        if(!(window as any).rcidMap[node.rcid]) {
            (window as any).rcidMap[node.rcid] = 0;
        }
        (window as any).rcidMap[node.rcid]++;
        if((window as any).rcidMap[node.rcid] > 1) {
            console.log(node, node.rcid);
            console.dir(node);
        }
        if(node.childNodes && node.childNodes) {
            node.childNodes.forEach((child:any)=> {
                this.populateId(child);
            })
        }
    }
    /**
     *  Meta Data
     */

    getAllMetaData =(generateEvent=true)=> this.metaDataHandler.getAllMetaData(generateEvent);
 

    /**
     *  The Event Generator
     */

    getTime =()=> ((window as any).sidinit || 0) + parseFloat(performance.now().toFixed(4));

    getEventID =()=> {
        let id = parseInt((localStorage.getItem('arceid') as any) || 0, 10) || 0
        localStorage.setItem('arceid', ''+(id+1));
        return id;
    }

    generateEvent =(action:any)=> {
        if(this.paused)
            return;

        if((window as any).__ARC_DEV__) (window as any).log('[ARC] [3] GENERATING EVEN')

        let event:any = {
            time: this.getTime(),
            eid: this.getEventID()
        } 
        event = {
            ...event,
            ...action
        } 
        if(this.onEvent) {
            this.onEvent(event)
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
            (window as any).rcData.push(msg);
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