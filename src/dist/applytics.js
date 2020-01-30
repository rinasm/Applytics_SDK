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

/***/ "./src/SDK/Constants/Constants.ts":
/*!****************************************!*\
  !*** ./src/SDK/Constants/Constants.ts ***!
  \****************************************/
/*! exports provided: host */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "host", function() { return host; });
var host = 'https://test.applytics.in';


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

/***/ "./src/SDK/Recorder/Recorder.ts":
/*!**************************************!*\
  !*** ./src/SDK/Recorder/Recorder.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
};
var observer;
var currentNodeId = 1;
var data = [];
var dataBuffer = [];
var eventListener = null;
var cssRules = '';
var inputNodeNames = ['TEXTAREA', 'INPUT'];
var initialSnapshotSend = false;
window.rcData = [];
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
// let blacklistedElByClass = ['LineBarChart', 'map-gm']
var blacklistedElByClass = [];
var consoleTrackList = ['info', 'log', 'warn', 'error'];
var blacklistedAttrs = ['srcset'];
var Recorder = /** @class */ (function () {
    function Recorder(args) {
        var _this = this;
        this.start = function (node) {
            _this.recordStyle();
            _this.bindScroll(window);
            _this.bindMouseEvent(document);
            _this.checkConsoleStatus(false);
            _this.takeSnapshot(node, true);
            observer = new MutationObserver(function (mutations) {
                _this.handleMutations(mutations);
            });
            observer.observe(node, config);
            console.log('Started Recording');
        };
        /**
         *
         *  Helpers
         *
         */
        this.getRCIDFromEl = function (el) { return el.rcid; };
        this.recordStyle = function () {
            cssRules = '';
            for (var idx = 0; idx < document.styleSheets.length; idx++) {
                try {
                    for (var jdx = 0; jdx < document.styleSheets[idx].rules.length; jdx++) {
                        cssRules += document.styleSheets[idx].rules[jdx].cssText;
                    }
                }
                catch (e) {
                    _this.generateEvent({
                        type: eventTypes.styleSheetsLoadReq,
                        href: document.styleSheets[idx].href
                    });
                }
            }
        };
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
        this.readSrc = function (node, url) {
            if (node.complete) {
                return _this.getBase64Image(node);
            }
            else {
                node.addEventListener('load', function () {
                    _this.generateEvent({
                        rcid: node.rcid,
                        url: url,
                        src: _this.getBase64Image(node),
                        type: eventTypes.assetLoaded
                    });
                });
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
         *
         *  Mutaion Handler
         *
         */
        this.handleMutations = function (mutations) {
            mutations.forEach(function (mutation) {
                if (!mutation.target)
                    return;
                for (var idx in _this.blacklistedNodes) {
                    if (_this.blacklistedNodes[idx].contains(mutation.target)) {
                        _this.skippedMutations++;
                        return;
                    }
                }
                console.log(_this.skippedMutations);
                switch (mutation.type) {
                    case eventTypes.characterData:
                        _this.handleCharacterDataMutation(mutation);
                        break;
                    case eventTypes.childList:
                        _this.handleChildList(mutation);
                        break;
                    case eventTypes.attributes:
                        _this.handleAttributes(mutation);
                        break;
                    default:
                        break;
                }
            });
        };
        this.handleCharacterDataMutation = function (mutation) {
            _this.generateEvent({
                rcid: mutation.target.rcid,
                type: eventTypes.characterData,
                text: mutation.target.data
            });
        };
        this.handleChildList = function (mutation) {
            var removedNodes = [];
            var addedNodes = [];
            for (var idx = 0; idx < mutation.removedNodes.length; idx++) {
                if (mutation.removedNodes[idx].rcid != null) {
                    removedNodes.push(mutation.removedNodes[idx].rcid);
                    _this.unbindFromAllEvent(mutation.removedNodes[idx]);
                }
            }
            for (var idx = 0; idx < mutation.addedNodes.length; idx++) {
                _this.populateId(mutation.addedNodes[idx]);
                addedNodes.push(_this.getHTML(mutation.addedNodes[idx]));
            }
            _this.generateEvent({
                parent: mutation.target.rcid,
                type: eventTypes.childList,
                addedNodes: addedNodes,
                removedNodes: removedNodes,
                nextSibling: mutation.nextSibling ? mutation.nextSibling.rcid : null,
                previousSibling: mutation.previousSibling ? mutation.previousSibling.rcid : null,
            });
        };
        this.handleAttributes = function (mutation) {
            _this.generateEvent({
                rcid: mutation.target.rcid,
                type: eventTypes.attributes,
                attributeName: mutation.attributeName,
                attributeValue: mutation.target.getAttribute(mutation.attributeName)
            });
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
            scroll.type = eventTypes.scroll;
            _this.generateEvent(scroll);
        };
        this.handleOnKeyup = function (event) {
            _this.generateEvent({
                rcid: event.target.rcid,
                value: event.target.value,
                type: eventTypes.inputValue
            });
        };
        this.handleMouseMove = function (event) {
            _this.generateEvent({
                mouseX: event.pageX - document.documentElement.scrollLeft,
                mouseY: event.pageY - document.documentElement.scrollTop,
                type: eventTypes.mouseMove
            });
        };
        this.handleMouseClick = function (event) {
            var target = event && event.target ? event.target : null;
            var isResponsive = target !== null ? _this.recursivelyCheckTargetHasClickEvents(target) : false;
            var isLink = target !== null && target.href ? true : false;
            _this.generateEvent({
                mouseX: event.pageX,
                mouseY: event.pageY,
                type: eventTypes.mouseClick,
                isResponsive: isResponsive,
                isLink: isLink
            });
        };
        /**
         *
         *  The Snapshot
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
        this.checkNodeIsValid = function (node) {
            if (node.className && node.className.indexOf && blacklistedElByClass.filter(function (d) { return node.className.indexOf(d) !== -1; }).length) {
                _this.blacklistedNodes.push(node);
                return false;
            }
            return true;
        };
        this.convertToAbsolutePath = function (path) {
            if (path == null)
                return 'nopath';
            return new URL(path, window.location.origin).href;
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
                        if (blacklistedAttrs.indexOf(node.attributes[attrIndex].localName) === -1) {
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
                    _this.bindScroll(node);
                }
                if (inputNodeNames.indexOf(node.nodeName) !== -1) {
                    _this.bindOnKeyup(node);
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
            _this.populateId(node);
            var clone = _this.getHTML(node);
            _this.generateEvent({
                type: eventTypes.snapshot,
                dom: clone,
                cssRules: cssRules,
                initial: initial,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                scrollTop: document.documentElement.scrollTop,
                scrollLeft: document.documentElement.scrollLeft,
                consoleStatus: _this.consoleStatus,
                location: _this.getURLDetails()
            });
        };
        /**
         *  Web Request Tracker
         */
        this.trackAllReq = function () {
            var trackXMLReq = _this.trackXMLReq;
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
        };
        this.trackXMLReq = function (args) {
            _this.generateEvent(__assign({ type: eventTypes.xmlHttpReq }, args));
        };
        /**
         *  Meta Data
         */
        this.getAllMetaData = function (generateEvent) {
            if (generateEvent === void 0) { generateEvent = true; }
            var event = {
                type: eventTypes.browserMeta,
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
                _this.generateEvent(event);
            return event;
        };
        /**
         *  Track Console
         */
        this.trackConsole = function (params, type) {
            var args = [];
            for (var idx = 0; idx < params.length; idx++) {
                args.push(params[idx]);
            }
            _this.generateEvent({
                type: eventTypes.console,
                consoleType: type,
                args: args
            });
        };
        this.trackAllConsoleActivity = function () {
            var tempConsole = {};
            var trackConsole = _this.trackConsole;
            for (var idx in consoleTrackList) {
                if (typeof console[consoleTrackList[idx]] === 'function') {
                    tempConsole[consoleTrackList[idx]] = console[consoleTrackList[idx]];
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
        /**
         *  Window Resize and Others
         */
        this.trackWindowResize = function () {
            window.addEventListener('resize', function () {
                clearTimeout(_this.resizeDebounce);
                _this.resizeDebounce = setTimeout(function () {
                    _this.generateEvent({
                        type: eventTypes.windowResize,
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
            var prevStatus = _this.consoleStatus || false;
            var currentStatus = devtools.opened &&
                ((window.outerHeight - window.innerHeight > 150) ||
                    (window.outerWidth - window.innerWidth > 150));
            if (prevStatus !== currentStatus) {
                _this.consoleStatus = currentStatus;
                if (generateEvent) {
                    _this.generateEvent({
                        type: eventTypes.consoleStatusChanged,
                        consoleStatus: _this.consoleStatus,
                    });
                }
                return true;
            }
            return false;
        };
        /**
         *  Window Commands
         */
        this.trackWindowCommands = function () {
            var trackWindowCommand = function (e) {
                var code = (document.all) ? window.event.keyCode : e.which;
                var cmd = null;
                if (_this.ctrlKeyStatus && code == 86) {
                    cmd = commands.PASTE;
                }
                else if (_this.ctrlKeyStatus && code == 67) {
                    cmd = commands.COPY;
                }
                else if (_this.ctrlKeyStatus && code == 83) {
                    cmd = commands.SAVE;
                }
                else if (_this.ctrlKeyStatus && code == 68) {
                    cmd = commands.BOOKMARK;
                }
                if (cmd !== null) {
                    _this.generateEvent({
                        type: eventTypes.commandExecuted,
                        cmd: cmd
                    });
                }
            };
            var trackCtrl = function (e, isKeyDown) {
                var code = e.keyCode || e.which;
                var isMac = (_this.os || '').toLocaleLowerCase().indexOf('mac') !== -1;
                if ((code === 91 && isMac) || (!isMac && code === 17)) {
                    _this.ctrlKeyStatus = isKeyDown;
                }
            };
            document.addEventListener('keydown', function (e) { return trackCtrl(e, true); }, false);
            document.addEventListener('keyup', function (e) { return trackCtrl(e, false); }, false);
            document.addEventListener('keydown', trackWindowCommand, false);
        };
        /**
         *  Track Hash Change
         */
        this.trackHashChange = function () {
            window.onhashchange = function () {
                var event = _this.getURLDetails();
                event.type = eventTypes.hashChanged;
                _this.generateEvent(event);
            };
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
            else if ([eventTypes.attributes, eventTypes.characterData, eventTypes.childList].indexOf(event.type) === -1) {
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
    Recorder.prototype.getBase64Image = function (img) {
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
    Recorder.prototype.getIsTouchDevice = function () {
        return 'ontouchstart' in document.documentElement || (('ontouchstart' in window)
            || (navigator.maxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    };
    Recorder.prototype.getBrowser = function () {
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
    Recorder.prototype.getOS = function () {
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
        this.os = os;
        return os;
    };
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
            console.log('Connected to Socket');
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
        // console.log('DOC Ready 1')
        window.docReady(function () {
            Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__["loadJS"])('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.slim.js', function () {
                console.log('Socket loaded');
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
    console.log('Recorder Handler Initiated, Client ID', clientId, 'App ID', appId);
    new _RecorderHandler_RecorderHandler__WEBPACK_IMPORTED_MODULE_0__["default"]({ clientId: clientId, appId: appId });
};
window.startARC = startARC;
/* harmony default export */ __webpack_exports__["default"] = (startARC);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zdGFudHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvSGVscGVycy9Eb2NSZWFkeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0hlbHBlcnMvSGVscGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL1JlY29yZGVyL1JlY29yZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvUmVjb3JkZXJIYW5kbGVyL1JlY29yZGVySGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLElBQU0sSUFBSSxHQUFHLDJCQUEyQixDQUFDOzs7Ozs7Ozs7Ozs7O0FDQWhEO0FBQWUs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QztJQUVkLENBQUM7SUE4Rkwsc0JBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ2pKRDtBQUFBO0FBQWdFO0FBR2hFLElBQU0sUUFBUSxHQUFDLFVBQUMsUUFBZSxFQUFFLEtBQVk7SUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztJQUMvRSxJQUFJLHdFQUFlLENBQUMsRUFBQyxRQUFRLFlBQUUsS0FBSyxTQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUssTUFBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFHbkIsdUVBQVEsRUFBQyIsImZpbGUiOiJhcHBseXRpY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9TREsvaW5kZXgudHNcIik7XG4iLCJleHBvcnQgY29uc3QgaG9zdCA9ICdodHRwczovL3Rlc3QuYXBwbHl0aWNzLmluJzsiLCJleHBvcnQgZGVmYXVsdCAnZG9jIHJlYWR5JztcblxuKGZ1bmN0aW9uKGZ1bmNOYW1lOmFueSwgYmFzZU9iajphbnkpIHtcbiAgICBmdW5jTmFtZSA9IGZ1bmNOYW1lIHx8IFwiZG9jUmVhZHlcIjtcbiAgICBiYXNlT2JqID0gYmFzZU9iaiB8fCB3aW5kb3c7XG4gICAgdmFyIHJlYWR5TGlzdCA9IDxhbnk+W107XG4gICAgdmFyIHJlYWR5RmlyZWQgPSBmYWxzZTtcbiAgICB2YXIgcmVhZHlFdmVudEhhbmRsZXJzSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgXG4gICAgZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICAgIGlmICghcmVhZHlGaXJlZCkge1xuICAgICAgICAgICAgcmVhZHlGaXJlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlYWR5TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlYWR5TGlzdFtpXS5mbi5jYWxsKHdpbmRvdywgcmVhZHlMaXN0W2ldLmN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWFkeUxpc3QgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiByZWFkeVN0YXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiApIHtcbiAgICAgICAgICAgIHJlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmFzZU9ialtmdW5jTmFtZV0gPSBmdW5jdGlvbihjYWxsYmFjazphbnksIGNvbnRleHQ6YW55KSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGxiYWNrIGZvciBkb2NSZWFkeShmbikgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFkeUZpcmVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge2NhbGxiYWNrKGNvbnRleHQpO30sIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVhZHlMaXN0LnB1c2goe2ZuOiBjYWxsYmFjaywgY3R4OiBjb250ZXh0fSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fCAoISg8YW55PmRvY3VtZW50KS5hdHRhY2hFdmVudCAmJiBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlYWR5LCAxKTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVhZHlFdmVudEhhbmRsZXJzSW5zdGFsbGVkKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHJlYWR5LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHJlYWR5LCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoKDxhbnk+ZG9jdW1lbnQpLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgKDxhbnk+ZG9jdW1lbnQpLmF0dGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIHJlYWR5U3RhdGVDaGFuZ2UpO1xuICAgICAgICAgICAgICAgICg8YW55PmRvY3VtZW50KS5hdHRhY2hFdmVudChcIm9ubG9hZFwiLCByZWFkeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignW0FSQ106IEZhaWxlZCB0byBUcmlnZ2VyIERvYyByZWFkeScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWFkeUV2ZW50SGFuZGxlcnNJbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICB9KShcImRvY1JlYWR5XCIsIHdpbmRvdyk7IiwiY29uc3QgZ2VuZXJhdGVSYW5kb21TdHJpbmcgPShsZW5ndGg6IE51bWJlcik9PiB7XG4gICAgbGV0IHJlc3VsdCAgICAgICAgICAgPSAnJztcbiAgICBsZXQgY2hhcmFjdGVycyAgICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gICAgbGV0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBsZW5ndGg7IGlkeCsrICkge1xuICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVNJRCA9KCk9PiB7XG4gICAgcmV0dXJuIGdlbmVyYXRlUmFuZG9tU3RyaW5nKDQpICsgJy0nICsgZ2VuZXJhdGVSYW5kb21TdHJpbmcoNCkgKyAnLScgKyBnZW5lcmF0ZVJhbmRvbVN0cmluZygyKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFNJRCA9KCk9PiB7XG4gICAgbGV0IHNpZCA9ICg8YW55PndpbmRvdykuYXBwcmNfc2lkIHx8IG51bGw7XG4gICAgaWYoc2lkID09PSBudWxsKSB7XG4gICAgICAgIHNpZCA9IGdlbmVyYXRlU0lEKClcbiAgICB9XG4gICAgcmV0dXJuIHNpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRKUyhmaWxlOmFueSwgY2FsbGJhY2s6YW55KSB7XG4gICAgdmFyIGpzRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBqc0VsbS50eXBlID0gXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCI7XG4gICAganNFbG0uc3JjID0gZmlsZTtcbiAgICBqc0VsbS5vbmxvYWQgPSBjYWxsYmFjaztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGpzRWxtKTtcbn1cbiIsImNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSAoPGFueT53aW5kb3cpLk11dGF0aW9uT2JzZXJ2ZXIgfHwgKDxhbnk+d2luZG93KS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyIHx8ICg8YW55PndpbmRvdykuTW96TXV0YXRpb25PYnNlcnZlcjtcbmNvbnN0IGNvbmZpZyA9IHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsICBcbn07XG5cbmxldCBvYnNlcnZlcjtcbmxldCBjdXJyZW50Tm9kZUlkID0gMTtcbmxldCBkYXRhOiBBcnJheTxhbnk+ID0gW107XG5sZXQgZGF0YUJ1ZmZlcjogQXJyYXk8YW55PiA9IFtdXG5sZXQgZXZlbnRMaXN0ZW5lcjphbnkgPSBudWxsO1xubGV0IGNzc1J1bGVzOiBTdHJpbmcgPSAnJztcbmxldCBpbnB1dE5vZGVOYW1lczogQXJyYXk8U3RyaW5nPiA9IFsnVEVYVEFSRUEnLCAnSU5QVVQnXTsgXG5sZXQgaW5pdGlhbFNuYXBzaG90U2VuZDogQm9vbGVhbiA9IGZhbHNlO1xuKDxhbnk+d2luZG93KS5yY0RhdGEgPSBbXVxuXG5sZXQgZXZlbnRUeXBlcyA9IHtcbiAgICBzbmFwc2hvdDogJ3NuYXBzaG90JyxcbiAgICBjaGFyYWN0ZXJEYXRhOiAnY2hhcmFjdGVyRGF0YScsXG4gICAgY2hpbGRMaXN0OiAnY2hpbGRMaXN0JyxcbiAgICBhdHRyaWJ1dGVzOiAnYXR0cmlidXRlcycsXG4gICAgc2Nyb2xsOiAnc2Nyb2xsJyxcbiAgICBpbnB1dFZhbHVlOiAnaW5wdXRWYWx1ZScsXG4gICAgbW91c2VDbGljazogJ21vdXNlQ2xpY2snLFxuICAgIG1vdXNlTW92ZTogJ21vdXNlTW92ZScsXG4gICAgYXNzZXRMb2FkZWQ6ICdhc3NldExvYWRlZCcsXG4gICAgc3R5bGVTaGVldHNMb2FkUmVxOiAnc3R5bGVTaGVldHNMb2FkUmVxJyxcbiAgICB4bWxIdHRwUmVxOiAneG1sSHR0cFJlcScsXG4gICAgY29uc29sZTogJ2NvbnNvbGUnLFxuICAgIGJyb3dzZXJNZXRhOiAnYnJvd3Nlck1ldGEnLFxuICAgIHdpbmRvd1Jlc2l6ZTogJ3dpbmRvd1Jlc2l6ZScsXG4gICAgY29uc29sZVN0YXR1c0NoYW5nZWQ6ICdjb25zb2xlU3RhdHVzQ2hhbmdlZCcsXG4gICAgY29tbWFuZEV4ZWN1dGVkOiAnY29tbWFuZEV4ZWN1dGVkJyxcbiAgICBoYXNoQ2hhbmdlZDogJ2hhc2hDaGFuZ2VkJ1xufVxuXG5sZXQgY29tbWFuZHMgPSB7XG4gICAgUEFTVEU6IFwiUEFTVEVcIixcbiAgICBDT1BZOiBcIkNPUFlcIixcbiAgICBCT09LTUFSSzogXCJCT09LTUFSS1wiLFxuICAgIFNBVkU6IFwiU0FWRVwiXG59XG5cbi8vIGxldCBibGFja2xpc3RlZEVsQnlDbGFzcyA9IFsnTGluZUJhckNoYXJ0JywgJ21hcC1nbSddXG5sZXQgYmxhY2tsaXN0ZWRFbEJ5Q2xhc3M6IEFycmF5PFN0cmluZz4gPSBbXTtcbmxldCBjb25zb2xlVHJhY2tMaXN0OiBBcnJheTxhbnk+ID0gWydpbmZvJywgJ2xvZycsICd3YXJuJywgJ2Vycm9yJ11cbmxldCBibGFja2xpc3RlZEF0dHJzOiBBcnJheTxTdHJpbmc+ID0gWydzcmNzZXQnXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRlciB7XG5cbiAgICBjaWQ6IFN0cmluZztcbiAgICBzaWQ6IFN0cmluZztcbiAgICBhaWQ6IFN0cmluZztcbiAgICBibGFja2xpc3RlZE5vZGVzOiBBcnJheTxhbnk+O1xuICAgIHNraXBwZWRNdXRhdGlvbnM6IGFueTtcbiAgICByZWFkSW1hZ2VTcmM6IEJvb2xlYW47XG4gICAgY29uc29sZVN0YXR1czogYW55O1xuICAgIHRlbXBDb25zb2xlOiBhbnk7XG4gICAgb3M6IGFueTtcbiAgICByZXNpemVEZWJvdW5jZTogYW55O1xuICAgIGN0cmxLZXlTdGF0dXM6IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuY2lkID0gYXJncy5jaWQ7XG4gICAgICAgIHRoaXMuc2lkID0gYXJncy5zaWQ7XG4gICAgICAgIHRoaXMuYWlkID0gYXJncy5haWQ7XG4gICAgICAgIHRoaXMuYmxhY2tsaXN0ZWROb2RlcyA9IFtdO1xuICAgICAgICB0aGlzLnNraXBwZWRNdXRhdGlvbnMgPSAwO1xuICAgICAgICB0aGlzLnJlYWRJbWFnZVNyYyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYWNrQWxsUmVxKCk7XG4gICAgICAgIHRoaXMudHJhY2tBbGxDb25zb2xlQWN0aXZpdHkoKTtcbiAgICAgICAgdGhpcy5nZXRBbGxNZXRhRGF0YSgpO1xuICAgICAgICB0aGlzLnRyYWNrV2luZG93UmVzaXplKCk7XG4gICAgICAgIHRoaXMudHJhY2tXaW5kb3dDb21tYW5kcygpO1xuICAgICAgICB0aGlzLnRyYWNrSGFzaENoYW5nZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVjb3JkZXIgSW5pdGlhdGVkJyk7XG4gICAgfSAgICBcblxuICAgIHN0YXJ0ID0obm9kZTogYW55KT0+IHtcbiAgICAgICAgdGhpcy5yZWNvcmRTdHlsZSgpO1xuICAgICAgICB0aGlzLmJpbmRTY3JvbGwod2luZG93KTtcbiAgICAgICAgdGhpcy5iaW5kTW91c2VFdmVudChkb2N1bWVudCk7XG4gICAgICAgIHRoaXMuY2hlY2tDb25zb2xlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgdGhpcy50YWtlU25hcHNob3Qobm9kZSwgdHJ1ZSk7XG4gICAgICAgIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uczphbnkpPT4ge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNdXRhdGlvbnMobXV0YXRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwgY29uZmlnKTsgXG4gICAgICAgIGNvbnNvbGUubG9nKCdTdGFydGVkIFJlY29yZGluZycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqICBIZWxwZXJzXG4gICAgICogXG4gICAgICovXG5cbiAgICBnZXRSQ0lERnJvbUVsID0oZWw6YW55KT0+IGVsLnJjaWQ7XG5cbiAgICByZWNvcmRTdHlsZSA9KCk9PiB7XG4gICAgICAgIGNzc1J1bGVzID0gJyc7XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeDxkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgamR4PTA7IGpkeDwoPGFueT5kb2N1bWVudC5zdHlsZVNoZWV0c1tpZHhdKS5ydWxlcy5sZW5ndGg7IGpkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNzc1J1bGVzICs9ICg8YW55PmRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0pLnJ1bGVzW2pkeF0uY3NzVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IFxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuc3R5bGVTaGVldHNMb2FkUmVxLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiBkb2N1bWVudC5zdHlsZVNoZWV0c1tpZHhdLmhyZWZcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGwgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc1Njcm9sbCA9IHRydWU7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT25TY3JvbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE9uS2V5dXAgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc09uS2V5dXAgPSB0cnVlO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlT25LZXl1cCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kTW91c2VFdmVudCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU1vdXNlQ2xpY2spO1xuICAgIH1cblxuICAgIHVuYmluZEZyb21BbGxFdmVudCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgaWYobm9kZS5pc1Njcm9sbCAmJiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG5vZGUuaXNTY3JvbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPblNjcm9sbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9kZS5pc09uS2V5dXAgJiYgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBub2RlLmlzT25LZXl1cCA9IGZhbHNlO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlT25LZXl1cCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRCYXNlNjRJbWFnZShpbWc6YW55KSB7XG4gICAgICAgIGxldCBkYXRhVVJMID0gJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgdmFyIGN0eDphbnkgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG4gICAgICAgICAgICBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBkYXRhVVJMO1xuICAgIH1cblxuICAgIHJlYWRTcmMgPShub2RlOmFueSwgdXJsOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJhc2U2NEltYWdlKG5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgcmNpZDogbm9kZS5yY2lkLFxuICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgIHNyYzogdGhpcy5nZXRCYXNlNjRJbWFnZShub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5hc3NldExvYWRlZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjdXJzaXZlbHlDaGVja1RhcmdldEhhc0NsaWNrRXZlbnRzOmFueSA9KHRhcmdldDphbnkpPT4ge1xuICAgICAgICBpZih0YXJnZXQub25jbGljayB8fCB0YXJnZXQub25tb3VzZWRvd24gfHwgdGFyZ2V0Lm9ubW91c2V1cCB8fCB0YXJnZXQub25jaGFuZ2UgfHwgXG4gICAgICAgICAgICBbJ0lOUFVUJ10uaW5kZXhPZih0YXJnZXQudGFnTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRhcmdldC50YWdOYW1lICE9PSAnQk9EWScgJiYgdGFyZ2V0LnBhcmVudE5vZGUpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjdXJzaXZlbHlDaGVja1RhcmdldEhhc0NsaWNrRXZlbnRzKHRhcmdldC5wYXJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogIE11dGFpb24gSGFuZGxlclxuICAgICAqIFxuICAgICAqL1xuXG4gICAgaGFuZGxlTXV0YXRpb25zID0obXV0YXRpb25zOmFueSk9PiB7XG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICAgICAgaWYoIW11dGF0aW9uLnRhcmdldCkgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBmb3IobGV0IGlkeCBpbiB0aGlzLmJsYWNrbGlzdGVkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJsYWNrbGlzdGVkTm9kZXNbaWR4XS5jb250YWlucyhtdXRhdGlvbi50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpcHBlZE11dGF0aW9ucysrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNraXBwZWRNdXRhdGlvbnMpO1xuXG4gICAgICAgICAgICBzd2l0Y2gobXV0YXRpb24udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYXJhY3RlckRhdGFNdXRhdGlvbihtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBldmVudFR5cGVzLmNoaWxkTGlzdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGlsZExpc3QobXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlcy5hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUF0dHJpYnV0ZXMobXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhcmFjdGVyRGF0YU11dGF0aW9uID0obXV0YXRpb246YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHJjaWQ6IG11dGF0aW9uLnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhLFxuICAgICAgICAgICAgdGV4dDogbXV0YXRpb24udGFyZ2V0LmRhdGFcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZExpc3QgPShtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICBsZXQgcmVtb3ZlZE5vZGVzID0gW107XG4gICAgICAgIGxldCBhZGRlZE5vZGVzID0gW107XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IG11dGF0aW9uLnJlbW92ZWROb2Rlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBpZihtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XS5yY2lkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVkTm9kZXMucHVzaChtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XS5yY2lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZEZyb21BbGxFdmVudChtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpZHg9MDsgaWR4IDwgbXV0YXRpb24uYWRkZWROb2Rlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlSWQobXV0YXRpb24uYWRkZWROb2Rlc1tpZHhdKTtcbiAgICAgICAgICAgIGFkZGVkTm9kZXMucHVzaCh0aGlzLmdldEhUTUwobXV0YXRpb24uYWRkZWROb2Rlc1tpZHhdKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHBhcmVudDogbXV0YXRpb24udGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNoaWxkTGlzdCxcbiAgICAgICAgICAgIGFkZGVkTm9kZXMsXG4gICAgICAgICAgICByZW1vdmVkTm9kZXMsXG4gICAgICAgICAgICBuZXh0U2libGluZzogbXV0YXRpb24ubmV4dFNpYmxpbmcgPyBtdXRhdGlvbi5uZXh0U2libGluZy5yY2lkIDogbnVsbCxcbiAgICAgICAgICAgIHByZXZpb3VzU2libGluZzogbXV0YXRpb24ucHJldmlvdXNTaWJsaW5nID8gbXV0YXRpb24ucHJldmlvdXNTaWJsaW5nLnJjaWQgOiBudWxsLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZUF0dHJpYnV0ZXMgPShtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgcmNpZDogbXV0YXRpb24udGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lLFxuICAgICAgICAgICAgYXR0cmlidXRlVmFsdWU6IG11dGF0aW9uLnRhcmdldC5nZXRBdHRyaWJ1dGUobXV0YXRpb24uYXR0cmlidXRlTmFtZSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIEV2ZW50IEhhbmRsZXJzXG4gICAgICovXG5cbiAgICBoYW5kbGVPblNjcm9sbCA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIGxldCBub2RlID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50O1xuXG4gICAgICAgIGlmKCFub2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGxldCBzY3JvbGwgPSB7fVxuXG4gICAgICAgIGlmKG5vZGUucmNpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBzY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBub2RlLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgc2Nyb2xsTGVmdDogbm9kZS5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICByY2lkOiAtMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbCA9IHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG5vZGUuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IG5vZGUuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICByY2lkOiBub2RlLnJjaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAoPGFueT5zY3JvbGwpLnR5cGUgPSBldmVudFR5cGVzLnNjcm9sbDtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHNjcm9sbCk7XG4gICAgfVxuXG4gICAgaGFuZGxlT25LZXl1cCA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICByY2lkOiBldmVudC50YXJnZXQucmNpZCxcbiAgICAgICAgICAgIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmlucHV0VmFsdWVcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICB9XG5cbiAgICBoYW5kbGVNb3VzZU1vdmUgPShldmVudDphbnkpPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgbW91c2VYOiBldmVudC5wYWdlWCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgbW91c2VZOiBldmVudC5wYWdlWSAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLm1vdXNlTW92ZVxuICAgICAgICB9KTsgICAgIFxuICAgIH1cblxuICAgIGhhbmRsZU1vdXNlQ2xpY2sgPShldmVudDphbnkpPT4ge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ID8gZXZlbnQudGFyZ2V0IDogbnVsbDtcbiAgICAgICAgbGV0IGlzUmVzcG9uc2l2ZSA9IHRhcmdldCAhPT0gbnVsbCA/IHRoaXMucmVjdXJzaXZlbHlDaGVja1RhcmdldEhhc0NsaWNrRXZlbnRzKHRhcmdldCkgOiBmYWxzZTtcbiAgICAgICAgbGV0IGlzTGluayA9IHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQuaHJlZiA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIG1vdXNlWDogZXZlbnQucGFnZVgsXG4gICAgICAgICAgICBtb3VzZVk6IGV2ZW50LnBhZ2VZLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5tb3VzZUNsaWNrLFxuICAgICAgICAgICAgaXNSZXNwb25zaXZlLFxuICAgICAgICAgICAgaXNMaW5rXG4gICAgICAgIH0pOyAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogIFRoZSBTbmFwc2hvdFxuICAgICAqIFxuICAgICAqL1xuIFxuICAgIHBvcHVsYXRlSWQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIG5vZGUucmNpZCA9IGN1cnJlbnROb2RlSWQ7XG4gICAgICAgIGN1cnJlbnROb2RlSWQrKztcbiAgICAgICAgaWYobm9kZS5jaGlsZE5vZGVzICYmIG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgbm9kZS5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkOmFueSk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZUlkKGNoaWxkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja05vZGVJc1ZhbGlkID0obm9kZTphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmNsYXNzTmFtZSAmJiBub2RlLmNsYXNzTmFtZS5pbmRleE9mICYmIGJsYWNrbGlzdGVkRWxCeUNsYXNzLmZpbHRlcihkPT4gbm9kZS5jbGFzc05hbWUuaW5kZXhPZihkKSAhPT0gLTEpLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ibGFja2xpc3RlZE5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29udmVydFRvQWJzb2x1dGVQYXRoID0ocGF0aDphbnkpPT4ge1xuICAgICAgICBpZihwYXRoPT1udWxsKVxuICAgICAgICAgICAgcmV0dXJuICdub3BhdGgnO1xuICAgICAgICByZXR1cm4gbmV3IFVSTChwYXRoLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKS5ocmVmOyBcbiAgICB9XG5cbiAgICBnZXRIVE1MID0obm9kZTphbnkpPT4ge1xuICAgICAgICBsZXQgZWw6YW55ID0ge307XG5cbiAgICAgICAgaWYobm9kZS5ub2RlTmFtZSA9PT0gJyN0ZXh0Jykge1xuICAgICAgICAgICAgZWwubm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lO1xuICAgICAgICAgICAgZWwudmFsdWUgPSBub2RlLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIGVsLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC50YWdOYW1lID0gWydCT0RZJ10uaW5kZXhPZihub2RlLnRhZ05hbWUpICE9PSAtMSA/ICdESVYnIDogbm9kZS50YWdOYW1lO1xuICAgICAgICAgICAgZWwuYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICAgICAgZWwudHlwZSA9ICdlbGVtZW50JztcbiAgICAgICAgICAgIGlmKG5vZGUudGFnTmFtZSA9PT0gJ0lGUkFNRScpIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG5vZGUuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogbm9kZS5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobm9kZS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBhdHRySW5kZXg9MDsgYXR0ckluZGV4PG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGF0dHJJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGJsYWNrbGlzdGVkQXR0cnMuaW5kZXhPZihub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS5sb2NhbE5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0ubG9jYWxOYW1lID09PSAnc3JjJyAmJiBub2RlLnRhZ05hbWUgIT09ICdJRlJBTUUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5yZWFkSW1hZ2VTcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3JjID0gdGhpcy5yZWFkU3JjKG5vZGUsIG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3JjVVJMID0gdGhpcy5jb252ZXJ0VG9BYnNvbHV0ZVBhdGgobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNyYyA9IHRoaXMuY29udmVydFRvQWJzb2x1dGVQYXRoKG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmF0dHJpYnV0ZXNbbm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0ubG9jYWxOYW1lXSA9IG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiAgRXZlbnQgQmluZGluZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgICAgIGlmKFsnJywgJ1gnLCAnWSddLm1hcChkPT5bJ3Njcm9sbCcsICdhdXRvJ10uaW5kZXhPZigoPGFueT5zdHlsZSlbJ292ZXJmbG93JytkXSkgIT09IC0xKS5maWx0ZXIoZD0+ZCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU2Nyb2xsKG5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpbnB1dE5vZGVOYW1lcy5pbmRleE9mKG5vZGUubm9kZU5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZE9uS2V5dXAobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWwucmNpZCA9IG5vZGUucmNpZDtcbiAgICAgICAgZWwuY2hpbGROb2RlcyA9IFtdXG4gICAgICAgIGlmKG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgbm9kZS5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkOmFueSk9PiB7XG4gICAgICAgICAgICAgICAgaWYoY2hpbGQubm9kZU5hbWUgIT09ICdTQ1JJUFQnICYmIGNoaWxkLm5vZGVOYW1lICE9PSAnTk9TQ1JJUFQnICYmIGNoaWxkLm5vZGVOYW1lICE9PSAnI2NvbW1lbnQnICYmIHRoaXMuY2hlY2tOb2RlSXNWYWxpZChjaGlsZCkpICB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNoaWxkTm9kZXMucHVzaCh0aGlzLmdldEhUTUwoY2hpbGQpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIHRha2VTbmFwc2hvdCA9KG5vZGU6YW55LCBpbml0aWFsOmFueSk9PiB7XG4gICAgICAgIHRoaXMucG9wdWxhdGVJZChub2RlKTtcbiAgICAgICAgbGV0IGNsb25lID0gdGhpcy5nZXRIVE1MKG5vZGUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5zbmFwc2hvdCwgXG4gICAgICAgICAgICBkb206IGNsb25lLCBcbiAgICAgICAgICAgIGNzc1J1bGVzLCBcbiAgICAgICAgICAgIGluaXRpYWwsXG4gICAgICAgICAgICBzY3JlZW5XaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIHNjcm9sbFRvcDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIHNjcm9sbExlZnQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgY29uc29sZVN0YXR1czogdGhpcy5jb25zb2xlU3RhdHVzLFxuICAgICAgICAgICAgbG9jYXRpb246IHRoaXMuZ2V0VVJMRGV0YWlscygpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFdlYiBSZXF1ZXN0IFRyYWNrZXJcbiAgICAgKi9cblxuICAgIHRyYWNrQWxsUmVxID0oKT0+IHtcblxuICAgICAgICBjb25zdCB0cmFja1hNTFJlcSA9IHRoaXMudHJhY2tYTUxSZXE7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICB4bWxIdHRwUmVxXG4gICAgICAgICAqL1xuXG4gICAgICAgIGxldCBvcGVuID0gWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW47XG4gICAgICAgICg8YW55PlhNTEh0dHBSZXF1ZXN0KS5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKG1ldGhvZDphbnksIHVybDpzdHJpbmcsIGFzeW5jOmJvb2xlYW4pIHtcbiAgICAgICAgICAgIGxldCByZXEgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5vbnByb2dyZXNzID0gZnVuY3Rpb24oZDphbnkpIHtcbiAgICAgICAgICAgICAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0cmFja1hNTFJlcSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlcS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luY1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wZW4uY2FsbCh0aGlzLCBtZXRob2QsIHVybCwgYXN5bmMpO1xuICAgICAgICB9OyBcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRmV0Y2hcbiAgICAgICAgICovXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUZldGNoKHByb21pc2U6YW55LCB1cmw6U3RyaW5nLCBwYXJhbXM6YW55KSB7XG4gICAgICAgICAgICBsZXQgcmVzcCA9IGF3YWl0IHByb21pc2U7IFxuICAgICAgICAgICAgdHJhY2tYTUxSZXEoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogcGFyYW1zLm1ldGhvZCB8fCAnR0VUJyxcbiAgICAgICAgICAgICAgICBhc3luYzogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICAoPGFueT53aW5kb3cpLl9fZmV0Y2hfXyA9IHdpbmRvdy5mZXRjaDtcbiAgICAgICAgKDxhbnk+d2luZG93KS5mZXRjaCA9KHVybDpTdHJpbmcsIHBhcmFtczphbnkpPT4ge1xuICAgICAgICAgICAgbGV0IHJlcSA9ICg8YW55PndpbmRvdykuX19mZXRjaF9fKHVybCwgcGFyYW1zKTtcbiAgICAgICAgICAgIGhhbmRsZUZldGNoKHJlcS50aGVuKCksIHVybCwgcGFyYW1zKTtcbiAgICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFja1hNTFJlcSA9KGFyZ3M6YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMueG1sSHR0cFJlcSxcbiAgICAgICAgICAgIC4uLmFyZ3NcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgTWV0YSBEYXRhXG4gICAgICovXG5cbiAgICBnZXRBbGxNZXRhRGF0YSA9KGdlbmVyYXRlRXZlbnQ9dHJ1ZSk9PiB7XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuYnJvd3Nlck1ldGEsXG4gICAgICAgICAgICBicm93c2VyOiB0aGlzLmdldEJyb3dzZXIoKSxcbiAgICAgICAgICAgIG9zOiB0aGlzLmdldE9TKCksXG4gICAgICAgICAgICBjb3JlOiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSxcbiAgICAgICAgICAgIGNvb2tpZUVuYWJsZWQ6IG5hdmlnYXRvci5jb29raWVFbmFibGVkLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IG5hdmlnYXRvci5sYW5ndWFnZSxcbiAgICAgICAgICAgIGRldmljZU1lbW9yeTogKDxhbnk+bmF2aWdhdG9yKS5kZXZpY2VNZW1vcnksXG4gICAgICAgICAgICBpc1RvdWNoRGV2aWNlOiB0aGlzLmdldElzVG91Y2hEZXZpY2UoKSxcbiAgICAgICAgICAgIHJlZmVycmVyOmRvY3VtZW50LnJlZmVycmVyLFxuICAgICAgICAgICAgYXBwVmVyc2lvbjogbmF2aWdhdG9yLmFwcFZlcnNpb24sXG4gICAgICAgICAgICB1c2VyQWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgfTtcbiAgICAgICAgaWYoZ2VuZXJhdGVFdmVudClcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudChldmVudClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG5cbiAgICBnZXRJc1RvdWNoRGV2aWNlKCkge1xuICAgICAgICByZXR1cm4gICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCAoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdylcbiAgICAgICAgICAgIHx8IChuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKVxuICAgICAgICAgICAgfHwgKG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCkpXG4gICAgfVxuXG4gICAgZ2V0QnJvd3Nlcigpe1xuICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LCB0ZW0sXG4gICAgICAgIE09IHVhLm1hdGNoKC8ob3BlcmF8Y2hyb21lfHNhZmFyaXxmaXJlZm94fG1zaWV8dHJpZGVudCg/PVxcLykpXFwvP1xccyooXFxkKykvaSkgfHwgW107XG4gICAgICAgIGlmKC90cmlkZW50L2kudGVzdChNWzFdKSl7XG4gICAgICAgICAgICB0ZW09ICAvXFxicnZbIDpdKyhcXGQrKS9nLmV4ZWModWEpIHx8IFtdO1xuICAgICAgICAgICAgcmV0dXJuICdJRSAnKyh0ZW1bMV0gfHwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGlmKE1bMV09PT0gJ0Nocm9tZScpe1xuICAgICAgICAgICAgdGVtPSB1YS5tYXRjaCgvXFxiKE9QUnxFZGdlPylcXC8oXFxkKykvKTtcbiAgICAgICAgICAgIGlmKHRlbSE9IG51bGwpIHJldHVybiB0ZW0uc2xpY2UoMSkuam9pbignICcpLnJlcGxhY2UoJ09QUicsICdPcGVyYScpLnJlcGxhY2UoJ0VkZyAnLCAnRWRnZSAnKTtcbiAgICAgICAgfVxuICAgICAgICBNPSBNWzJdPyBbTVsxXSwgTVsyXV06IFtuYXZpZ2F0b3IuYXBwTmFtZSwgbmF2aWdhdG9yLmFwcFZlcnNpb24sICctPyddO1xuICAgICAgICBpZigodGVtPSB1YS5tYXRjaCgvdmVyc2lvblxcLyhcXGQrKS9pKSkhPSBudWxsKSBNLnNwbGljZSgxLCAxLCB0ZW1bMV0pO1xuICAgICAgICByZXR1cm4gTS5qb2luKCcgJyk7XG4gICAgfVxuXG4gICAgZ2V0T1MoKSB7XG4gICAgICAgIHZhciB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAgIHBsYXRmb3JtID0gd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSxcbiAgICAgICAgICAgIG1hY29zUGxhdGZvcm1zID0gWydNYWNpbnRvc2gnLCAnTWFjSW50ZWwnLCAnTWFjUFBDJywgJ01hYzY4SyddLFxuICAgICAgICAgICAgd2luZG93c1BsYXRmb3JtcyA9IFsnV2luMzInLCAnV2luNjQnLCAnV2luZG93cycsICdXaW5DRSddLFxuICAgICAgICAgICAgaW9zUGxhdGZvcm1zID0gWydpUGhvbmUnLCAnaVBhZCcsICdpUG9kJ10sXG4gICAgICAgICAgICBvcyA9IG51bGw7XG4gICAgICBcbiAgICAgICAgaWYgKG1hY29zUGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0pICE9PSAtMSkge1xuICAgICAgICAgIG9zID0gJ01hYyBPUyc7XG4gICAgICAgIH0gZWxzZSBpZiAoaW9zUGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0pICE9PSAtMSkge1xuICAgICAgICAgIG9zID0gJ2lPUyc7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93c1BsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcyA9ICdXaW5kb3dzJztcbiAgICAgICAgfSBlbHNlIGlmICgvQW5kcm9pZC8udGVzdCh1c2VyQWdlbnQpKSB7XG4gICAgICAgICAgb3MgPSAnQW5kcm9pZCc7XG4gICAgICAgIH0gZWxzZSBpZiAoIW9zICYmIC9MaW51eC8udGVzdChwbGF0Zm9ybSkpIHtcbiAgICAgICAgICBvcyA9ICdMaW51eCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcyA9IG9zO1xuICAgICAgICByZXR1cm4gb3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFRyYWNrIENvbnNvbGVcbiAgICAgKi9cblxuICAgIHRyYWNrQ29uc29sZSA9KHBhcmFtczphbnksIHR5cGU6YW55KT0+IHtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpZHg9MDsgaWR4IDwgcGFyYW1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbXNbaWR4XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY29uc29sZSxcbiAgICAgICAgICAgIGNvbnNvbGVUeXBlOiB0eXBlLFxuICAgICAgICAgICAgYXJnc1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRyYWNrQWxsQ29uc29sZUFjdGl2aXR5ID0oKT0+IHsgXG4gICAgICAgIGxldCB0ZW1wQ29uc29sZSA9IHt9O1xuICAgICAgICBjb25zdCB0cmFja0NvbnNvbGUgPSB0aGlzLnRyYWNrQ29uc29sZTtcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGNvbnNvbGVUcmFja0xpc3QpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKDxhbnk+Y29uc29sZSlbY29uc29sZVRyYWNrTGlzdFtpZHhdXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICg8YW55PnRlbXBDb25zb2xlKVtjb25zb2xlVHJhY2tMaXN0W2lkeF1dID0gKDxhbnk+Y29uc29sZSlbY29uc29sZVRyYWNrTGlzdFtpZHhdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgdGhpcy50ZW1wQ29uc29sZSA9IHRlbXBDb25zb2xlO1xuICAgICAgICBjb25zdCBjbG9uZUNvbnNvbGUgPSBmdW5jdGlvbiAoa2V5OmFueSA9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IG51bGwgJiYga2V5IGluIHRlbXBDb25zb2xlKSB7XG4gICAgICAgICAgICAgICAgKDxhbnk+Y29uc29sZSlba2V5XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tDb25zb2xlKGFyZ3VtZW50cywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+Y29uc29sZSlba2V5XSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoKDxhbnk+dGVtcENvbnNvbGUpW2tleV0sIGNvbnNvbGUpO1xuICAgICAgICAgICAgICAgICAgICAoPGFueT5jb25zb2xlKVtrZXldLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lQ29uc29sZShrZXkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkeCBpbiB0ZW1wQ29uc29sZSkge1xuICAgICAgICAgICAgICAgICAgICAoPGFueT5jb25zb2xlKVtpZHhdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tDb25zb2xlKGFyZ3VtZW50cywgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICg8YW55PmNvbnNvbGUpW2lkeF0gPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKCg8YW55PnRlbXBDb25zb2xlKVtpZHhdLCBjb25zb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICg8YW55PmNvbnNvbGUpW2lkeF0uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ29uc29sZShpZHgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbG9uZUNvbnNvbGUoKTtcbiAgICAgICAgd2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvciwgdXJsLCBsaW5lKSB7XG4gICAgICAgICAgICB0cmFja0NvbnNvbGUoW2Vycm9yLCB1cmwsIGxpbmVdLCAnbmV3RXJyb3InKTtcbiAgICAgICAgfTsgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFdpbmRvdyBSZXNpemUgYW5kIE90aGVyc1xuICAgICAqL1xuXG4gICAgdHJhY2tXaW5kb3dSZXNpemUgPSgpPT4ge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCk9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVEZWJvdW5jZSk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZURlYm91bmNlID0gc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLndpbmRvd1Jlc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb25zb2xlU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgfSwgNDAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrQ29uc29sZVN0YXR1cyA9KGdlbmVyYXRlRXZlbnQ9ZmFsc2UpPT4ge1xuICAgICAgICBsZXQgZGV2dG9vbHM6IEZ1bmN0aW9uID0gZnVuY3Rpb24oKXt9O1xuICAgICAgICAoPGFueT5kZXZ0b29scykudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgdGhpcy5vcGVuZWQgPSB0cnVlIH1cbiAgICAgICAgY29uc29sZS5sb2coJyVjJywgZGV2dG9vbHMpO1xuXG4gICAgICAgIGxldCBwcmV2U3RhdHVzID0gdGhpcy5jb25zb2xlU3RhdHVzIHx8IGZhbHNlO1xuICAgICAgICBsZXQgY3VycmVudFN0YXR1cyA9ICg8YW55PmRldnRvb2xzKS5vcGVuZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA+IDE1MCkgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGggPiAxNTApKTtcbiAgICAgICAgaWYocHJldlN0YXR1cyAhPT0gY3VycmVudFN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5jb25zb2xlU3RhdHVzID0gY3VycmVudFN0YXR1cztcbiAgICAgICAgICAgIGlmKGdlbmVyYXRlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNvbnNvbGVTdGF0dXNDaGFuZ2VkLFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlU3RhdHVzOiB0aGlzLmNvbnNvbGVTdGF0dXMsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgV2luZG93IENvbW1hbmRzXG4gICAgICovXG5cbiAgICB0cmFja1dpbmRvd0NvbW1hbmRzID0oKT0+IHtcbiAgICAgICAgY29uc3QgdHJhY2tXaW5kb3dDb21tYW5kID0oZTogYW55KT0+IHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gKGRvY3VtZW50LmFsbCkgPyAoPGFueT53aW5kb3cuZXZlbnQpLmtleUNvZGUgOiBlLndoaWNoOyBcbiAgICAgICAgICAgIGxldCBjbWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDg2KSB7XG4gICAgICAgICAgICAgICAgY21kID0gY29tbWFuZHMuUEFTVEU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDY3KSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLkNPUFk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDgzKSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLlNBVkU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDY4KSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLkJPT0tNQVJLO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjbWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNvbW1hbmRFeGVjdXRlZCxcbiAgICAgICAgICAgICAgICAgICAgY21kXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYWNrQ3RybCA9KGU6IGFueSwgaXNLZXlEb3duOkJvb2xlYW4pPT4ge1xuICAgICAgICAgICAgbGV0IGNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcbiAgICAgICAgICAgIGxldCBpc01hYyA9ICh0aGlzLm9zfHwnJykudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmRleE9mKCdtYWMnKSAhPT0gLTE7XG4gICAgICAgICAgICBpZigoY29kZSA9PT0gOTEgJiYgaXNNYWMpIHx8ICghaXNNYWMgJiYgY29kZSA9PT0gMTcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHJsS2V5U3RhdHVzID0gaXNLZXlEb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlPT50cmFja0N0cmwoZSwgdHJ1ZSksIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlPT50cmFja0N0cmwoZSwgZmFsc2UpLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFja1dpbmRvd0NvbW1hbmQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgVHJhY2sgSGFzaCBDaGFuZ2VcbiAgICAgKi9cblxuICAgIHRyYWNrSGFzaENoYW5nZSA9KCk9PiB7XG4gICAgICAgIHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSAoKT0+IHsgXG4gICAgICAgICAgICBsZXQgZXZlbnQ6YW55ID0gdGhpcy5nZXRVUkxEZXRhaWxzKCk7XG4gICAgICAgICAgICBldmVudC50eXBlID0gZXZlbnRUeXBlcy5oYXNoQ2hhbmdlZDtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRVUkxEZXRhaWxzID0oKT0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAgICAgICAgIHByb3RvY29sOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wsXG4gICAgICAgICAgICBob3N0OiB3aW5kb3cubG9jYXRpb24uaG9zdCxcbiAgICAgICAgICAgIGhvc3RuYW1lOiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUsXG4gICAgICAgICAgICBwb3J0OiB3aW5kb3cubG9jYXRpb24ucG9ydCxcbiAgICAgICAgICAgIHBhdGhuYW1lOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgICAgICBzZWFyY2g6IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsXG4gICAgICAgICAgICBoYXNoOiB3aW5kb3cubG9jYXRpb24uaGFzaCxcbiAgICAgICAgICAgIGhyZWY6IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgVGhlIEV2ZW50IEdlbmVyYXRvclxuICAgICAqL1xuXG4gICAgZ2VuZXJhdGVFdmVudCA9KGFjdGlvbjphbnkpPT4ge1xuICAgICAgICBsZXQgZXZlbnQ6YW55ID0ge1xuICAgICAgICAgICAgdGltZTogcGFyc2VGbG9hdChwZXJmb3JtYW5jZS5ub3coKS50b0ZpeGVkKDQpKVxuICAgICAgICB9IFxuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAgICAgLi4uYWN0aW9uXG4gICAgICAgIH0gXG4gICAgICAgIGlmKCFpbml0aWFsU25hcHNob3RTZW5kICYmIGV2ZW50LmluaXRpYWwpIHtcbiAgICAgICAgICAgIGluaXRpYWxTbmFwc2hvdFNlbmQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICBpZihkYXRhQnVmZmVyLmxlbmd0aCAmJiBpbml0aWFsU25hcHNob3RTZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaWR4IGluIGRhdGFCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudChkYXRhQnVmZmVyW2lkeF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFCdWZmZXIgPSBbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEpXG4gICAgICAgIH1cbiAgICAgICAgaWYoaW5pdGlhbFNuYXBzaG90U2VuZCkge1xuICAgICAgICAgICAgZGF0YS5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMucHVibGlzaExpdmVVcGRhdGUoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYoW2V2ZW50VHlwZXMuYXR0cmlidXRlcywgZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhLCBldmVudFR5cGVzLmNoaWxkTGlzdF0uaW5kZXhPZihldmVudC50eXBlKSA9PT0gLTEpe1xuICAgICAgICAgICAgZGF0YUJ1ZmZlci5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1Ymxpc2hMaXZlVXBkYXRlID0oZXZlbnQ6IGFueSk9PiB7XG4gICAgICAgIGlmKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxldCBtc2c6YW55ID0gdGhpcy53cmFwRXZlbnQoZXZlbnQpOyBcbiAgICAgICAgICAgICg8YW55PndpbmRvdykucmNEYXRhLnB1c2gobXNnKTtcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIobXNnLCBkYXRhKTtcbiAgICAgICAgfSAgIFxuICAgIH1cblxuICAgIGdldExpdmVVcGRhdGUgPShsaXN0ZW5lcjphbnkpPT4ge1xuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgICAgIGlmKGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IHRoaXMud3JhcEV2ZW50KGRhdGFbZGF0YS5sZW5ndGgtMV0pXG4gICAgICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcihtc2csIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JhcEV2ZW50ID0oZGF0YTphbnkpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YTsgXG4gICAgfVxuXG59IiwiaW1wb3J0ICcuLi9IZWxwZXJzL0RvY1JlYWR5JztcbmltcG9ydCB7Z2V0U0lELCBsb2FkSlMsIGdlbmVyYXRlU0lEfSBmcm9tICcuLi9IZWxwZXJzL0hlbHBlcnMnO1xuaW1wb3J0IFJlY29yZGVyIGZyb20gJy4uL1JlY29yZGVyL1JlY29yZGVyJztcbmltcG9ydCB7aG9zdH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmludGVyZmFjZSBSSEFyZ3Mge1xuICAgIGNsaWVudElkOiBTdHJpbmcsXG4gICAgYXBwSWQ6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRlckhhbmRsZXIge1xuXG4gICAgc2lkOiBTdHJpbmc7XG4gICAgY2lkOiBTdHJpbmc7XG4gICAgYWlkOiBTdHJpbmc7XG4gICAgcmNEYXRhQnVmZmVyOiBBcnJheTxhbnk+ID0gW107XG4gICAgcmVjb3JkZXJEYXRhOiBBcnJheTxhbnk+ID0gW107XG4gICAgcmVjb3JkZXI6IGFueSA9IG51bGw7XG4gICAgc29ja2V0OiBhbnk7XG4gICAgc29ja2V0SW50ZXI6IGFueTtcbiAgICBpbml0aWF0ZWQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBwYWNrZXRJbmRleDogYW55ID0gMDsgXG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBSSEFyZ3MpIHtcblxuICAgICAgICB0aGlzLnNpZCA9IGdldFNJRCgpO1xuICAgICAgICB0aGlzLmFpZCA9IGFyZ3MuYXBwSWQ7XG4gICAgICAgIHRoaXMuY2lkID0gYXJncy5jbGllbnRJZDtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnRE9DIFJlYWR5IDEnKVxuXG4gICAgICAgICg8YW55PndpbmRvdykuZG9jUmVhZHkoKCk9PiB7XG4gICAgICAgICAgICBsb2FkSlMoJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NvY2tldC5pby8yLjMuMC9zb2NrZXQuaW8uc2xpbS5qcycsICgpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvY2tldCBsb2FkZWQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXIgPSBuZXcgUmVjb3JkZXIoe1xuICAgICAgICAgICAgICAgICAgICBzaWQ6IHRoaXMuc2lkLFxuICAgICAgICAgICAgICAgICAgICBjaWQ6IHRoaXMuY2lkLFxuICAgICAgICAgICAgICAgICAgICBhaWQ6IHRoaXMuYWlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5nZXRMaXZlVXBkYXRlKHRoaXMub25SZWNvcmRlclVwZGF0ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnQoZG9jdW1lbnQuYm9keSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW8gPSAoPGFueT53aW5kb3cpLmlvO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gaW8uY29ubmVjdChob3N0LCB7dHJhbnNwb3J0czpbJ3dlYnNvY2tldCcsICdwb2xsaW5nJ119KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vbmNlKCdjb25uZWN0JywgdGhpcy5vbkNvbm5lY3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uY2UoJ3JlY29ubmVjdCcsIHRoaXMub25Db25uZWN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vbmNlKCdkaXNjb25uZWN0JywgdGhpcy5vbkRpc2Nvbm5lY3QpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgd2luZG93KVxuXG4gICAgfVxuIFxuICAgIG9uRGlzY29ubmVjdCA9KCk9PiB7XG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25Db25uZWN0ID0oKT0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZCB0byBTb2NrZXQnKTtcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTZW5kaW5nIFNlc3Npb24gTWV0YVxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IHNlc3Npb25NZXRhRGF0YSA9IHRoaXMuZ2V0U2Vzc2lvbk1ldGEoKTtcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc2Vzc2lvblJlY2l2ZXInLCBzZXNzaW9uTWV0YURhdGEpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgU2VuZGluZyBCdWZmZXJlZCBEYXRhXG4gICAgICAgICAqL1xuICAgICAgICBmb3IobGV0IGlkeCBpbiB0aGlzLnJlY29yZGVyRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZW5kVG9TZXJ2ZXIodGhpcy5yZWNvcmRlckRhdGFbaWR4XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWNvcmRlckRhdGEgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogIEluaXRpYXRpbmcgU2VuZGVyXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNvY2tldEludGVyID0gc2V0SW50ZXJ2YWwoKCk9PiB7XG4gICAgICAgICAgICBpZih0aGlzLnJjRGF0YUJ1ZmZlciAmJiB0aGlzLnJjRGF0YUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gU2VuZGluZyBEYXRhJywgdGhpcy5yY0RhdGFCdWZmZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBsZXQgcGFja2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICBzaWQ6IHRoaXMuc2lkLFxuICAgICAgICAgICAgICAgICAgICBjaWQ6IHRoaXMuY2lkLFxuICAgICAgICAgICAgICAgICAgICBhaWQ6IHRoaXMuYWlkLFxuICAgICAgICAgICAgICAgICAgICBwaWQ6IHRoaXMuZ2V0UElEKCksXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLnBhY2tldEluZGV4LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXZlbnQnLFxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucmNEYXRhQnVmZmVyXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhY2tldEluZGV4Kz0xO1xuICAgICAgICAgICAgICAgIGlmKCg8YW55PndpbmRvdykuQVJDRGV2IHx8IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemU6YW55ID0gIEpTT04uc3RyaW5naWZ5KHBhY2tldCkubGVuZ3RoICogMjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFBhY2tldCBzaXplJywgc2l6ZSwgJ0J5dGVzLCAnLCBNYXRoLmNlaWwoc2l6ZS8xMDI0KSwgJ2tiJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc2Vzc2lvblJlY2l2ZXInLCBwYWNrZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmNEYXRhQnVmZmVyID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cblxuICAgIGdldFBJRCA9KCk9PiBnZW5lcmF0ZVNJRCgpXG5cbiAgICBzZW5kVG9TZXJ2ZXIgPShldmVudDogYW55KT0+IHtcbiAgICAgICAgaWYoIXRoaXMuaW5pdGlhdGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMucmNEYXRhQnVmZmVyLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIG9uUmVjb3JkZXJVcGRhdGVyID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgdGhpcy5yZWNvcmRlckRhdGEucHVzaChldmVudCk7XG4gICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBnZXRTZXNzaW9uTWV0YSA9KCk9PiB7XG4gICAgICAgIGlmKCF0aGlzLnJlY29yZGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbQVJDXSBGQVRBTCBFUlI6IFJlY29yZGVyIG5vdCBGb3VuZCcpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1ldGE6YW55ID0gdGhpcy5yZWNvcmRlci5nZXRBbGxNZXRhRGF0YShmYWxzZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzaWQ6IHRoaXMuc2lkLFxuICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgIGFpZDogdGhpcy5haWQsXG4gICAgICAgICAgICB0eXBlOidzZXNzaW9uJyxcbiAgICAgICAgICAgIGRldmljZVR5cGU6ICdkZXNrdG9wJyxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIG1ldGFEYXRhOiB7XG4gICAgICAgICAgICAgIGJyb3dzZXJOYW1lOiBtZXRhLmJyb3dzZXIsXG4gICAgICAgICAgICAgIG9zOiBtZXRhLm9zLFxuICAgICAgICAgICAgICBjcHVDb3JlOiBtZXRhLmNvcmUsXG4gICAgICAgICAgICAgIGRldmljZU1lbW9yeTogbWV0YS5kZXZpY2VNZW1vcnksXG4gICAgICAgICAgICAgIHNjcmVlblR5cGU6IG1ldGEuaXNUb3VjaERldmljZSxcbiAgICAgICAgICAgICAgbGFuZ3VhZ2U6IG1ldGEubGFuZ3VhZ2UsXG4gICAgICAgICAgICAgIGNvb2tpZUVuYWJsZWQ6IG1ldGEuY29va2llRW5hYmxlZCxcbiAgICAgICAgICAgICAgcmVmZXJyZXI6IG1ldGEucmVmZXJyZXIsXG4gICAgICAgICAgICAgIGJyb3dzZXJWZXJzaW9uOiBtZXRhLmJyb3dzZXIsXG4gICAgICAgICAgICAgIG9zVmVyc2lvbjogbWV0YS5vcyxcbiAgICAgICAgICAgICAgdXNlckFnZW50OiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IFJlY29yZGVySGFuZGxlciBmcm9tICcuL1JlY29yZGVySGFuZGxlci9SZWNvcmRlckhhbmRsZXInO1xuXG5cbmNvbnN0IHN0YXJ0QVJDPShjbGllbnRJZDpTdHJpbmcsIGFwcElkOlN0cmluZyk9PiB7XG4gICAgY29uc29sZS5sb2coJ1JlY29yZGVyIEhhbmRsZXIgSW5pdGlhdGVkLCBDbGllbnQgSUQnLCBjbGllbnRJZCwgJ0FwcCBJRCcsIGFwcElkKVxuICAgIG5ldyBSZWNvcmRlckhhbmRsZXIoe2NsaWVudElkLCBhcHBJZH0pO1xufVxuXG4oPGFueT53aW5kb3cpLnN0YXJ0QVJDID0gc3RhcnRBUkM7XG5cblxuZXhwb3J0IGRlZmF1bHQgc3RhcnRBUkM7Il0sInNvdXJjZVJvb3QiOiIifQ==