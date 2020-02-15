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
    hashChanged: 'hashChanged',
    styleSheetString: 'styleSheetString',
    error: 'error',
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
/* harmony import */ var _Helpers_XHR__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers/XHR */ "./src/SDK/Helpers/XHR.ts");


var DomParser = /** @class */ (function () {
    function DomParser(args) {
        var _this = this;
        this.cssRules = '';
        this.inputNodeNames = ['TEXTAREA', 'INPUT'];
        this.readImageSrc = false;
        // search for class
        this.fetchAndRecordStyle = function (url) {
            console.log('[ARC] Fetching StyleSheet', url);
            _Helpers_XHR__WEBPACK_IMPORTED_MODULE_1__["default"].get(url, function () { })
                .then(function (css) {
                console.log('[ARC] Fetching StyleSheet Successfull', url);
                _this.getRecorder().generateEvent({
                    type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].styleSheetString,
                    css: css
                });
            }, function (err) {
                console.log('[ARC] Fetching StyleSheet Failed', url, err);
                _this.getRecorder().generateEvent({
                    type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].styleSheetString,
                    err: err
                });
            });
        };
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
                // this.getRecorder().generateEvent({
                //     type: eventTypes.styleSheetsLoadReq,
                //     href: document.styleSheets[idx].href
                // });
                // }
                _this.fetchAndRecordStyle(document.styleSheets[idx].href);
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

/***/ "./src/SDK/Helpers/XHR.ts":
/*!********************************!*\
  !*** ./src/SDK/Helpers/XHR.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
    get: function (url, onprogress) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // executor (the producing code, "singer")
                    var rq = new XMLHttpRequest();
                    rq.onreadystatechange = function () {
                        if (rq.readyState === 4) {
                            var data = rq.responseText;
                            try {
                                data = JSON.parse(data);
                            }
                            catch (e) { }
                            if (rq.status === 200) {
                                resolve(data);
                            }
                            else if (rq.status !== 200) {
                                reject(data);
                            }
                        }
                    };
                    rq.open("GET", url, true);
                    if (onprogress) {
                        rq.onprogress = onprogress;
                    }
                    rq.send(null);
                })];
        });
    }); }
});


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
        console.log('[ARC] Recorder Initiated. V 0.2.3');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zb2xlSGFuZGxlci9Db25zb2xlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0NvbnN0YW50cy9Db25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zdGFudHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvRG9tUGFyc2VyL0RvbVBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0hlbHBlcnMvRG9jUmVhZHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9IZWxwZXJzL0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9IZWxwZXJzL1hIUi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL01ldGFEYXRhSGFuZGxlci9NZXRhRGF0YUhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9NdXRhdGlvbkhhbmRsZXIvTXV0YXRpb25IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvUmVjb3JkZXIvUmVjb3JkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9SZWNvcmRlckhhbmRsZXIvUmVjb3JkZXJIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvV2ViUmVxdWVzdEhhbmRsZXIvV2ViUmVxdWVzdEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9XaW5kb3dFdmVudEhhbmRsZXIvV2luZG93RXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FB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O2dCQUNsRCxLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQzthQUNsQztRQUNMLENBQUM7UUFDRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFdBQUMsSUFBRSxnQkFBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBbEIsQ0FBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQUMsSUFBRSxnQkFBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBbkIsQ0FBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBbURMLHlCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNwR0Q7QUFBQTtBQUFnRTtBQUdoRSxJQUFNLFFBQVEsR0FBQyxVQUFDLFFBQWUsRUFBRSxLQUFZO0lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7SUFDckYsSUFBSSx3RUFBZSxDQUFDLEVBQUMsUUFBUSxZQUFFLEtBQUssU0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVBLE1BQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBR3JCLHVFQUFRLEVBQUMiLCJmaWxlIjoiYXBwbHl0aWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvU0RLL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgXG4gICAgZXZlbnRUeXBlcywgXG4gICAgY29uc29sZVRyYWNrTGlzdFxufSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc29sZUhhbmRsZXIge1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuICAgIHRlbXBDb25zb2xlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG4gICAgICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluZGV4T2YoJ2xvY2FsaG9zdCcpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy50cmFja0FsbENvbnNvbGVBY3Rpdml0eSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICB0cmFja0NvbnNvbGUgPShwYXJhbXM6YW55LCB0eXBlOmFueSk9PiB7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IHBhcmFtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2gocGFyYW1zW2lkeF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY29uc29sZSxcbiAgICAgICAgICAgIGNvbnNvbGVUeXBlOiB0eXBlLFxuICAgICAgICAgICAgYXJnc1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRyYWNrQWxsQ29uc29sZUFjdGl2aXR5ID0oKT0+IHsgXG4gICAgICAgIGxldCB0ZW1wQ29uc29sZSA9IHt9O1xuICAgICAgICBjb25zdCB0cmFja0NvbnNvbGUgPSB0aGlzLnRyYWNrQ29uc29sZTtcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGNvbnNvbGVUcmFja0xpc3QpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGNvbnNvbGUgYXMgYW55KVtjb25zb2xlVHJhY2tMaXN0W2lkeF1dID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgKHRlbXBDb25zb2xlIGFzIGFueSlbY29uc29sZVRyYWNrTGlzdFtpZHhdXSA9IChjb25zb2xlIGFzIGFueSlbY29uc29sZVRyYWNrTGlzdFtpZHhdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgdGhpcy50ZW1wQ29uc29sZSA9IHRlbXBDb25zb2xlO1xuICAgICAgICBjb25zdCBjbG9uZUNvbnNvbGUgPSBmdW5jdGlvbiAoa2V5OmFueSA9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IG51bGwgJiYga2V5IGluIHRlbXBDb25zb2xlKSB7XG4gICAgICAgICAgICAgICAgKGNvbnNvbGUgYXMgYW55KVtrZXldID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFja0NvbnNvbGUoYXJndW1lbnRzLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAoY29uc29sZSAgYXMgYW55KVtrZXldID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbCgodGVtcENvbnNvbGUgIGFzIGFueSlba2V5XSwgY29uc29sZSk7XG4gICAgICAgICAgICAgICAgICAgIChjb25zb2xlICBhcyBhbnkpW2tleV0uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVDb25zb2xlKGtleSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWR4IGluIHRlbXBDb25zb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIChjb25zb2xlICBhcyBhbnkpW2lkeF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFja0NvbnNvbGUoYXJndW1lbnRzLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgIGFzIGFueSlbaWR4XSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoKHRlbXBDb25zb2xlICBhcyBhbnkpW2lkeF0sIGNvbnNvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgIGFzIGFueSlbaWR4XS5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVDb25zb2xlKGlkeCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNsb25lQ29uc29sZSgpO1xuICAgICAgICB3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKGVycm9yLCB1cmwsIGxpbmUpIHtcbiAgICAgICAgICAgIHRyYWNrQ29uc29sZShbZXJyb3IsIHVybCwgbGluZV0sICduZXdFcnJvcicpO1xuICAgICAgICB9OyBcbiAgICB9XG5cbn0iLCJleHBvcnQgY29uc3QgcmVjb3JkZXJDb25maWcgPSB7XG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLCAgXG59IiwiZXhwb3J0IGNvbnN0IGhvc3QgPSAnaHR0cHM6Ly90ZXN0LmFwcGx5dGljcy5pbic7XG5leHBvcnQgY29uc3QgZXZlbnRUeXBlcyA9IHtcbiAgICBzbmFwc2hvdDogJ3NuYXBzaG90JyxcbiAgICBjaGFyYWN0ZXJEYXRhOiAnY2hhcmFjdGVyRGF0YScsXG4gICAgY2hpbGRMaXN0OiAnY2hpbGRMaXN0JyxcbiAgICBhdHRyaWJ1dGVzOiAnYXR0cmlidXRlcycsXG4gICAgc2Nyb2xsOiAnc2Nyb2xsJyxcbiAgICBpbnB1dFZhbHVlOiAnaW5wdXRWYWx1ZScsXG4gICAgbW91c2VDbGljazogJ21vdXNlQ2xpY2snLFxuICAgIG1vdXNlTW92ZTogJ21vdXNlTW92ZScsXG4gICAgYXNzZXRMb2FkZWQ6ICdhc3NldExvYWRlZCcsXG4gICAgc3R5bGVTaGVldHNMb2FkUmVxOiAnc3R5bGVTaGVldHNMb2FkUmVxJyxcbiAgICB4bWxIdHRwUmVxOiAneG1sSHR0cFJlcScsXG4gICAgY29uc29sZTogJ2NvbnNvbGUnLFxuICAgIGJyb3dzZXJNZXRhOiAnYnJvd3Nlck1ldGEnLFxuICAgIHdpbmRvd1Jlc2l6ZTogJ3dpbmRvd1Jlc2l6ZScsXG4gICAgY29uc29sZVN0YXR1c0NoYW5nZWQ6ICdjb25zb2xlU3RhdHVzQ2hhbmdlZCcsXG4gICAgY29tbWFuZEV4ZWN1dGVkOiAnY29tbWFuZEV4ZWN1dGVkJyxcbiAgICBoYXNoQ2hhbmdlZDogJ2hhc2hDaGFuZ2VkJyxcbiAgICBzdHlsZVNoZWV0U3RyaW5nOiAnc3R5bGVTaGVldFN0cmluZycsXG4gICAgZXJyb3I6ICdlcnJvcicsXG59XG5leHBvcnQgY29uc3QgY29tbWFuZHMgPSB7XG4gICAgUEFTVEU6IFwiUEFTVEVcIixcbiAgICBDT1BZOiBcIkNPUFlcIixcbiAgICBCT09LTUFSSzogXCJCT09LTUFSS1wiLFxuICAgIFNBVkU6IFwiU0FWRVwiXG59XG5cbmV4cG9ydCBjb25zdCBibGFja2xpc3RlZEVsQnlDbGFzczogQXJyYXk8U3RyaW5nPiA9IFtdO1xuZXhwb3J0IGNvbnN0IGNvbnNvbGVUcmFja0xpc3Q6IEFycmF5PGFueT4gPSBbJ2luZm8nLCAnbG9nJywgJ3dhcm4nLCAnZXJyb3InXVxuZXhwb3J0IGNvbnN0IGJsYWNrbGlzdGVkQXR0cnM6IEFycmF5PFN0cmluZz4gPSBbJ3NyY3NldCddXG4iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBibGFja2xpc3RlZEVsQnlDbGFzcyxcbiAgICBibGFja2xpc3RlZEF0dHJzXG59IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuaW1wb3J0IFhIUiBmcm9tICcuLi9IZWxwZXJzL1hIUic7XG4gXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21QYXJzZXIge1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuICAgIGNzc1J1bGVzOiBTdHJpbmcgPSAnJzsgXG4gICAgaW5wdXROb2RlTmFtZXM6IEFycmF5PFN0cmluZz4gPSBbJ1RFWFRBUkVBJywgJ0lOUFVUJ107IFxuICAgIHJlYWRJbWFnZVNyYzogQm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy8gc2VhcmNoIGZvciBjbGFzc1xuXG4gICAgZmV0Y2hBbmRSZWNvcmRTdHlsZSA9KHVybDogYW55KT0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIEZldGNoaW5nIFN0eWxlU2hlZXQnLCB1cmwpO1xuICAgICAgICBYSFIuZ2V0KHVybCwgKCk9Pnt9KVxuICAgICAgICAgICAgLnRoZW4oY3NzPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBGZXRjaGluZyBTdHlsZVNoZWV0IFN1Y2Nlc3NmdWxsJywgdXJsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuc3R5bGVTaGVldFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgY3NzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBlcnI9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIEZldGNoaW5nIFN0eWxlU2hlZXQgRmFpbGVkJywgdXJsLCBlcnIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5zdHlsZVNoZWV0U3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBlcnJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVjb3JkU3R5bGUgPSgpPT4ge1xuICAgICAgICB0aGlzLmNzc1J1bGVzID0gJyc7XG4gICAgICAgIGxldCBydWxlOiBzdHJpbmc7XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeDxkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAvLyB0cnkge1xuICAgICAgICAgICAgLy8gICAgIGZvcihsZXQgamR4PTA7IGpkeDwoZG9jdW1lbnQuc3R5bGVTaGVldHNbaWR4XSBhcyBhbnkpLnJ1bGVzLmxlbmd0aDsgamR4KyspIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcnVsZSA9IChkb2N1bWVudC5zdHlsZVNoZWV0c1tpZHhdIGFzIGFueSkucnVsZXNbamR4XS5jc3NUZXh0OyBcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jc3NSdWxlcyArPSBydWxlO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0gY2F0Y2ggKGUpIHsgXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgIC8vICAgICB0eXBlOiBldmVudFR5cGVzLnN0eWxlU2hlZXRzTG9hZFJlcSxcbiAgICAgICAgICAgICAgICAvLyAgICAgaHJlZjogZG9jdW1lbnQuc3R5bGVTaGVldHNbaWR4XS5ocmVmXG4gICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLmZldGNoQW5kUmVjb3JkU3R5bGUoZG9jdW1lbnQuc3R5bGVTaGVldHNbaWR4XS5ocmVmKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuICAgIH1cblxuICAgIGdldEhUTUwgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGxldCBlbDphbnkgPSB7fTtcblxuICAgICAgICBpZihub2RlLm5vZGVOYW1lID09PSAnI3RleHQnKSB7XG4gICAgICAgICAgICBlbC5ub2RlTmFtZSA9IG5vZGUubm9kZU5hbWU7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgZWwudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLnRhZ05hbWUgPSBbJ0JPRFknXS5pbmRleE9mKG5vZGUudGFnTmFtZSkgIT09IC0xID8gJ0RJVicgOiBub2RlLnRhZ05hbWU7XG4gICAgICAgICAgICBlbC5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgICAgICBlbC50eXBlID0gJ2VsZW1lbnQnO1xuICAgICAgICAgICAgaWYobm9kZS50YWdOYW1lID09PSAnSUZSQU1FJykge1xuICAgICAgICAgICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogbm9kZS5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBub2RlLmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihub2RlLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGF0dHJJbmRleD0wOyBhdHRySW5kZXg8bm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDsgYXR0ckluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoYmxhY2tsaXN0ZWRBdHRycy5pbmRleE9mKG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLmxvY2FsTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS5sb2NhbE5hbWUgPT09ICdzcmMnICYmIG5vZGUudGFnTmFtZSAhPT0gJ0lGUkFNRScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWRJbWFnZVNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zcmMgPSB0aGlzLnJlYWRTcmMobm9kZSwgbm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zcmNVUkwgPSB0aGlzLmNvbnZlcnRUb0Fic29sdXRlUGF0aChub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3JjID0gdGhpcy5jb252ZXJ0VG9BYnNvbHV0ZVBhdGgobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuYXR0cmlidXRlc1tub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS5sb2NhbE5hbWVdID0gbm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqICBFdmVudCBCaW5kaW5nXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYoWycnLCAnWCcsICdZJ10ubWFwKGQ9Plsnc2Nyb2xsJywgJ2F1dG8nXS5pbmRleE9mKChzdHlsZSBhcyBhbnkpWydvdmVyZmxvdycrZF0pICE9PSAtMSkuZmlsdGVyKGQ9PmQpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5iaW5kU2Nyb2xsKG5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLmlucHV0Tm9kZU5hbWVzLmluZGV4T2Yobm9kZS5ub2RlTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmJpbmRPbktleXVwKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsLnJjaWQgPSBub2RlLnJjaWQ7XG4gICAgICAgIGVsLmNoaWxkTm9kZXMgPSBbXVxuICAgICAgICBpZihub2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGUuY2hpbGROb2Rlcy5mb3JFYWNoKChjaGlsZDphbnkpPT4ge1xuICAgICAgICAgICAgICAgIGlmKGNoaWxkLm5vZGVOYW1lICE9PSAnU0NSSVBUJyAmJiBjaGlsZC5ub2RlTmFtZSAhPT0gJ05PU0NSSVBUJyAmJiBjaGlsZC5ub2RlTmFtZSAhPT0gJyNjb21tZW50JyAmJiB0aGlzLmNoZWNrTm9kZUlzVmFsaWQoY2hpbGQpKSAge1xuICAgICAgICAgICAgICAgICAgICBlbC5jaGlsZE5vZGVzLnB1c2godGhpcy5nZXRIVE1MKGNoaWxkKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG5cbiAgICB0YWtlU25hcHNob3QgPShub2RlOmFueSwgaW5pdGlhbDphbnkpPT4ge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkucG9wdWxhdGVJZChub2RlKTtcbiAgICAgICAgbGV0IGNsb25lID0gdGhpcy5nZXRIVE1MKG5vZGUpO1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLnNuYXBzaG90LCBcbiAgICAgICAgICAgIGRvbTogY2xvbmUsIFxuICAgICAgICAgICAgY3NzUnVsZXM6IHRoaXMuY3NzUnVsZXMsICBcbiAgICAgICAgICAgIGluaXRpYWwsXG4gICAgICAgICAgICBzY3JlZW5XaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIHNjcm9sbFRvcDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIHNjcm9sbExlZnQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgY29uc29sZVN0YXR1czogdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMsXG4gICAgICAgICAgICBsb2NhdGlvbjogdGhpcy5nZXRSZWNvcmRlcigpLmdldFVSTERldGFpbHMoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrTm9kZUlzVmFsaWQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuY2xhc3NOYW1lICYmIG5vZGUuY2xhc3NOYW1lLmluZGV4T2YgJiYgYmxhY2tsaXN0ZWRFbEJ5Q2xhc3MuZmlsdGVyKGQ9PiBub2RlLmNsYXNzTmFtZS5pbmRleE9mKGQpICE9PSAtMSkubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuYmxhY2tsaXN0ZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnZlcnRUb0Fic29sdXRlUGF0aCA9KHBhdGg6YW55KT0+IHtcbiAgICAgICAgaWYocGF0aD09bnVsbClcbiAgICAgICAgICAgIHJldHVybiAnbm9wYXRoJztcbiAgICAgICAgcmV0dXJuIG5ldyBVUkwocGF0aCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbikuaHJlZjsgXG4gICAgfVxuXG5cbiAgICBnZXRCYXNlNjRJbWFnZShpbWc6YW55KSB7XG4gICAgICAgIGxldCBkYXRhVVJMID0gJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgdmFyIGN0eDphbnkgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG4gICAgICAgICAgICBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBkYXRhVVJMO1xuICAgIH1cblxuICAgIHJlYWRTcmMgPShub2RlOmFueSwgdXJsOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJhc2U2NEltYWdlKG5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICByY2lkOiBub2RlLnJjaWQsXG4gICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgc3JjOiB0aGlzLmdldEJhc2U2NEltYWdlKG5vZGUpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmFzc2V0TG9hZGVkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCAnZG9jIHJlYWR5JztcblxuKGZ1bmN0aW9uKGZ1bmNOYW1lOmFueSwgYmFzZU9iajphbnkpIHtcbiAgICBmdW5jTmFtZSA9IGZ1bmNOYW1lIHx8IFwiZG9jUmVhZHlcIjtcbiAgICBiYXNlT2JqID0gYmFzZU9iaiB8fCB3aW5kb3c7XG4gICAgdmFyIHJlYWR5TGlzdCA9IFtdIGFzIGFueTtcbiAgICB2YXIgcmVhZHlGaXJlZCA9IGZhbHNlO1xuICAgIHZhciByZWFkeUV2ZW50SGFuZGxlcnNJbnN0YWxsZWQgPSBmYWxzZTtcbiAgICBcbiAgICBmdW5jdGlvbiByZWFkeSgpIHtcbiAgICAgICAgaWYgKCFyZWFkeUZpcmVkKSB7XG4gICAgICAgICAgICByZWFkeUZpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVhZHlMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVhZHlMaXN0W2ldLmZuLmNhbGwod2luZG93LCByZWFkeUxpc3RbaV0uY3R4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlYWR5TGlzdCA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlYWR5U3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiICkge1xuICAgICAgICAgICAgcmVhZHkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBiYXNlT2JqW2Z1bmNOYW1lXSA9IGZ1bmN0aW9uKGNhbGxiYWNrOmFueSwgY29udGV4dDphbnkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FsbGJhY2sgZm9yIGRvY1JlYWR5KGZuKSBtdXN0IGJlIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlYWR5RmlyZWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7Y2FsbGJhY2soY29udGV4dCk7fSwgMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWFkeUxpc3QucHVzaCh7Zm46IGNhbGxiYWNrLCBjdHg6IGNvbnRleHR9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIHx8ICghKGRvY3VtZW50IGFzIGFueSkuYXR0YWNoRXZlbnQgJiYgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChyZWFkeSwgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlYWR5RXZlbnRIYW5kbGVyc0luc3RhbGxlZCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCByZWFkeSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCByZWFkeSwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKChkb2N1bWVudCBhcyBhbnkpLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgKGRvY3VtZW50IGFzIGFueSkuYXR0YWNoRXZlbnQoXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiwgcmVhZHlTdGF0ZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgKGRvY3VtZW50IGFzIGFueSkuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIiwgcmVhZHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1tBUkNdOiBGYWlsZWQgdG8gVHJpZ2dlciBEb2MgcmVhZHknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVhZHlFdmVudEhhbmRsZXJzSW5zdGFsbGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfSkoXCJkb2NSZWFkeVwiLCB3aW5kb3cpOyIsImNvbnN0IGdlbmVyYXRlUmFuZG9tU3RyaW5nID0obGVuZ3RoOiBOdW1iZXIpPT4ge1xuICAgIGxldCByZXN1bHQgICAgICAgICAgID0gJyc7XG4gICAgbGV0IGNoYXJhY3RlcnMgICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGxldCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKyApIHtcbiAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTSUQgPSgpPT4ge1xuICAgIHJldHVybiBnZW5lcmF0ZVJhbmRvbVN0cmluZyg0KSArICctJyArIGdlbmVyYXRlUmFuZG9tU3RyaW5nKDQpICsgJy0nICsgZ2VuZXJhdGVSYW5kb21TdHJpbmcoMik7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRTSUQgPSgpPT4ge1xuICAgIGxldCBzaWQgPSAod2luZG93IGFzIGFueSkuYXBwcmNfc2lkIHx8IG51bGw7XG4gICAgaWYoc2lkID09PSBudWxsKSB7XG4gICAgICAgIHNpZCA9IGdlbmVyYXRlU0lEKClcbiAgICB9XG4gICAgcmV0dXJuIHNpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRKUyhmaWxlOmFueSwgY2FsbGJhY2s6YW55KSB7XG4gICAgdmFyIGpzRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBqc0VsbS50eXBlID0gXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCI7XG4gICAganNFbG0uc3JjID0gZmlsZTtcbiAgICBqc0VsbS5vbmxvYWQgPSBjYWxsYmFjaztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGpzRWxtKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGdldDphc3luYyAodXJsOiBzdHJpbmcsIG9ucHJvZ3Jlc3M6IGFueSk9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vIGV4ZWN1dG9yICh0aGUgcHJvZHVjaW5nIGNvZGUsIFwic2luZ2VyXCIpXG4gICAgICAgICAgICBsZXQgcnEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgXG4gICAgICAgICAgICBycS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsgIFxuICAgICAgICAgICAgICAgIGlmIChycS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcnEucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgICAgICAgICAgICAgICAgaWYocnEuc3RhdHVzID09PSAyMDApIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihycS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIHJxLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTsgXG4gICAgICAgICAgICBpZihvbnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcnEub25wcm9ncmVzcz1vbnByb2dyZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcnEuc2VuZChudWxsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBldmVudFR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1ldGFEYXRhSGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG4gICAgICAgIHRoaXMuZ2V0QWxsTWV0YURhdGEoKTtcbiAgICB9XG5cbiAgICBnZXRBbGxNZXRhRGF0YSA9KGdlbmVyYXRlRXZlbnQ9dHJ1ZSk9PiB7XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuYnJvd3Nlck1ldGEsXG4gICAgICAgICAgICBicm93c2VyOiB0aGlzLmdldEJyb3dzZXIoKSxcbiAgICAgICAgICAgIG9zOiB0aGlzLmdldE9TKCksXG4gICAgICAgICAgICBjb3JlOiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSxcbiAgICAgICAgICAgIGNvb2tpZUVuYWJsZWQ6IG5hdmlnYXRvci5jb29raWVFbmFibGVkLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IG5hdmlnYXRvci5sYW5ndWFnZSxcbiAgICAgICAgICAgIGRldmljZU1lbW9yeTogKG5hdmlnYXRvciBhcyBhbnkpLmRldmljZU1lbW9yeSxcbiAgICAgICAgICAgIGlzVG91Y2hEZXZpY2U6IHRoaXMuZ2V0SXNUb3VjaERldmljZSgpLFxuICAgICAgICAgICAgcmVmZXJyZXI6ZG9jdW1lbnQucmVmZXJyZXIsXG4gICAgICAgICAgICBhcHBWZXJzaW9uOiBuYXZpZ2F0b3IuYXBwVmVyc2lvbixcbiAgICAgICAgICAgIHVzZXJBZ2VudDogbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICAgICB9O1xuICAgICAgICBpZihnZW5lcmF0ZUV2ZW50KVxuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoZXZlbnQpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuXG4gICAgZ2V0SXNUb3VjaERldmljZSgpIHtcbiAgICAgICAgcmV0dXJuICAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpXG4gICAgICAgICAgICB8fCAobmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMClcbiAgICAgICAgICAgIHx8IChuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDApKVxuICAgIH1cblxuICAgIGdldEJyb3dzZXIoKXtcbiAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCwgdGVtLFxuICAgICAgICBNPSB1YS5tYXRjaCgvKG9wZXJhfGNocm9tZXxzYWZhcml8ZmlyZWZveHxtc2llfHRyaWRlbnQoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8IFtdO1xuICAgICAgICBpZigvdHJpZGVudC9pLnRlc3QoTVsxXSkpe1xuICAgICAgICAgICAgdGVtPSAgL1xcYnJ2WyA6XSsoXFxkKykvZy5leGVjKHVhKSB8fCBbXTtcbiAgICAgICAgICAgIHJldHVybiAnSUUgJysodGVtWzFdIHx8ICcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZihNWzFdPT09ICdDaHJvbWUnKXtcbiAgICAgICAgICAgIHRlbT0gdWEubWF0Y2goL1xcYihPUFJ8RWRnZT8pXFwvKFxcZCspLyk7XG4gICAgICAgICAgICBpZih0ZW0hPSBudWxsKSByZXR1cm4gdGVtLnNsaWNlKDEpLmpvaW4oJyAnKS5yZXBsYWNlKCdPUFInLCAnT3BlcmEnKS5yZXBsYWNlKCdFZGcgJywgJ0VkZ2UgJyk7XG4gICAgICAgIH1cbiAgICAgICAgTT0gTVsyXT8gW01bMV0sIE1bMl1dOiBbbmF2aWdhdG9yLmFwcE5hbWUsIG5hdmlnYXRvci5hcHBWZXJzaW9uLCAnLT8nXTtcbiAgICAgICAgaWYoKHRlbT0gdWEubWF0Y2goL3ZlcnNpb25cXC8oXFxkKykvaSkpIT0gbnVsbCkgTS5zcGxpY2UoMSwgMSwgdGVtWzFdKTtcbiAgICAgICAgcmV0dXJuIE0uam9pbignICcpO1xuICAgIH1cblxuICAgIGdldE9TKCkge1xuICAgICAgICB2YXIgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0sXG4gICAgICAgICAgICBtYWNvc1BsYXRmb3JtcyA9IFsnTWFjaW50b3NoJywgJ01hY0ludGVsJywgJ01hY1BQQycsICdNYWM2OEsnXSxcbiAgICAgICAgICAgIHdpbmRvd3NQbGF0Zm9ybXMgPSBbJ1dpbjMyJywgJ1dpbjY0JywgJ1dpbmRvd3MnLCAnV2luQ0UnXSxcbiAgICAgICAgICAgIGlvc1BsYXRmb3JtcyA9IFsnaVBob25lJywgJ2lQYWQnLCAnaVBvZCddLFxuICAgICAgICAgICAgb3MgPSBudWxsO1xuICAgICAgXG4gICAgICAgIGlmIChtYWNvc1BsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcyA9ICdNYWMgT1MnO1xuICAgICAgICB9IGVsc2UgaWYgKGlvc1BsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcyA9ICdpT1MnO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd3NQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybSkgIT09IC0xKSB7XG4gICAgICAgICAgb3MgPSAnV2luZG93cyc7XG4gICAgICAgIH0gZWxzZSBpZiAoL0FuZHJvaWQvLnRlc3QodXNlckFnZW50KSkge1xuICAgICAgICAgIG9zID0gJ0FuZHJvaWQnO1xuICAgICAgICB9IGVsc2UgaWYgKCFvcyAmJiAvTGludXgvLnRlc3QocGxhdGZvcm0pKSB7XG4gICAgICAgICAgb3MgPSAnTGludXgnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5vcyA9IG9zO1xuICAgICAgICByZXR1cm4gb3M7XG4gICAgfVxufSAiLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbn0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11dGF0aW9uSGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG4gICAgc2tpcHBlZE11dGF0aW9uczogYW55ID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICB9XG5cblxuICAgIGhhbmRsZU11dGF0aW9ucyA9KG11dGF0aW9uczphbnkpPT4ge1xuICAgICAgICBsZXQgYmxhY2tsaXN0ZWROb2RlczogQXJyYXk8YW55PiA9IHRoaXMuZ2V0UmVjb3JkZXIoKS5ibGFja2xpc3RlZE5vZGVzO1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb246YW55KT0+IHtcbiAgICAgICAgICAgIGlmKCFtdXRhdGlvbi50YXJnZXQpIFxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgZm9yKGxldCBpZHggaW4gYmxhY2tsaXN0ZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGlmKGJsYWNrbGlzdGVkTm9kZXNbaWR4XS5jb250YWlucyhtdXRhdGlvbi50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpcHBlZE11dGF0aW9ucysrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2gobXV0YXRpb24udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYXJhY3RlckRhdGFNdXRhdGlvbihtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBldmVudFR5cGVzLmNoaWxkTGlzdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGlsZExpc3QobXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlcy5hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUF0dHJpYnV0ZXMobXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIGhhbmRsZUNoYXJhY3RlckRhdGFNdXRhdGlvbiA9KG11dGF0aW9uOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHJjaWQ6IG11dGF0aW9uLnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhLFxuICAgICAgICAgICAgdGV4dDogbXV0YXRpb24udGFyZ2V0LmRhdGFcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZExpc3QgPShtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICBsZXQgcmVtb3ZlZE5vZGVzID0gW107XG4gICAgICAgIGxldCBhZGRlZE5vZGVzID0gW107XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IG11dGF0aW9uLnJlbW92ZWROb2Rlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBpZihtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XS5yY2lkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVkTm9kZXMucHVzaChtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XS5yY2lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkudW5iaW5kRnJvbUFsbEV2ZW50KG11dGF0aW9uLnJlbW92ZWROb2Rlc1tpZHhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGlkeD0wOyBpZHggPCBtdXRhdGlvbi5hZGRlZE5vZGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5wb3B1bGF0ZUlkKG11dGF0aW9uLmFkZGVkTm9kZXNbaWR4XSk7XG4gICAgICAgICAgICBhZGRlZE5vZGVzLnB1c2godGhpcy5nZXRSZWNvcmRlcigpLmRvbVBhcnNlci5nZXRIVE1MKG11dGF0aW9uLmFkZGVkTm9kZXNbaWR4XSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHBhcmVudDogbXV0YXRpb24udGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNoaWxkTGlzdCxcbiAgICAgICAgICAgIGFkZGVkTm9kZXMsXG4gICAgICAgICAgICByZW1vdmVkTm9kZXMsXG4gICAgICAgICAgICBuZXh0U2libGluZzogbXV0YXRpb24ubmV4dFNpYmxpbmcgPyBtdXRhdGlvbi5uZXh0U2libGluZy5yY2lkIDogbnVsbCxcbiAgICAgICAgICAgIHByZXZpb3VzU2libGluZzogbXV0YXRpb24ucHJldmlvdXNTaWJsaW5nID8gbXV0YXRpb24ucHJldmlvdXNTaWJsaW5nLnJjaWQgOiBudWxsLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZUF0dHJpYnV0ZXMgPShtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICByY2lkOiBtdXRhdGlvbi50YXJnZXQucmNpZCxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuYXR0cmlidXRlcyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZTogbXV0YXRpb24udGFyZ2V0LmdldEF0dHJpYnV0ZShtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lKVxuICAgICAgICB9KTtcbiAgICB9XG5cblxufSIsImltcG9ydCB7IGV2ZW50VHlwZXMgfSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcbmltcG9ydCB7cmVjb3JkZXJDb25maWd9IGZyb20gJy4uL0NvbnN0YW50cy9Db25maWcnO1xuaW1wb3J0IE11dGF0aW9uSGFuZGxlciBmcm9tICcuLi9NdXRhdGlvbkhhbmRsZXIvTXV0YXRpb25IYW5kbGVyJztcbmltcG9ydCBDb25zb2xlSGFuZGxlciBmcm9tICcuLi9Db25zb2xlSGFuZGxlci9Db25zb2xlSGFuZGxlcic7XG5pbXBvcnQgV2luZG93RXZlbnRIYW5kbGVyIGZyb20gJy4uL1dpbmRvd0V2ZW50SGFuZGxlci9XaW5kb3dFdmVudEhhbmRsZXInO1xuaW1wb3J0IERvbVBhcnNlciBmcm9tICcuLi9Eb21QYXJzZXIvRG9tUGFyc2VyJztcbmltcG9ydCBXZWJSZXF1ZXN0SGFuZGxlciBmcm9tICcuLi9XZWJSZXF1ZXN0SGFuZGxlci9XZWJSZXF1ZXN0SGFuZGxlcic7XG5pbXBvcnQgTWV0YURhdGFIYW5kbGVyIGZyb20gJy4uL01ldGFEYXRhSGFuZGxlci9NZXRhRGF0YUhhbmRsZXInO1xuXG5jb25zdCBNdXRhdGlvbk9ic2VydmVyID0gKHdpbmRvdyBhcyBhbnkpLk11dGF0aW9uT2JzZXJ2ZXIgfHwgKHdpbmRvdyBhcyBhbnkpLldlYktpdE11dGF0aW9uT2JzZXJ2ZXIgfHwgKHdpbmRvdyBhcyBhbnkpLk1vek11dGF0aW9uT2JzZXJ2ZXI7XG5cbmxldCBvYnNlcnZlcjtcbmxldCBjdXJyZW50Tm9kZUlkID0gMTtcbmxldCBkYXRhOiBBcnJheTxhbnk+ID0gW107XG5sZXQgZGF0YUJ1ZmZlcjogQXJyYXk8YW55PiA9IFtdXG5sZXQgZXZlbnRMaXN0ZW5lcjphbnkgPSBudWxsO1xubGV0IGluaXRpYWxTbmFwc2hvdFNlbmQ6IEJvb2xlYW4gPSBmYWxzZTtcbih3aW5kb3cgYXMgYW55KS5yY0RhdGEgPSBbXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRlciB7XG5cbiAgICBjaWQ6IFN0cmluZztcbiAgICBzaWQ6IFN0cmluZztcbiAgICBhaWQ6IFN0cmluZztcbiAgICBibGFja2xpc3RlZE5vZGVzOiBBcnJheTxhbnk+O1xuICAgIGNvbnNvbGVTdGF0dXM6IGFueTtcbiAgICBvczogYW55O1xuICAgIGN0cmxLZXlTdGF0dXM6IGFueTtcbiAgICBtdXRhaW9uSGFuZGxlcjogYW55O1xuICAgIGRvbVBhcnNlcjogYW55O1xuICAgIGNvbnNvbGVIYW5kbGVyOiBhbnk7XG4gICAgd2luZG93RXZlbnRIYW5kbGVyOiBhbnk7XG4gICAgd2ViUmVxdWVzdEhhbmRsZXI6IGFueTtcbiAgICBtZXRhRGF0YUhhbmRsZXI6IGFueTtcbiAgICBtb3VzZU1vdmVUaHJlc2hvbGQ6IGFueSA9IDMzO1xuICAgIGxhc3RNb3VzZU1vdmVFdmVudEdlbmVyYXRlZDogYW55ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuY2lkID0gYXJncy5jaWQ7XG4gICAgICAgIHRoaXMuc2lkID0gYXJncy5zaWQ7XG4gICAgICAgIHRoaXMuYWlkID0gYXJncy5haWQ7XG4gICAgICAgIHRoaXMuYmxhY2tsaXN0ZWROb2RlcyA9IFtdO1xuICAgICAgICB0aGlzLmRvbVBhcnNlciA9IG5ldyBEb21QYXJzZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pO1xuICAgICAgICB0aGlzLmNvbnNvbGVIYW5kbGVyID0gbmV3IENvbnNvbGVIYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KVxuICAgICAgICB0aGlzLm11dGFpb25IYW5kbGVyID0gbmV3IE11dGF0aW9uSGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSlcbiAgICAgICAgdGhpcy53aW5kb3dFdmVudEhhbmRsZXIgPSBuZXcgV2luZG93RXZlbnRIYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KTtcbiAgICAgICAgdGhpcy53ZWJSZXF1ZXN0SGFuZGxlciA9IG5ldyBXZWJSZXF1ZXN0SGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSk7XG4gICAgICAgIHRoaXMubWV0YURhdGFIYW5kbGVyID0gbmV3IE1ldGFEYXRhSGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBSZWNvcmRlciBJbml0aWF0ZWQuIFYgMC4yLjMnKTtcbiAgICB9ICAgIFxuXG4gICAgc3RhcnQgPShub2RlOiBhbnkpPT4ge1xuICAgICAgICB0aGlzLmRvbVBhcnNlci5yZWNvcmRTdHlsZSgpO1xuICAgICAgICB0aGlzLmJpbmRTY3JvbGwod2luZG93KTtcbiAgICAgICAgdGhpcy5iaW5kTW91c2VFdmVudChkb2N1bWVudCk7XG4gICAgICAgIHRoaXMud2luZG93RXZlbnRIYW5kbGVyLmNoZWNrQ29uc29sZVN0YXR1cyhmYWxzZSk7XG4gICAgICAgIHRoaXMuZG9tUGFyc2VyLnRha2VTbmFwc2hvdChub2RlLCB0cnVlKTtcbiAgICAgICAgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zOmFueSk9PiB7XG4gICAgICAgICAgICB0aGlzLm11dGFpb25IYW5kbGVyLmhhbmRsZU11dGF0aW9ucyhtdXRhdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCByZWNvcmRlckNvbmZpZyk7IFxuICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gU3RhcnRlZCBSZWNvcmRpbmcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiAgSGVscGVyc1xuICAgICAqIFxuICAgICAqL1xuXG4gICAgYmluZFNjcm9sbCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgaWYobm9kZS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBub2RlLmlzU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPblNjcm9sbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kT25LZXl1cCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgaWYobm9kZS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBub2RlLmlzT25LZXl1cCA9IHRydWU7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVPbktleXVwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRNb3VzZUV2ZW50ID0obm9kZTphbnkpPT4ge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlTW91c2VDbGljayk7XG4gICAgfVxuXG4gICAgdW5iaW5kRnJvbUFsbEV2ZW50ID0obm9kZTphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmlzU2Nyb2xsICYmIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU9uU2Nyb2xsKTtcbiAgICAgICAgfVxuICAgICAgICBpZihub2RlLmlzT25LZXl1cCAmJiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG5vZGUuaXNPbktleXVwID0gZmFsc2U7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVPbktleXVwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY3Vyc2l2ZWx5Q2hlY2tUYXJnZXRIYXNDbGlja0V2ZW50czphbnkgPSh0YXJnZXQ6YW55KT0+IHtcbiAgICAgICAgaWYodGFyZ2V0Lm9uY2xpY2sgfHwgdGFyZ2V0Lm9ubW91c2Vkb3duIHx8IHRhcmdldC5vbm1vdXNldXAgfHwgdGFyZ2V0Lm9uY2hhbmdlIHx8IFxuICAgICAgICAgICAgWydJTlBVVCddLmluZGV4T2YodGFyZ2V0LnRhZ05hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZih0YXJnZXQudGFnTmFtZSAhPT0gJ0JPRFknICYmIHRhcmdldC5wYXJlbnROb2RlKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY3Vyc2l2ZWx5Q2hlY2tUYXJnZXRIYXNDbGlja0V2ZW50cyh0YXJnZXQucGFyZW50Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBFdmVudCBIYW5kbGVyc1xuICAgICAqL1xuXG4gICAgaGFuZGxlT25TY3JvbGwgPShldmVudDphbnkpPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldCB8fCBldmVudDtcblxuICAgICAgICBpZighbm9kZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgc2Nyb2xsID0ge31cblxuICAgICAgICBpZihub2RlLnJjaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgc2Nyb2xsID0ge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogbm9kZS5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IG5vZGUuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgcmNpZDogLTEsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBub2RlLnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBub2RlLnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgcmNpZDogbm9kZS5yY2lkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKHNjcm9sbCBhcyBhbnkpLnR5cGUgPSBldmVudFR5cGVzLnNjcm9sbDtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHNjcm9sbCk7XG4gICAgfVxuXG4gICAgaGFuZGxlT25LZXl1cCA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICByY2lkOiBldmVudC50YXJnZXQucmNpZCxcbiAgICAgICAgICAgIHZhbHVlOiBldmVudC50YXJnZXQudmFsdWUsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmlucHV0VmFsdWVcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICB9XG5cbiAgICBoYW5kbGVNb3VzZU1vdmUgPShldmVudDphbnkpPT4ge1xuICAgICAgICBpZih3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLmxhc3RNb3VzZU1vdmVFdmVudEdlbmVyYXRlZCA+IHRoaXMubW91c2VNb3ZlVGhyZXNob2xkKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RNb3VzZU1vdmVFdmVudEdlbmVyYXRlZCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgbW91c2VYOiBldmVudC5wYWdlWCAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIG1vdXNlWTogZXZlbnQucGFnZVkgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMubW91c2VNb3ZlXG4gICAgICAgICAgICB9KTsgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlTW91c2VDbGljayA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudCAmJiBldmVudC50YXJnZXQgPyBldmVudC50YXJnZXQgOiBudWxsO1xuICAgICAgICBsZXQgaXNSZXNwb25zaXZlID0gdGFyZ2V0ICE9PSBudWxsID8gdGhpcy5yZWN1cnNpdmVseUNoZWNrVGFyZ2V0SGFzQ2xpY2tFdmVudHModGFyZ2V0KSA6IGZhbHNlO1xuICAgICAgICBsZXQgaXNMaW5rID0gdGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldC5ocmVmID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgbW91c2VYOiBldmVudC5wYWdlWCxcbiAgICAgICAgICAgIG1vdXNlWTogZXZlbnQucGFnZVksXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLm1vdXNlQ2xpY2ssXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmUsXG4gICAgICAgICAgICBpc0xpbmtcbiAgICAgICAgfSk7ICAgICBcbiAgICB9XG5cbiAgICBnZXRVUkxEZXRhaWxzID0oKT0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgICAgICAgICAgIHByb3RvY29sOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wsXG4gICAgICAgICAgICBob3N0OiB3aW5kb3cubG9jYXRpb24uaG9zdCxcbiAgICAgICAgICAgIGhvc3RuYW1lOiB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUsXG4gICAgICAgICAgICBwb3J0OiB3aW5kb3cubG9jYXRpb24ucG9ydCxcbiAgICAgICAgICAgIHBhdGhuYW1lOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgICAgICBzZWFyY2g6IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsXG4gICAgICAgICAgICBoYXNoOiB3aW5kb3cubG9jYXRpb24uaGFzaCxcbiAgICAgICAgICAgIGhyZWY6IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiAgUG9wdWxhdGUgSWRcbiAgICAgKiBcbiAgICAgKi9cbiBcbiAgICBwb3B1bGF0ZUlkID0obm9kZTphbnkpPT4ge1xuICAgICAgICBub2RlLnJjaWQgPSBjdXJyZW50Tm9kZUlkO1xuICAgICAgICBjdXJyZW50Tm9kZUlkKys7XG4gICAgICAgIGlmKG5vZGUuY2hpbGROb2RlcyAmJiBub2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGUuY2hpbGROb2Rlcy5mb3JFYWNoKChjaGlsZDphbnkpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVJZChjaGlsZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqICBNZXRhIERhdGFcbiAgICAgKi9cblxuICAgIGdldEFsbE1ldGFEYXRhID0oZ2VuZXJhdGVFdmVudD10cnVlKT0+IHRoaXMubWV0YURhdGFIYW5kbGVyLmdldEFsbE1ldGFEYXRhKGdlbmVyYXRlRXZlbnQpO1xuIFxuXG4gICAgLyoqXG4gICAgICogIFRoZSBFdmVudCBHZW5lcmF0b3JcbiAgICAgKi9cblxuICAgICBcblxuICAgIGdlbmVyYXRlRXZlbnQgPShhY3Rpb246YW55KT0+IHtcbiAgICAgICAgbGV0IGV2ZW50OmFueSA9IHtcbiAgICAgICAgICAgIHRpbWU6IHBhcnNlRmxvYXQocGVyZm9ybWFuY2Uubm93KCkudG9GaXhlZCg0KSlcbiAgICAgICAgfSBcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgICAuLi5ldmVudCxcbiAgICAgICAgICAgIC4uLmFjdGlvblxuICAgICAgICB9IFxuICAgICAgICBpZighaW5pdGlhbFNuYXBzaG90U2VuZCAmJiBldmVudC5pbml0aWFsKSB7XG4gICAgICAgICAgICBpbml0aWFsU25hcHNob3RTZW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YUJ1ZmZlci5sZW5ndGggJiYgaW5pdGlhbFNuYXBzaG90U2VuZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGlkeCBpbiBkYXRhQnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoZGF0YUJ1ZmZlcltpZHhdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhQnVmZmVyID0gW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxKVxuICAgICAgICB9XG4gICAgICAgIGlmKGluaXRpYWxTbmFwc2hvdFNlbmQpIHtcbiAgICAgICAgICAgIGRhdGEucHVzaChldmVudCk7XG4gICAgICAgICAgICB0aGlzLnB1Ymxpc2hMaXZlVXBkYXRlKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmKFtldmVudFR5cGVzLmF0dHJpYnV0ZXMsIGV2ZW50VHlwZXMuY2hhcmFjdGVyRGF0YSwgZXZlbnRUeXBlcy5jaGlsZExpc3RdLmluZGV4T2YoZXZlbnQudHlwZSkgPT09IC0xKXtcbiAgICAgICAgICAgIGRhdGFCdWZmZXIucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaXNoTGl2ZVVwZGF0ZSA9KGV2ZW50OiBhbnkpPT4ge1xuICAgICAgICBpZihldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBsZXQgbXNnOmFueSA9IHRoaXMud3JhcEV2ZW50KGV2ZW50KTsgXG4gICAgICAgICAgICAod2luZG93IGFzIGFueSkucmNEYXRhLnB1c2gobXNnKTtcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIobXNnLCBkYXRhKTtcbiAgICAgICAgfSAgIFxuICAgIH1cblxuICAgIGdldExpdmVVcGRhdGUgPShsaXN0ZW5lcjphbnkpPT4ge1xuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgICAgIGlmKGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IHRoaXMud3JhcEV2ZW50KGRhdGFbZGF0YS5sZW5ndGgtMV0pXG4gICAgICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcihtc2csIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JhcEV2ZW50ID0oZGF0YTphbnkpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YTsgXG4gICAgfVxuXG59IiwiaW1wb3J0ICcuLi9IZWxwZXJzL0RvY1JlYWR5JztcbmltcG9ydCB7Z2V0U0lELCBsb2FkSlMsIGdlbmVyYXRlU0lEfSBmcm9tICcuLi9IZWxwZXJzL0hlbHBlcnMnO1xuaW1wb3J0IFJlY29yZGVyIGZyb20gJy4uL1JlY29yZGVyL1JlY29yZGVyJztcbmltcG9ydCB7aG9zdH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmludGVyZmFjZSBSSEFyZ3Mge1xuICAgIGNsaWVudElkOiBTdHJpbmcsXG4gICAgYXBwSWQ6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRlckhhbmRsZXIge1xuXG4gICAgc2lkOiBTdHJpbmc7XG4gICAgY2lkOiBTdHJpbmc7XG4gICAgYWlkOiBTdHJpbmc7XG4gICAgcmNEYXRhQnVmZmVyOiBBcnJheTxhbnk+ID0gW107XG4gICAgcmVjb3JkZXJEYXRhOiBBcnJheTxhbnk+ID0gW107XG4gICAgcmVjb3JkZXI6IGFueSA9IG51bGw7XG4gICAgc29ja2V0OiBhbnk7XG4gICAgc29ja2V0SW50ZXI6IGFueTtcbiAgICBpbml0aWF0ZWQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBwYWNrZXRJbmRleDogYW55ID0gMDsgXG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBSSEFyZ3MpIHtcblxuICAgICAgICB0aGlzLnNpZCA9IGdldFNJRCgpO1xuICAgICAgICB0aGlzLmFpZCA9IGFyZ3MuYXBwSWQ7XG4gICAgICAgIHRoaXMuY2lkID0gYXJncy5jbGllbnRJZDtcblxuICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gV2FpdGluZyBmb3IgZG9jdW1lbnQgcmVhZHkgc3RhdGUnKTtcblxuICAgICAgICAod2luZG93IGFzIGFueSkuZG9jUmVhZHkoKCk9PiB7XG4gICAgICAgICAgICBsb2FkSlMoJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NvY2tldC5pby8yLjMuMC9zb2NrZXQuaW8uc2xpbS5qcycsICgpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFNvY2tldCBsb2FkZWQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXIgPSBuZXcgUmVjb3JkZXIoe1xuICAgICAgICAgICAgICAgICAgICBzaWQ6IHRoaXMuc2lkLFxuICAgICAgICAgICAgICAgICAgICBjaWQ6IHRoaXMuY2lkLFxuICAgICAgICAgICAgICAgICAgICBhaWQ6IHRoaXMuYWlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5nZXRMaXZlVXBkYXRlKHRoaXMub25SZWNvcmRlclVwZGF0ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnQoZG9jdW1lbnQuYm9keSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW8gPSAod2luZG93IGFzIGFueSkuaW87XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSBpby5jb25uZWN0KGhvc3QsIHt0cmFuc3BvcnRzOlsnd2Vic29ja2V0JywgJ3BvbGxpbmcnXX0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uY2UoJ2Nvbm5lY3QnLCB0aGlzLm9uQ29ubmVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgncmVjb25uZWN0JywgdGhpcy5vbkNvbm5lY3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uY2UoJ2Rpc2Nvbm5lY3QnLCB0aGlzLm9uRGlzY29ubmVjdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCB3aW5kb3cpXG5cbiAgICB9XG4gXG4gICAgb25EaXNjb25uZWN0ID0oKT0+IHtcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkNvbm5lY3QgPSgpPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gQ29ubmVjdGVkIHRvIFNvY2tldCcpO1xuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogIFNlbmRpbmcgU2Vzc2lvbiBNZXRhXG4gICAgICAgICAqL1xuICAgICAgICBsZXQgc2Vzc2lvbk1ldGFEYXRhID0gdGhpcy5nZXRTZXNzaW9uTWV0YSgpO1xuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdzZXNzaW9uUmVjaXZlcicsIHNlc3Npb25NZXRhRGF0YSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTZW5kaW5nIEJ1ZmZlcmVkIERhdGFcbiAgICAgICAgICovXG4gICAgICAgIGZvcihsZXQgaWR4IGluIHRoaXMucmVjb3JkZXJEYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRUb1NlcnZlcih0aGlzLnJlY29yZGVyRGF0YVtpZHhdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY29yZGVyRGF0YSA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgSW5pdGlhdGluZyBTZW5kZXJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc29ja2V0SW50ZXIgPSBzZXRJbnRlcnZhbCgoKT0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMucmNEYXRhQnVmZmVyICYmIHRoaXMucmNEYXRhQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBTZW5kaW5nIERhdGEnLCB0aGlzLnJjRGF0YUJ1ZmZlci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGxldCBwYWNrZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZDogdGhpcy5zaWQsXG4gICAgICAgICAgICAgICAgICAgIGNpZDogdGhpcy5jaWQsXG4gICAgICAgICAgICAgICAgICAgIGFpZDogdGhpcy5haWQsXG4gICAgICAgICAgICAgICAgICAgIHBpZDogdGhpcy5nZXRQSUQoKSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMucGFja2V0SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5yY0RhdGFCdWZmZXJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucGFja2V0SW5kZXgrPTE7XG4gICAgICAgICAgICAgICAgaWYoKHdpbmRvdyBhcyBhbnkpLkFSQ0RldiB8fCB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOmFueSA9ICBKU09OLnN0cmluZ2lmeShwYWNrZXQpLmxlbmd0aCAqIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBQYWNrZXQgc2l6ZScsIHNpemUsICdCeXRlcywgJywgTWF0aC5jZWlsKHNpemUvMTAyNCksICdrYicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Nlc3Npb25SZWNpdmVyJywgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJjRGF0YUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBnZXRQSUQgPSgpPT4gZ2VuZXJhdGVTSUQoKVxuXG4gICAgc2VuZFRvU2VydmVyID0oZXZlbnQ6IGFueSk9PiB7XG4gICAgICAgIGlmKCF0aGlzLmluaXRpYXRlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLnJjRGF0YUJ1ZmZlci5wdXNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvblJlY29yZGVyVXBkYXRlciA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIHRoaXMucmVjb3JkZXJEYXRhLnB1c2goZXZlbnQpO1xuICAgICAgICB0aGlzLnNlbmRUb1NlcnZlcihldmVudCk7XG4gICAgfVxuXG4gICAgZ2V0U2Vzc2lvbk1ldGEgPSgpPT4ge1xuICAgICAgICBpZighdGhpcy5yZWNvcmRlcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignW0FSQ10gRkFUQUwgRVJSOiBSZWNvcmRlciBub3QgRm91bmQnKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtZXRhOmFueSA9IHRoaXMucmVjb3JkZXIuZ2V0QWxsTWV0YURhdGEoZmFsc2UpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgIGNpZDogdGhpcy5jaWQsXG4gICAgICAgICAgICBhaWQ6IHRoaXMuYWlkLFxuICAgICAgICAgICAgdHlwZTonc2Vzc2lvbicsXG4gICAgICAgICAgICBkZXZpY2VUeXBlOiAnZGVza3RvcCcsXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgICBtZXRhRGF0YToge1xuICAgICAgICAgICAgICBicm93c2VyTmFtZTogbWV0YS5icm93c2VyLFxuICAgICAgICAgICAgICBvczogbWV0YS5vcyxcbiAgICAgICAgICAgICAgY3B1Q29yZTogbWV0YS5jb3JlLFxuICAgICAgICAgICAgICBkZXZpY2VNZW1vcnk6IG1ldGEuZGV2aWNlTWVtb3J5LFxuICAgICAgICAgICAgICBzY3JlZW5UeXBlOiBtZXRhLmlzVG91Y2hEZXZpY2UsXG4gICAgICAgICAgICAgIGxhbmd1YWdlOiBtZXRhLmxhbmd1YWdlLFxuICAgICAgICAgICAgICBjb29raWVFbmFibGVkOiBtZXRhLmNvb2tpZUVuYWJsZWQsXG4gICAgICAgICAgICAgIHJlZmVycmVyOiBtZXRhLnJlZmVycmVyLFxuICAgICAgICAgICAgICBicm93c2VyVmVyc2lvbjogbWV0YS5icm93c2VyLFxuICAgICAgICAgICAgICBvc1ZlcnNpb246IG1ldGEub3MsXG4gICAgICAgICAgICAgIHVzZXJBZ2VudDogbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IGV2ZW50VHlwZXMgfSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViUmVxdWVzdEhhbmRsZXIge1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuXG5cbiAgICAgICAgY29uc3QgdHJhY2tYTUxSZXEgPSB0aGlzLnRyYWNrWE1MUmVxO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgeG1sSHR0cFJlcVxuICAgICAgICAgKi9cblxuICAgICAgICBsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xuICAgICAgICAoWE1MSHR0cFJlcXVlc3QgYXMgYW55KS5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKG1ldGhvZDphbnksIHVybDpzdHJpbmcsIGFzeW5jOmJvb2xlYW4pIHtcbiAgICAgICAgICAgIGxldCByZXEgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5vbnByb2dyZXNzID0gZnVuY3Rpb24oZDphbnkpIHtcbiAgICAgICAgICAgICAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0cmFja1hNTFJlcSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlcS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luY1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wZW4uY2FsbCh0aGlzLCBtZXRob2QsIHVybCwgYXN5bmMpO1xuICAgICAgICB9OyBcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgRmV0Y2hcbiAgICAgICAgICovXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUZldGNoKHByb21pc2U6YW55LCB1cmw6U3RyaW5nLCBwYXJhbXM6YW55KSB7XG4gICAgICAgICAgICBsZXQgcmVzcCA9IGF3YWl0IHByb21pc2U7IFxuICAgICAgICAgICAgdHJhY2tYTUxSZXEoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogcGFyYW1zLm1ldGhvZCB8fCAnR0VUJyxcbiAgICAgICAgICAgICAgICBhc3luYzogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICAod2luZG93IGFzIGFueSkuX19mZXRjaF9fID0gd2luZG93LmZldGNoO1xuICAgICAgICAod2luZG93IGFzIGFueSkuZmV0Y2ggPSh1cmw6U3RyaW5nLCBwYXJhbXM6YW55KT0+IHtcbiAgICAgICAgICAgIGxldCByZXEgPSAod2luZG93IGFzIGFueSkuX19mZXRjaF9fKHVybCwgcGFyYW1zKTtcbiAgICAgICAgICAgIGhhbmRsZUZldGNoKHJlcS50aGVuKCksIHVybCwgcGFyYW1zKTtcbiAgICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmFja1hNTFJlcSA9KGFyZ3M6YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy54bWxIdHRwUmVxLFxuICAgICAgICAgICAgLi4uYXJnc1xuICAgICAgICB9KVxuICAgIH1cblxufSIsImltcG9ydCB7IFxuICAgIGV2ZW50VHlwZXMsIFxuICAgIGNvbW1hbmRzXG59IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5kb3dFdmVudEhhbmRsZXIge1xuXG4gICAgY3RybEtleVN0YXR1czogQm9vbGVhbiA9IGZhbHNlO1xuICAgIHJlc2l6ZURlYm91bmNlOiBhbnk7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcblxuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcblxuICAgICAgICBjb25zdCB0cmFja1dpbmRvd0NvbW1hbmQgPShlOiBhbnkpPT4ge1xuICAgICAgICAgICAgbGV0IGNvZGUgPSAoZG9jdW1lbnQuYWxsKSA/ICh3aW5kb3cuZXZlbnQgYXMgYW55KS5rZXlDb2RlIDogZS53aGljaDsgXG4gICAgICAgICAgICBsZXQgY21kID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLmN0cmxLZXlTdGF0dXMgJiYgY29kZSA9PT0gODYpIHtcbiAgICAgICAgICAgICAgICBjbWQgPSBjb21tYW5kcy5QQVNURTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdHJsS2V5U3RhdHVzICYmIGNvZGUgPT09IDY3KSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLkNPUFk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09PSA4MykgeyBcbiAgICAgICAgICAgICAgICBjbWQgPSBjb21tYW5kcy5TQVZFO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN0cmxLZXlTdGF0dXMgJiYgY29kZSA9PT0gNjgpIHsgXG4gICAgICAgICAgICAgICAgY21kID0gY29tbWFuZHMuQk9PS01BUks7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGNtZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jb21tYW5kRXhlY3V0ZWQsXG4gICAgICAgICAgICAgICAgICAgIGNtZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFja0N0cmwgPShlOiBhbnksIGlzS2V5RG93bjpCb29sZWFuKT0+IHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XG4gICAgICAgICAgICBsZXQgaXNNYWMgPSAodGhpcy5nZXRSZWNvcmRlcigpLm9zfHwnJykudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmRleE9mKCdtYWMnKSAhPT0gLTE7XG4gICAgICAgICAgICBpZigoY29kZSA9PT0gOTEgJiYgaXNNYWMpIHx8ICghaXNNYWMgJiYgY29kZSA9PT0gMTcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdHJsS2V5U3RhdHVzID0gaXNLZXlEb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlPT50cmFja0N0cmwoZSwgdHJ1ZSksIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlPT50cmFja0N0cmwoZSwgZmFsc2UpLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFja1dpbmRvd0NvbW1hbmQsIGZhbHNlKTtcbiAgICAgICAgdGhpcy50cmFja1dpbmRvd1Jlc2l6ZSgpO1xuICAgICAgICB0aGlzLnRyYWNrSGFzaENoYW5nZSgpO1xuICAgIH1cblxuXG4gICAgdHJhY2tXaW5kb3dSZXNpemUgPSgpPT4ge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCk9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVEZWJvdW5jZSk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZURlYm91bmNlID0gc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMud2luZG93UmVzaXplLFxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5XaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHNjcmVlbkhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvbnNvbGVTdGF0dXModHJ1ZSk7XG4gICAgICAgICAgICB9LCA0MDApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2hlY2tDb25zb2xlU3RhdHVzID0oZ2VuZXJhdGVFdmVudD1mYWxzZSk9PiB7XG4gICAgICAgIGxldCBkZXZ0b29sczogRnVuY3Rpb24gPSBmdW5jdGlvbigpe307XG4gICAgICAgIChkZXZ0b29scyBhcyBhbnkpLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHRoaXMub3BlbmVkID0gdHJ1ZSB9XG4gICAgICAgIGNvbnNvbGUubG9nKCclYycsIGRldnRvb2xzKTtcblxuICAgICAgICBsZXQgcHJldlN0YXR1cyA9IHRoaXMuZ2V0UmVjb3JkZXIoKS5jb25zb2xlU3RhdHVzIHx8IGZhbHNlO1xuICAgICAgICBsZXQgY3VycmVudFN0YXR1cyA9IChkZXZ0b29scyBhcyBhbnkpLm9wZW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0ID4gMTUwKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCA+IDE1MCkpO1xuICAgICAgICBpZihwcmV2U3RhdHVzICE9PSBjdXJyZW50U3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuY29uc29sZVN0YXR1cyA9IGN1cnJlbnRTdGF0dXM7XG4gICAgICAgICAgICBpZihnZW5lcmF0ZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNvbnNvbGVTdGF0dXNDaGFuZ2VkLFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlU3RhdHVzOiB0aGlzLmdldFJlY29yZGVyKCkuY29uc29sZVN0YXR1cyxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIFxuXG4gICAgdHJhY2tIYXNoQ2hhbmdlID0oKT0+IHtcbiAgICAgICAgd2luZG93Lm9uaGFzaGNoYW5nZSA9ICgpPT4geyBcbiAgICAgICAgICAgIGxldCBldmVudDphbnkgPSB0aGlzLmdldFJlY29yZGVyKCkuZ2V0VVJMRGV0YWlscygpO1xuICAgICAgICAgICAgZXZlbnQudHlwZSA9IGV2ZW50VHlwZXMuaGFzaENoYW5nZWQ7XG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgUmVjb3JkZXJIYW5kbGVyIGZyb20gJy4vUmVjb3JkZXJIYW5kbGVyL1JlY29yZGVySGFuZGxlcic7XG5cblxuY29uc3Qgc3RhcnRBUkM9KGNsaWVudElkOlN0cmluZywgYXBwSWQ6U3RyaW5nKT0+IHtcbiAgICBjb25zb2xlLmxvZygnW0FSQ10gUmVjb3JkZXIgSGFuZGxlciBJbml0aWF0ZWQsIENsaWVudCBJRCcsIGNsaWVudElkLCAnQXBwIElEJywgYXBwSWQpXG4gICAgbmV3IFJlY29yZGVySGFuZGxlcih7Y2xpZW50SWQsIGFwcElkfSk7XG59XG5cbih3aW5kb3cgYXMgYW55KS5zdGFydEFSQyA9IHN0YXJ0QVJDO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHN0YXJ0QVJDOyJdLCJzb3VyY2VSb290IjoiIn0=