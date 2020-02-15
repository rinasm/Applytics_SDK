/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/SDK/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SDK/ConsoleHandler/ConsoleHandler.ts":
/*!**************************************************!*\
  !*** ./src/SDK/ConsoleHandler/ConsoleHandler.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/Constants */ "./src/SDK/Constants/Constants.ts");

var ConsoleHandler = /** @class */ (function () {
    function ConsoleHandler(args) {
        var _this = this;
        this.trackConsole = function (params, type) {
            var args = [];
            for (var idx = 0; idx < params.length; idx++) {
                args.push(params[idx]);
            }
            _this.getRecorder().generateEvent({
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].console,
                consoleType: type,
                args: args
            });
        };
        this.trackAllConsoleActivity = function () {
            var tempConsole = {};
            var trackConsole = _this.trackConsole;
            for (var idx in _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["consoleTrackList"]) {
                if (typeof console[_Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["consoleTrackList"][idx]] === 'function') {
                    tempConsole[_Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["consoleTrackList"][idx]] = console[_Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["consoleTrackList"][idx]];
                }
            }
            _this.tempConsole = tempConsole;
            var cloneConsole = function (key) {
                if (key === void 0) { key = null; }
                if (key !== null && key in tempConsole) {
                    console[key] = function () {
                        trackConsole(arguments, key);
                        console[key] = Function.prototype.bind.call(tempConsole[key], console);
                        console[key].apply(console, arguments);
                        cloneConsole(key);
                    };
                }
                else if (key === null) {
                    var _loop_1 = function (idx) {
                        console[idx] = function () {
                            trackConsole(arguments, idx);
                            console[idx] = Function.prototype.bind.call(tempConsole[idx], console);
                            console[idx].apply(console, arguments);
                            cloneConsole(idx);
                        };
                    };
                    for (var idx in tempConsole) {
                        _loop_1(idx);
                    }
                }
            };
            cloneConsole();
            window.onerror = function (error, url, line) {
                trackConsole([error, url, line], 'newError');
            };
        };
        this.getRecorder = function () { return args.getRecorder(); };
        if (window.location.host.indexOf('localhost') === -1) {
            this.trackAllConsoleActivity();
        }
    }
    return ConsoleHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (ConsoleHandler);


/***/ }),

/***/ "./src/SDK/Constants/Config.ts":
/*!*************************************!*\
  !*** ./src/SDK/Constants/Config.ts ***!
  \*************************************/
/*! exports provided: recorderConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recorderConfig", function() { return recorderConfig; });
var recorderConfig = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
};


/***/ }),

/***/ "./src/SDK/Constants/Constants.ts":
/*!****************************************!*\
  !*** ./src/SDK/Constants/Constants.ts ***!
  \****************************************/
/*! exports provided: host, eventTypes, commands, blacklistedElByClass, consoleTrackList, blacklistedAttrs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "host", function() { return host; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventTypes", function() { return eventTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commands", function() { return commands; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blacklistedElByClass", function() { return blacklistedElByClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consoleTrackList", function() { return consoleTrackList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blacklistedAttrs", function() { return blacklistedAttrs; });
var host = 'https://test.applytics.in';
var eventTypes = {
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
};
var commands = {
    PASTE: "PASTE",
    COPY: "COPY",
    BOOKMARK: "BOOKMARK",
    SAVE: "SAVE"
};
var blacklistedElByClass = [];
var consoleTrackList = ['info', 'log', 'warn', 'error'];
var blacklistedAttrs = ['srcset'];


/***/ }),

/***/ "./src/SDK/DomParser/DomParser.ts":
/*!****************************************!*\
  !*** ./src/SDK/DomParser/DomParser.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/Constants */ "./src/SDK/Constants/Constants.ts");

var DomParser = /** @class */ (function () {
    function DomParser(args) {
        var _this = this;
        this.cssRules = '';
        this.inputNodeNames = ['TEXTAREA', 'INPUT'];
        this.readImageSrc = false;
        // search for class
        this.recordStyle = function () {
            _this.cssRules = '';
            var rule;
            for (var idx = 0; idx < document.styleSheets.length; idx++) {
                // try {
                //     for(let jdx=0; jdx<(document.styleSheets[idx] as any).rules.length; jdx++) {
                //         rule = (document.styleSheets[idx] as any).rules[jdx].cssText; 
                //         this.cssRules += rule;
                //     }
                // } catch (e) { 
                _this.getRecorder().generateEvent({
                    type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].styleSheetsLoadReq,
                    href: document.styleSheets[idx].href
                });
                // }
            }
        };
        this.getHTML = function (node) {
            var el = {};
            if (node.nodeName === '#text') {
                el.nodeName = node.nodeName;
                el.value = node.nodeValue;
                el.type = 'text';
            }
            else {
                el.tagName = ['BODY'].indexOf(node.tagName) !== -1 ? 'DIV' : node.tagName;
                el.attributes = {};
                el.type = 'element';
                if (node.tagName === 'IFRAME') {
                    el.style = {
                        width: node.clientWidth,
                        height: node.clientHeight,
                    };
                }
                if (node.attributes) {
                    for (var attrIndex = 0; attrIndex < node.attributes.length; attrIndex++) {
                        if (_Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["blacklistedAttrs"].indexOf(node.attributes[attrIndex].localName) === -1) {
                            if (node.attributes[attrIndex].localName === 'src' && node.tagName !== 'IFRAME') {
                                if (_this.readImageSrc) {
                                    el.src = _this.readSrc(node, node.attributes[attrIndex].value);
                                    el.srcURL = _this.convertToAbsolutePath(node.attributes[attrIndex].value);
                                }
                                else {
                                    el.src = _this.convertToAbsolutePath(node.attributes[attrIndex].value);
                                }
                            }
                            else {
                                el.attributes[node.attributes[attrIndex].localName] = node.attributes[attrIndex].value;
                            }
                        }
                    }
                }
                /**
                 *  Event Binding
                 */
                var style_1 = window.getComputedStyle(node);
                if (['', 'X', 'Y'].map(function (d) { return ['scroll', 'auto'].indexOf(style_1['overflow' + d]) !== -1; }).filter(function (d) { return d; }).length) {
                    _this.getRecorder().bindScroll(node);
                }
                if (_this.inputNodeNames.indexOf(node.nodeName) !== -1) {
                    _this.getRecorder().bindOnKeyup(node);
                }
            }
            el.rcid = node.rcid;
            el.childNodes = [];
            if (node.childNodes) {
                node.childNodes.forEach(function (child) {
                    if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'NOSCRIPT' && child.nodeName !== '#comment' && _this.checkNodeIsValid(child)) {
                        el.childNodes.push(_this.getHTML(child));
                    }
                });
            }
            return el;
        };
        this.takeSnapshot = function (node, initial) {
            _this.getRecorder().populateId(node);
            var clone = _this.getHTML(node);
            _this.getRecorder().generateEvent({
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].snapshot,
                dom: clone,
                cssRules: _this.cssRules,
                initial: initial,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                scrollTop: document.documentElement.scrollTop,
                scrollLeft: document.documentElement.scrollLeft,
                consoleStatus: _this.getRecorder().consoleStatus,
                location: _this.getRecorder().getURLDetails()
            });
        };
        this.checkNodeIsValid = function (node) {
            if (node.className && node.className.indexOf && _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["blacklistedElByClass"].filter(function (d) { return node.className.indexOf(d) !== -1; }).length) {
                _this.getRecorder().blacklistedNodes.push(node);
                return false;
            }
            return true;
        };
        this.convertToAbsolutePath = function (path) {
            if (path == null)
                return 'nopath';
            return new URL(path, window.location.origin).href;
        };
        this.readSrc = function (node, url) {
            if (node.complete) {
                return _this.getBase64Image(node);
            }
            else {
                node.addEventListener('load', function () {
                    _this.getRecorder().generateEvent({
                        rcid: node.rcid,
                        url: url,
                        src: _this.getBase64Image(node),
                        type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].assetLoaded
                    });
                });
            }
        };
        this.getRecorder = function () { return args.getRecorder(); };
    }
    DomParser.prototype.getBase64Image = function (img) {
        var dataURL = '';
        try {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            dataURL = canvas.toDataURL("image/png");
        }
        catch (e) {
            return false;
        }
        return dataURL;
    };
    return DomParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (DomParser);


/***/ }),

/***/ "./src/SDK/Helpers/DocReady.ts":
/*!*************************************!*\
  !*** ./src/SDK/Helpers/DocReady.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ('doc ready');
(function (funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
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
        if (document.readyState === "complete") {
            ready();
        }
    }
    baseObj[funcName] = function (callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        if (readyFired) {
            setTimeout(function () { callback(context); }, 1);
            return;
        }
        else {
            readyList.push({ fn: callback, ctx: context });
        }
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        }
        else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            }
            else if (document.attachEvent) {
                document.attachEvent("onreadystatechange", readyStateChange);
                document.attachEvent("onload", ready);
            }
            else {
                console.warn('[ARC]: Failed to Trigger Doc ready');
            }
            readyEventHandlersInstalled = true;
        }
    };
})("docReady", window);


/***/ }),

/***/ "./src/SDK/Helpers/Helpers.ts":
/*!************************************!*\
  !*** ./src/SDK/Helpers/Helpers.ts ***!
  \************************************/
/*! exports provided: generateSID, getSID, loadJS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSID", function() { return generateSID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSID", function() { return getSID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadJS", function() { return loadJS; });
var generateRandomString = function (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var idx = 0; idx < length; idx++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
var generateSID = function () {
    return generateRandomString(4) + '-' + generateRandomString(4) + '-' + generateRandomString(2);
};
var getSID = function () {
    var sid = window.apprc_sid || null;
    if (sid === null) {
        sid = generateSID();
    }
    return sid;
};
function loadJS(file, callback) {
    var jsElm = document.createElement("script");
    jsElm.type = "application/javascript";
    jsElm.src = file;
    jsElm.onload = callback;
    document.body.appendChild(jsElm);
}


/***/ }),

/***/ "./src/SDK/MetaDataHandler/MetaDataHandler.ts":
/*!****************************************************!*\
  !*** ./src/SDK/MetaDataHandler/MetaDataHandler.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/Constants */ "./src/SDK/Constants/Constants.ts");

var MetaDataHandler = /** @class */ (function () {
    function MetaDataHandler(args) {
        var _this = this;
        this.getAllMetaData = function (generateEvent) {
            if (generateEvent === void 0) { generateEvent = true; }
            var event = {
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].browserMeta,
                browser: _this.getBrowser(),
                os: _this.getOS(),
                core: navigator.hardwareConcurrency,
                cookieEnabled: navigator.cookieEnabled,
                language: navigator.language,
                deviceMemory: navigator.deviceMemory,
                isTouchDevice: _this.getIsTouchDevice(),
                referrer: document.referrer,
                appVersion: navigator.appVersion,
                userAgent: navigator.userAgent
            };
            if (generateEvent)
                _this.getRecorder().generateEvent(event);
            return event;
        };
        this.getRecorder = function () { return args.getRecorder(); };
        this.getAllMetaData();
    }
    MetaDataHandler.prototype.getIsTouchDevice = function () {
        return 'ontouchstart' in document.documentElement || (('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    };
    MetaDataHandler.prototype.getBrowser = function () {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge?)\/(\d+)/);
            if (tem != null)
                return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge ');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null)
            M.splice(1, 1, tem[1]);
        return M.join(' ');
    };
    MetaDataHandler.prototype.getOS = function () {
        var userAgent = window.navigator.userAgent, platform = window.navigator.platform, macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'], windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'], iosPlatforms = ['iPhone', 'iPad', 'iPod'], os = null;
        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS';
        }
        else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
        }
        else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
        }
        else if (/Android/.test(userAgent)) {
            os = 'Android';
        }
        else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
        }
        this.getRecorder().os = os;
        return os;
    };
    return MetaDataHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (MetaDataHandler);


