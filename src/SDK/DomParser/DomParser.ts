import { 
    eventTypes, 
    blacklistedElByClass,
    blacklistedAttrs
} from '../Constants/Constants';
import XHR from '../Helpers/XHR';
 
export default class DomParser {

    getRecorder: Function;
    cssRules: String = ''; 
    inputNodeNames: Array<String> = ['TEXTAREA', 'INPUT']; 
    readImageSrc: Boolean = false;

    // search for class

    fetchAndRecordStyle =(url: any)=> {
        XHR.get(url, ()=>{})
            .then(css=> { 
                this.getRecorder().generateEvent({
                    type: eventTypes.styleSheetString,
                    css
                });
            }, err=> {
                console.error('[ARC] Fetching StyleSheet Failed', url, err);
                this.getRecorder().generateEvent({
                    type: eventTypes.styleSheetString,
                    err
                });
            })
    }

    recordStyle =()=> {
        this.cssRules = '';
        let rule: string;
        for(let idx=0; idx<document.styleSheets.length; idx++) {
            try {
                for(let jdx=0; jdx<(document.styleSheets[idx] as any).rules.length; jdx++) {
                    rule = (document.styleSheets[idx] as any).rules[jdx].cssText; 
                    this.cssRules += rule;
                }
            } catch (e) { 
                // this.getRecorder().generateEvent({
                //     type: eventTypes.styleSheetsLoadReq,
                //     href: document.styleSheets[idx].href
                // });
                if(document.styleSheets[idx].href) {
                    this.fetchAndRecordStyle(document.styleSheets[idx].href)
                }
            }
        }
    }

    constructor(args: any) {
        this.getRecorder =()=> args.getRecorder();
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
            if(['', 'X', 'Y'].map(d=>['scroll', 'auto'].indexOf((style as any)['overflow'+d]) !== -1).filter(d=>d).length) {
                this.getRecorder().bindScroll(node);
            }

            if(this.inputNodeNames.indexOf(node.nodeName) !== -1) {
                this.getRecorder().bindOnKeyup(node);
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
        this.getRecorder().populateId(node);
        let clone = this.getHTML(node);
        this.getRecorder().generateEvent({
            type: eventTypes.snapshot, 
            dom: clone, 
            cssRules: this.cssRules,  
            initial,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            scrollTop: document.documentElement.scrollTop,
            scrollLeft: document.documentElement.scrollLeft,
            consoleStatus: this.getRecorder().consoleStatus,
            location: this.getRecorder().getURLDetails()
        })
    }

    checkNodeIsValid =(node:any)=> {
        if(node.className && node.className.indexOf && blacklistedElByClass.filter(d=> node.className.indexOf(d) !== -1).length) {
            this.getRecorder().blacklistedNodes.push(node);
            return false;
        }
        return true;
    }

    convertToAbsolutePath =(path:any)=> {
        if(path==null)
            return 'nopath';
        return new URL(path, window.location.origin).href; 
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
                this.getRecorder().generateEvent({
                    rcid: node.rcid,
                    url,
                    src: this.getBase64Image(node),
                    type: eventTypes.assetLoaded
                })
            })
        }
    }

}