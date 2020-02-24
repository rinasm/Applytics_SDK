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
            _Helpers_XHR__WEBPACK_IMPORTED_MODULE_1__["default"].get(url, function () { })
                .then(function (css) {
                _this.getRecorder().generateEvent({
                    type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].styleSheetString,
                    css: css
                });
            }, function (err) {
                console.error('[ARC] Fetching StyleSheet Failed', url, err);
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
                if (document.styleSheets[idx].href) {
                    _this.fetchAndRecordStyle(document.styleSheets[idx].href);
                }
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
/*! exports provided: generateSID, getSID, loadJS, parseURL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSID", function() { return generateSID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSID", function() { return getSID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadJS", function() { return loadJS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseURL", function() { return parseURL; });
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
var urlParserKey = '[^]';
var parseURL = function (url) { return (url || '').split('.').join(urlParserKey); };


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
        this.convertToAbsolutePath = function (path) {
            if (path == null)
                return 'nopath';
            return new URL(path, window.location.origin).href;
        };
        this.handleAttributes = function (mutation) {
            var value = mutation.target.getAttribute(mutation.attributeName);
            if (mutation.attributeName === 'src') {
                value = _this.convertToAbsolutePath(value);
            }
            _this.getRecorder().generateEvent({
                rcid: mutation.target.rcid,
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].attributes,
                attributeName: mutation.attributeName,
                attributeValue: value
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
        this.getPID = function () { return window.location.pathname; };
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
                    pageURL: Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__["parseURL"])(window.location.href),
                    os: meta.os,
                    cpuCore: meta.core,
                    deviceMemory: meta.deviceMemory,
                    screenType: meta.isTouchDevice,
                    language: meta.language,
                    cookieEnabled: meta.cookieEnabled,
                    referrer: Object(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__["parseURL"])(meta.referrer || null),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zb2xlSGFuZGxlci9Db25zb2xlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0NvbnN0YW50cy9Db25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zdGFudHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvRG9tUGFyc2VyL0RvbVBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0hlbHBlcnMvRG9jUmVhZHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9IZWxwZXJzL0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9IZWxwZXJzL1hIUi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL01ldGFEYXRhSGFuZGxlci9NZXRhRGF0YUhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9NdXRhdGlvbkhhbmRsZXIvTXV0YXRpb25IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvUmVjb3JkZXIvUmVjb3JkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9SZWNvcmRlckhhbmRsZXIvUmVjb3JkZXJIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvV2ViUmVxdWVzdEhhbmRsZXIvV2ViUmVxdWVzdEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9XaW5kb3dFdmVudEhhbmRsZXIvV2luZG93RXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FB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LGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFtREwseUJBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ3BHRDtBQUFBO0FBQWdFO0FBR2hFLElBQU0sUUFBUSxHQUFDLFVBQUMsUUFBZSxFQUFFLEtBQVk7SUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztJQUNyRixJQUFJLHdFQUFlLENBQUMsRUFBQyxRQUFRLFlBQUUsS0FBSyxTQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUEsTUFBYyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFHckIsdUVBQVEsRUFBQyIsImZpbGUiOiJhcHBseXRpY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9TREsvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBjb25zb2xlVHJhY2tMaXN0XG59IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlSGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG4gICAgdGVtcENvbnNvbGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICAgICAgaWYod2luZG93LmxvY2F0aW9uLmhvc3QuaW5kZXhPZignbG9jYWxob3N0JykgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrQWxsQ29uc29sZUFjdGl2aXR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHRyYWNrQ29uc29sZSA9KHBhcmFtczphbnksIHR5cGU6YW55KT0+IHtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpZHg9MDsgaWR4IDwgcGFyYW1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbXNbaWR4XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jb25zb2xlLFxuICAgICAgICAgICAgY29uc29sZVR5cGU6IHR5cGUsXG4gICAgICAgICAgICBhcmdzXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdHJhY2tBbGxDb25zb2xlQWN0aXZpdHkgPSgpPT4geyBcbiAgICAgICAgbGV0IHRlbXBDb25zb2xlID0ge307XG4gICAgICAgIGNvbnN0IHRyYWNrQ29uc29sZSA9IHRoaXMudHJhY2tDb25zb2xlO1xuICAgICAgICBmb3IgKGxldCBpZHggaW4gY29uc29sZVRyYWNrTGlzdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoY29uc29sZSBhcyBhbnkpW2NvbnNvbGVUcmFja0xpc3RbaWR4XV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAodGVtcENvbnNvbGUgYXMgYW55KVtjb25zb2xlVHJhY2tMaXN0W2lkeF1dID0gKGNvbnNvbGUgYXMgYW55KVtjb25zb2xlVHJhY2tMaXN0W2lkeF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICB0aGlzLnRlbXBDb25zb2xlID0gdGVtcENvbnNvbGU7XG4gICAgICAgIGNvbnN0IGNsb25lQ29uc29sZSA9IGZ1bmN0aW9uIChrZXk6YW55ID0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gbnVsbCAmJiBrZXkgaW4gdGVtcENvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICAoY29uc29sZSBhcyBhbnkpW2tleV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrQ29uc29sZShhcmd1bWVudHMsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIChjb25zb2xlICBhcyBhbnkpW2tleV0gPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKCh0ZW1wQ29uc29sZSAgYXMgYW55KVtrZXldLCBjb25zb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgIGFzIGFueSlba2V5XS5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvbnNvbGUoa2V5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZHggaW4gdGVtcENvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgIGFzIGFueSlbaWR4XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrQ29uc29sZShhcmd1bWVudHMsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoY29uc29sZSAgYXMgYW55KVtpZHhdID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbCgodGVtcENvbnNvbGUgIGFzIGFueSlbaWR4XSwgY29uc29sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoY29uc29sZSAgYXMgYW55KVtpZHhdLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZUNvbnNvbGUoaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2xvbmVDb25zb2xlKCk7XG4gICAgICAgIHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oZXJyb3IsIHVybCwgbGluZSkge1xuICAgICAgICAgICAgdHJhY2tDb25zb2xlKFtlcnJvciwgdXJsLCBsaW5lXSwgJ25ld0Vycm9yJyk7XG4gICAgICAgIH07IFxuICAgIH1cblxufSIsImV4cG9ydCBjb25zdCByZWNvcmRlckNvbmZpZyA9IHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsICBcbn0iLCJleHBvcnQgY29uc3QgaG9zdCA9ICdodHRwczovL3Rlc3QuYXBwbHl0aWNzLmluJztcbmV4cG9ydCBjb25zdCBldmVudFR5cGVzID0ge1xuICAgIHNuYXBzaG90OiAnc25hcHNob3QnLFxuICAgIGNoYXJhY3RlckRhdGE6ICdjaGFyYWN0ZXJEYXRhJyxcbiAgICBjaGlsZExpc3Q6ICdjaGlsZExpc3QnLFxuICAgIGF0dHJpYnV0ZXM6ICdhdHRyaWJ1dGVzJyxcbiAgICBzY3JvbGw6ICdzY3JvbGwnLFxuICAgIGlucHV0VmFsdWU6ICdpbnB1dFZhbHVlJyxcbiAgICBtb3VzZUNsaWNrOiAnbW91c2VDbGljaycsXG4gICAgbW91c2VNb3ZlOiAnbW91c2VNb3ZlJyxcbiAgICBhc3NldExvYWRlZDogJ2Fzc2V0TG9hZGVkJyxcbiAgICBzdHlsZVNoZWV0c0xvYWRSZXE6ICdzdHlsZVNoZWV0c0xvYWRSZXEnLFxuICAgIHhtbEh0dHBSZXE6ICd4bWxIdHRwUmVxJyxcbiAgICBjb25zb2xlOiAnY29uc29sZScsXG4gICAgYnJvd3Nlck1ldGE6ICdicm93c2VyTWV0YScsXG4gICAgd2luZG93UmVzaXplOiAnd2luZG93UmVzaXplJyxcbiAgICBjb25zb2xlU3RhdHVzQ2hhbmdlZDogJ2NvbnNvbGVTdGF0dXNDaGFuZ2VkJyxcbiAgICBjb21tYW5kRXhlY3V0ZWQ6ICdjb21tYW5kRXhlY3V0ZWQnLFxuICAgIGhhc2hDaGFuZ2VkOiAnaGFzaENoYW5nZWQnLFxuICAgIHN0eWxlU2hlZXRTdHJpbmc6ICdzdHlsZVNoZWV0U3RyaW5nJyxcbiAgICBlcnJvcjogJ2Vycm9yJyxcbn1cbmV4cG9ydCBjb25zdCBjb21tYW5kcyA9IHtcbiAgICBQQVNURTogXCJQQVNURVwiLFxuICAgIENPUFk6IFwiQ09QWVwiLFxuICAgIEJPT0tNQVJLOiBcIkJPT0tNQVJLXCIsXG4gICAgU0FWRTogXCJTQVZFXCJcbn1cblxuZXhwb3J0IGNvbnN0IGJsYWNrbGlzdGVkRWxCeUNsYXNzOiBBcnJheTxTdHJpbmc+ID0gW107XG5leHBvcnQgY29uc3QgY29uc29sZVRyYWNrTGlzdDogQXJyYXk8YW55PiA9IFsnaW5mbycsICdsb2cnLCAnd2FybicsICdlcnJvciddXG5leHBvcnQgY29uc3QgYmxhY2tsaXN0ZWRBdHRyczogQXJyYXk8U3RyaW5nPiA9IFsnc3Jjc2V0J11cbiIsImltcG9ydCB7IFxuICAgIGV2ZW50VHlwZXMsIFxuICAgIGJsYWNrbGlzdGVkRWxCeUNsYXNzLFxuICAgIGJsYWNrbGlzdGVkQXR0cnNcbn0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5pbXBvcnQgWEhSIGZyb20gJy4uL0hlbHBlcnMvWEhSJztcbiBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVBhcnNlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG4gICAgY3NzUnVsZXM6IFN0cmluZyA9ICcnOyBcbiAgICBpbnB1dE5vZGVOYW1lczogQXJyYXk8U3RyaW5nPiA9IFsnVEVYVEFSRUEnLCAnSU5QVVQnXTsgXG4gICAgcmVhZEltYWdlU3JjOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgICAvLyBzZWFyY2ggZm9yIGNsYXNzXG5cbiAgICBmZXRjaEFuZFJlY29yZFN0eWxlID0odXJsOiBhbnkpPT4ge1xuICAgICAgICBYSFIuZ2V0KHVybCwgKCk9Pnt9KVxuICAgICAgICAgICAgLnRoZW4oY3NzPT4geyBcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuc3R5bGVTaGVldFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgY3NzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBlcnI9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignW0FSQ10gRmV0Y2hpbmcgU3R5bGVTaGVldCBGYWlsZWQnLCB1cmwsIGVycik7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLnN0eWxlU2hlZXRTdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIGVyclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZWNvcmRTdHlsZSA9KCk9PiB7XG4gICAgICAgIHRoaXMuY3NzUnVsZXMgPSAnJztcbiAgICAgICAgbGV0IHJ1bGU6IHN0cmluZztcbiAgICAgICAgZm9yKGxldCBpZHg9MDsgaWR4PGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIC8vIHRyeSB7XG4gICAgICAgICAgICAvLyAgICAgZm9yKGxldCBqZHg9MDsgamR4PChkb2N1bWVudC5zdHlsZVNoZWV0c1tpZHhdIGFzIGFueSkucnVsZXMubGVuZ3RoOyBqZHgrKykge1xuICAgICAgICAgICAgLy8gICAgICAgICBydWxlID0gKGRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0gYXMgYW55KS5ydWxlc1tqZHhdLmNzc1RleHQ7IFxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmNzc1J1bGVzICs9IHJ1bGU7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSBjYXRjaCAoZSkgeyBcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgLy8gICAgIHR5cGU6IGV2ZW50VHlwZXMuc3R5bGVTaGVldHNMb2FkUmVxLFxuICAgICAgICAgICAgICAgIC8vICAgICBocmVmOiBkb2N1bWVudC5zdHlsZVNoZWV0c1tpZHhdLmhyZWZcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGlmKGRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0uaHJlZikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hBbmRSZWNvcmRTdHlsZShkb2N1bWVudC5zdHlsZVNoZWV0c1tpZHhdLmhyZWYpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0SFRNTCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgbGV0IGVsOmFueSA9IHt9O1xuXG4gICAgICAgIGlmKG5vZGUubm9kZU5hbWUgPT09ICcjdGV4dCcpIHtcbiAgICAgICAgICAgIGVsLm5vZGVOYW1lID0gbm9kZS5ub2RlTmFtZTtcbiAgICAgICAgICAgIGVsLnZhbHVlID0gbm9kZS5ub2RlVmFsdWU7XG4gICAgICAgICAgICBlbC50eXBlID0gJ3RleHQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwudGFnTmFtZSA9IFsnQk9EWSddLmluZGV4T2Yobm9kZS50YWdOYW1lKSAhPT0gLTEgPyAnRElWJyA6IG5vZGUudGFnTmFtZTtcbiAgICAgICAgICAgIGVsLmF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgICAgIGVsLnR5cGUgPSAnZWxlbWVudCc7XG4gICAgICAgICAgICBpZihub2RlLnRhZ05hbWUgPT09ICdJRlJBTUUnKSB7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBub2RlLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG5vZGUuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG5vZGUuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgYXR0ckluZGV4PTA7IGF0dHJJbmRleDxub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBhdHRySW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICBpZihibGFja2xpc3RlZEF0dHJzLmluZGV4T2Yobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0ubG9jYWxOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLmxvY2FsTmFtZSA9PT0gJ3NyYycgJiYgbm9kZS50YWdOYW1lICE9PSAnSUZSQU1FJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucmVhZEltYWdlU3JjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNyYyA9IHRoaXMucmVhZFNyYyhub2RlLCBub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNyY1VSTCA9IHRoaXMuY29udmVydFRvQWJzb2x1dGVQYXRoKG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zcmMgPSB0aGlzLmNvbnZlcnRUb0Fic29sdXRlUGF0aChub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5hdHRyaWJ1dGVzW25vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLmxvY2FsTmFtZV0gPSBub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogIEV2ZW50IEJpbmRpbmdcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgICAgICBpZihbJycsICdYJywgJ1knXS5tYXAoZD0+WydzY3JvbGwnLCAnYXV0byddLmluZGV4T2YoKHN0eWxlIGFzIGFueSlbJ292ZXJmbG93JytkXSkgIT09IC0xKS5maWx0ZXIoZD0+ZCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmJpbmRTY3JvbGwobm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaW5wdXROb2RlTmFtZXMuaW5kZXhPZihub2RlLm5vZGVOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuYmluZE9uS2V5dXAobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWwucmNpZCA9IG5vZGUucmNpZDtcbiAgICAgICAgZWwuY2hpbGROb2RlcyA9IFtdXG4gICAgICAgIGlmKG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgbm9kZS5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkOmFueSk9PiB7XG4gICAgICAgICAgICAgICAgaWYoY2hpbGQubm9kZU5hbWUgIT09ICdTQ1JJUFQnICYmIGNoaWxkLm5vZGVOYW1lICE9PSAnTk9TQ1JJUFQnICYmIGNoaWxkLm5vZGVOYW1lICE9PSAnI2NvbW1lbnQnICYmIHRoaXMuY2hlY2tOb2RlSXNWYWxpZChjaGlsZCkpICB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNoaWxkTm9kZXMucHVzaCh0aGlzLmdldEhUTUwoY2hpbGQpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIHRha2VTbmFwc2hvdCA9KG5vZGU6YW55LCBpbml0aWFsOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5wb3B1bGF0ZUlkKG5vZGUpO1xuICAgICAgICBsZXQgY2xvbmUgPSB0aGlzLmdldEhUTUwobm9kZSk7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuc25hcHNob3QsIFxuICAgICAgICAgICAgZG9tOiBjbG9uZSwgXG4gICAgICAgICAgICBjc3NSdWxlczogdGhpcy5jc3NSdWxlcywgIFxuICAgICAgICAgICAgaW5pdGlhbCxcbiAgICAgICAgICAgIHNjcmVlbldpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHNjcmVlbkhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgICAgICAgc2Nyb2xsVG9wOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgc2Nyb2xsTGVmdDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICAgICAgICBjb25zb2xlU3RhdHVzOiB0aGlzLmdldFJlY29yZGVyKCkuY29uc29sZVN0YXR1cyxcbiAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLmdldFJlY29yZGVyKCkuZ2V0VVJMRGV0YWlscygpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2hlY2tOb2RlSXNWYWxpZCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgaWYobm9kZS5jbGFzc05hbWUgJiYgbm9kZS5jbGFzc05hbWUuaW5kZXhPZiAmJiBibGFja2xpc3RlZEVsQnlDbGFzcy5maWx0ZXIoZD0+IG5vZGUuY2xhc3NOYW1lLmluZGV4T2YoZCkgIT09IC0xKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5ibGFja2xpc3RlZE5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29udmVydFRvQWJzb2x1dGVQYXRoID0ocGF0aDphbnkpPT4ge1xuICAgICAgICBpZihwYXRoPT1udWxsKVxuICAgICAgICAgICAgcmV0dXJuICdub3BhdGgnO1xuICAgICAgICByZXR1cm4gbmV3IFVSTChwYXRoLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKS5ocmVmOyBcbiAgICB9XG5cblxuICAgIGdldEJhc2U2NEltYWdlKGltZzphbnkpIHtcbiAgICAgICAgbGV0IGRhdGFVUkwgPSAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgICAgICB2YXIgY3R4OmFueSA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcbiAgICAgICAgICAgIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBcbiAgICAgICAgcmV0dXJuIGRhdGFVUkw7XG4gICAgfVxuXG4gICAgcmVhZFNyYyA9KG5vZGU6YW55LCB1cmw6YW55KT0+IHtcbiAgICAgICAgaWYobm9kZS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QmFzZTY0SW1hZ2Uobm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHJjaWQ6IG5vZGUucmNpZCxcbiAgICAgICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgICAgICBzcmM6IHRoaXMuZ2V0QmFzZTY0SW1hZ2Uobm9kZSksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuYXNzZXRMb2FkZWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxufSIsImV4cG9ydCBkZWZhdWx0ICdkb2MgcmVhZHknO1xuXG4oZnVuY3Rpb24oZnVuY05hbWU6YW55LCBiYXNlT2JqOmFueSkge1xuICAgIGZ1bmNOYW1lID0gZnVuY05hbWUgfHwgXCJkb2NSZWFkeVwiO1xuICAgIGJhc2VPYmogPSBiYXNlT2JqIHx8IHdpbmRvdztcbiAgICB2YXIgcmVhZHlMaXN0ID0gW10gYXMgYW55O1xuICAgIHZhciByZWFkeUZpcmVkID0gZmFsc2U7XG4gICAgdmFyIHJlYWR5RXZlbnRIYW5kbGVyc0luc3RhbGxlZCA9IGZhbHNlO1xuICAgIFxuICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xuICAgICAgICBpZiAoIXJlYWR5RmlyZWQpIHtcbiAgICAgICAgICAgIHJlYWR5RmlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWFkeUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZWFkeUxpc3RbaV0uZm4uY2FsbCh3aW5kb3csIHJlYWR5TGlzdFtpXS5jdHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVhZHlMaXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVhZHlTdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgaWYgKCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgKSB7XG4gICAgICAgICAgICByZWFkeSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJhc2VPYmpbZnVuY05hbWVdID0gZnVuY3Rpb24oY2FsbGJhY2s6YW55LCBjb250ZXh0OmFueSkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjYWxsYmFjayBmb3IgZG9jUmVhZHkoZm4pIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVhZHlGaXJlZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtjYWxsYmFjayhjb250ZXh0KTt9LCAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlYWR5TGlzdC5wdXNoKHtmbjogY2FsbGJhY2ssIGN0eDogY29udGV4dH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHwgKCEoZG9jdW1lbnQgYXMgYW55KS5hdHRhY2hFdmVudCAmJiBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlYWR5LCAxKTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVhZHlFdmVudEhhbmRsZXJzSW5zdGFsbGVkKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHJlYWR5LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHJlYWR5LCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoKGRvY3VtZW50IGFzIGFueSkuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAoZG9jdW1lbnQgYXMgYW55KS5hdHRhY2hFdmVudChcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLCByZWFkeVN0YXRlQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICAoZG9jdW1lbnQgYXMgYW55KS5hdHRhY2hFdmVudChcIm9ubG9hZFwiLCByZWFkeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignW0FSQ106IEZhaWxlZCB0byBUcmlnZ2VyIERvYyByZWFkeScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWFkeUV2ZW50SGFuZGxlcnNJbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICB9KShcImRvY1JlYWR5XCIsIHdpbmRvdyk7IiwiY29uc3QgZ2VuZXJhdGVSYW5kb21TdHJpbmcgPShsZW5ndGg6IE51bWJlcik9PiB7XG4gICAgbGV0IHJlc3VsdCAgICAgICAgICAgPSAnJztcbiAgICBsZXQgY2hhcmFjdGVycyAgICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gICAgbGV0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBsZW5ndGg7IGlkeCsrICkge1xuICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVNJRCA9KCk9PiB7XG4gICAgcmV0dXJuIGdlbmVyYXRlUmFuZG9tU3RyaW5nKDQpICsgJy0nICsgZ2VuZXJhdGVSYW5kb21TdHJpbmcoNCkgKyAnLScgKyBnZW5lcmF0ZVJhbmRvbVN0cmluZygyKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFNJRCA9KCk9PiB7XG4gICAgbGV0IHNpZCA9ICh3aW5kb3cgYXMgYW55KS5hcHByY19zaWQgfHwgbnVsbDtcbiAgICBpZihzaWQgPT09IG51bGwpIHtcbiAgICAgICAgc2lkID0gZ2VuZXJhdGVTSUQoKVxuICAgIH1cbiAgICByZXR1cm4gc2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEpTKGZpbGU6YW55LCBjYWxsYmFjazphbnkpIHtcbiAgICB2YXIganNFbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIGpzRWxtLnR5cGUgPSBcImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIjtcbiAgICBqc0VsbS5zcmMgPSBmaWxlO1xuICAgIGpzRWxtLm9ubG9hZCA9IGNhbGxiYWNrO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoanNFbG0pO1xufVxuXG5jb25zdCB1cmxQYXJzZXJLZXkgPSAnW15dJzsgXG5cblxuZXhwb3J0IGNvbnN0IHBhcnNlVVJMID0odXJsOmFueSk9PiAodXJsfHwnJykuc3BsaXQoJy4nKS5qb2luKHVybFBhcnNlcktleSkiLCJleHBvcnQgZGVmYXVsdCB7XG5cbiAgICBnZXQ6YXN5bmMgKHVybDogc3RyaW5nLCBvbnByb2dyZXNzOiBhbnkpPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvLyBleGVjdXRvciAodGhlIHByb2R1Y2luZyBjb2RlLCBcInNpbmdlclwiKVxuICAgICAgICAgICAgbGV0IHJxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IFxuICAgICAgICAgICAgcnEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7ICBcbiAgICAgICAgICAgICAgICBpZiAocnEucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJxLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgICAgICAgICAgICAgICAgIGlmKHJxLnN0YXR1cyA9PT0gMjAwKSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYocnEuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChkYXRhKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICBycS5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7IFxuICAgICAgICAgICAgaWYob25wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHJxLm9ucHJvZ3Jlc3M9b25wcm9ncmVzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJxLnNlbmQobnVsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgZXZlbnRUeXBlcyB9IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXRhRGF0YUhhbmRsZXIge1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuICAgICAgICB0aGlzLmdldEFsbE1ldGFEYXRhKCk7XG4gICAgfVxuXG4gICAgZ2V0QWxsTWV0YURhdGEgPShnZW5lcmF0ZUV2ZW50PXRydWUpPT4ge1xuICAgICAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmJyb3dzZXJNZXRhLFxuICAgICAgICAgICAgYnJvd3NlcjogdGhpcy5nZXRCcm93c2VyKCksXG4gICAgICAgICAgICBvczogdGhpcy5nZXRPUygpLFxuICAgICAgICAgICAgY29yZTogbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3ksXG4gICAgICAgICAgICBjb29raWVFbmFibGVkOiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCxcbiAgICAgICAgICAgIGxhbmd1YWdlOiBuYXZpZ2F0b3IubGFuZ3VhZ2UsXG4gICAgICAgICAgICBkZXZpY2VNZW1vcnk6IChuYXZpZ2F0b3IgYXMgYW55KS5kZXZpY2VNZW1vcnksXG4gICAgICAgICAgICBpc1RvdWNoRGV2aWNlOiB0aGlzLmdldElzVG91Y2hEZXZpY2UoKSxcbiAgICAgICAgICAgIHJlZmVycmVyOmRvY3VtZW50LnJlZmVycmVyLFxuICAgICAgICAgICAgYXBwVmVyc2lvbjogbmF2aWdhdG9yLmFwcFZlcnNpb24sXG4gICAgICAgICAgICB1c2VyQWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgfTtcbiAgICAgICAgaWYoZ2VuZXJhdGVFdmVudClcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KGV2ZW50KVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cblxuICAgIGdldElzVG91Y2hEZXZpY2UoKSB7XG4gICAgICAgIHJldHVybiAgJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8ICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KVxuICAgICAgICAgICAgfHwgKG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDApXG4gICAgICAgICAgICB8fCAobmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKSlcbiAgICB9XG5cbiAgICBnZXRCcm93c2VyKCl7XG4gICAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQsIHRlbSxcbiAgICAgICAgTT0gdWEubWF0Y2goLyhvcGVyYXxjaHJvbWV8c2FmYXJpfGZpcmVmb3h8bXNpZXx0cmlkZW50KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fCBbXTtcbiAgICAgICAgaWYoL3RyaWRlbnQvaS50ZXN0KE1bMV0pKXtcbiAgICAgICAgICAgIHRlbT0gIC9cXGJydlsgOl0rKFxcZCspL2cuZXhlYyh1YSkgfHwgW107XG4gICAgICAgICAgICByZXR1cm4gJ0lFICcrKHRlbVsxXSB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoTVsxXT09PSAnQ2hyb21lJyl7XG4gICAgICAgICAgICB0ZW09IHVhLm1hdGNoKC9cXGIoT1BSfEVkZ2U/KVxcLyhcXGQrKS8pO1xuICAgICAgICAgICAgaWYodGVtIT0gbnVsbCkgcmV0dXJuIHRlbS5zbGljZSgxKS5qb2luKCcgJykucmVwbGFjZSgnT1BSJywgJ09wZXJhJykucmVwbGFjZSgnRWRnICcsICdFZGdlICcpO1xuICAgICAgICB9XG4gICAgICAgIE09IE1bMl0/IFtNWzFdLCBNWzJdXTogW25hdmlnYXRvci5hcHBOYW1lLCBuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgJy0/J107XG4gICAgICAgIGlmKCh0ZW09IHVhLm1hdGNoKC92ZXJzaW9uXFwvKFxcZCspL2kpKSE9IG51bGwpIE0uc3BsaWNlKDEsIDEsIHRlbVsxXSk7XG4gICAgICAgIHJldHVybiBNLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBnZXRPUygpIHtcbiAgICAgICAgdmFyIHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgICAgcGxhdGZvcm0gPSB3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtLFxuICAgICAgICAgICAgbWFjb3NQbGF0Zm9ybXMgPSBbJ01hY2ludG9zaCcsICdNYWNJbnRlbCcsICdNYWNQUEMnLCAnTWFjNjhLJ10sXG4gICAgICAgICAgICB3aW5kb3dzUGxhdGZvcm1zID0gWydXaW4zMicsICdXaW42NCcsICdXaW5kb3dzJywgJ1dpbkNFJ10sXG4gICAgICAgICAgICBpb3NQbGF0Zm9ybXMgPSBbJ2lQaG9uZScsICdpUGFkJywgJ2lQb2QnXSxcbiAgICAgICAgICAgIG9zID0gbnVsbDtcbiAgICAgIFxuICAgICAgICBpZiAobWFjb3NQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybSkgIT09IC0xKSB7XG4gICAgICAgICAgb3MgPSAnTWFjIE9TJztcbiAgICAgICAgfSBlbHNlIGlmIChpb3NQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybSkgIT09IC0xKSB7XG4gICAgICAgICAgb3MgPSAnaU9TJztcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3dzUGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0pICE9PSAtMSkge1xuICAgICAgICAgIG9zID0gJ1dpbmRvd3MnO1xuICAgICAgICB9IGVsc2UgaWYgKC9BbmRyb2lkLy50ZXN0KHVzZXJBZ2VudCkpIHtcbiAgICAgICAgICBvcyA9ICdBbmRyb2lkJztcbiAgICAgICAgfSBlbHNlIGlmICghb3MgJiYgL0xpbnV4Ly50ZXN0KHBsYXRmb3JtKSkge1xuICAgICAgICAgIG9zID0gJ0xpbnV4JztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkub3MgPSBvcztcbiAgICAgICAgcmV0dXJuIG9zO1xuICAgIH1cbn0gIiwiaW1wb3J0IHsgXG4gICAgZXZlbnRUeXBlcywgXG59IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdXRhdGlvbkhhbmRsZXIge1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuICAgIHNraXBwZWRNdXRhdGlvbnM6IGFueSA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG4gICAgfVxuXG5cbiAgICBoYW5kbGVNdXRhdGlvbnMgPShtdXRhdGlvbnM6YW55KT0+IHtcbiAgICAgICAgbGV0IGJsYWNrbGlzdGVkTm9kZXM6IEFycmF5PGFueT4gPSB0aGlzLmdldFJlY29yZGVyKCkuYmxhY2tsaXN0ZWROb2RlcztcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uOmFueSk9PiB7XG4gICAgICAgICAgICBpZighbXV0YXRpb24udGFyZ2V0KSBcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIGZvcihsZXQgaWR4IGluIGJsYWNrbGlzdGVkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBpZihibGFja2xpc3RlZE5vZGVzW2lkeF0uY29udGFpbnMobXV0YXRpb24udGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraXBwZWRNdXRhdGlvbnMrKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoKG11dGF0aW9uLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGV2ZW50VHlwZXMuY2hhcmFjdGVyRGF0YTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFyYWN0ZXJEYXRhTXV0YXRpb24obXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlcy5jaGlsZExpc3Q6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hpbGRMaXN0KG11dGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIGV2ZW50VHlwZXMuYXR0cmlidXRlczpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBdHRyaWJ1dGVzKG11dGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuXG5cbiAgICBoYW5kbGVDaGFyYWN0ZXJEYXRhTXV0YXRpb24gPShtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICByY2lkOiBtdXRhdGlvbi50YXJnZXQucmNpZCxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY2hhcmFjdGVyRGF0YSxcbiAgICAgICAgICAgIHRleHQ6IG11dGF0aW9uLnRhcmdldC5kYXRhXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQ2hpbGRMaXN0ID0obXV0YXRpb246YW55KT0+IHtcbiAgICAgICAgbGV0IHJlbW92ZWROb2RlcyA9IFtdO1xuICAgICAgICBsZXQgYWRkZWROb2RlcyA9IFtdO1xuICAgICAgICBmb3IobGV0IGlkeD0wOyBpZHggPCBtdXRhdGlvbi5yZW1vdmVkTm9kZXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgaWYobXV0YXRpb24ucmVtb3ZlZE5vZGVzW2lkeF0ucmNpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLnB1c2gobXV0YXRpb24ucmVtb3ZlZE5vZGVzW2lkeF0ucmNpZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLnVuYmluZEZyb21BbGxFdmVudChtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpZHg9MDsgaWR4IDwgbXV0YXRpb24uYWRkZWROb2Rlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkucG9wdWxhdGVJZChtdXRhdGlvbi5hZGRlZE5vZGVzW2lkeF0pO1xuICAgICAgICAgICAgYWRkZWROb2Rlcy5wdXNoKHRoaXMuZ2V0UmVjb3JkZXIoKS5kb21QYXJzZXIuZ2V0SFRNTChtdXRhdGlvbi5hZGRlZE5vZGVzW2lkeF0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICBwYXJlbnQ6IG11dGF0aW9uLnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jaGlsZExpc3QsXG4gICAgICAgICAgICBhZGRlZE5vZGVzLFxuICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLFxuICAgICAgICAgICAgbmV4dFNpYmxpbmc6IG11dGF0aW9uLm5leHRTaWJsaW5nID8gbXV0YXRpb24ubmV4dFNpYmxpbmcucmNpZCA6IG51bGwsXG4gICAgICAgICAgICBwcmV2aW91c1NpYmxpbmc6IG11dGF0aW9uLnByZXZpb3VzU2libGluZyA/IG11dGF0aW9uLnByZXZpb3VzU2libGluZy5yY2lkIDogbnVsbCxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb252ZXJ0VG9BYnNvbHV0ZVBhdGggPShwYXRoOmFueSk9PiB7XG4gICAgICAgIGlmKHBhdGg9PW51bGwpXG4gICAgICAgICAgICByZXR1cm4gJ25vcGF0aCc7XG4gICAgICAgIHJldHVybiBuZXcgVVJMKHBhdGgsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pLmhyZWY7IFxuICAgIH1cblxuICAgIGhhbmRsZUF0dHJpYnV0ZXMgPShtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICBpZihtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lID09PSAnc3JjJykge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNvbnZlcnRUb0Fic29sdXRlUGF0aCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgcmNpZDogbXV0YXRpb24udGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lLFxuICAgICAgICAgICAgYXR0cmlidXRlVmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59IiwiaW1wb3J0IHsgZXZlbnRUeXBlcyB9IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuaW1wb3J0IHtyZWNvcmRlckNvbmZpZ30gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbmZpZyc7XG5pbXBvcnQgTXV0YXRpb25IYW5kbGVyIGZyb20gJy4uL011dGF0aW9uSGFuZGxlci9NdXRhdGlvbkhhbmRsZXInO1xuaW1wb3J0IENvbnNvbGVIYW5kbGVyIGZyb20gJy4uL0NvbnNvbGVIYW5kbGVyL0NvbnNvbGVIYW5kbGVyJztcbmltcG9ydCBXaW5kb3dFdmVudEhhbmRsZXIgZnJvbSAnLi4vV2luZG93RXZlbnRIYW5kbGVyL1dpbmRvd0V2ZW50SGFuZGxlcic7XG5pbXBvcnQgRG9tUGFyc2VyIGZyb20gJy4uL0RvbVBhcnNlci9Eb21QYXJzZXInO1xuaW1wb3J0IFdlYlJlcXVlc3RIYW5kbGVyIGZyb20gJy4uL1dlYlJlcXVlc3RIYW5kbGVyL1dlYlJlcXVlc3RIYW5kbGVyJztcbmltcG9ydCBNZXRhRGF0YUhhbmRsZXIgZnJvbSAnLi4vTWV0YURhdGFIYW5kbGVyL01ldGFEYXRhSGFuZGxlcic7XG5cbmNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSAod2luZG93IGFzIGFueSkuTXV0YXRpb25PYnNlcnZlciB8fCAod2luZG93IGFzIGFueSkuV2ViS2l0TXV0YXRpb25PYnNlcnZlciB8fCAod2luZG93IGFzIGFueSkuTW96TXV0YXRpb25PYnNlcnZlcjtcblxubGV0IG9ic2VydmVyO1xubGV0IGN1cnJlbnROb2RlSWQgPSAxO1xubGV0IGRhdGE6IEFycmF5PGFueT4gPSBbXTtcbmxldCBkYXRhQnVmZmVyOiBBcnJheTxhbnk+ID0gW11cbmxldCBldmVudExpc3RlbmVyOmFueSA9IG51bGw7XG5sZXQgaW5pdGlhbFNuYXBzaG90U2VuZDogQm9vbGVhbiA9IGZhbHNlO1xuKHdpbmRvdyBhcyBhbnkpLnJjRGF0YSA9IFtdXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZGVyIHtcblxuICAgIGNpZDogU3RyaW5nO1xuICAgIHNpZDogU3RyaW5nO1xuICAgIGFpZDogU3RyaW5nO1xuICAgIGJsYWNrbGlzdGVkTm9kZXM6IEFycmF5PGFueT47XG4gICAgY29uc29sZVN0YXR1czogYW55O1xuICAgIG9zOiBhbnk7XG4gICAgY3RybEtleVN0YXR1czogYW55O1xuICAgIG11dGFpb25IYW5kbGVyOiBhbnk7XG4gICAgZG9tUGFyc2VyOiBhbnk7XG4gICAgY29uc29sZUhhbmRsZXI6IGFueTtcbiAgICB3aW5kb3dFdmVudEhhbmRsZXI6IGFueTtcbiAgICB3ZWJSZXF1ZXN0SGFuZGxlcjogYW55O1xuICAgIG1ldGFEYXRhSGFuZGxlcjogYW55O1xuICAgIG1vdXNlTW92ZVRocmVzaG9sZDogYW55ID0gMzM7XG4gICAgbGFzdE1vdXNlTW92ZUV2ZW50R2VuZXJhdGVkOiBhbnkgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaWQgPSBhcmdzLmNpZDtcbiAgICAgICAgdGhpcy5zaWQgPSBhcmdzLnNpZDtcbiAgICAgICAgdGhpcy5haWQgPSBhcmdzLmFpZDtcbiAgICAgICAgdGhpcy5ibGFja2xpc3RlZE5vZGVzID0gW107XG4gICAgICAgIHRoaXMuZG9tUGFyc2VyID0gbmV3IERvbVBhcnNlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSk7XG4gICAgICAgIHRoaXMuY29uc29sZUhhbmRsZXIgPSBuZXcgQ29uc29sZUhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pXG4gICAgICAgIHRoaXMubXV0YWlvbkhhbmRsZXIgPSBuZXcgTXV0YXRpb25IYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KVxuICAgICAgICB0aGlzLndpbmRvd0V2ZW50SGFuZGxlciA9IG5ldyBXaW5kb3dFdmVudEhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pO1xuICAgICAgICB0aGlzLndlYlJlcXVlc3RIYW5kbGVyID0gbmV3IFdlYlJlcXVlc3RIYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KTtcbiAgICAgICAgdGhpcy5tZXRhRGF0YUhhbmRsZXIgPSBuZXcgTWV0YURhdGFIYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KTtcbiAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFJlY29yZGVyIEluaXRpYXRlZC4gViAwLjIuMycpO1xuICAgIH0gICAgXG5cbiAgICBzdGFydCA9KG5vZGU6IGFueSk9PiB7XG4gICAgICAgIHRoaXMuZG9tUGFyc2VyLnJlY29yZFN0eWxlKCk7XG4gICAgICAgIHRoaXMuYmluZFNjcm9sbCh3aW5kb3cpO1xuICAgICAgICB0aGlzLmJpbmRNb3VzZUV2ZW50KGRvY3VtZW50KTtcbiAgICAgICAgdGhpcy53aW5kb3dFdmVudEhhbmRsZXIuY2hlY2tDb25zb2xlU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgdGhpcy5kb21QYXJzZXIudGFrZVNuYXBzaG90KG5vZGUsIHRydWUpO1xuICAgICAgICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnM6YW55KT0+IHtcbiAgICAgICAgICAgIHRoaXMubXV0YWlvbkhhbmRsZXIuaGFuZGxlTXV0YXRpb25zKG11dGF0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHJlY29yZGVyQ29uZmlnKTsgXG4gICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBTdGFydGVkIFJlY29yZGluZycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqICBIZWxwZXJzXG4gICAgICogXG4gICAgICovXG5cbiAgICBiaW5kU2Nyb2xsID0obm9kZTphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG5vZGUuaXNTY3JvbGwgPSB0cnVlO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU9uU2Nyb2xsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRPbktleXVwID0obm9kZTphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG5vZGUuaXNPbktleXVwID0gdHJ1ZTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZU9uS2V5dXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE1vdXNlRXZlbnQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVNb3VzZUNsaWNrKTtcbiAgICB9XG5cbiAgICB1bmJpbmRGcm9tQWxsRXZlbnQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuaXNTY3JvbGwgJiYgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBub2RlLmlzU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT25TY3JvbGwpO1xuICAgICAgICB9XG4gICAgICAgIGlmKG5vZGUuaXNPbktleXVwICYmIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc09uS2V5dXAgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZU9uS2V5dXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjdXJzaXZlbHlDaGVja1RhcmdldEhhc0NsaWNrRXZlbnRzOmFueSA9KHRhcmdldDphbnkpPT4ge1xuICAgICAgICBpZih0YXJnZXQub25jbGljayB8fCB0YXJnZXQub25tb3VzZWRvd24gfHwgdGFyZ2V0Lm9ubW91c2V1cCB8fCB0YXJnZXQub25jaGFuZ2UgfHwgXG4gICAgICAgICAgICBbJ0lOUFVUJ10uaW5kZXhPZih0YXJnZXQudGFnTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRhcmdldC50YWdOYW1lICE9PSAnQk9EWScgJiYgdGFyZ2V0LnBhcmVudE5vZGUpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVjdXJzaXZlbHlDaGVja1RhcmdldEhhc0NsaWNrRXZlbnRzKHRhcmdldC5wYXJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIEV2ZW50IEhhbmRsZXJzXG4gICAgICovXG5cbiAgICBoYW5kbGVPblNjcm9sbCA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIGxldCBub2RlID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50O1xuXG4gICAgICAgIGlmKCFub2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGxldCBzY3JvbGwgPSB7fVxuXG4gICAgICAgIGlmKG5vZGUucmNpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBzY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBub2RlLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgc2Nyb2xsTGVmdDogbm9kZS5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICByY2lkOiAtMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbCA9IHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG5vZGUuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IG5vZGUuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICByY2lkOiBub2RlLnJjaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAoc2Nyb2xsIGFzIGFueSkudHlwZSA9IGV2ZW50VHlwZXMuc2Nyb2xsO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoc2Nyb2xsKTtcbiAgICB9XG5cbiAgICBoYW5kbGVPbktleXVwID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHJjaWQ6IGV2ZW50LnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuaW5wdXRWYWx1ZVxuICAgICAgICB9KTsgICAgICAgIFxuICAgIH1cblxuICAgIGhhbmRsZU1vdXNlTW92ZSA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIGlmKHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMubGFzdE1vdXNlTW92ZUV2ZW50R2VuZXJhdGVkID4gdGhpcy5tb3VzZU1vdmVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdE1vdXNlTW92ZUV2ZW50R2VuZXJhdGVkID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICBtb3VzZVg6IGV2ZW50LnBhZ2VYIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgbW91c2VZOiBldmVudC5wYWdlWSAtIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5tb3VzZU1vdmVcbiAgICAgICAgICAgIH0pOyAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVNb3VzZUNsaWNrID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldCA6IG51bGw7XG4gICAgICAgIGxldCBpc1Jlc3BvbnNpdmUgPSB0YXJnZXQgIT09IG51bGwgPyB0aGlzLnJlY3Vyc2l2ZWx5Q2hlY2tUYXJnZXRIYXNDbGlja0V2ZW50cyh0YXJnZXQpIDogZmFsc2U7XG4gICAgICAgIGxldCBpc0xpbmsgPSB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LmhyZWYgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICBtb3VzZVg6IGV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgbW91c2VZOiBldmVudC5wYWdlWSxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMubW91c2VDbGljayxcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZSxcbiAgICAgICAgICAgIGlzTGlua1xuICAgICAgICB9KTsgICAgIFxuICAgIH1cblxuICAgIGdldFVSTERldGFpbHMgPSgpPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgICAgICAgcHJvdG9jb2w6IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCxcbiAgICAgICAgICAgIGhvc3Q6IHdpbmRvdy5sb2NhdGlvbi5ob3N0LFxuICAgICAgICAgICAgaG9zdG5hbWU6IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSxcbiAgICAgICAgICAgIHBvcnQ6IHdpbmRvdy5sb2NhdGlvbi5wb3J0LFxuICAgICAgICAgICAgcGF0aG5hbWU6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgICAgIHNlYXJjaDogd2luZG93LmxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgICAgIGhhc2g6IHdpbmRvdy5sb2NhdGlvbi5oYXNoLFxuICAgICAgICAgICAgaHJlZjogd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqICBQb3B1bGF0ZSBJZFxuICAgICAqIFxuICAgICAqL1xuIFxuICAgIHBvcHVsYXRlSWQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIG5vZGUucmNpZCA9IGN1cnJlbnROb2RlSWQ7XG4gICAgICAgIGN1cnJlbnROb2RlSWQrKztcbiAgICAgICAgaWYobm9kZS5jaGlsZE5vZGVzICYmIG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgbm9kZS5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkOmFueSk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZUlkKGNoaWxkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogIE1ldGEgRGF0YVxuICAgICAqL1xuXG4gICAgZ2V0QWxsTWV0YURhdGEgPShnZW5lcmF0ZUV2ZW50PXRydWUpPT4gdGhpcy5tZXRhRGF0YUhhbmRsZXIuZ2V0QWxsTWV0YURhdGEoZ2VuZXJhdGVFdmVudCk7XG4gXG5cbiAgICAvKipcbiAgICAgKiAgVGhlIEV2ZW50IEdlbmVyYXRvclxuICAgICAqL1xuXG4gICAgIFxuXG4gICAgZ2VuZXJhdGVFdmVudCA9KGFjdGlvbjphbnkpPT4ge1xuICAgICAgICBsZXQgZXZlbnQ6YW55ID0ge1xuICAgICAgICAgICAgdGltZTogcGFyc2VGbG9hdChwZXJmb3JtYW5jZS5ub3coKS50b0ZpeGVkKDQpKVxuICAgICAgICB9IFxuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAgICAgLi4uYWN0aW9uXG4gICAgICAgIH0gXG4gICAgICAgIGlmKCFpbml0aWFsU25hcHNob3RTZW5kICYmIGV2ZW50LmluaXRpYWwpIHtcbiAgICAgICAgICAgIGluaXRpYWxTbmFwc2hvdFNlbmQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICBpZihkYXRhQnVmZmVyLmxlbmd0aCAmJiBpbml0aWFsU25hcHNob3RTZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaWR4IGluIGRhdGFCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudChkYXRhQnVmZmVyW2lkeF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFCdWZmZXIgPSBbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEpXG4gICAgICAgIH1cbiAgICAgICAgaWYoaW5pdGlhbFNuYXBzaG90U2VuZCkge1xuICAgICAgICAgICAgZGF0YS5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMucHVibGlzaExpdmVVcGRhdGUoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYoW2V2ZW50VHlwZXMuYXR0cmlidXRlcywgZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhLCBldmVudFR5cGVzLmNoaWxkTGlzdF0uaW5kZXhPZihldmVudC50eXBlKSA9PT0gLTEpe1xuICAgICAgICAgICAgZGF0YUJ1ZmZlci5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1Ymxpc2hMaXZlVXBkYXRlID0oZXZlbnQ6IGFueSk9PiB7XG4gICAgICAgIGlmKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxldCBtc2c6YW55ID0gdGhpcy53cmFwRXZlbnQoZXZlbnQpOyBcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5yY0RhdGEucHVzaChtc2cpO1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcihtc2csIGRhdGEpO1xuICAgICAgICB9ICAgXG4gICAgfVxuXG4gICAgZ2V0TGl2ZVVwZGF0ZSA9KGxpc3RlbmVyOmFueSk9PiB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgbXNnID0gdGhpcy53cmFwRXZlbnQoZGF0YVtkYXRhLmxlbmd0aC0xXSlcbiAgICAgICAgICAgICAgICBldmVudExpc3RlbmVyKG1zZywgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cmFwRXZlbnQgPShkYXRhOmFueSk9PiB7XG4gICAgICAgIHJldHVybiBkYXRhOyBcbiAgICB9XG5cbn0iLCJpbXBvcnQgJy4uL0hlbHBlcnMvRG9jUmVhZHknO1xuaW1wb3J0IHtnZXRTSUQsIGxvYWRKUywgcGFyc2VVUkx9IGZyb20gJy4uL0hlbHBlcnMvSGVscGVycyc7XG5pbXBvcnQgUmVjb3JkZXIgZnJvbSAnLi4vUmVjb3JkZXIvUmVjb3JkZXInO1xuaW1wb3J0IHtob3N0fSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJzsgXG5cbmludGVyZmFjZSBSSEFyZ3Mge1xuICAgIGNsaWVudElkOiBTdHJpbmcsXG4gICAgYXBwSWQ6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRlckhhbmRsZXIge1xuXG4gICAgc2lkOiBTdHJpbmc7XG4gICAgY2lkOiBTdHJpbmc7XG4gICAgYWlkOiBTdHJpbmc7XG4gICAgcmNEYXRhQnVmZmVyOiBBcnJheTxhbnk+ID0gW107XG4gICAgcmVjb3JkZXJEYXRhOiBBcnJheTxhbnk+ID0gW107XG4gICAgcmVjb3JkZXI6IGFueSA9IG51bGw7XG4gICAgc29ja2V0OiBhbnk7XG4gICAgc29ja2V0SW50ZXI6IGFueTtcbiAgICBpbml0aWF0ZWQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBwYWNrZXRJbmRleDogYW55ID0gMDsgXG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBSSEFyZ3MpIHtcblxuICAgICAgICB0aGlzLnNpZCA9IGdldFNJRCgpO1xuICAgICAgICB0aGlzLmFpZCA9IGFyZ3MuYXBwSWQ7XG4gICAgICAgIHRoaXMuY2lkID0gYXJncy5jbGllbnRJZDtcblxuICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gV2FpdGluZyBmb3IgZG9jdW1lbnQgcmVhZHkgc3RhdGUnKTtcblxuICAgICAgICAod2luZG93IGFzIGFueSkuZG9jUmVhZHkoKCk9PiB7XG4gICAgICAgICAgICBsb2FkSlMoJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NvY2tldC5pby8yLjMuMC9zb2NrZXQuaW8uc2xpbS5qcycsICgpPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFNvY2tldCBsb2FkZWQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyRGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXIgPSBuZXcgUmVjb3JkZXIoe1xuICAgICAgICAgICAgICAgICAgICBzaWQ6IHRoaXMuc2lkLFxuICAgICAgICAgICAgICAgICAgICBjaWQ6IHRoaXMuY2lkLFxuICAgICAgICAgICAgICAgICAgICBhaWQ6IHRoaXMuYWlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5nZXRMaXZlVXBkYXRlKHRoaXMub25SZWNvcmRlclVwZGF0ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuc3RhcnQoZG9jdW1lbnQuYm9keSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW8gPSAod2luZG93IGFzIGFueSkuaW87XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSBpby5jb25uZWN0KGhvc3QsIHt0cmFuc3BvcnRzOlsnd2Vic29ja2V0JywgJ3BvbGxpbmcnXX0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uY2UoJ2Nvbm5lY3QnLCB0aGlzLm9uQ29ubmVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgncmVjb25uZWN0JywgdGhpcy5vbkNvbm5lY3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uY2UoJ2Rpc2Nvbm5lY3QnLCB0aGlzLm9uRGlzY29ubmVjdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCB3aW5kb3cpXG5cbiAgICB9XG4gXG4gICAgb25EaXNjb25uZWN0ID0oKT0+IHtcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkNvbm5lY3QgPSgpPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gQ29ubmVjdGVkIHRvIFNvY2tldCcpO1xuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogIFNlbmRpbmcgU2Vzc2lvbiBNZXRhXG4gICAgICAgICAqL1xuICAgICAgICBsZXQgc2Vzc2lvbk1ldGFEYXRhID0gdGhpcy5nZXRTZXNzaW9uTWV0YSgpO1xuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdzZXNzaW9uUmVjaXZlcicsIHNlc3Npb25NZXRhRGF0YSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTZW5kaW5nIEJ1ZmZlcmVkIERhdGFcbiAgICAgICAgICovXG4gICAgICAgIGZvcihsZXQgaWR4IGluIHRoaXMucmVjb3JkZXJEYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRUb1NlcnZlcih0aGlzLnJlY29yZGVyRGF0YVtpZHhdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY29yZGVyRGF0YSA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgSW5pdGlhdGluZyBTZW5kZXJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc29ja2V0SW50ZXIgPSBzZXRJbnRlcnZhbCgoKT0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMucmNEYXRhQnVmZmVyICYmIHRoaXMucmNEYXRhQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBTZW5kaW5nIERhdGEnLCB0aGlzLnJjRGF0YUJ1ZmZlci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGxldCBwYWNrZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZDogdGhpcy5zaWQsXG4gICAgICAgICAgICAgICAgICAgIGNpZDogdGhpcy5jaWQsXG4gICAgICAgICAgICAgICAgICAgIGFpZDogdGhpcy5haWQsXG4gICAgICAgICAgICAgICAgICAgIHBpZDogdGhpcy5nZXRQSUQoKSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMucGFja2V0SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdldmVudCcsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5yY0RhdGFCdWZmZXJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMucGFja2V0SW5kZXgrPTE7XG4gICAgICAgICAgICAgICAgaWYoKHdpbmRvdyBhcyBhbnkpLkFSQ0RldiB8fCB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOmFueSA9ICBKU09OLnN0cmluZ2lmeShwYWNrZXQpLmxlbmd0aCAqIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBQYWNrZXQgc2l6ZScsIHNpemUsICdCeXRlcywgJywgTWF0aC5jZWlsKHNpemUvMTAyNCksICdrYicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Nlc3Npb25SZWNpdmVyJywgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJjRGF0YUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBnZXRQSUQgPSgpPT4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG5cbiAgICBzZW5kVG9TZXJ2ZXIgPShldmVudDogYW55KT0+IHtcbiAgICAgICAgaWYoIXRoaXMuaW5pdGlhdGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMucmNEYXRhQnVmZmVyLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIG9uUmVjb3JkZXJVcGRhdGVyID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgdGhpcy5yZWNvcmRlckRhdGEucHVzaChldmVudCk7XG4gICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBnZXRTZXNzaW9uTWV0YSA9KCk9PiB7XG4gICAgICAgIGlmKCF0aGlzLnJlY29yZGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbQVJDXSBGQVRBTCBFUlI6IFJlY29yZGVyIG5vdCBGb3VuZCcpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1ldGE6YW55ID0gdGhpcy5yZWNvcmRlci5nZXRBbGxNZXRhRGF0YShmYWxzZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzaWQ6IHRoaXMuc2lkLFxuICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgIGFpZDogdGhpcy5haWQsXG4gICAgICAgICAgICB0eXBlOidzZXNzaW9uJyxcbiAgICAgICAgICAgIGRldmljZVR5cGU6ICdkZXNrdG9wJyxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIG1ldGFEYXRhOiB7XG4gICAgICAgICAgICAgIGJyb3dzZXJOYW1lOiBtZXRhLmJyb3dzZXIsXG4gICAgICAgICAgICAgIHBhZ2VVUkw6IHBhcnNlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgICAgICAgICAgb3M6IG1ldGEub3MsXG4gICAgICAgICAgICAgIGNwdUNvcmU6IG1ldGEuY29yZSxcbiAgICAgICAgICAgICAgZGV2aWNlTWVtb3J5OiBtZXRhLmRldmljZU1lbW9yeSxcbiAgICAgICAgICAgICAgc2NyZWVuVHlwZTogbWV0YS5pc1RvdWNoRGV2aWNlLFxuICAgICAgICAgICAgICBsYW5ndWFnZTogbWV0YS5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgY29va2llRW5hYmxlZDogbWV0YS5jb29raWVFbmFibGVkLFxuICAgICAgICAgICAgICByZWZlcnJlcjogcGFyc2VVUkwobWV0YS5yZWZlcnJlciB8fCBudWxsKSxcbiAgICAgICAgICAgICAgYnJvd3NlclZlcnNpb246IG1ldGEuYnJvd3NlcixcbiAgICAgICAgICAgICAgb3NWZXJzaW9uOiBtZXRhLm9zLFxuICAgICAgICAgICAgICB1c2VyQWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBldmVudFR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlJlcXVlc3RIYW5kbGVyIHtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcblxuXG4gICAgICAgIGNvbnN0IHRyYWNrWE1MUmVxID0gdGhpcy50cmFja1hNTFJlcTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogIHhtbEh0dHBSZXFcbiAgICAgICAgICovXG5cbiAgICAgICAgbGV0IG9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjtcbiAgICAgICAgKFhNTEh0dHBSZXF1ZXN0IGFzIGFueSkucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbihtZXRob2Q6YW55LCB1cmw6c3RyaW5nLCBhc3luYzpib29sZWFuKSB7XG4gICAgICAgICAgICBsZXQgcmVxID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGQ6YW55KSB7XG4gICAgICAgICAgICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tYTUxSZXEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXEuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmNcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcGVuLmNhbGwodGhpcywgbWV0aG9kLCB1cmwsIGFzeW5jKTtcbiAgICAgICAgfTsgXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogIEZldGNoXG4gICAgICAgICAqL1xuICAgICAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVGZXRjaChwcm9taXNlOmFueSwgdXJsOlN0cmluZywgcGFyYW1zOmFueSkge1xuICAgICAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBwcm9taXNlOyBcbiAgICAgICAgICAgIHRyYWNrWE1MUmVxKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3Auc3RhdHVzLFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IHBhcmFtcy5tZXRob2QgfHwgJ0dFVCcsXG4gICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLl9fZmV0Y2hfXyA9IHdpbmRvdy5mZXRjaDtcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmZldGNoID0odXJsOlN0cmluZywgcGFyYW1zOmFueSk9PiB7XG4gICAgICAgICAgICBsZXQgcmVxID0gKHdpbmRvdyBhcyBhbnkpLl9fZmV0Y2hfXyh1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICBoYW5kbGVGZXRjaChyZXEudGhlbigpLCB1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhY2tYTUxSZXEgPShhcmdzOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMueG1sSHR0cFJlcSxcbiAgICAgICAgICAgIC4uLmFyZ3NcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBjb21tYW5kc1xufSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93RXZlbnRIYW5kbGVyIHtcblxuICAgIGN0cmxLZXlTdGF0dXM6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICByZXNpemVEZWJvdW5jZTogYW55O1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG5cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG5cbiAgICAgICAgY29uc3QgdHJhY2tXaW5kb3dDb21tYW5kID0oZTogYW55KT0+IHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gKGRvY3VtZW50LmFsbCkgPyAod2luZG93LmV2ZW50IGFzIGFueSkua2V5Q29kZSA6IGUud2hpY2g7IFxuICAgICAgICAgICAgbGV0IGNtZCA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5jdHJsS2V5U3RhdHVzICYmIGNvZGUgPT09IDg2KSB7XG4gICAgICAgICAgICAgICAgY21kID0gY29tbWFuZHMuUEFTVEU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09PSA2NykgeyBcbiAgICAgICAgICAgICAgICBjbWQgPSBjb21tYW5kcy5DT1BZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN0cmxLZXlTdGF0dXMgJiYgY29kZSA9PT0gODMpIHsgXG4gICAgICAgICAgICAgICAgY21kID0gY29tbWFuZHMuU0FWRTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdHJsS2V5U3RhdHVzICYmIGNvZGUgPT09IDY4KSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLkJPT0tNQVJLO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjbWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY29tbWFuZEV4ZWN1dGVkLFxuICAgICAgICAgICAgICAgICAgICBjbWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhY2tDdHJsID0oZTogYW55LCBpc0tleURvd246Qm9vbGVhbik9PiB7XG4gICAgICAgICAgICBsZXQgY29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuICAgICAgICAgICAgbGV0IGlzTWFjID0gKHRoaXMuZ2V0UmVjb3JkZXIoKS5vc3x8JycpLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5kZXhPZignbWFjJykgIT09IC0xO1xuICAgICAgICAgICAgaWYoKGNvZGUgPT09IDkxICYmIGlzTWFjKSB8fCAoIWlzTWFjICYmIGNvZGUgPT09IDE3KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3RybEtleVN0YXR1cyA9IGlzS2V5RG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZT0+dHJhY2tDdHJsKGUsIHRydWUpLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZT0+dHJhY2tDdHJsKGUsIGZhbHNlKSwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhY2tXaW5kb3dDb21tYW5kLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudHJhY2tXaW5kb3dSZXNpemUoKTtcbiAgICAgICAgdGhpcy50cmFja0hhc2hDaGFuZ2UoKTtcbiAgICB9XG5cblxuICAgIHRyYWNrV2luZG93UmVzaXplID0oKT0+IHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplRGVib3VuY2UpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVEZWJvdW5jZSA9IHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLndpbmRvd1Jlc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb25zb2xlU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgfSwgNDAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrQ29uc29sZVN0YXR1cyA9KGdlbmVyYXRlRXZlbnQ9ZmFsc2UpPT4ge1xuICAgICAgICBsZXQgZGV2dG9vbHM6IEZ1bmN0aW9uID0gZnVuY3Rpb24oKXt9O1xuICAgICAgICAoZGV2dG9vbHMgYXMgYW55KS50b1N0cmluZyA9IGZ1bmN0aW9uKCkgeyB0aGlzLm9wZW5lZCA9IHRydWUgfVxuICAgICAgICBjb25zb2xlLmxvZygnJWMnLCBkZXZ0b29scyk7XG5cbiAgICAgICAgbGV0IHByZXZTdGF0dXMgPSB0aGlzLmdldFJlY29yZGVyKCkuY29uc29sZVN0YXR1cyB8fCBmYWxzZTtcbiAgICAgICAgbGV0IGN1cnJlbnRTdGF0dXMgPSAoZGV2dG9vbHMgYXMgYW55KS5vcGVuZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA+IDE1MCkgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGggPiAxNTApKTtcbiAgICAgICAgaWYocHJldlN0YXR1cyAhPT0gY3VycmVudFN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMgPSBjdXJyZW50U3RhdHVzO1xuICAgICAgICAgICAgaWYoZ2VuZXJhdGVFdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jb25zb2xlU3RhdHVzQ2hhbmdlZCxcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZVN0YXR1czogdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBcblxuICAgIHRyYWNrSGFzaENoYW5nZSA9KCk9PiB7XG4gICAgICAgIHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSAoKT0+IHsgXG4gICAgICAgICAgICBsZXQgZXZlbnQ6YW55ID0gdGhpcy5nZXRSZWNvcmRlcigpLmdldFVSTERldGFpbHMoKTtcbiAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBldmVudFR5cGVzLmhhc2hDaGFuZ2VkO1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IFJlY29yZGVySGFuZGxlciBmcm9tICcuL1JlY29yZGVySGFuZGxlci9SZWNvcmRlckhhbmRsZXInO1xuXG5cbmNvbnN0IHN0YXJ0QVJDPShjbGllbnRJZDpTdHJpbmcsIGFwcElkOlN0cmluZyk9PiB7XG4gICAgY29uc29sZS5sb2coJ1tBUkNdIFJlY29yZGVyIEhhbmRsZXIgSW5pdGlhdGVkLCBDbGllbnQgSUQnLCBjbGllbnRJZCwgJ0FwcCBJRCcsIGFwcElkKVxuICAgIG5ldyBSZWNvcmRlckhhbmRsZXIoe2NsaWVudElkLCBhcHBJZH0pO1xufVxuXG4od2luZG93IGFzIGFueSkuc3RhcnRBUkMgPSBzdGFydEFSQztcblxuXG5leHBvcnQgZGVmYXVsdCBzdGFydEFSQzsiXSwic291cmNlUm9vdCI6IiJ9