/***/ }),

/***/ "./src/SDK/MutationHandler/MutationHandler.ts":
/*!****************************************************!*\
  !*** ./src/SDK/MutationHandler/MutationHandler.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/Constants */ "./src/SDK/Constants/Constants.ts");

var MutationHandler = /** @class */ (function () {
    function MutationHandler(args) {
        var _this = this;
        this.skippedMutations = 0;
        this.handleMutations = function (mutations) {
            var blacklistedNodes = _this.getRecorder().blacklistedNodes;
            mutations.forEach(function (mutation) {
                if (!mutation.target)
                    return;
                for (var idx in blacklistedNodes) {
                    if (blacklistedNodes[idx].contains(mutation.target)) {
                        _this.skippedMutations++;
                        return;
                    }
                }
                switch (mutation.type) {
                    case _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].characterData:
                        _this.handleCharacterDataMutation(mutation);
                        break;
                    case _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].childList:
                        _this.handleChildList(mutation);
                        break;
                    case _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].attributes:
                        _this.handleAttributes(mutation);
                        break;
                    default:
                        break;
                }
            });
        };
        this.handleCharacterDataMutation = function (mutation) {
            _this.getRecorder().generateEvent({
                rcid: mutation.target.rcid,
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].characterData,
                text: mutation.target.data
            });
        };
        this.handleChildList = function (mutation) {
            var removedNodes = [];
            var addedNodes = [];
            for (var idx = 0; idx < mutation.removedNodes.length; idx++) {
                if (mutation.removedNodes[idx].rcid != null) {
                    removedNodes.push(mutation.removedNodes[idx].rcid);
                    _this.getRecorder().unbindFromAllEvent(mutation.removedNodes[idx]);
                }
            }
            for (var idx = 0; idx < mutation.addedNodes.length; idx++) {
                _this.getRecorder().populateId(mutation.addedNodes[idx]);
                addedNodes.push(_this.getRecorder().domParser.getHTML(mutation.addedNodes[idx]));
            }
            _this.getRecorder().generateEvent({
                parent: mutation.target.rcid,
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].childList,
                addedNodes: addedNodes,
                removedNodes: removedNodes,
                nextSibling: mutation.nextSibling ? mutation.nextSibling.rcid : null,
                previousSibling: mutation.previousSibling ? mutation.previousSibling.rcid : null,
            });
        };
        this.handleAttributes = function (mutation) {
            _this.getRecorder().generateEvent({
                rcid: mutation.target.rcid,
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].attributes,
                attributeName: mutation.attributeName,
                attributeValue: mutation.target.getAttribute(mutation.attributeName)
            });
        };
        this.getRecorder = function () { return args.getRecorder(); };
    }
    return MutationHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (MutationHandler);


/***/ }),

/***/ "./src/SDK/Recorder/Recorder.ts":
/*!**************************************!*\
  !*** ./src/SDK/Recorder/Recorder.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/Constants */ "./src/SDK/Constants/Constants.ts");
/* harmony import */ var _Constants_Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Constants/Config */ "./src/SDK/Constants/Config.ts");
/* harmony import */ var _MutationHandler_MutationHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MutationHandler/MutationHandler */ "./src/SDK/MutationHandler/MutationHandler.ts");
/* harmony import */ var _ConsoleHandler_ConsoleHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ConsoleHandler/ConsoleHandler */ "./src/SDK/ConsoleHandler/ConsoleHandler.ts");
/* harmony import */ var _WindowEventHandler_WindowEventHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../WindowEventHandler/WindowEventHandler */ "./src/SDK/WindowEventHandler/WindowEventHandler.ts");
/* harmony import */ var _DomParser_DomParser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DomParser/DomParser */ "./src/SDK/DomParser/DomParser.ts");
/* harmony import */ var _WebRequestHandler_WebRequestHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../WebRequestHandler/WebRequestHandler */ "./src/SDK/WebRequestHandler/WebRequestHandler.ts");
/* harmony import */ var _MetaDataHandler_MetaDataHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../MetaDataHandler/MetaDataHandler */ "./src/SDK/MetaDataHandler/MetaDataHandler.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};








var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var observer;
var currentNodeId = 1;
var data = [];
var dataBuffer = [];
var eventListener = null;
var initialSnapshotSend = false;
window.rcData = [];
var Recorder = /** @class */ (function () {
    function Recorder(args) {
        var _this = this;
        this.mouseMoveThreshold = 33;
        this.lastMouseMoveEventGenerated = window.performance.now();
        this.start = function (node) {
            _this.domParser.recordStyle();
            _this.bindScroll(window);
            _this.bindMouseEvent(document);
            _this.windowEventHandler.checkConsoleStatus(false);
            _this.domParser.takeSnapshot(node, true);
            observer = new MutationObserver(function (mutations) {
                _this.mutaionHandler.handleMutations(mutations);
            });
            observer.observe(node, _Constants_Config__WEBPACK_IMPORTED_MODULE_1__["recorderConfig"]);
            console.log('[ARC] Started Recording');
        };
        /**
         *
         *  Helpers
         *
         */
        this.bindScroll = function (node) {
            if (node.addEventListener) {
                node.isScroll = true;
                node.addEventListener('scroll', _this.handleOnScroll);
            }
        };
        this.bindOnKeyup = function (node) {
            if (node.addEventListener) {
                node.isOnKeyup = true;
                node.addEventListener('keyup', _this.handleOnKeyup);
            }
        };
        this.bindMouseEvent = function (node) {
            node.addEventListener('mousemove', _this.handleMouseMove);
            node.addEventListener('click', _this.handleMouseClick);
        };
        this.unbindFromAllEvent = function (node) {
            if (node.isScroll && node.removeEventListener) {
                node.isScroll = false;
                node.removeEventListener('scroll', _this.handleOnScroll);
            }
            if (node.isOnKeyup && node.removeEventListener) {
                node.isOnKeyup = false;
                node.removeEventListener('keyup', _this.handleOnKeyup);
            }
        };
        this.recursivelyCheckTargetHasClickEvents = function (target) {
            if (target.onclick || target.onmousedown || target.onmouseup || target.onchange ||
                ['INPUT'].indexOf(target.tagName) !== -1) {
                return true;
            }
            else if (target.tagName !== 'BODY' && target.parentNode) {
                return _this.recursivelyCheckTargetHasClickEvents(target.parentNode);
            }
            return false;
        };
        /**
         *  Event Handlers
         */
        this.handleOnScroll = function (event) {
            var node = event.target || event;
            if (!node)
                return;
            var scroll = {};
            if (node.rcid == null) {
                scroll = {
                    scrollTop: node.documentElement.scrollTop,
                    scrollLeft: node.documentElement.scrollLeft,
                    rcid: -1,
                };
            }
            else {
                scroll = {
                    scrollTop: node.scrollTop,
                    scrollLeft: node.scrollLeft,
                    rcid: node.rcid
                };
            }
            scroll.type = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].scroll;
            _this.generateEvent(scroll);
        };
        this.handleOnKeyup = function (event) {
            _this.generateEvent({
                rcid: event.target.rcid,
                value: event.target.value,
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].inputValue
            });
        };
        this.handleMouseMove = function (event) {
            if (window.performance.now() - _this.lastMouseMoveEventGenerated > _this.mouseMoveThreshold) {
                _this.lastMouseMoveEventGenerated = window.performance.now();
                _this.generateEvent({
                    mouseX: event.pageX - document.documentElement.scrollLeft,
                    mouseY: event.pageY - document.documentElement.scrollTop,
                    type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].mouseMove
                });
            }
        };
        this.handleMouseClick = function (event) {
            var target = event && event.target ? event.target : null;
            var isResponsive = target !== null ? _this.recursivelyCheckTargetHasClickEvents(target) : false;
            var isLink = target !== null && target.href ? true : false;
            _this.generateEvent({
                mouseX: event.pageX,
                mouseY: event.pageY,
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].mouseClick,
                isResponsive: isResponsive,
                isLink: isLink
            });
        };
        this.getURLDetails = function () {
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
            };
        };
        /**
         *
         *  Populate Id
         *
         */
        this.populateId = function (node) {
            node.rcid = currentNodeId;
            currentNodeId++;
            if (node.childNodes && node.childNodes) {
                node.childNodes.forEach(function (child) {
                    _this.populateId(child);
                });
            }
        };
        /**
         *  Meta Data
         */
        this.getAllMetaData = function (generateEvent) {
            if (generateEvent === void 0) { generateEvent = true; }
            return _this.metaDataHandler.getAllMetaData(generateEvent);
        };
        /**
         *  The Event Generator
         */
        this.generateEvent = function (action) {
            var event = {
                time: parseFloat(performance.now().toFixed(4))
            };
            event = __assign(__assign({}, event), action);
            if (!initialSnapshotSend && event.initial) {
                initialSnapshotSend = true;
                setTimeout(function () {
                    if (dataBuffer.length && initialSnapshotSend) {
                        for (var idx in dataBuffer) {
                            _this.generateEvent(dataBuffer[idx]);
                        }
                        dataBuffer = [];
                    }
                }, 1);
            }
            if (initialSnapshotSend) {
                data.push(event);
                _this.publishLiveUpdate(event);
            }
            else if ([_Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].attributes, _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].characterData, _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].childList].indexOf(event.type) === -1) {
                dataBuffer.push(event);
            }
        };
        this.publishLiveUpdate = function (event) {
            if (eventListener) {
                var msg = _this.wrapEvent(event);
                window.rcData.push(msg);
                eventListener(msg, data);
            }
        };
        this.getLiveUpdate = function (listener) {
            if (typeof listener === 'function') {
                eventListener = listener;
                if (data.length) {
                    var msg = _this.wrapEvent(data[data.length - 1]);
                    eventListener(msg, data);
                }
            }
        };
        this.wrapEvent = function (data) {
            return data;
        };
        this.cid = args.cid;
        this.sid = args.sid;
        this.aid = args.aid;
        this.blacklistedNodes = [];
        this.domParser = new _DomParser_DomParser__WEBPACK_IMPORTED_MODULE_5__["default"]({ getRecorder: function () { return _this; } });
        this.consoleHandler = new _ConsoleHandler_ConsoleHandler__WEBPACK_IMPORTED_MODULE_3__["default"]({ getRecorder: function () { return _this; } });
        this.mutaionHandler = new _MutationHandler_MutationHandler__WEBPACK_IMPORTED_MODULE_2__["default"]({ getRecorder: function () { return _this; } });
        this.windowEventHandler = new _WindowEventHandler_WindowEventHandler__WEBPACK_IMPORTED_MODULE_4__["default"]({ getRecorder: function () { return _this; } });
        this.webRequestHandler = new _WebRequestHandler_WebRequestHandler__WEBPACK_IMPORTED_MODULE_6__["default"]({ getRecorder: function () { return _this; } });
        this.metaDataHandler = new _MetaDataHandler_MetaDataHandler__WEBPACK_IMPORTED_MODULE_7__["default"]({ getRecorder: function () { return _this; } });
        console.log('[ARC] Recorder Initiated. V 0.2.2');
    }
    return Recorder;
}());
/* harmony default export */ __webpack_exports__["default"] = (Recorder);


