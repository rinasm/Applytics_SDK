export default 'doc ready';

(function(funcName:any, baseObj:any) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [] as any;
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    
    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }
    
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    baseObj[funcName] = function(callback:any, context:any) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete" || (!(document as any).attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else if((document as any).attachEvent) {
                (document as any).attachEvent("onreadystatechange", readyStateChange);
                (document as any).attachEvent("onload", ready);
            } else {
                console.warn('[ARC]: Failed to Trigger Doc ready')
            }
            readyEventHandlersInstalled = true;
        }
    }
  })("docReady", window);