/***/ }),

/***/ "./src/SDK/RecorderHandler/RecorderHandler.ts":
/*!****************************************************!*\
  !*** ./src/SDK/RecorderHandler/RecorderHandler.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Helpers_DocReady__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helpers/DocReady */ "./src/SDK/Helpers/DocReady.ts");
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers/Helpers */ "./src/SDK/Helpers/Helpers.ts");
/* harmony import */ var _Recorder_Recorder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Recorder/Recorder */ "./src/SDK/Recorder/Recorder.ts");
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Constants/Constants */ "./src/SDK/Constants/Constants.ts");




var RecorderHandler = /** @class */ (function () {
    function RecorderHandler(args) {
        var _this = this;
        this.rcDataBuffer = [];
        this.recorderData = [];
        this.recorder = null;
        this.initiated = false;
        this.packetIndex = 0;
        this.onDisconnect = function () {
            _this.initiated = false;
        };
        this.onConnect = function () {
            console.log('[ARC] Connected to Socket');
            _this.initiated = true;
            /**
             *  Sending Session Meta
             */
            var sessionMetaData = _this.getSessionMeta();
            _this.socket.emit('sessionReciver', sessionMetaData);
            /**
             *  Sending Buffered Data
             */
            for (var idx in _this.recorderData) {
                _this.sendToServer(_this.recorderData[idx]);
            }
            _this.recorderData = [];
            /**
             *  Initiating Sender
             */
            _this.socketInter = setInterval(function () {
                if (_this.rcDataBuffer && _this.rcDataBuffer.length) {
                    console.log('[ARC] Sending Data', _this.rcDataBuffer.length);
                    var packet = {
                        sid: _this.sid,
                        cid: _this.cid,
                        aid: _this.aid,
                        pid: _this.getPID(),
                        index: _this.packetIndex,
                        type: 'event',
                        timestamp: Date.now(),
                        data: _this.rcDataBuffer
                    };
                    _this.packetIndex += 1;
                    if (window.ARCDev || true) {
                        var size = JSON.stringify(packet).length * 2;
                        console.log('[ARC] Packet size', size, 'Bytes, ', Math.ceil(size / 1024), 'kb');
                    }
                    _this.socket.emit('sessionReciver', packet);
                    _this.rcDataBuffer = [];
                }
            }, 1000);
        };
        this.getPID = function () { return Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__["generateSID"])(); };
        this.sendToServer = function (event) {
            if (!_this.initiated)
                return;
            _this.rcDataBuffer.push(event);
        };
        this.onRecorderUpdater = function (event) {
            _this.recorderData.push(event);
            _this.sendToServer(event);
        };
        this.getSessionMeta = function () {
            if (!_this.recorder) {
                console.error('[ARC] FATAL ERR: Recorder not Found');
                return;
            }
            var meta = _this.recorder.getAllMetaData(false);
            return {
                sid: _this.sid,
                cid: _this.cid,
                aid: _this.aid,
                type: 'session',
                deviceType: 'desktop',
                createdAt: Date.now(),
                metaData: {
                    browserName: meta.browser,
                    os: meta.os,
                    cpuCore: meta.core,
                    deviceMemory: meta.deviceMemory,
                    screenType: meta.isTouchDevice,
                    language: meta.language,
                    cookieEnabled: meta.cookieEnabled,
                    referrer: meta.referrer,
                    browserVersion: meta.browser,
                    osVersion: meta.os,
                    userAgent: navigator.userAgent
                },
            };
        };
        this.sid = Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__["getSID"])();
        this.aid = args.appId;
        this.cid = args.clientId;
        console.log('[ARC] Waiting for document ready state');
        window.docReady(function () {
            Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__["loadJS"])('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js', function () {
                console.log('[ARC] Socket loaded');
                _this.recorderData = [];
                _this.recorder = new _Recorder_Recorder__WEBPACK_IMPORTED_MODULE_2__["default"]({
                    sid: _this.sid,
                    cid: _this.cid,
                    aid: _this.aid
                });
                _this.recorder.getLiveUpdate(_this.onRecorderUpdater);
                _this.recorder.start(document.body);
                var io = window.io;
                _this.socket = io.connect(_Constants_Constants__WEBPACK_IMPORTED_MODULE_3__["host"], { transports: ['websocket', 'polling'] });
                _this.socket.once('connect', _this.onConnect);
                _this.socket.once('reconnect', _this.onConnect);
                _this.socket.once('disconnect', _this.onDisconnect);
            });
        }, window);
    }
    return RecorderHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (RecorderHandler);


/***/ }),

/***/ "./src/SDK/WebRequestHandler/WebRequestHandler.ts":
/*!********************************************************!*\
  !*** ./src/SDK/WebRequestHandler/WebRequestHandler.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/Constants */ "./src/SDK/Constants/Constants.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var WebRequestHandler = /** @class */ (function () {
    function WebRequestHandler(args) {
        var _this = this;
        this.trackXMLReq = function (args) {
            _this.getRecorder().generateEvent(__assign({ type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].xmlHttpReq }, args));
        };
        this.getRecorder = function () { return args.getRecorder(); };
        var trackXMLReq = this.trackXMLReq;
        /**
         *  xmlHttpReq
         */
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url, async) {
            var req = this;
            this.onprogress = function (d) {
                if (req.readyState === 3) {
                    trackXMLReq({
                        status: req.status,
                        method: method,
                        url: url,
                        async: async
                    });
                }
            };
            open.call(this, method, url, async);
        };
        /**
         *  Fetch
         */
        function handleFetch(promise, url, params) {
            return __awaiter(this, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, promise];
                        case 1:
                            resp = _a.sent();
                            trackXMLReq({
                                status: resp.status,
                                url: url,
                                method: params.method || 'GET',
                                async: false
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
        window.__fetch__ = window.fetch;
        window.fetch = function (url, params) {
            var req = window.__fetch__(url, params);
            handleFetch(req.then(), url, params);
            return req;
        };
    }
    return WebRequestHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (WebRequestHandler);


/***/ }),

/***/ "./src/SDK/WindowEventHandler/WindowEventHandler.ts":
/*!**********************************************************!*\
  !*** ./src/SDK/WindowEventHandler/WindowEventHandler.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/Constants */ "./src/SDK/Constants/Constants.ts");

var WindowEventHandler = /** @class */ (function () {
    function WindowEventHandler(args) {
        var _this = this;
        this.ctrlKeyStatus = false;
        this.trackWindowResize = function () {
            window.addEventListener('resize', function () {
                clearTimeout(_this.resizeDebounce);
                _this.resizeDebounce = setTimeout(function () {
                    _this.getRecorder().generateEvent({
                        type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].windowResize,
                        screenWidth: window.innerWidth,
                        screenHeight: window.innerHeight,
                        scrollTop: document.documentElement.scrollTop,
                        scrollLeft: document.documentElement.scrollLeft,
                    });
                    _this.checkConsoleStatus(true);
                }, 400);
            });
        };
        this.checkConsoleStatus = function (generateEvent) {
            if (generateEvent === void 0) { generateEvent = false; }
            var devtools = function () { };
            devtools.toString = function () { this.opened = true; };
            console.log('%c', devtools);
            var prevStatus = _this.getRecorder().consoleStatus || false;
            var currentStatus = devtools.opened &&
                ((window.outerHeight - window.innerHeight > 150) ||
                    (window.outerWidth - window.innerWidth > 150));
            if (prevStatus !== currentStatus) {
                _this.getRecorder().consoleStatus = currentStatus;
                if (generateEvent) {
                    _this.getRecorder().generateEvent({
                        type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].consoleStatusChanged,
                        consoleStatus: _this.getRecorder().consoleStatus,
                    });
                }
                return true;
            }
            return false;
        };
        this.trackHashChange = function () {
            window.onhashchange = function () {
                var event = _this.getRecorder().getURLDetails();
                event.type = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].hashChanged;
                _this.getRecorder().generateEvent(event);
            };
        };
        this.getRecorder = function () { return args.getRecorder(); };
        var trackWindowCommand = function (e) {
            var code = (document.all) ? window.event.keyCode : e.which;
            var cmd = null;
            if (_this.ctrlKeyStatus && code === 86) {
                cmd = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["commands"].PASTE;
            }
            else if (_this.ctrlKeyStatus && code === 67) {
                cmd = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["commands"].COPY;
            }
            else if (_this.ctrlKeyStatus && code === 83) {
                cmd = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["commands"].SAVE;
            }
            else if (_this.ctrlKeyStatus && code === 68) {
                cmd = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["commands"].BOOKMARK;
            }
            if (cmd !== null) {
                _this.getRecorder().generateEvent({
                    type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].commandExecuted,
                    cmd: cmd
                });
            }
        };
        var trackCtrl = function (e, isKeyDown) {
            var code = e.keyCode || e.which;
            var isMac = (_this.getRecorder().os || '').toLocaleLowerCase().indexOf('mac') !== -1;
            if ((code === 91 && isMac) || (!isMac && code === 17)) {
                _this.ctrlKeyStatus = isKeyDown;
            }
        };
        document.addEventListener('keydown', function (e) { return trackCtrl(e, true); }, false);
        document.addEventListener('keyup', function (e) { return trackCtrl(e, false); }, false);
        document.addEventListener('keydown', trackWindowCommand, false);
        this.trackWindowResize();
        this.trackHashChange();
    }
    return WindowEventHandler;
}());
/* harmony default export */ __webpack_exports__["default"] = (WindowEventHandler);


/***/ }),

/***/ "./src/SDK/index.ts":
/*!**************************!*\
  !*** ./src/SDK/index.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RecorderHandler_RecorderHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RecorderHandler/RecorderHandler */ "./src/SDK/RecorderHandler/RecorderHandler.ts");

var startARC = function (clientId, appId) {
    console.log('[ARC] Recorder Handler Initiated, Client ID', clientId, 'App ID', appId);
    new _RecorderHandler_RecorderHandler__WEBPACK_IMPORTED_MODULE_0__["default"]({ clientId: clientId, appId: appId });
};
window.startARC = startARC;
/* harmony default export */ __webpack_exports__["default"] = (startARC);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zb2xlSGFuZGxlci9Db25zb2xlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0NvbnN0YW50cy9Db25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zdGFudHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvRG9tUGFyc2VyL0RvbVBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0hlbHBlcnMvRG9jUmVhZHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9IZWxwZXJzL0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9NZXRhRGF0YUhhbmRsZXIvTWV0YURhdGFIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvTXV0YXRpb25IYW5kbGVyL011dGF0aW9uSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL1JlY29yZGVyL1JlY29yZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvUmVjb3JkZXJIYW5kbGVyL1JlY29yZGVySGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL1dlYlJlcXVlc3RIYW5kbGVyL1dlYlJlcXVlc3RIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvV2luZG93RXZlbnRIYW5kbGVyL1dpbmRvd0V2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7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R2hFLElBQU0sUUFBUSxHQUFDLFVBQUMsUUFBZSxFQUFFLEtBQVk7SUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztJQUNyRixJQUFJLHdFQUFlLENBQUMsRUFBQyxRQUFRLFlBQUUsS0FBSyxTQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUEsTUFBYyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFHckIsdUVBQVEsRUFBQyIsImZpbGUiOiJhcHBseXRpY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9TREsvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBjb25zb2xlVHJhY2tMaXN0XG59IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlSGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG4gICAgdGVtcENvbnNvbGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICAgICAgaWYod2luZG93LmxvY2F0aW9uLmhvc3QuaW5kZXhPZignbG9jYWxob3N0JykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrQWxsQ29uc29sZUFjdGl2aXR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHRyYWNrQ29uc29sZSA9KHBhcmFtczphbnksIHR5cGU6YW55KT0+IHtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpZHg9MDsgaWR4IDwgcGFyYW1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbXNbaWR4XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jb25zb2xlLFxuICAgICAgICAgICAgY29uc29sZVR5cGU6IHR5cGUsXG4gICAgICAgICAgICBhcmdzXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdHJhY2tBbGxDb25zb2xlQWN0aXZpdHkgPSgpPT4geyBcbiAgICAgICAgbGV0IHRlbXBDb25zb2xlID0ge307XG4gICAgICAgIGNvbnN0IHRyYWNrQ29uc29sZSA9IHRoaXMudHJhY2tDb25zb2xlO1xuICAgICAgICBmb3IgKGxldCBpZHggaW4gY29uc29sZVRyYWNrTGlzdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoY29uc29sZSBhcyBhbnkpW2NvbnNvbGVUcmFja0xpc3RbaWR4XV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAodGVtcENvbnNvbGUgYXMgYW55KVtjb25zb2xlVHJhY2tMaXN0W2lkeF1dID0gKGNvbnNvbGUgYXMgYW55KVtjb25zb2xlVHJhY2tMaXN0W2lkeF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICB0aGlzLnRlbXBDb25zb2xlID0gdGVtcENvbnNvbGU7XG4gICAgICAgIGNvbnN0IGNsb25lQ29uc29sZSA9IGZ1bmN0aW9uIChrZXk6YW55ID0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gbnVsbCAmJiBrZXkgaW4gdGVtcENvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICAoY29uc29sZSBhcyBhbnkpW2tleV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrQ29uc29sZShhcmd1bWVudHMsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIChjb25zb2xlICBhcyBhbnkpW2tleV0gPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKCh0ZW1wQ29uc29sZSAgYXMgYW55KVtrZXldLCBjb25zb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgIGFzIGFueSlba2V5XS5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvbnNvbGUoa2V5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZHggaW4gdGVtcENvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgIGFzIGFueSlbaWR4XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrQ29uc29sZShhcmd1bWVudHMsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoY29uc29sZSAgYXMgYW55KVtpZHhdID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbCgodGVtcENvbnNvbGUgIGFzIGFueSlbaWR4XSwgY29uc29sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoY29uc29sZSAgYXMgYW55KVtpZHhdLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZUNvbnNvbGUoaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2xvbmVDb25zb2xlKCk7XG4gICAgICAgIHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oZXJyb3IsIHVybCwgbGluZSkge1xuICAgICAgICAgICAgdHJhY2tDb25zb2xlKFtlcnJvciwgdXJsLCBsaW5lXSwgJ25ld0Vycm9yJyk7XG4gICAgICAgIH07IFxuICAgIH1cblxufSIsImV4cG9ydCBjb25zdCByZWNvcmRlckNvbmZpZyA9IHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsICBcbn0iLCJleHBvcnQgY29uc3QgaG9zdCA9ICdodHRwczovL3Rlc3QuYXBwbHl0aWNzLmluJztcbmV4cG9ydCBjb25zdCBldmVudFR5cGVzID0ge1xuICAgIHNuYXBzaG90OiAnc25hcHNob3QnLFxuICAgIGNoYXJhY3RlckRhdGE6ICdjaGFyYWN0ZXJEYXRhJyxcbiAgICBjaGlsZExpc3Q6ICdjaGlsZExpc3QnLFxuICAgIGF0dHJpYnV0ZXM6ICdhdHRyaWJ1dGVzJyxcbiAgICBzY3JvbGw6ICdzY3JvbGwnLFxuICAgIGlucHV0VmFsdWU6ICdpbnB1dFZhbHVlJyxcbiAgICBtb3VzZUNsaWNrOiAnbW91c2VDbGljaycsXG4gICAgbW91c2VNb3ZlOiAnbW91c2VNb3ZlJyxcbiAgICBhc3NldExvYWRlZDogJ2Fzc2V0TG9hZGVkJyxcbiAgICBzdHlsZVNoZWV0c0xvYWRSZXE6ICdzdHlsZVNoZWV0c0xvYWRSZXEnLFxuICAgIHhtbEh0dHBSZXE6ICd4bWxIdHRwUmVxJyxcbiAgICBjb25zb2xlOiAnY29uc29sZScsXG4gICAgYnJvd3Nlck1ldGE6ICdicm93c2VyTWV0YScsXG4gICAgd2luZG93UmVzaXplOiAnd2luZG93UmVzaXplJyxcbiAgICBjb25zb2xlU3RhdHVzQ2hhbmdlZDogJ2NvbnNvbGVTdGF0dXNDaGFuZ2VkJyxcbiAgICBjb21tYW5kRXhlY3V0ZWQ6ICdjb21tYW5kRXhlY3V0ZWQnLFxuICAgIGhhc2hDaGFuZ2VkOiAnaGFzaENoYW5nZWQnXG59XG5leHBvcnQgY29uc3QgY29tbWFuZHMgPSB7XG4gICAgUEFTVEU6IFwiUEFTVEVcIixcbiAgICBDT1BZOiBcIkNPUFlcIixcbiAgICBCT09LTUFSSzogXCJCT09LTUFSS1wiLFxuICAgIFNBVkU6IFwiU0FWRVwiXG59XG5cbmV4cG9ydCBjb25zdCBibGFja2xpc3RlZEVsQnlDbGFzczogQXJyYXk8U3RyaW5nPiA9IFtdO1xuZXhwb3J0IGNvbnN0IGNvbnNvbGVUcmFja0xpc3Q6IEFycmF5PGFueT4gPSBbJ2luZm8nLCAnbG9nJywgJ3dhcm4nLCAnZXJyb3InXVxuZXhwb3J0IGNvbnN0IGJsYWNrbGlzdGVkQXR0cnM6IEFycmF5PFN0cmluZz4gPSBbJ3NyY3NldCddXG4iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBibGFja2xpc3RlZEVsQnlDbGFzcyxcbiAgICBibGFja2xpc3RlZEF0dHJzXG59IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuIFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tUGFyc2VyIHtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcbiAgICBjc3NSdWxlczogU3RyaW5nID0gJyc7IFxuICAgIGlucHV0Tm9kZU5hbWVzOiBBcnJheTxTdHJpbmc+ID0gWydURVhUQVJFQScsICdJTlBVVCddOyBcbiAgICByZWFkSW1hZ2VTcmM6IEJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIHNlYXJjaCBmb3IgY2xhc3NcblxuICAgIHJlY29yZFN0eWxlID0oKT0+IHtcbiAgICAgICAgdGhpcy5jc3NSdWxlcyA9ICcnO1xuICAgICAgICBsZXQgcnVsZTogc3RyaW5nO1xuICAgICAgICBmb3IobGV0IGlkeD0wOyBpZHg8ZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgLy8gdHJ5IHtcbiAgICAgICAgICAgIC8vICAgICBmb3IobGV0IGpkeD0wOyBqZHg8KGRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0gYXMgYW55KS5ydWxlcy5sZW5ndGg7IGpkeCsrKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJ1bGUgPSAoZG9jdW1lbnQuc3R5bGVTaGVldHNbaWR4XSBhcyBhbnkpLnJ1bGVzW2pkeF0uY3NzVGV4dDsgXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuY3NzUnVsZXMgKz0gcnVsZTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9IGNhdGNoIChlKSB7IFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5zdHlsZVNoZWV0c0xvYWRSZXEsXG4gICAgICAgICAgICAgICAgICAgIGhyZWY6IGRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0uaHJlZlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuICAgIH1cblxuICAgIGdldEhUTUwgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGxldCBlbDphbnkgPSB7fTtcblxuICAgICAgICBpZihub2RlLm5vZGVOYW1lID09PSAnI3RleHQnKSB7XG4gICAgICAgICAgICBlbC5ub2RlTmFtZSA9IG5vZGUubm9kZU5hbWU7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgZWwudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLnRhZ05hbWUgPSBbJ0JPRFknXS5pbmRleE9mKG5vZGUudGFnTmFtZSkgIT09IC0xID8gJ0RJVicgOiBub2RlLnRhZ05hbWU7XG4gICAgICAgICAgICBlbC5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgICAgICBlbC50eXBlID0gJ2VsZW1lbnQnO1xuICAgICAgICAgICAgaWYobm9kZS50YWdOYW1lID09PSAnSUZSQU1FJykge1xuICAgICAgICAgICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogbm9kZS5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBub2RlLmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihub2RlLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGF0dHJJbmRleD0wOyBhdHRySW5kZXg8bm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDsgYXR0ckluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoYmxhY2tsaXN0ZWRBdHRycy5pbmRleE9mKG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLmxvY2FsTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS5sb2NhbE5hbWUgPT09ICdzcmMnICYmIG5vZGUudGFnTmFtZSAhPT0gJ0lGUkFNRScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWRJbWFnZVNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zcmMgPSB0aGlzLnJlYWRTcmMobm9kZSwgbm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zcmNVUkwgPSB0aGlzLmNvbnZlcnRUb0Fic29sdXRlUGF0aChub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3JjID0gdGhpcy5jb252ZXJ0VG9BYnNvbHV0ZVBhdGgobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuYXR0cmlidXRlc1tub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS5sb2NhbE5hbWVdID0gbm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqICBFdmVudCBCaW5kaW5nXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYoWycnLCAnWCcsICdZJ10ubWFwKGQ9Plsnc2Nyb2xsJywgJ2F1dG8nXS5pbmRleE9mKChzdHlsZSBhcyBhbnkpWydvdmVyZmxvdycrZF0pICE9PSAtMSkuZmlsdGVyKGQ9PmQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5iaW5kU2Nyb2xsKG5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmlucHV0Tm9kZU5hbWVzLmluZGV4T2Yobm9kZS5ub2RlTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmJpbmRPbktleXVwKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLnJjaWQgPSBub2RlLnJjaWQ7XG4gICAgICAgIGVsLmNoaWxkTm9kZXMgPSBbXVxuICAgICAgICBpZihub2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGUuY2hpbGROb2Rlcy5mb3JFYWNoKChjaGlsZDphbnkpPT4ge1xuICAgICAgICAgICAgICAgIGlmKGNoaWxkLm5vZGVOYW1lICE9PSAnU0NSSVBUJyAmJiBjaGlsZC5ub2RlTmFtZSAhPT0gJ05PU0NSSVBUJyAmJiBjaGlsZC5ub2RlTmFtZSAhPT0gJyNjb21tZW50JyAmJiB0aGlzLmNoZWNrTm9kZUlzVmFsaWQoY2hpbGQpKSAge1xuICAgICAgICAgICAgICAgICAgICBlbC5jaGlsZE5vZGVzLnB1c2godGhpcy5nZXRIVE1MKGNoaWxkKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cbiAgICB0YWtlU25hcHNob3QgPShub2RlOmFueSwgaW5pdGlhbDphbnkpPT4ge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkucG9wdWxhdGVJZChub2RlKTtcbiAgICAgICAgbGV0IGNsb25lID0gdGhpcy5nZXRIVE1MKG5vZGUpO1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLnNuYXBzaG90LCBcbiAgICAgICAgICAgIGRvbTogY2xvbmUsIFxuICAgICAgICAgICAgY3NzUnVsZXM6IHRoaXMuY3NzUnVsZXMsICBcbiAgICAgICAgICAgIGluaXRpYWwsXG4gICAgICAgICAgICBzY3JlZW5XaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIHNjcm9sbFRvcDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIHNjcm9sbExlZnQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgY29uc29sZVN0YXR1czogdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMsXG4gICAgICAgICAgICBsb2NhdGlvbjogdGhpcy5nZXRSZWNvcmRlcigpLmdldFVSTERldGFpbHMoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrTm9kZUlzVmFsaWQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuY2xhc3NOYW1lICYmIG5vZGUuY2xhc3NOYW1lLmluZGV4T2YgJiYgYmxhY2tsaXN0ZWRFbEJ5Q2xhc3MuZmlsdGVyKGQ9PiBub2RlLmNsYXNzTmFtZS5pbmRleE9mKGQpICE9PSAtMSkubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuYmxhY2tsaXN0ZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnZlcnRUb0Fic29sdXRlUGF0aCA9KHBhdGg6YW55KT0+IHtcbiAgICAgICAgaWYocGF0aD09bnVsbClcbiAgICAgICAgICAgIHJldHVybiAnbm9wYXRoJztcbiAgICAgICAgcmV0dXJuIG5ldyBVUkwocGF0aCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbikuaHJlZjsgXG4gICAgfVxuXG5cbiAgICBnZXRCYXNlNjRJbWFnZShpbWc6YW55KSB7XG4gICAgICAgIGxldCBkYXRhVVJMID0gJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgdmFyIGN0eDphbnkgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG4gICAgICAgICAgICBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBkYXRhVVJMO1xuICAgIH1cblxuICAgIHJlYWRTcmMgPShub2RlOmFueSwgdXJsOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJhc2U2NEltYWdlKG5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICByY2lkOiBub2RlLnJjaWQsXG4gICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgc3JjOiB0aGlzLmdldEJhc2U2NEltYWdlKG5vZGUpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmFzc2V0TG9hZGVkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCAnZG9jIHJlYWR5JztcblxuKGZ1bmN0aW9uKGZ1bmNOYW1lOmFueSwgYmFzZU9iajphbnkpIHtcbiAgICBmdW5jTmFtZSA9IGZ1bmNOYW1lIHx8IFwiZG9jUmVhZHlcIjtcbiAgICBiYXNlT2JqID0gYmFzZU9iaiB8fCB3aW5kb3c7XG4gICAgdmFyIHJlYWR5TGlzdCA9IFtdIGFzIGFueTtcbiAgICB2YXIgcmVhZHlGaXJlZCA9IGZhbHNlO1xuICAgIHZhciByZWFkeUV2ZW50SGFuZGxlcnNJbnN0YWxsZWQgPSBmYWxzZTtcbiAgICBcbiAgICBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgICAgaWYgKCFyZWFkeUZpcmVkKSB7XG4gICAgICAgICAgICByZWFkeUZpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVhZHlMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVhZHlMaXN0W2ldLmZuLmNhbGwod2luZG93LCByZWFkeUxpc3RbaV0uY3R4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlYWR5TGlzdCA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlYWR5U3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiICkge1xuICAgICAgICAgICAgcmVhZHkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBiYXNlT2JqW2Z1bmNOYW1lXSA9IGZ1bmN0aW9uKGNhbGxiYWNrOmFueSwgY29udGV4dDphbnkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FsbGJhY2sgZm9yIGRvY1JlYWR5KGZuKSBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlYWR5RmlyZWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7Y2FsbGJhY2soY29udGV4dCk7fSwgMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWFkeUxpc3QucHVzaCh7Zm46IGNhbGxiYWNrLCBjdHg6IGNvbnRleHR9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8ICghKGRvY3VtZW50IGFzIGFueSkuYXR0YWNoRXZlbnQgJiYgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChyZWFkeSwgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlYWR5RXZlbnRIYW5kbGVyc0luc3RhbGxlZCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCByZWFkeSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCByZWFkeSwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKChkb2N1bWVudCBhcyBhbnkpLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgKGRvY3VtZW50IGFzIGFueSkuYXR0YWNoRXZlbnQoXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiwgcmVhZHlTdGF0ZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgKGRvY3VtZW50IGFzIGFueSkuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIiwgcmVhZHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1tBUkNdOiBGYWlsZWQgdG8gVHJpZ2dlciBEb2MgcmVhZHknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVhZHlFdmVudEhhbmRsZXJzSW5zdGFsbGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfSkoXCJkb2NSZWFkeVwiLCB3aW5kb3cpOyIsImNvbnN0IGdlbmVyYXRlUmFuZG9tU3RyaW5nID0obGVuZ3RoOiBOdW1iZXIpPT4ge1xuICAgIGxldCByZXN1bHQgICAgICAgICAgID0gJyc7XG4gICAgbGV0IGNoYXJhY3RlcnMgICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGxldCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKyApIHtcbiAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTSUQgPSgpPT4ge1xuICAgIHJldHVybiBnZW5lcmF0ZVJhbmRvbVN0cmluZyg0KSArICctJyArIGdlbmVyYXRlUmFuZG9tU3RyaW5nKDQpICsgJy0nICsgZ2VuZXJhdGVSYW5kb21TdHJpbmcoMik7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRTSUQgPSgpPT4ge1xuICAgIGxldCBzaWQgPSAod2luZG93IGFzIGFueSkuYXBwcmNfc2lkIHx8IG51bGw7XG4gICAgaWYoc2lkID09PSBudWxsKSB7XG4gICAgICAgIHNpZCA9IGdlbmVyYXRlU0lEKClcbiAgICB9XG4gICAgcmV0dXJuIHNpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRKUyhmaWxlOmFueSwgY2FsbGJhY2s6YW55KSB7XG4gICAgdmFyIGpzRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBqc0VsbS50eXBlID0gXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCI7XG4gICAganNFbG0uc3JjID0gZmlsZTtcbiAgICBqc0VsbS5vbmxvYWQgPSBjYWxsYmFjaztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGpzRWxtKTtcbn1cbiIsImltcG9ydCB7IGV2ZW50VHlwZXMgfSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0YURhdGFIYW5kbGVyIHtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICAgICAgdGhpcy5nZXRBbGxNZXRhRGF0YSgpO1xuICAgIH1cblxuICAgIGdldEFsbE1ldGFEYXRhID0oZ2VuZXJhdGVFdmVudD10cnVlKT0+IHtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5icm93c2VyTWV0YSxcbiAgICAgICAgICAgIGJyb3dzZXI6IHRoaXMuZ2V0QnJvd3NlcigpLFxuICAgICAgICAgICAgb3M6IHRoaXMuZ2V0T1MoKSxcbiAgICAgICAgICAgIGNvcmU6IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5LFxuICAgICAgICAgICAgY29va2llRW5hYmxlZDogbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQsXG4gICAgICAgICAgICBsYW5ndWFnZTogbmF2aWdhdG9yLmxhbmd1YWdlLFxuICAgICAgICAgICAgZGV2aWNlTWVtb3J5OiAobmF2aWdhdG9yIGFzIGFueSkuZGV2aWNlTWVtb3J5LFxuICAgICAgICAgICAgaXNUb3VjaERldmljZTogdGhpcy5nZXRJc1RvdWNoRGV2aWNlKCksXG4gICAgICAgICAgICByZWZlcnJlcjpkb2N1bWVudC5yZWZlcnJlcixcbiAgICAgICAgICAgIGFwcFZlcnNpb246IG5hdmlnYXRvci5hcHBWZXJzaW9uLFxuICAgICAgICAgICAgdXNlckFnZW50OiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgICAgIH07XG4gICAgICAgIGlmKGdlbmVyYXRlRXZlbnQpXG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudChldmVudClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG5cbiAgICBnZXRJc1RvdWNoRGV2aWNlKCkge1xuICAgICAgICByZXR1cm4gICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCAoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdylcbiAgICAgICAgICAgIHx8IChuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKVxuICAgICAgICAgICAgfHwgKG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCkpXG4gICAgfVxuXG4gICAgZ2V0QnJvd3Nlcigpe1xuICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LCB0ZW0sXG4gICAgICAgIE09IHVhLm1hdGNoKC8ob3BlcmF8Y2hyb21lfHNhZmFyaXxmaXJlZm94fG1zaWV8dHJpZGVudCg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHwgW107XG4gICAgICAgIGlmKC90cmlkZW50L2kudGVzdChNWzFdKSl7XG4gICAgICAgICAgICB0ZW09ICAvXFxicnZbIDpdKyhcXGQrKS9nLmV4ZWModWEpIHx8IFtdO1xuICAgICAgICAgICAgcmV0dXJuICdJRSAnKyh0ZW1bMV0gfHwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGlmKE1bMV09PT0gJ0Nocm9tZScpe1xuICAgICAgICAgICAgdGVtPSB1YS5tYXRjaCgvXFxiKE9QUnxFZGdlPylcXC8oXFxkKykvKTtcbiAgICAgICAgICAgIGlmKHRlbSE9IG51bGwpIHJldHVybiB0ZW0uc2xpY2UoMSkuam9pbignICcpLnJlcGxhY2UoJ09QUicsICdPcGVyYScpLnJlcGxhY2UoJ0VkZyAnLCAnRWRnZSAnKTtcbiAgICAgICAgfVxuICAgICAgICBNPSBNWzJdPyBbTVsxXSwgTVsyXV06IFtuYXZpZ2F0b3IuYXBwTmFtZSwgbmF2aWdhdG9yLmFwcFZlcnNpb24sICctPyddO1xuICAgICAgICBpZigodGVtPSB1YS5tYXRjaCgvdmVyc2lvblxcLyhcXGQrKS9pKSkhPSBudWxsKSBNLnNwbGljZSgxLCAxLCB0ZW1bMV0pO1xuICAgICAgICByZXR1cm4gTS5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgZ2V0T1MoKSB7XG4gICAgICAgIHZhciB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAgIHBsYXRmb3JtID0gd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSxcbiAgICAgICAgICAgIG1hY29zUGxhdGZvcm1zID0gWydNYWNpbnRvc2gnLCAnTWFjSW50ZWwnLCAnTWFjUFBDJywgJ01hYzY4SyddLFxuICAgICAgICAgICAgd2luZG93c1BsYXRmb3JtcyA9IFsnV2luMzInLCAnV2luNjQnLCAnV2luZG93cycsICdXaW5DRSddLFxuICAgICAgICAgICAgaW9zUGxhdGZvcm1zID0gWydpUGhvbmUnLCAnaVBhZCcsICdpUG9kJ10sXG4gICAgICAgICAgICBvcyA9IG51bGw7XG4gICAgICBcbiAgICAgICAgaWYgKG1hY29zUGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0pICE9PSAtMSkge1xuICAgICAgICAgIG9zID0gJ01hYyBPUyc7XG4gICAgICAgIH0gZWxzZSBpZiAoaW9zUGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0pICE9PSAtMSkge1xuICAgICAgICAgIG9zID0gJ2lPUyc7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93c1BsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcyA9ICdXaW5kb3dzJztcbiAgICAgICAgfSBlbHNlIGlmICgvQW5kcm9pZC8udGVzdCh1c2VyQWdlbnQpKSB7XG4gICAgICAgICAgb3MgPSAnQW5kcm9pZCc7XG4gICAgICAgIH0gZWxzZSBpZiAoIW9zICYmIC9MaW51eC8udGVzdChwbGF0Zm9ybSkpIHtcbiAgICAgICAgICBvcyA9ICdMaW51eCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLm9zID0gb3M7XG4gICAgICAgIHJldHVybiBvcztcbiAgICB9XG59ICIsImltcG9ydCB7IFxuICAgIGV2ZW50VHlwZXMsIFxufSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXV0YXRpb25IYW5kbGVyIHtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcbiAgICBza2lwcGVkTXV0YXRpb25zOiBhbnkgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuICAgIH1cblxuXG4gICAgaGFuZGxlTXV0YXRpb25zID0obXV0YXRpb25zOmFueSk9PiB7XG4gICAgICAgIGxldCBibGFja2xpc3RlZE5vZGVzOiBBcnJheTxhbnk+ID0gdGhpcy5nZXRSZWNvcmRlcigpLmJsYWNrbGlzdGVkTm9kZXM7XG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICAgICAgaWYoIW11dGF0aW9uLnRhcmdldCkgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBmb3IobGV0IGlkeCBpbiBibGFja2xpc3RlZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYoYmxhY2tsaXN0ZWROb2Rlc1tpZHhdLmNvbnRhaW5zKG11dGF0aW9uLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lwcGVkTXV0YXRpb25zKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaChtdXRhdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBldmVudFR5cGVzLmNoYXJhY3RlckRhdGE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhcmFjdGVyRGF0YU11dGF0aW9uKG11dGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIGV2ZW50VHlwZXMuY2hpbGRMaXN0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoaWxkTGlzdChtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBldmVudFR5cGVzLmF0dHJpYnV0ZXM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQXR0cmlidXRlcyhtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgaGFuZGxlQ2hhcmFjdGVyRGF0YU11dGF0aW9uID0obXV0YXRpb246YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgcmNpZDogbXV0YXRpb24udGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNoYXJhY3RlckRhdGEsXG4gICAgICAgICAgICB0ZXh0OiBtdXRhdGlvbi50YXJnZXQuZGF0YVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkTGlzdCA9KG11dGF0aW9uOmFueSk9PiB7XG4gICAgICAgIGxldCByZW1vdmVkTm9kZXMgPSBbXTtcbiAgICAgICAgbGV0IGFkZGVkTm9kZXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpZHg9MDsgaWR4IDwgbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGlmKG11dGF0aW9uLnJlbW92ZWROb2Rlc1tpZHhdLnJjaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZWROb2Rlcy5wdXNoKG11dGF0aW9uLnJlbW92ZWROb2Rlc1tpZHhdLnJjaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS51bmJpbmRGcm9tQWxsRXZlbnQobXV0YXRpb24ucmVtb3ZlZE5vZGVzW2lkeF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IG11dGF0aW9uLmFkZGVkTm9kZXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLnBvcHVsYXRlSWQobXV0YXRpb24uYWRkZWROb2Rlc1tpZHhdKTtcbiAgICAgICAgICAgIGFkZGVkTm9kZXMucHVzaCh0aGlzLmdldFJlY29yZGVyKCkuZG9tUGFyc2VyLmdldEhUTUwobXV0YXRpb24uYWRkZWROb2Rlc1tpZHhdKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgcGFyZW50OiBtdXRhdGlvbi50YXJnZXQucmNpZCxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY2hpbGRMaXN0LFxuICAgICAgICAgICAgYWRkZWROb2RlcyxcbiAgICAgICAgICAgIHJlbW92ZWROb2RlcyxcbiAgICAgICAgICAgIG5leHRTaWJsaW5nOiBtdXRhdGlvbi5uZXh0U2libGluZyA/IG11dGF0aW9uLm5leHRTaWJsaW5nLnJjaWQgOiBudWxsLFxuICAgICAgICAgICAgcHJldmlvdXNTaWJsaW5nOiBtdXRhdGlvbi5wcmV2aW91c1NpYmxpbmcgPyBtdXRhdGlvbi5wcmV2aW91c1NpYmxpbmcucmNpZCA6IG51bGwsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQXR0cmlidXRlcyA9KG11dGF0aW9uOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHJjaWQ6IG11dGF0aW9uLnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogbXV0YXRpb24uYXR0cmlidXRlTmFtZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZVZhbHVlOiBtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59IiwiaW1wb3J0IHsgZXZlbnRUeXBlcyB9IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuaW1wb3J0IHtyZWNvcmRlckNvbmZpZ30gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbmZpZyc7XG5pbXBvcnQgTXV0YXRpb25IYW5kbGVyIGZyb20gJy4uL011dGF0aW9uSGFuZGxlci9NdXRhdGlvbkhhbmRsZXInO1xuaW1wb3J0IENvbnNvbGVIYW5kbGVyIGZyb20gJy4uL0NvbnNvbGVIYW5kbGVyL0NvbnNvbGVIYW5kbGVyJztcbmltcG9ydCBXaW5kb3dFdmVudEhhbmRsZXIgZnJvbSAnLi4vV2luZG93RXZlbnRIYW5kbGVyL1dpbmRvd0V2ZW50SGFuZGxlcic7XG5pbXBvcnQgRG9tUGFyc2VyIGZyb20gJy4uL0RvbVBhcnNlci9Eb21QYXJzZXInO1xuaW1wb3J0IFdlYlJlcXVlc3RIYW5kbGVyIGZyb20gJy4uL1dlYlJlcXVlc3RIYW5kbGVyL1dlYlJlcXVlc3RIYW5kbGVyJztcbmltcG9ydCBNZXRhRGF0YUhhbmRsZXIgZnJvbSAnLi4vTWV0YURhdGFIYW5kbGVyL01ldGFEYXRhSGFuZGxlcic7XG5cbmNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSAod2luZG93IGFzIGFueSkuTXV0YXRpb25PYnNlcnZlciB8fCAod2luZG93IGFzIGFueSkuV2ViS2l0TXV0YXRpb25PYnNlcnZlciB8fCAod2luZG93IGFzIGFueSkuTW96TXV0YXRpb25PYnNlcnZlcjtcblxubGV0IG9ic2VydmVyO1xubGV0IGN1cnJlbnROb2RlSWQgPSAxO1xubGV0IGRhdGE6IEFycmF5PGFueT4gPSBbXTtcbmxldCBkYXRhQnVmZmVyOiBBcnJheTxhbnk+ID0gW11cbmxldCBldmVudExpc3RlbmVyOmFueSA9IG51bGw7XG5sZXQgaW5pdGlhbFNuYXBzaG90U2VuZDogQm9vbGVhbiA9IGZhbHNlO1xuKHdpbmRvdyBhcyBhbnkpLnJjRGF0YSA9IFtdXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZGVyIHtcblxuICAgIGNpZDogU3RyaW5nO1xuICAgIHNpZDogU3RyaW5nO1xuICAgIGFpZDogU3RyaW5nO1xuICAgIGJsYWNrbGlzdGVkTm9kZXM6IEFycmF5PGFueT47XG4gICAgY29uc29sZVN0YXR1czogYW55O1xuICAgIG9zOiBhbnk7XG4gICAgY3RybEtleVN0YXR1czogYW55O1xuICAgIG11dGFpb25IYW5kbGVyOiBhbnk7XG4gICAgZG9tUGFyc2VyOiBhbnk7XG4gICAgY29uc29sZUhhbmRsZXI6IGFueTtcbiAgICB3aW5kb3dFdmVudEhhbmRsZXI6IGFueTtcbiAgICB3ZWJSZXF1ZXN0SGFuZGxlcjogYW55O1xuICAgIG1ldGFEYXRhSGFuZGxlcjogYW55O1xuICAgIG1vdXNlTW92ZVRocmVzaG9sZDogYW55ID0gMzM7XG4gICAgbGFzdE1vdXNlTW92ZUV2ZW50R2VuZXJhdGVkOiBhbnkgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaWQgPSBhcmdzLmNpZDtcbiAgICAgICAgdGhpcy5zaWQgPSBhcmdzLnNpZDtcbiAgICAgICAgdGhpcy5haWQgPSBhcmdzLmFpZDtcbiAgICAgICAgdGhpcy5ibGFja2xpc3RlZE5vZGVzID0gW107XG4gICAgICAgIHRoaXMuZG9tUGFyc2VyID0gbmV3IERvbVBhcnNlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSk7XG4gICAgICAgIHRoaXMuY29uc29sZUhhbmRsZXIgPSBuZXcgQ29uc29sZUhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pXG4gICAgICAgIHRoaXMubXV0YWlvbkhhbmRsZXIgPSBuZXcgTXV0YXRpb25IYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KVxuICAgICAgICB0aGlzLndpbmRvd0V2ZW50SGFuZGxlciA9IG5ldyBXaW5kb3dFdmVudEhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pO1xuICAgICAgICB0aGlzLndlYlJlcXVlc3RIYW5kbGVyID0gbmV3IFdlYlJlcXVlc3RIYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KTtcbiAgICAgICAgdGhpcy5tZXRhRGF0YUhhbmRsZXIgPSBuZXcgTWV0YURhdGFIYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFJlY29yZGVyIEluaXRpYXRlZC4gViAwLjIuMicpO1xuICAgIH0gICAgXG5cbiAgICBzdGFydCA9KG5vZGU6IGFueSk9PiB7XG4gICAgICAgIHRoaXMuZG9tUGFyc2VyLnJlY29yZFN0eWxlKCk7XG4gICAgICAgIHRoaXMuYmluZFNjcm9sbCh3aW5kb3cpO1xuICAgICAgICB0aGlzLmJpbmRNb3VzZUV2ZW50KGRvY3VtZW50KTtcbiAgICAgICAgdGhpcy53aW5kb3dFdmVudEhhbmRsZXIuY2hlY2tDb25zb2xlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgdGhpcy5kb21QYXJzZXIudGFrZVNuYXBzaG90KG5vZGUsIHRydWUpO1xuICAgICAgICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnM6YW55KT0+IHtcbiAgICAgICAgICAgIHRoaXMubXV0YWlvbkhhbmRsZXIuaGFuZGxlTXV0YXRpb25zKG11dGF0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHJlY29yZGVyQ29uZmlnKTsgXG4gICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBTdGFydGVkIFJlY29yZGluZycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqICBIZWxwZXJzXG4gICAgICogXG4gICAgICovXG5cbiAgICBiaW5kU2Nyb2xsID0obm9kZTphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG5vZGUuaXNTY3JvbGwgPSB0cnVlO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU9uU2Nyb2xsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRPbktleXVwID0obm9kZTphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG5vZGUuaXNPbktleXVwID0gdHJ1ZTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZU9uS2V5dXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE1vdXNlRXZlbnQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVNb3VzZUNsaWNrKTtcbiAgICB9XG5cbiAgICB1bmJpbmRGcm9tQWxsRXZlbnQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuaXNTY3JvbGwgJiYgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBub2RlLmlzU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT25TY3JvbGwpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG5vZGUuaXNPbktleXVwICYmIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc09uS2V5dXAgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZU9uS2V5dXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjdXJzaXZlbHlDaGVja1RhcmdldEhhc0NsaWNrRXZlbnRzOmFueSA9KHRhcmdldDphbnkpPT4ge1xuICAgICAgICBpZih0YXJnZXQub25jbGljayB8fCB0YXJnZXQub25tb3VzZWRvd24gfHwgdGFyZ2V0Lm9ubW91c2V1cCB8fCB0YXJnZXQub25jaGFuZ2UgfHwgXG4gICAgICAgICAgICBbJ0lOUFVUJ10uaW5kZXhPZih0YXJnZXQudGFnTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRhcmdldC50YWdOYW1lICE9PSAnQk9EWScgJiYgdGFyZ2V0LnBhcmVudE5vZGUpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjdXJzaXZlbHlDaGVja1RhcmdldEhhc0NsaWNrRXZlbnRzKHRhcmdldC5wYXJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIEV2ZW50IEhhbmRsZXJzXG4gICAgICovXG5cbiAgICBoYW5kbGVPblNjcm9sbCA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIGxldCBub2RlID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50O1xuXG4gICAgICAgIGlmKCFub2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGxldCBzY3JvbGwgPSB7fVxuXG4gICAgICAgIGlmKG5vZGUucmNpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBzY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBub2RlLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgc2Nyb2xsTGVmdDogbm9kZS5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICByY2lkOiAtMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbCA9IHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG5vZGUuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IG5vZGUuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICByY2lkOiBub2RlLnJjaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAoc2Nyb2xsIGFzIGFueSkudHlwZSA9IGV2ZW50VHlwZXMuc2Nyb2xsO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoc2Nyb2xsKTtcbiAgICB9XG5cbiAgICBoYW5kbGVPbktleXVwID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHJjaWQ6IGV2ZW50LnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuaW5wdXRWYWx1ZVxuICAgICAgICB9KTsgICAgICAgIFxuICAgIH1cblxuICAgIGhhbmRsZU1vdXNlTW92ZSA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIGlmKHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMubGFzdE1vdXNlTW92ZUV2ZW50R2VuZXJhdGVkID4gdGhpcy5tb3VzZU1vdmVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdE1vdXNlTW92ZUV2ZW50R2VuZXJhdGVkID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICBtb3VzZVg6IGV2ZW50LnBhZ2VYIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgbW91c2VZOiBldmVudC5wYWdlWSAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5tb3VzZU1vdmVcbiAgICAgICAgICAgIH0pOyAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVNb3VzZUNsaWNrID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldCA6IG51bGw7XG4gICAgICAgIGxldCBpc1Jlc3BvbnNpdmUgPSB0YXJnZXQgIT09IG51bGwgPyB0aGlzLnJlY3Vyc2l2ZWx5Q2hlY2tUYXJnZXRIYXNDbGlja0V2ZW50cyh0YXJnZXQpIDogZmFsc2U7XG4gICAgICAgIGxldCBpc0xpbmsgPSB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LmhyZWYgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICBtb3VzZVg6IGV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgbW91c2VZOiBldmVudC5wYWdlWSxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMubW91c2VDbGljayxcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZSxcbiAgICAgICAgICAgIGlzTGlua1xuICAgICAgICB9KTsgICAgIFxuICAgIH1cblxuICAgIGdldFVSTERldGFpbHMgPSgpPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgICAgICAgcHJvdG9jb2w6IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCxcbiAgICAgICAgICAgIGhvc3Q6IHdpbmRvdy5sb2NhdGlvbi5ob3N0LFxuICAgICAgICAgICAgaG9zdG5hbWU6IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSxcbiAgICAgICAgICAgIHBvcnQ6IHdpbmRvdy5sb2NhdGlvbi5wb3J0LFxuICAgICAgICAgICAgcGF0aG5hbWU6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgICAgIHNlYXJjaDogd2luZG93LmxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgICAgIGhhc2g6IHdpbmRvdy5sb2NhdGlvbi5oYXNoLFxuICAgICAgICAgICAgaHJlZjogd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqICBQb3B1bGF0ZSBJZFxuICAgICAqIFxuICAgICAqL1xuIFxuICAgIHBvcHVsYXRlSWQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIG5vZGUucmNpZCA9IGN1cnJlbnROb2RlSWQ7XG4gICAgICAgIGN1cnJlbnROb2RlSWQrKztcbiAgICAgICAgaWYobm9kZS5jaGlsZE5vZGVzICYmIG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgbm9kZS5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkOmFueSk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZUlkKGNoaWxkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogIE1ldGEgRGF0YVxuICAgICAqL1xuXG4gICAgZ2V0QWxsTWV0YURhdGEgPShnZW5lcmF0ZUV2ZW50PXRydWUpPT4gdGhpcy5tZXRhRGF0YUhhbmRsZXIuZ2V0QWxsTWV0YURhdGEoZ2VuZXJhdGVFdmVudCk7XG4gXG5cbiAgICAvKipcbiAgICAgKiAgVGhlIEV2ZW50IEdlbmVyYXRvclxuICAgICAqL1xuXG4gICAgIFxuXG4gICAgZ2VuZXJhdGVFdmVudCA9KGFjdGlvbjphbnkpPT4ge1xuICAgICAgICBsZXQgZXZlbnQ6YW55ID0ge1xuICAgICAgICAgICAgdGltZTogcGFyc2VGbG9hdChwZXJmb3JtYW5jZS5ub3coKS50b0ZpeGVkKDQpKVxuICAgICAgICB9IFxuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAgICAgLi4uYWN0aW9uXG4gICAgICAgIH0gXG4gICAgICAgIGlmKCFpbml0aWFsU25hcHNob3RTZW5kICYmIGV2ZW50LmluaXRpYWwpIHtcbiAgICAgICAgICAgIGluaXRpYWxTbmFwc2hvdFNlbmQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICBpZihkYXRhQnVmZmVyLmxlbmd0aCAmJiBpbml0aWFsU25hcHNob3RTZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaWR4IGluIGRhdGFCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudChkYXRhQnVmZmVyW2lkeF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFCdWZmZXIgPSBbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEpXG4gICAgICAgIH1cbiAgICAgICAgaWYoaW5pdGlhbFNuYXBzaG90U2VuZCkge1xuICAgICAgICAgICAgZGF0YS5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMucHVibGlzaExpdmVVcGRhdGUoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYoW2V2ZW50VHlwZXMuYXR0cmlidXRlcywgZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhLCBldmVudFR5cGVzLmNoaWxkTGlzdF0uaW5kZXhPZihldmVudC50eXBlKSA9PT0gLTEpe1xuICAgICAgICAgICAgZGF0YUJ1ZmZlci5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1Ymxpc2hMaXZlVXBkYXRlID0oZXZlbnQ6IGFueSk9PiB7XG4gICAgICAgIGlmKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxldCBtc2c6YW55ID0gdGhpcy53cmFwRXZlbnQoZXZlbnQpOyBcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5yY0RhdGEucHVzaChtc2cpO1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcihtc2csIGRhdGEpO1xuICAgICAgICB9ICAgXG4gICAgfVxuXG4gICAgZ2V0TGl2ZVVwZGF0ZSA9KGxpc3RlbmVyOmFueSk9PiB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbXNnID0gdGhpcy53cmFwRXZlbnQoZGF0YVtkYXRhLmxlbmd0aC0xXSlcbiAgICAgICAgICAgICAgICBldmVudExpc3RlbmVyKG1zZywgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cmFwRXZlbnQgPShkYXRhOmFueSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhOyBcbiAgICB9XG5cbn0iLCJpbXBvcnQgJy4uL0hlbHBlcnMvRG9jUmVhZHknO1xuaW1wb3J0IHtnZXRTSUQsIGxvYWRKUywgZ2VuZXJhdGVTSUR9IGZyb20gJy4uL0hlbHBlcnMvSGVscGVycyc7XG5pbXBvcnQgUmVjb3JkZXIgZnJvbSAnLi4vUmVjb3JkZXIvUmVjb3JkZXInO1xuaW1wb3J0IHtob3N0fSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuaW50ZXJmYWNlIFJIQXJncyB7XG4gICAgY2xpZW50SWQ6IFN0cmluZyxcbiAgICBhcHBJZDogU3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZGVySGFuZGxlciB7XG5cbiAgICBzaWQ6IFN0cmluZztcbiAgICBjaWQ6IFN0cmluZztcbiAgICBhaWQ6IFN0cmluZztcbiAgICByY0RhdGFCdWZmZXI6IEFycmF5PGFueT4gPSBbXTtcbiAgICByZWNvcmRlckRhdGE6IEFycmF5PGFueT4gPSBbXTtcbiAgICByZWNvcmRlcjogYW55ID0gbnVsbDtcbiAgICBzb2NrZXQ6IGFueTtcbiAgICBzb2NrZXRJbnRlcjogYW55O1xuICAgIGluaXRpYXRlZDogQm9vbGVhbiA9IGZhbHNlO1xuICAgIHBhY2tldEluZGV4OiBhbnkgPSAwOyBcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IFJIQXJncykge1xuXG4gICAgICAgIHRoaXMuc2lkID0gZ2V0U0lEKCk7XG4gICAgICAgIHRoaXMuYWlkID0gYXJncy5hcHBJZDtcbiAgICAgICAgdGhpcy5jaWQgPSBhcmdzLmNsaWVudElkO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBXYWl0aW5nIGZvciBkb2N1bWVudCByZWFkeSBzdGF0ZScpO1xuXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5kb2NSZWFkeSgoKT0+IHtcbiAgICAgICAgICAgIGxvYWRKUygnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc29ja2V0LmlvLzIuMy4wL3NvY2tldC5pby5zbGltLmpzJywgKCk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gU29ja2V0IGxvYWRlZCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXJEYXRhID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlciA9IG5ldyBSZWNvcmRlcih7XG4gICAgICAgICAgICAgICAgICAgIHNpZDogdGhpcy5zaWQsXG4gICAgICAgICAgICAgICAgICAgIGNpZDogdGhpcy5jaWQsXG4gICAgICAgICAgICAgICAgICAgIGFpZDogdGhpcy5haWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyLmdldExpdmVVcGRhdGUodGhpcy5vblJlY29yZGVyVXBkYXRlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5zdGFydChkb2N1bWVudC5ib2R5KTtcblxuICAgICAgICAgICAgICAgIGxldCBpbyA9ICh3aW5kb3cgYXMgYW55KS5pbztcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoaG9zdCwge3RyYW5zcG9ydHM6Wyd3ZWJzb2NrZXQnLCAncG9sbGluZyddfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgnY29ubmVjdCcsIHRoaXMub25Db25uZWN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vbmNlKCdyZWNvbm5lY3QnLCB0aGlzLm9uQ29ubmVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgnZGlzY29ubmVjdCcsIHRoaXMub25EaXNjb25uZWN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIHdpbmRvdylcblxuICAgIH1cbiBcbiAgICBvbkRpc2Nvbm5lY3QgPSgpPT4ge1xuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQ29ubmVjdCA9KCk9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBDb25uZWN0ZWQgdG8gU29ja2V0Jyk7XG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgU2VuZGluZyBTZXNzaW9uIE1ldGFcbiAgICAgICAgICovXG4gICAgICAgIGxldCBzZXNzaW9uTWV0YURhdGEgPSB0aGlzLmdldFNlc3Npb25NZXRhKCk7XG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Nlc3Npb25SZWNpdmVyJywgc2Vzc2lvbk1ldGFEYXRhKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogIFNlbmRpbmcgQnVmZmVyZWQgRGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgZm9yKGxldCBpZHggaW4gdGhpcy5yZWNvcmRlckRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKHRoaXMucmVjb3JkZXJEYXRhW2lkeF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb3JkZXJEYXRhID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbml0aWF0aW5nIFNlbmRlclxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zb2NrZXRJbnRlciA9IHNldEludGVydmFsKCgpPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5yY0RhdGFCdWZmZXIgJiYgdGhpcy5yY0RhdGFCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFNlbmRpbmcgRGF0YScsIHRoaXMucmNEYXRhQnVmZmVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2tldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgICAgICAgICAgYWlkOiB0aGlzLmFpZCxcbiAgICAgICAgICAgICAgICAgICAgcGlkOiB0aGlzLmdldFBJRCgpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5wYWNrZXRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnJjRGF0YUJ1ZmZlclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrZXRJbmRleCs9MTtcbiAgICAgICAgICAgICAgICBpZigod2luZG93IGFzIGFueSkuQVJDRGV2IHx8IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemU6YW55ID0gIEpTT04uc3RyaW5naWZ5KHBhY2tldCkubGVuZ3RoICogMjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFBhY2tldCBzaXplJywgc2l6ZSwgJ0J5dGVzLCAnLCBNYXRoLmNlaWwoc2l6ZS8xMDI0KSwgJ2tiJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc2Vzc2lvblJlY2l2ZXInLCBwYWNrZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmNEYXRhQnVmZmVyID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cblxuICAgIGdldFBJRCA9KCk9PiBnZW5lcmF0ZVNJRCgpXG5cbiAgICBzZW5kVG9TZXJ2ZXIgPShldmVudDogYW55KT0+IHtcbiAgICAgICAgaWYoIXRoaXMuaW5pdGlhdGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMucmNEYXRhQnVmZmVyLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIG9uUmVjb3JkZXJVcGRhdGVyID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgdGhpcy5yZWNvcmRlckRhdGEucHVzaChldmVudCk7XG4gICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBnZXRTZXNzaW9uTWV0YSA9KCk9PiB7XG4gICAgICAgIGlmKCF0aGlzLnJlY29yZGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbQVJDXSBGQVRBTCBFUlI6IFJlY29yZGVyIG5vdCBGb3VuZCcpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1ldGE6YW55ID0gdGhpcy5yZWNvcmRlci5nZXRBbGxNZXRhRGF0YShmYWxzZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzaWQ6IHRoaXMuc2lkLFxuICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgIGFpZDogdGhpcy5haWQsXG4gICAgICAgICAgICB0eXBlOidzZXNzaW9uJyxcbiAgICAgICAgICAgIGRldmljZVR5cGU6ICdkZXNrdG9wJyxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIG1ldGFEYXRhOiB7XG4gICAgICAgICAgICAgIGJyb3dzZXJOYW1lOiBtZXRhLmJyb3dzZXIsXG4gICAgICAgICAgICAgIG9zOiBtZXRhLm9zLFxuICAgICAgICAgICAgICBjcHVDb3JlOiBtZXRhLmNvcmUsXG4gICAgICAgICAgICAgIGRldmljZU1lbW9yeTogbWV0YS5kZXZpY2VNZW1vcnksXG4gICAgICAgICAgICAgIHNjcmVlblR5cGU6IG1ldGEuaXNUb3VjaERldmljZSxcbiAgICAgICAgICAgICAgbGFuZ3VhZ2U6IG1ldGEubGFuZ3VhZ2UsXG4gICAgICAgICAgICAgIGNvb2tpZUVuYWJsZWQ6IG1ldGEuY29va2llRW5hYmxlZCxcbiAgICAgICAgICAgICAgcmVmZXJyZXI6IG1ldGEucmVmZXJyZXIsXG4gICAgICAgICAgICAgIGJyb3dzZXJWZXJzaW9uOiBtZXRhLmJyb3dzZXIsXG4gICAgICAgICAgICAgIG9zVmVyc2lvbjogbWV0YS5vcyxcbiAgICAgICAgICAgICAgdXNlckFnZW50OiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgZXZlbnRUeXBlcyB9IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJSZXF1ZXN0SGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG5cblxuICAgICAgICBjb25zdCB0cmFja1hNTFJlcSA9IHRoaXMudHJhY2tYTUxSZXE7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICB4bWxIdHRwUmVxXG4gICAgICAgICAqL1xuXG4gICAgICAgIGxldCBvcGVuID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47XG4gICAgICAgIChYTUxIdHRwUmVxdWVzdCBhcyBhbnkpLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24obWV0aG9kOmFueSwgdXJsOnN0cmluZywgYXN5bmM6Ym9vbGVhbikge1xuICAgICAgICAgICAgbGV0IHJlcSA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihkOmFueSkge1xuICAgICAgICAgICAgICAgIGlmKHJlcS5yZWFkeVN0YXRlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrWE1MUmVxKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVxLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3Blbi5jYWxsKHRoaXMsIG1ldGhvZCwgdXJsLCBhc3luYyk7XG4gICAgICAgIH07IFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBGZXRjaFxuICAgICAgICAgKi9cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlRmV0Y2gocHJvbWlzZTphbnksIHVybDpTdHJpbmcsIHBhcmFtczphbnkpIHtcbiAgICAgICAgICAgIGxldCByZXNwID0gYXdhaXQgcHJvbWlzZTsgXG4gICAgICAgICAgICB0cmFja1hNTFJlcSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBwYXJhbXMubWV0aG9kIHx8ICdHRVQnLFxuICAgICAgICAgICAgICAgIGFzeW5jOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5fX2ZldGNoX18gPSB3aW5kb3cuZmV0Y2g7XG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5mZXRjaCA9KHVybDpTdHJpbmcsIHBhcmFtczphbnkpPT4ge1xuICAgICAgICAgICAgbGV0IHJlcSA9ICh3aW5kb3cgYXMgYW55KS5fX2ZldGNoX18odXJsLCBwYXJhbXMpO1xuICAgICAgICAgICAgaGFuZGxlRmV0Y2gocmVxLnRoZW4oKSwgdXJsLCBwYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYWNrWE1MUmVxID0oYXJnczphbnkpPT4ge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLnhtbEh0dHBSZXEsXG4gICAgICAgICAgICAuLi5hcmdzXG4gICAgICAgIH0pXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgXG4gICAgZXZlbnRUeXBlcywgXG4gICAgY29tbWFuZHNcbn0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmRvd0V2ZW50SGFuZGxlciB7XG5cbiAgICBjdHJsS2V5U3RhdHVzOiBCb29sZWFuID0gZmFsc2U7XG4gICAgcmVzaXplRGVib3VuY2U6IGFueTtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuXG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuXG4gICAgICAgIGNvbnN0IHRyYWNrV2luZG93Q29tbWFuZCA9KGU6IGFueSk9PiB7XG4gICAgICAgICAgICBsZXQgY29kZSA9IChkb2N1bWVudC5hbGwpID8gKHdpbmRvdy5ldmVudCBhcyBhbnkpLmtleUNvZGUgOiBlLndoaWNoOyBcbiAgICAgICAgICAgIGxldCBjbWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09PSA4Nikge1xuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLlBBU1RFO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN0cmxLZXlTdGF0dXMgJiYgY29kZSA9PT0gNjcpIHsgXG4gICAgICAgICAgICAgICAgY21kID0gY29tbWFuZHMuQ09QWTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdHJsS2V5U3RhdHVzICYmIGNvZGUgPT09IDgzKSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLlNBVkU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09PSA2OCkgeyBcbiAgICAgICAgICAgICAgICBjbWQgPSBjb21tYW5kcy5CT09LTUFSSztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoY21kICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNvbW1hbmRFeGVjdXRlZCxcbiAgICAgICAgICAgICAgICAgICAgY21kXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYWNrQ3RybCA9KGU6IGFueSwgaXNLZXlEb3duOkJvb2xlYW4pPT4ge1xuICAgICAgICAgICAgbGV0IGNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcbiAgICAgICAgICAgIGxldCBpc01hYyA9ICh0aGlzLmdldFJlY29yZGVyKCkub3N8fCcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluZGV4T2YoJ21hYycpICE9PSAtMTtcbiAgICAgICAgICAgIGlmKChjb2RlID09PSA5MSAmJiBpc01hYykgfHwgKCFpc01hYyAmJiBjb2RlID09PSAxNykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN0cmxLZXlTdGF0dXMgPSBpc0tleURvd247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGU9PnRyYWNrQ3RybChlLCB0cnVlKSwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGU9PnRyYWNrQ3RybChlLCBmYWxzZSksIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYWNrV2luZG93Q29tbWFuZCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnRyYWNrV2luZG93UmVzaXplKCk7XG4gICAgICAgIHRoaXMudHJhY2tIYXNoQ2hhbmdlKCk7XG4gICAgfVxuXG5cbiAgICB0cmFja1dpbmRvd1Jlc2l6ZSA9KCk9PiB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKT0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZURlYm91bmNlKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplRGVib3VuY2UgPSBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy53aW5kb3dSZXNpemUsXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbldpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuSGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTGVmdDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ29uc29sZVN0YXR1cyh0cnVlKTtcbiAgICAgICAgICAgIH0sIDQwMClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjaGVja0NvbnNvbGVTdGF0dXMgPShnZW5lcmF0ZUV2ZW50PWZhbHNlKT0+IHtcbiAgICAgICAgbGV0IGRldnRvb2xzOiBGdW5jdGlvbiA9IGZ1bmN0aW9uKCl7fTtcbiAgICAgICAgKGRldnRvb2xzIGFzIGFueSkudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgdGhpcy5vcGVuZWQgPSB0cnVlIH1cbiAgICAgICAgY29uc29sZS5sb2coJyVjJywgZGV2dG9vbHMpO1xuXG4gICAgICAgIGxldCBwcmV2U3RhdHVzID0gdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMgfHwgZmFsc2U7XG4gICAgICAgIGxldCBjdXJyZW50U3RhdHVzID0gKGRldnRvb2xzIGFzIGFueSkub3BlbmVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgPiAxNTApIHx8IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoID4gMTUwKSk7XG4gICAgICAgIGlmKHByZXZTdGF0dXMgIT09IGN1cnJlbnRTdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5jb25zb2xlU3RhdHVzID0gY3VycmVudFN0YXR1cztcbiAgICAgICAgICAgIGlmKGdlbmVyYXRlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY29uc29sZVN0YXR1c0NoYW5nZWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGVTdGF0dXM6IHRoaXMuZ2V0UmVjb3JkZXIoKS5jb25zb2xlU3RhdHVzLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgXG5cbiAgICB0cmFja0hhc2hDaGFuZ2UgPSgpPT4ge1xuICAgICAgICB3aW5kb3cub25oYXNoY2hhbmdlID0gKCk9PiB7IFxuICAgICAgICAgICAgbGV0IGV2ZW50OmFueSA9IHRoaXMuZ2V0UmVjb3JkZXIoKS5nZXRVUkxEZXRhaWxzKCk7XG4gICAgICAgICAgICBldmVudC50eXBlID0gZXZlbnRUeXBlcy5oYXNoQ2hhbmdlZDtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCBSZWNvcmRlckhhbmRsZXIgZnJvbSAnLi9SZWNvcmRlckhhbmRsZXIvUmVjb3JkZXJIYW5kbGVyJztcblxuXG5jb25zdCBzdGFydEFSQz0oY2xpZW50SWQ6U3RyaW5nLCBhcHBJZDpTdHJpbmcpPT4ge1xuICAgIGNvbnNvbGUubG9nKCdbQVJDXSBSZWNvcmRlciBIYW5kbGVyIEluaXRpYXRlZCwgQ2xpZW50IElEJywgY2xpZW50SWQsICdBcHAgSUQnLCBhcHBJZClcbiAgICBuZXcgUmVjb3JkZXJIYW5kbGVyKHtjbGllbnRJZCwgYXBwSWR9KTtcbn1cblxuKHdpbmRvdyBhcyBhbnkpLnN0YXJ0QVJDID0gc3RhcnRBUkM7XG5cblxuZXhwb3J0IGRlZmF1bHQgc3RhcnRBUkM7Il0sInNvdXJjZVJvb3QiOiIifQ==