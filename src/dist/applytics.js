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
                try {
                    for (var jdx = 0; jdx < document.styleSheets[idx].rules.length; jdx++) {
                        rule = document.styleSheets[idx].rules[jdx].cssText;
                        _this.cssRules += rule;
                    }
                }
                catch (e) {
                    // this.getRecorder().generateEvent({
                    //     type: eventTypes.styleSheetsLoadReq,
                    //     href: document.styleSheets[idx].href
                    // });
                    if (document.styleSheets[idx].href) {
                        _this.fetchAndRecordStyle(document.styleSheets[idx].href);
                    }
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
        console.log('[ARC] Recorder Initiated. V 0.2.7');
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
                    if (window.ARCDev) {
                        var size = JSON.stringify(packet).length * 2;
                        console.log('[ARC] Sending Data', _this.rcDataBuffer.length);
                        console.log('[ARC] Packet size', size, 'Bytes, ', Math.ceil(size / 1024), 'kb');
                        console.log(packet);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zb2xlSGFuZGxlci9Db25zb2xlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0NvbnN0YW50cy9Db25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zdGFudHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvRG9tUGFyc2VyL0RvbVBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0hlbHBlcnMvRG9jUmVhZHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9IZWxwZXJzL0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9IZWxwZXJzL1hIUi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL01ldGFEYXRhSGFuZGxlci9NZXRhRGF0YUhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9NdXRhdGlvbkhhbmRsZXIvTXV0YXRpb25IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvUmVjb3JkZXIvUmVjb3JkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9SZWNvcmRlckhhbmRsZXIvUmVjb3JkZXJIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvV2ViUmVxdWVzdEhhbmRsZXIvV2ViUmVxdWVzdEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9XaW5kb3dFdmVudEhhbmRsZXIvV2luZG93RXZlbnRIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FB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LENBQUM7UUFDbkUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFDLElBQUUsZ0JBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQW5CLENBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQW1ETCx5QkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDcEdEO0FBQUE7QUFBZ0U7QUFHaEUsSUFBTSxRQUFRLEdBQUMsVUFBQyxRQUFlLEVBQUUsS0FBWTtJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO0lBQ3JGLElBQUksd0VBQWUsQ0FBQyxFQUFDLFFBQVEsWUFBRSxLQUFLLFNBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFQSxNQUFjLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUdyQix1RUFBUSxFQUFDIiwiZmlsZSI6ImFwcGx5dGljcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1NESy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IFxuICAgIGV2ZW50VHlwZXMsIFxuICAgIGNvbnNvbGVUcmFja0xpc3Rcbn0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnNvbGVIYW5kbGVyIHtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcbiAgICB0ZW1wQ29uc29sZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuICAgICAgICBpZih3aW5kb3cubG9jYXRpb24uaG9zdC5pbmRleE9mKCdsb2NhbGhvc3QnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2tBbGxDb25zb2xlQWN0aXZpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgdHJhY2tDb25zb2xlID0ocGFyYW1zOmFueSwgdHlwZTphbnkpPT4ge1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuICAgICAgICBmb3IobGV0IGlkeD0wOyBpZHggPCBwYXJhbXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtc1tpZHhdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNvbnNvbGUsXG4gICAgICAgICAgICBjb25zb2xlVHlwZTogdHlwZSxcbiAgICAgICAgICAgIGFyZ3NcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0cmFja0FsbENvbnNvbGVBY3Rpdml0eSA9KCk9PiB7IFxuICAgICAgICBsZXQgdGVtcENvbnNvbGUgPSB7fTtcbiAgICAgICAgY29uc3QgdHJhY2tDb25zb2xlID0gdGhpcy50cmFja0NvbnNvbGU7XG4gICAgICAgIGZvciAobGV0IGlkeCBpbiBjb25zb2xlVHJhY2tMaXN0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChjb25zb2xlIGFzIGFueSlbY29uc29sZVRyYWNrTGlzdFtpZHhdXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICh0ZW1wQ29uc29sZSBhcyBhbnkpW2NvbnNvbGVUcmFja0xpc3RbaWR4XV0gPSAoY29uc29sZSBhcyBhbnkpW2NvbnNvbGVUcmFja0xpc3RbaWR4XV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIHRoaXMudGVtcENvbnNvbGUgPSB0ZW1wQ29uc29sZTtcbiAgICAgICAgY29uc3QgY2xvbmVDb25zb2xlID0gZnVuY3Rpb24gKGtleTphbnkgPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBudWxsICYmIGtleSBpbiB0ZW1wQ29uc29sZSkge1xuICAgICAgICAgICAgICAgIChjb25zb2xlIGFzIGFueSlba2V5XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tDb25zb2xlKGFyZ3VtZW50cywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgKGNvbnNvbGUgIGFzIGFueSlba2V5XSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoKHRlbXBDb25zb2xlICBhcyBhbnkpW2tleV0sIGNvbnNvbGUpO1xuICAgICAgICAgICAgICAgICAgICAoY29uc29sZSAgYXMgYW55KVtrZXldLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lQ29uc29sZShrZXkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkeCBpbiB0ZW1wQ29uc29sZSkge1xuICAgICAgICAgICAgICAgICAgICAoY29uc29sZSAgYXMgYW55KVtpZHhdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tDb25zb2xlKGFyZ3VtZW50cywgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIChjb25zb2xlICBhcyBhbnkpW2lkeF0gPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKCh0ZW1wQ29uc29sZSAgYXMgYW55KVtpZHhdLCBjb25zb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIChjb25zb2xlICBhcyBhbnkpW2lkeF0uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ29uc29sZShpZHgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbG9uZUNvbnNvbGUoKTtcbiAgICAgICAgd2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvciwgdXJsLCBsaW5lKSB7XG4gICAgICAgICAgICB0cmFja0NvbnNvbGUoW2Vycm9yLCB1cmwsIGxpbmVdLCAnbmV3RXJyb3InKTtcbiAgICAgICAgfTsgXG4gICAgfVxuXG59IiwiZXhwb3J0IGNvbnN0IHJlY29yZGVyQ29uZmlnID0ge1xuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZSwgIFxufSIsImV4cG9ydCBjb25zdCBob3N0ID0gJ2h0dHBzOi8vdGVzdC5hcHBseXRpY3MuaW4nO1xuZXhwb3J0IGNvbnN0IGV2ZW50VHlwZXMgPSB7XG4gICAgc25hcHNob3Q6ICdzbmFwc2hvdCcsXG4gICAgY2hhcmFjdGVyRGF0YTogJ2NoYXJhY3RlckRhdGEnLFxuICAgIGNoaWxkTGlzdDogJ2NoaWxkTGlzdCcsXG4gICAgYXR0cmlidXRlczogJ2F0dHJpYnV0ZXMnLFxuICAgIHNjcm9sbDogJ3Njcm9sbCcsXG4gICAgaW5wdXRWYWx1ZTogJ2lucHV0VmFsdWUnLFxuICAgIG1vdXNlQ2xpY2s6ICdtb3VzZUNsaWNrJyxcbiAgICBtb3VzZU1vdmU6ICdtb3VzZU1vdmUnLFxuICAgIGFzc2V0TG9hZGVkOiAnYXNzZXRMb2FkZWQnLFxuICAgIHN0eWxlU2hlZXRzTG9hZFJlcTogJ3N0eWxlU2hlZXRzTG9hZFJlcScsXG4gICAgeG1sSHR0cFJlcTogJ3htbEh0dHBSZXEnLFxuICAgIGNvbnNvbGU6ICdjb25zb2xlJyxcbiAgICBicm93c2VyTWV0YTogJ2Jyb3dzZXJNZXRhJyxcbiAgICB3aW5kb3dSZXNpemU6ICd3aW5kb3dSZXNpemUnLFxuICAgIGNvbnNvbGVTdGF0dXNDaGFuZ2VkOiAnY29uc29sZVN0YXR1c0NoYW5nZWQnLFxuICAgIGNvbW1hbmRFeGVjdXRlZDogJ2NvbW1hbmRFeGVjdXRlZCcsXG4gICAgaGFzaENoYW5nZWQ6ICdoYXNoQ2hhbmdlZCcsXG4gICAgc3R5bGVTaGVldFN0cmluZzogJ3N0eWxlU2hlZXRTdHJpbmcnLFxuICAgIGVycm9yOiAnZXJyb3InLFxufVxuZXhwb3J0IGNvbnN0IGNvbW1hbmRzID0ge1xuICAgIFBBU1RFOiBcIlBBU1RFXCIsXG4gICAgQ09QWTogXCJDT1BZXCIsXG4gICAgQk9PS01BUks6IFwiQk9PS01BUktcIixcbiAgICBTQVZFOiBcIlNBVkVcIlxufVxuXG5leHBvcnQgY29uc3QgYmxhY2tsaXN0ZWRFbEJ5Q2xhc3M6IEFycmF5PFN0cmluZz4gPSBbXTtcbmV4cG9ydCBjb25zdCBjb25zb2xlVHJhY2tMaXN0OiBBcnJheTxhbnk+ID0gWydpbmZvJywgJ2xvZycsICd3YXJuJywgJ2Vycm9yJ11cbmV4cG9ydCBjb25zdCBibGFja2xpc3RlZEF0dHJzOiBBcnJheTxTdHJpbmc+ID0gWydzcmNzZXQnXVxuIiwiaW1wb3J0IHsgXG4gICAgZXZlbnRUeXBlcywgXG4gICAgYmxhY2tsaXN0ZWRFbEJ5Q2xhc3MsXG4gICAgYmxhY2tsaXN0ZWRBdHRyc1xufSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcbmltcG9ydCBYSFIgZnJvbSAnLi4vSGVscGVycy9YSFInO1xuIFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tUGFyc2VyIHtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcbiAgICBjc3NSdWxlczogU3RyaW5nID0gJyc7IFxuICAgIGlucHV0Tm9kZU5hbWVzOiBBcnJheTxTdHJpbmc+ID0gWydURVhUQVJFQScsICdJTlBVVCddOyBcbiAgICByZWFkSW1hZ2VTcmM6IEJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vIHNlYXJjaCBmb3IgY2xhc3NcblxuICAgIGZldGNoQW5kUmVjb3JkU3R5bGUgPSh1cmw6IGFueSk9PiB7XG4gICAgICAgIFhIUi5nZXQodXJsLCAoKT0+e30pXG4gICAgICAgICAgICAudGhlbihjc3M9PiB7IFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5zdHlsZVNoZWV0U3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBjc3NcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGVycj0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbQVJDXSBGZXRjaGluZyBTdHlsZVNoZWV0IEZhaWxlZCcsIHVybCwgZXJyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuc3R5bGVTaGVldFN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgZXJyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIHJlY29yZFN0eWxlID0oKT0+IHtcbiAgICAgICAgdGhpcy5jc3NSdWxlcyA9ICcnO1xuICAgICAgICBsZXQgcnVsZTogc3RyaW5nO1xuICAgICAgICBmb3IobGV0IGlkeD0wOyBpZHg8ZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGpkeD0wOyBqZHg8KGRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0gYXMgYW55KS5ydWxlcy5sZW5ndGg7IGpkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bGUgPSAoZG9jdW1lbnQuc3R5bGVTaGVldHNbaWR4XSBhcyBhbnkpLnJ1bGVzW2pkeF0uY3NzVGV4dDsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3NzUnVsZXMgKz0gcnVsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IFxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdHlwZTogZXZlbnRUeXBlcy5zdHlsZVNoZWV0c0xvYWRSZXEsXG4gICAgICAgICAgICAgICAgLy8gICAgIGhyZWY6IGRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0uaHJlZlxuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIGlmKGRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0uaHJlZikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoQW5kUmVjb3JkU3R5bGUoZG9jdW1lbnQuc3R5bGVTaGVldHNbaWR4XS5ocmVmKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICB9XG5cbiAgICBnZXRIVE1MID0obm9kZTphbnkpPT4ge1xuICAgICAgICBsZXQgZWw6YW55ID0ge307XG5cbiAgICAgICAgaWYobm9kZS5ub2RlTmFtZSA9PT0gJyN0ZXh0Jykge1xuICAgICAgICAgICAgZWwubm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lO1xuICAgICAgICAgICAgZWwudmFsdWUgPSBub2RlLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIGVsLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC50YWdOYW1lID0gWydCT0RZJ10uaW5kZXhPZihub2RlLnRhZ05hbWUpICE9PSAtMSA/ICdESVYnIDogbm9kZS50YWdOYW1lO1xuICAgICAgICAgICAgZWwuYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICAgICAgZWwudHlwZSA9ICdlbGVtZW50JztcbiAgICAgICAgICAgIGlmKG5vZGUudGFnTmFtZSA9PT0gJ0lGUkFNRScpIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG5vZGUuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogbm9kZS5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobm9kZS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBhdHRySW5kZXg9MDsgYXR0ckluZGV4PG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGF0dHJJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGJsYWNrbGlzdGVkQXR0cnMuaW5kZXhPZihub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS5sb2NhbE5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0ubG9jYWxOYW1lID09PSAnc3JjJyAmJiBub2RlLnRhZ05hbWUgIT09ICdJRlJBTUUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5yZWFkSW1hZ2VTcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3JjID0gdGhpcy5yZWFkU3JjKG5vZGUsIG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3JjVVJMID0gdGhpcy5jb252ZXJ0VG9BYnNvbHV0ZVBhdGgobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNyYyA9IHRoaXMuY29udmVydFRvQWJzb2x1dGVQYXRoKG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmF0dHJpYnV0ZXNbbm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0ubG9jYWxOYW1lXSA9IG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiAgRXZlbnQgQmluZGluZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgICAgIGlmKFsnJywgJ1gnLCAnWSddLm1hcChkPT5bJ3Njcm9sbCcsICdhdXRvJ10uaW5kZXhPZigoc3R5bGUgYXMgYW55KVsnb3ZlcmZsb3cnK2RdKSAhPT0gLTEpLmZpbHRlcihkPT5kKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuYmluZFNjcm9sbChub2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5pbnB1dE5vZGVOYW1lcy5pbmRleE9mKG5vZGUubm9kZU5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5iaW5kT25LZXl1cChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5yY2lkID0gbm9kZS5yY2lkO1xuICAgICAgICBlbC5jaGlsZE5vZGVzID0gW11cbiAgICAgICAgaWYobm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICBub2RlLmNoaWxkTm9kZXMuZm9yRWFjaCgoY2hpbGQ6YW55KT0+IHtcbiAgICAgICAgICAgICAgICBpZihjaGlsZC5ub2RlTmFtZSAhPT0gJ1NDUklQVCcgJiYgY2hpbGQubm9kZU5hbWUgIT09ICdOT1NDUklQVCcgJiYgY2hpbGQubm9kZU5hbWUgIT09ICcjY29tbWVudCcgJiYgdGhpcy5jaGVja05vZGVJc1ZhbGlkKGNoaWxkKSkgIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2hpbGROb2Rlcy5wdXNoKHRoaXMuZ2V0SFRNTChjaGlsZCkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuXG4gICAgdGFrZVNuYXBzaG90ID0obm9kZTphbnksIGluaXRpYWw6YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLnBvcHVsYXRlSWQobm9kZSk7XG4gICAgICAgIGxldCBjbG9uZSA9IHRoaXMuZ2V0SFRNTChub2RlKTtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5zbmFwc2hvdCwgXG4gICAgICAgICAgICBkb206IGNsb25lLCBcbiAgICAgICAgICAgIGNzc1J1bGVzOiB0aGlzLmNzc1J1bGVzLCAgXG4gICAgICAgICAgICBpbml0aWFsLFxuICAgICAgICAgICAgc2NyZWVuV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgc2NyZWVuSGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxUb3A6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIGNvbnNvbGVTdGF0dXM6IHRoaXMuZ2V0UmVjb3JkZXIoKS5jb25zb2xlU3RhdHVzLFxuICAgICAgICAgICAgbG9jYXRpb246IHRoaXMuZ2V0UmVjb3JkZXIoKS5nZXRVUkxEZXRhaWxzKClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjaGVja05vZGVJc1ZhbGlkID0obm9kZTphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmNsYXNzTmFtZSAmJiBub2RlLmNsYXNzTmFtZS5pbmRleE9mICYmIGJsYWNrbGlzdGVkRWxCeUNsYXNzLmZpbHRlcihkPT4gbm9kZS5jbGFzc05hbWUuaW5kZXhPZihkKSAhPT0gLTEpLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmJsYWNrbGlzdGVkTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb252ZXJ0VG9BYnNvbHV0ZVBhdGggPShwYXRoOmFueSk9PiB7XG4gICAgICAgIGlmKHBhdGg9PW51bGwpXG4gICAgICAgICAgICByZXR1cm4gJ25vcGF0aCc7XG4gICAgICAgIHJldHVybiBuZXcgVVJMKHBhdGgsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pLmhyZWY7IFxuICAgIH1cblxuXG4gICAgZ2V0QmFzZTY0SW1hZ2UoaW1nOmFueSkge1xuICAgICAgICBsZXQgZGF0YVVSTCA9ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgICAgIHZhciBjdHg6YW55ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuICAgICAgICAgICAgZGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZGF0YVVSTDtcbiAgICB9XG5cbiAgICByZWFkU3JjID0obm9kZTphbnksIHVybDphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCYXNlNjRJbWFnZShub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgcmNpZDogbm9kZS5yY2lkLFxuICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgIHNyYzogdGhpcy5nZXRCYXNlNjRJbWFnZShub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5hc3NldExvYWRlZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgJ2RvYyByZWFkeSc7XG5cbihmdW5jdGlvbihmdW5jTmFtZTphbnksIGJhc2VPYmo6YW55KSB7XG4gICAgZnVuY05hbWUgPSBmdW5jTmFtZSB8fCBcImRvY1JlYWR5XCI7XG4gICAgYmFzZU9iaiA9IGJhc2VPYmogfHwgd2luZG93O1xuICAgIHZhciByZWFkeUxpc3QgPSBbXSBhcyBhbnk7XG4gICAgdmFyIHJlYWR5RmlyZWQgPSBmYWxzZTtcbiAgICB2YXIgcmVhZHlFdmVudEhhbmRsZXJzSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgXG4gICAgZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICAgIGlmICghcmVhZHlGaXJlZCkge1xuICAgICAgICAgICAgcmVhZHlGaXJlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlYWR5TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlYWR5TGlzdFtpXS5mbi5jYWxsKHdpbmRvdywgcmVhZHlMaXN0W2ldLmN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWFkeUxpc3QgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiByZWFkeVN0YXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiApIHtcbiAgICAgICAgICAgIHJlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmFzZU9ialtmdW5jTmFtZV0gPSBmdW5jdGlvbihjYWxsYmFjazphbnksIGNvbnRleHQ6YW55KSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGxiYWNrIGZvciBkb2NSZWFkeShmbikgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFkeUZpcmVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge2NhbGxiYWNrKGNvbnRleHQpO30sIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVhZHlMaXN0LnB1c2goe2ZuOiBjYWxsYmFjaywgY3R4OiBjb250ZXh0fSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fCAoIShkb2N1bWVudCBhcyBhbnkpLmF0dGFjaEV2ZW50ICYmIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiaW50ZXJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocmVhZHksIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKCFyZWFkeUV2ZW50SGFuZGxlcnNJbnN0YWxsZWQpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgcmVhZHksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcmVhZHksIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZigoZG9jdW1lbnQgYXMgYW55KS5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgIChkb2N1bWVudCBhcyBhbnkpLmF0dGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIHJlYWR5U3RhdGVDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIChkb2N1bWVudCBhcyBhbnkpLmF0dGFjaEV2ZW50KFwib25sb2FkXCIsIHJlYWR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdbQVJDXTogRmFpbGVkIHRvIFRyaWdnZXIgRG9jIHJlYWR5JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlYWR5RXZlbnRIYW5kbGVyc0luc3RhbGxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gIH0pKFwiZG9jUmVhZHlcIiwgd2luZG93KTsiLCJjb25zdCBnZW5lcmF0ZVJhbmRvbVN0cmluZyA9KGxlbmd0aDogTnVtYmVyKT0+IHtcbiAgICBsZXQgcmVzdWx0ICAgICAgICAgICA9ICcnO1xuICAgIGxldCBjaGFyYWN0ZXJzICAgICAgID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbiAgICBsZXQgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGxlbmd0aDsgaWR4KysgKSB7XG4gICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlU0lEID0oKT0+IHtcbiAgICByZXR1cm4gZ2VuZXJhdGVSYW5kb21TdHJpbmcoNCkgKyAnLScgKyBnZW5lcmF0ZVJhbmRvbVN0cmluZyg0KSArICctJyArIGdlbmVyYXRlUmFuZG9tU3RyaW5nKDIpO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0U0lEID0oKT0+IHtcbiAgICBsZXQgc2lkID0gKHdpbmRvdyBhcyBhbnkpLmFwcHJjX3NpZCB8fCBudWxsO1xuICAgIGlmKHNpZCA9PT0gbnVsbCkge1xuICAgICAgICBzaWQgPSBnZW5lcmF0ZVNJRCgpXG4gICAgfVxuICAgIHJldHVybiBzaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSlMoZmlsZTphbnksIGNhbGxiYWNrOmFueSkge1xuICAgIHZhciBqc0VsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAganNFbG0udHlwZSA9IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiO1xuICAgIGpzRWxtLnNyYyA9IGZpbGU7XG4gICAganNFbG0ub25sb2FkID0gY2FsbGJhY2s7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChqc0VsbSk7XG59XG5cbmNvbnN0IHVybFBhcnNlcktleSA9ICdbXl0nOyBcblxuXG5leHBvcnQgY29uc3QgcGFyc2VVUkwgPSh1cmw6YW55KT0+ICh1cmx8fCcnKS5zcGxpdCgnLicpLmpvaW4odXJsUGFyc2VyS2V5KSIsImV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGdldDphc3luYyAodXJsOiBzdHJpbmcsIG9ucHJvZ3Jlc3M6IGFueSk9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vIGV4ZWN1dG9yICh0aGUgcHJvZHVjaW5nIGNvZGUsIFwic2luZ2VyXCIpXG4gICAgICAgICAgICBsZXQgcnEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgXG4gICAgICAgICAgICBycS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsgIFxuICAgICAgICAgICAgICAgIGlmIChycS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcnEucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge31cbiAgICAgICAgICAgICAgICAgICAgaWYocnEuc3RhdHVzID09PSAyMDApIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihycS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIHJxLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTsgXG4gICAgICAgICAgICBpZihvbnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcnEub25wcm9ncmVzcz1vbnByb2dyZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcnEuc2VuZChudWxsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBldmVudFR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1ldGFEYXRhSGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG4gICAgICAgIHRoaXMuZ2V0QWxsTWV0YURhdGEoKTtcbiAgICB9XG5cbiAgICBnZXRBbGxNZXRhRGF0YSA9KGdlbmVyYXRlRXZlbnQ9dHJ1ZSk9PiB7XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuYnJvd3Nlck1ldGEsXG4gICAgICAgICAgICBicm93c2VyOiB0aGlzLmdldEJyb3dzZXIoKSxcbiAgICAgICAgICAgIG9zOiB0aGlzLmdldE9TKCksXG4gICAgICAgICAgICBjb3JlOiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSxcbiAgICAgICAgICAgIGNvb2tpZUVuYWJsZWQ6IG5hdmlnYXRvci5jb29raWVFbmFibGVkLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IG5hdmlnYXRvci5sYW5ndWFnZSxcbiAgICAgICAgICAgIGRldmljZU1lbW9yeTogKG5hdmlnYXRvciBhcyBhbnkpLmRldmljZU1lbW9yeSxcbiAgICAgICAgICAgIGlzVG91Y2hEZXZpY2U6IHRoaXMuZ2V0SXNUb3VjaERldmljZSgpLFxuICAgICAgICAgICAgcmVmZXJyZXI6ZG9jdW1lbnQucmVmZXJyZXIsXG4gICAgICAgICAgICBhcHBWZXJzaW9uOiBuYXZpZ2F0b3IuYXBwVmVyc2lvbixcbiAgICAgICAgICAgIHVzZXJBZ2VudDogbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICAgICB9O1xuICAgICAgICBpZihnZW5lcmF0ZUV2ZW50KVxuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoZXZlbnQpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuXG4gICAgZ2V0SXNUb3VjaERldmljZSgpIHtcbiAgICAgICAgcmV0dXJuICAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpXG4gICAgICAgICAgICB8fCAobmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMClcbiAgICAgICAgICAgIHx8IChuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDApKVxuICAgIH1cblxuICAgIGdldEJyb3dzZXIoKXtcbiAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCwgdGVtLFxuICAgICAgICBNPSB1YS5tYXRjaCgvKG9wZXJhfGNocm9tZXxzYWZhcml8ZmlyZWZveHxtc2llfHRyaWRlbnQoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8IFtdO1xuICAgICAgICBpZigvdHJpZGVudC9pLnRlc3QoTVsxXSkpe1xuICAgICAgICAgICAgdGVtPSAgL1xcYnJ2WyA6XSsoXFxkKykvZy5leGVjKHVhKSB8fCBbXTtcbiAgICAgICAgICAgIHJldHVybiAnSUUgJysodGVtWzFdIHx8ICcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZihNWzFdPT09ICdDaHJvbWUnKXtcbiAgICAgICAgICAgIHRlbT0gdWEubWF0Y2goL1xcYihPUFJ8RWRnZT8pXFwvKFxcZCspLyk7XG4gICAgICAgICAgICBpZih0ZW0hPSBudWxsKSByZXR1cm4gdGVtLnNsaWNlKDEpLmpvaW4oJyAnKS5yZXBsYWNlKCdPUFInLCAnT3BlcmEnKS5yZXBsYWNlKCdFZGcgJywgJ0VkZ2UgJyk7XG4gICAgICAgIH1cbiAgICAgICAgTT0gTVsyXT8gW01bMV0sIE1bMl1dOiBbbmF2aWdhdG9yLmFwcE5hbWUsIG5hdmlnYXRvci5hcHBWZXJzaW9uLCAnLT8nXTtcbiAgICAgICAgaWYoKHRlbT0gdWEubWF0Y2goL3ZlcnNpb25cXC8oXFxkKykvaSkpIT0gbnVsbCkgTS5zcGxpY2UoMSwgMSwgdGVtWzFdKTtcbiAgICAgICAgcmV0dXJuIE0uam9pbignICcpO1xuICAgIH1cblxuICAgIGdldE9TKCkge1xuICAgICAgICB2YXIgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0sXG4gICAgICAgICAgICBtYWNvc1BsYXRmb3JtcyA9IFsnTWFjaW50b3NoJywgJ01hY0ludGVsJywgJ01hY1BQQycsICdNYWM2OEsnXSxcbiAgICAgICAgICAgIHdpbmRvd3NQbGF0Zm9ybXMgPSBbJ1dpbjMyJywgJ1dpbjY0JywgJ1dpbmRvd3MnLCAnV2luQ0UnXSxcbiAgICAgICAgICAgIGlvc1BsYXRmb3JtcyA9IFsnaVBob25lJywgJ2lQYWQnLCAnaVBvZCddLFxuICAgICAgICAgICAgb3MgPSBudWxsO1xuICAgICAgXG4gICAgICAgIGlmIChtYWNvc1BsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcyA9ICdNYWMgT1MnO1xuICAgICAgICB9IGVsc2UgaWYgKGlvc1BsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcyA9ICdpT1MnO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd3NQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybSkgIT09IC0xKSB7XG4gICAgICAgICAgb3MgPSAnV2luZG93cyc7XG4gICAgICAgIH0gZWxzZSBpZiAoL0FuZHJvaWQvLnRlc3QodXNlckFnZW50KSkge1xuICAgICAgICAgIG9zID0gJ0FuZHJvaWQnO1xuICAgICAgICB9IGVsc2UgaWYgKCFvcyAmJiAvTGludXgvLnRlc3QocGxhdGZvcm0pKSB7XG4gICAgICAgICAgb3MgPSAnTGludXgnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5vcyA9IG9zO1xuICAgICAgICByZXR1cm4gb3M7XG4gICAgfVxufSAiLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbn0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11dGF0aW9uSGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG4gICAgc2tpcHBlZE11dGF0aW9uczogYW55ID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICB9XG5cblxuICAgIGhhbmRsZU11dGF0aW9ucyA9KG11dGF0aW9uczphbnkpPT4ge1xuICAgICAgICBsZXQgYmxhY2tsaXN0ZWROb2RlczogQXJyYXk8YW55PiA9IHRoaXMuZ2V0UmVjb3JkZXIoKS5ibGFja2xpc3RlZE5vZGVzO1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb246YW55KT0+IHtcbiAgICAgICAgICAgIGlmKCFtdXRhdGlvbi50YXJnZXQpIFxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgZm9yKGxldCBpZHggaW4gYmxhY2tsaXN0ZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGlmKGJsYWNrbGlzdGVkTm9kZXNbaWR4XS5jb250YWlucyhtdXRhdGlvbi50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpcHBlZE11dGF0aW9ucysrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2gobXV0YXRpb24udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYXJhY3RlckRhdGFNdXRhdGlvbihtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBldmVudFR5cGVzLmNoaWxkTGlzdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGlsZExpc3QobXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlcy5hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUF0dHJpYnV0ZXMobXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIGhhbmRsZUNoYXJhY3RlckRhdGFNdXRhdGlvbiA9KG11dGF0aW9uOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHJjaWQ6IG11dGF0aW9uLnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhLFxuICAgICAgICAgICAgdGV4dDogbXV0YXRpb24udGFyZ2V0LmRhdGFcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZExpc3QgPShtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICBsZXQgcmVtb3ZlZE5vZGVzID0gW107XG4gICAgICAgIGxldCBhZGRlZE5vZGVzID0gW107XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IG11dGF0aW9uLnJlbW92ZWROb2Rlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBpZihtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XS5yY2lkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVkTm9kZXMucHVzaChtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XS5yY2lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkudW5iaW5kRnJvbUFsbEV2ZW50KG11dGF0aW9uLnJlbW92ZWROb2Rlc1tpZHhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGlkeD0wOyBpZHggPCBtdXRhdGlvbi5hZGRlZE5vZGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5wb3B1bGF0ZUlkKG11dGF0aW9uLmFkZGVkTm9kZXNbaWR4XSk7XG4gICAgICAgICAgICBhZGRlZE5vZGVzLnB1c2godGhpcy5nZXRSZWNvcmRlcigpLmRvbVBhcnNlci5nZXRIVE1MKG11dGF0aW9uLmFkZGVkTm9kZXNbaWR4XSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHBhcmVudDogbXV0YXRpb24udGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNoaWxkTGlzdCxcbiAgICAgICAgICAgIGFkZGVkTm9kZXMsXG4gICAgICAgICAgICByZW1vdmVkTm9kZXMsXG4gICAgICAgICAgICBuZXh0U2libGluZzogbXV0YXRpb24ubmV4dFNpYmxpbmcgPyBtdXRhdGlvbi5uZXh0U2libGluZy5yY2lkIDogbnVsbCxcbiAgICAgICAgICAgIHByZXZpb3VzU2libGluZzogbXV0YXRpb24ucHJldmlvdXNTaWJsaW5nID8gbXV0YXRpb24ucHJldmlvdXNTaWJsaW5nLnJjaWQgOiBudWxsLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnZlcnRUb0Fic29sdXRlUGF0aCA9KHBhdGg6YW55KT0+IHtcbiAgICAgICAgaWYocGF0aD09bnVsbClcbiAgICAgICAgICAgIHJldHVybiAnbm9wYXRoJztcbiAgICAgICAgcmV0dXJuIG5ldyBVUkwocGF0aCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbikuaHJlZjsgXG4gICAgfVxuXG4gICAgaGFuZGxlQXR0cmlidXRlcyA9KG11dGF0aW9uOmFueSk9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG11dGF0aW9uLnRhcmdldC5nZXRBdHRyaWJ1dGUobXV0YXRpb24uYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIGlmKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUgPT09ICdzcmMnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29udmVydFRvQWJzb2x1dGVQYXRoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICByY2lkOiBtdXRhdGlvbi50YXJnZXQucmNpZCxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuYXR0cmlidXRlcyxcbiAgICAgICAgICAgIGF0dHJpYnV0ZU5hbWU6IG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQgeyBldmVudFR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5pbXBvcnQge3JlY29yZGVyQ29uZmlnfSBmcm9tICcuLi9Db25zdGFudHMvQ29uZmlnJztcbmltcG9ydCBNdXRhdGlvbkhhbmRsZXIgZnJvbSAnLi4vTXV0YXRpb25IYW5kbGVyL011dGF0aW9uSGFuZGxlcic7XG5pbXBvcnQgQ29uc29sZUhhbmRsZXIgZnJvbSAnLi4vQ29uc29sZUhhbmRsZXIvQ29uc29sZUhhbmRsZXInO1xuaW1wb3J0IFdpbmRvd0V2ZW50SGFuZGxlciBmcm9tICcuLi9XaW5kb3dFdmVudEhhbmRsZXIvV2luZG93RXZlbnRIYW5kbGVyJztcbmltcG9ydCBEb21QYXJzZXIgZnJvbSAnLi4vRG9tUGFyc2VyL0RvbVBhcnNlcic7XG5pbXBvcnQgV2ViUmVxdWVzdEhhbmRsZXIgZnJvbSAnLi4vV2ViUmVxdWVzdEhhbmRsZXIvV2ViUmVxdWVzdEhhbmRsZXInO1xuaW1wb3J0IE1ldGFEYXRhSGFuZGxlciBmcm9tICcuLi9NZXRhRGF0YUhhbmRsZXIvTWV0YURhdGFIYW5kbGVyJztcblxuY29uc3QgTXV0YXRpb25PYnNlcnZlciA9ICh3aW5kb3cgYXMgYW55KS5NdXRhdGlvbk9ic2VydmVyIHx8ICh3aW5kb3cgYXMgYW55KS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyIHx8ICh3aW5kb3cgYXMgYW55KS5Nb3pNdXRhdGlvbk9ic2VydmVyO1xuXG5sZXQgb2JzZXJ2ZXI7XG5sZXQgY3VycmVudE5vZGVJZCA9IDE7XG5sZXQgZGF0YTogQXJyYXk8YW55PiA9IFtdO1xubGV0IGRhdGFCdWZmZXI6IEFycmF5PGFueT4gPSBbXVxubGV0IGV2ZW50TGlzdGVuZXI6YW55ID0gbnVsbDtcbmxldCBpbml0aWFsU25hcHNob3RTZW5kOiBCb29sZWFuID0gZmFsc2U7XG4od2luZG93IGFzIGFueSkucmNEYXRhID0gW11cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkZXIge1xuXG4gICAgY2lkOiBTdHJpbmc7XG4gICAgc2lkOiBTdHJpbmc7XG4gICAgYWlkOiBTdHJpbmc7XG4gICAgYmxhY2tsaXN0ZWROb2RlczogQXJyYXk8YW55PjtcbiAgICBjb25zb2xlU3RhdHVzOiBhbnk7XG4gICAgb3M6IGFueTtcbiAgICBjdHJsS2V5U3RhdHVzOiBhbnk7XG4gICAgbXV0YWlvbkhhbmRsZXI6IGFueTtcbiAgICBkb21QYXJzZXI6IGFueTtcbiAgICBjb25zb2xlSGFuZGxlcjogYW55O1xuICAgIHdpbmRvd0V2ZW50SGFuZGxlcjogYW55O1xuICAgIHdlYlJlcXVlc3RIYW5kbGVyOiBhbnk7XG4gICAgbWV0YURhdGFIYW5kbGVyOiBhbnk7XG4gICAgbW91c2VNb3ZlVGhyZXNob2xkOiBhbnkgPSAzMztcbiAgICBsYXN0TW91c2VNb3ZlRXZlbnRHZW5lcmF0ZWQ6IGFueSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmNpZCA9IGFyZ3MuY2lkO1xuICAgICAgICB0aGlzLnNpZCA9IGFyZ3Muc2lkO1xuICAgICAgICB0aGlzLmFpZCA9IGFyZ3MuYWlkO1xuICAgICAgICB0aGlzLmJsYWNrbGlzdGVkTm9kZXMgPSBbXTtcbiAgICAgICAgdGhpcy5kb21QYXJzZXIgPSBuZXcgRG9tUGFyc2VyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KTtcbiAgICAgICAgdGhpcy5jb25zb2xlSGFuZGxlciA9IG5ldyBDb25zb2xlSGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSlcbiAgICAgICAgdGhpcy5tdXRhaW9uSGFuZGxlciA9IG5ldyBNdXRhdGlvbkhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pXG4gICAgICAgIHRoaXMud2luZG93RXZlbnRIYW5kbGVyID0gbmV3IFdpbmRvd0V2ZW50SGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSk7XG4gICAgICAgIHRoaXMud2ViUmVxdWVzdEhhbmRsZXIgPSBuZXcgV2ViUmVxdWVzdEhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pO1xuICAgICAgICB0aGlzLm1ldGFEYXRhSGFuZGxlciA9IG5ldyBNZXRhRGF0YUhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pO1xuICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gUmVjb3JkZXIgSW5pdGlhdGVkLiBWIDAuMi43Jyk7XG4gICAgfSAgICBcblxuICAgIHN0YXJ0ID0obm9kZTogYW55KT0+IHtcbiAgICAgICAgdGhpcy5kb21QYXJzZXIucmVjb3JkU3R5bGUoKTtcbiAgICAgICAgdGhpcy5iaW5kU2Nyb2xsKHdpbmRvdyk7XG4gICAgICAgIHRoaXMuYmluZE1vdXNlRXZlbnQoZG9jdW1lbnQpO1xuICAgICAgICB0aGlzLndpbmRvd0V2ZW50SGFuZGxlci5jaGVja0NvbnNvbGVTdGF0dXMoZmFsc2UpO1xuICAgICAgICB0aGlzLmRvbVBhcnNlci50YWtlU25hcHNob3Qobm9kZSwgdHJ1ZSk7XG4gICAgICAgIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uczphbnkpPT4ge1xuICAgICAgICAgICAgdGhpcy5tdXRhaW9uSGFuZGxlci5oYW5kbGVNdXRhdGlvbnMobXV0YXRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwgcmVjb3JkZXJDb25maWcpOyBcbiAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFN0YXJ0ZWQgUmVjb3JkaW5nJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogIEhlbHBlcnNcbiAgICAgKiBcbiAgICAgKi9cblxuICAgIGJpbmRTY3JvbGwgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc1Njcm9sbCA9IHRydWU7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT25TY3JvbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE9uS2V5dXAgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc09uS2V5dXAgPSB0cnVlO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlT25LZXl1cCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kTW91c2VFdmVudCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU1vdXNlQ2xpY2spO1xuICAgIH1cblxuICAgIHVuYmluZEZyb21BbGxFdmVudCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgaWYobm9kZS5pc1Njcm9sbCAmJiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG5vZGUuaXNTY3JvbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPblNjcm9sbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9kZS5pc09uS2V5dXAgJiYgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBub2RlLmlzT25LZXl1cCA9IGZhbHNlO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlT25LZXl1cCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWN1cnNpdmVseUNoZWNrVGFyZ2V0SGFzQ2xpY2tFdmVudHM6YW55ID0odGFyZ2V0OmFueSk9PiB7XG4gICAgICAgIGlmKHRhcmdldC5vbmNsaWNrIHx8IHRhcmdldC5vbm1vdXNlZG93biB8fCB0YXJnZXQub25tb3VzZXVwIHx8IHRhcmdldC5vbmNoYW5nZSB8fCBcbiAgICAgICAgICAgIFsnSU5QVVQnXS5pbmRleE9mKHRhcmdldC50YWdOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LnRhZ05hbWUgIT09ICdCT0RZJyAmJiB0YXJnZXQucGFyZW50Tm9kZSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVseUNoZWNrVGFyZ2V0SGFzQ2xpY2tFdmVudHModGFyZ2V0LnBhcmVudE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgRXZlbnQgSGFuZGxlcnNcbiAgICAgKi9cblxuICAgIGhhbmRsZU9uU2Nyb2xsID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBldmVudC50YXJnZXQgfHwgZXZlbnQ7XG5cbiAgICAgICAgaWYoIW5vZGUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgbGV0IHNjcm9sbCA9IHt9XG5cbiAgICAgICAgaWYobm9kZS5yY2lkID09IG51bGwpIHtcbiAgICAgICAgICAgIHNjcm9sbCA9IHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG5vZGUuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBub2RlLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHJjaWQ6IC0xLFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Nyb2xsID0ge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogbm9kZS5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgc2Nyb2xsTGVmdDogbm9kZS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHJjaWQ6IG5vZGUucmNpZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIChzY3JvbGwgYXMgYW55KS50eXBlID0gZXZlbnRUeXBlcy5zY3JvbGw7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudChzY3JvbGwpO1xuICAgIH1cblxuICAgIGhhbmRsZU9uS2V5dXAgPShldmVudDphbnkpPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgcmNpZDogZXZlbnQudGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5pbnB1dFZhbHVlXG4gICAgICAgIH0pOyAgICAgICAgXG4gICAgfVxuXG4gICAgaGFuZGxlTW91c2VNb3ZlID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgaWYod2luZG93LnBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5sYXN0TW91c2VNb3ZlRXZlbnRHZW5lcmF0ZWQgPiB0aGlzLm1vdXNlTW92ZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0TW91c2VNb3ZlRXZlbnRHZW5lcmF0ZWQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgIG1vdXNlWDogZXZlbnQucGFnZVggLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICBtb3VzZVk6IGV2ZW50LnBhZ2VZIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLm1vdXNlTW92ZVxuICAgICAgICAgICAgfSk7ICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZU1vdXNlQ2xpY2sgPShldmVudDphbnkpPT4ge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ID8gZXZlbnQudGFyZ2V0IDogbnVsbDtcbiAgICAgICAgbGV0IGlzUmVzcG9uc2l2ZSA9IHRhcmdldCAhPT0gbnVsbCA/IHRoaXMucmVjdXJzaXZlbHlDaGVja1RhcmdldEhhc0NsaWNrRXZlbnRzKHRhcmdldCkgOiBmYWxzZTtcbiAgICAgICAgbGV0IGlzTGluayA9IHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQuaHJlZiA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIG1vdXNlWDogZXZlbnQucGFnZVgsXG4gICAgICAgICAgICBtb3VzZVk6IGV2ZW50LnBhZ2VZLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5tb3VzZUNsaWNrLFxuICAgICAgICAgICAgaXNSZXNwb25zaXZlLFxuICAgICAgICAgICAgaXNMaW5rXG4gICAgICAgIH0pOyAgICAgXG4gICAgfVxuXG4gICAgZ2V0VVJMRGV0YWlscyA9KCk9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgICAgICBwcm90b2NvbDogd2luZG93LmxvY2F0aW9uLnByb3RvY29sLFxuICAgICAgICAgICAgaG9zdDogd2luZG93LmxvY2F0aW9uLmhvc3QsXG4gICAgICAgICAgICBob3N0bmFtZTogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLFxuICAgICAgICAgICAgcG9ydDogd2luZG93LmxvY2F0aW9uLnBvcnQsXG4gICAgICAgICAgICBwYXRobmFtZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgc2VhcmNoOiB3aW5kb3cubG9jYXRpb24uc2VhcmNoLFxuICAgICAgICAgICAgaGFzaDogd2luZG93LmxvY2F0aW9uLmhhc2gsXG4gICAgICAgICAgICBocmVmOiB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogIFBvcHVsYXRlIElkXG4gICAgICogXG4gICAgICovXG4gXG4gICAgcG9wdWxhdGVJZCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgbm9kZS5yY2lkID0gY3VycmVudE5vZGVJZDtcbiAgICAgICAgY3VycmVudE5vZGVJZCsrO1xuICAgICAgICBpZihub2RlLmNoaWxkTm9kZXMgJiYgbm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICBub2RlLmNoaWxkTm9kZXMuZm9yRWFjaCgoY2hpbGQ6YW55KT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlSWQoY2hpbGQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiAgTWV0YSBEYXRhXG4gICAgICovXG5cbiAgICBnZXRBbGxNZXRhRGF0YSA9KGdlbmVyYXRlRXZlbnQ9dHJ1ZSk9PiB0aGlzLm1ldGFEYXRhSGFuZGxlci5nZXRBbGxNZXRhRGF0YShnZW5lcmF0ZUV2ZW50KTtcbiBcblxuICAgIC8qKlxuICAgICAqICBUaGUgRXZlbnQgR2VuZXJhdG9yXG4gICAgICovXG5cbiAgICAgXG5cbiAgICBnZW5lcmF0ZUV2ZW50ID0oYWN0aW9uOmFueSk9PiB7XG4gICAgICAgIGxldCBldmVudDphbnkgPSB7XG4gICAgICAgICAgICB0aW1lOiBwYXJzZUZsb2F0KHBlcmZvcm1hbmNlLm5vdygpLnRvRml4ZWQoNCkpXG4gICAgICAgIH0gXG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgICAgLi4uZXZlbnQsXG4gICAgICAgICAgICAuLi5hY3Rpb25cbiAgICAgICAgfSBcbiAgICAgICAgaWYoIWluaXRpYWxTbmFwc2hvdFNlbmQgJiYgZXZlbnQuaW5pdGlhbCkge1xuICAgICAgICAgICAgaW5pdGlhbFNuYXBzaG90U2VuZCA9IHRydWU7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgICAgIGlmKGRhdGFCdWZmZXIubGVuZ3RoICYmIGluaXRpYWxTbmFwc2hvdFNlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpZHggaW4gZGF0YUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KGRhdGFCdWZmZXJbaWR4XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YUJ1ZmZlciA9IFtdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMSlcbiAgICAgICAgfVxuICAgICAgICBpZihpbml0aWFsU25hcHNob3RTZW5kKSB7XG4gICAgICAgICAgICBkYXRhLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5wdWJsaXNoTGl2ZVVwZGF0ZShldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZihbZXZlbnRUeXBlcy5hdHRyaWJ1dGVzLCBldmVudFR5cGVzLmNoYXJhY3RlckRhdGEsIGV2ZW50VHlwZXMuY2hpbGRMaXN0XS5pbmRleE9mKGV2ZW50LnR5cGUpID09PSAtMSl7XG4gICAgICAgICAgICBkYXRhQnVmZmVyLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGlzaExpdmVVcGRhdGUgPShldmVudDogYW55KT0+IHtcbiAgICAgICAgaWYoZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbGV0IG1zZzphbnkgPSB0aGlzLndyYXBFdmVudChldmVudCk7IFxuICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLnJjRGF0YS5wdXNoKG1zZyk7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyKG1zZywgZGF0YSk7XG4gICAgICAgIH0gICBcbiAgICB9XG5cbiAgICBnZXRMaXZlVXBkYXRlID0obGlzdGVuZXI6YW55KT0+IHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgICAgICBpZihkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBtc2cgPSB0aGlzLndyYXBFdmVudChkYXRhW2RhdGEubGVuZ3RoLTFdKVxuICAgICAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIobXNnLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyYXBFdmVudCA9KGRhdGE6YW55KT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGE7IFxuICAgIH1cblxufSIsImltcG9ydCAnLi4vSGVscGVycy9Eb2NSZWFkeSc7XG5pbXBvcnQge2dldFNJRCwgbG9hZEpTLCBwYXJzZVVSTH0gZnJvbSAnLi4vSGVscGVycy9IZWxwZXJzJztcbmltcG9ydCBSZWNvcmRlciBmcm9tICcuLi9SZWNvcmRlci9SZWNvcmRlcic7XG5pbXBvcnQge2hvc3R9IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnOyBcblxuaW50ZXJmYWNlIFJIQXJncyB7XG4gICAgY2xpZW50SWQ6IFN0cmluZyxcbiAgICBhcHBJZDogU3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZGVySGFuZGxlciB7XG5cbiAgICBzaWQ6IFN0cmluZztcbiAgICBjaWQ6IFN0cmluZztcbiAgICBhaWQ6IFN0cmluZztcbiAgICByY0RhdGFCdWZmZXI6IEFycmF5PGFueT4gPSBbXTtcbiAgICByZWNvcmRlckRhdGE6IEFycmF5PGFueT4gPSBbXTtcbiAgICByZWNvcmRlcjogYW55ID0gbnVsbDtcbiAgICBzb2NrZXQ6IGFueTtcbiAgICBzb2NrZXRJbnRlcjogYW55O1xuICAgIGluaXRpYXRlZDogQm9vbGVhbiA9IGZhbHNlO1xuICAgIHBhY2tldEluZGV4OiBhbnkgPSAwOyBcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IFJIQXJncykge1xuXG4gICAgICAgIHRoaXMuc2lkID0gZ2V0U0lEKCk7XG4gICAgICAgIHRoaXMuYWlkID0gYXJncy5hcHBJZDtcbiAgICAgICAgdGhpcy5jaWQgPSBhcmdzLmNsaWVudElkO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBXYWl0aW5nIGZvciBkb2N1bWVudCByZWFkeSBzdGF0ZScpO1xuXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5kb2NSZWFkeSgoKT0+IHtcbiAgICAgICAgICAgIGxvYWRKUygnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc29ja2V0LmlvLzIuMy4wL3NvY2tldC5pby5zbGltLmpzJywgKCk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gU29ja2V0IGxvYWRlZCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXJEYXRhID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlciA9IG5ldyBSZWNvcmRlcih7XG4gICAgICAgICAgICAgICAgICAgIHNpZDogdGhpcy5zaWQsXG4gICAgICAgICAgICAgICAgICAgIGNpZDogdGhpcy5jaWQsXG4gICAgICAgICAgICAgICAgICAgIGFpZDogdGhpcy5haWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyLmdldExpdmVVcGRhdGUodGhpcy5vblJlY29yZGVyVXBkYXRlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlci5zdGFydChkb2N1bWVudC5ib2R5KTtcblxuICAgICAgICAgICAgICAgIGxldCBpbyA9ICh3aW5kb3cgYXMgYW55KS5pbztcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoaG9zdCwge3RyYW5zcG9ydHM6Wyd3ZWJzb2NrZXQnLCAncG9sbGluZyddfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgnY29ubmVjdCcsIHRoaXMub25Db25uZWN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vbmNlKCdyZWNvbm5lY3QnLCB0aGlzLm9uQ29ubmVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgnZGlzY29ubmVjdCcsIHRoaXMub25EaXNjb25uZWN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIHdpbmRvdylcblxuICAgIH1cbiBcbiAgICBvbkRpc2Nvbm5lY3QgPSgpPT4ge1xuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQ29ubmVjdCA9KCk9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBDb25uZWN0ZWQgdG8gU29ja2V0Jyk7XG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgU2VuZGluZyBTZXNzaW9uIE1ldGFcbiAgICAgICAgICovXG4gICAgICAgIGxldCBzZXNzaW9uTWV0YURhdGEgPSB0aGlzLmdldFNlc3Npb25NZXRhKCk7XG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Nlc3Npb25SZWNpdmVyJywgc2Vzc2lvbk1ldGFEYXRhKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogIFNlbmRpbmcgQnVmZmVyZWQgRGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgZm9yKGxldCBpZHggaW4gdGhpcy5yZWNvcmRlckRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKHRoaXMucmVjb3JkZXJEYXRhW2lkeF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb3JkZXJEYXRhID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbml0aWF0aW5nIFNlbmRlclxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zb2NrZXRJbnRlciA9IHNldEludGVydmFsKCgpPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5yY0RhdGFCdWZmZXIgJiYgdGhpcy5yY0RhdGFCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2tldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgICAgICAgICAgYWlkOiB0aGlzLmFpZCxcbiAgICAgICAgICAgICAgICAgICAgcGlkOiB0aGlzLmdldFBJRCgpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5wYWNrZXRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnJjRGF0YUJ1ZmZlclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrZXRJbmRleCs9MTtcbiAgICAgICAgICAgICAgICBpZigod2luZG93IGFzIGFueSkuQVJDRGV2KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOmFueSA9ICBKU09OLnN0cmluZ2lmeShwYWNrZXQpLmxlbmd0aCAqIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBTZW5kaW5nIERhdGEnLCB0aGlzLnJjRGF0YUJ1ZmZlci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gUGFja2V0IHNpemUnLCBzaXplLCAnQnl0ZXMsICcsIE1hdGguY2VpbChzaXplLzEwMjQpLCAna2InKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYWNrZXQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Nlc3Npb25SZWNpdmVyJywgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJjRGF0YUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBnZXRQSUQgPSgpPT4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG5cbiAgICBzZW5kVG9TZXJ2ZXIgPShldmVudDogYW55KT0+IHtcbiAgICAgICAgaWYoIXRoaXMuaW5pdGlhdGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMucmNEYXRhQnVmZmVyLnB1c2goZXZlbnQpO1xuICAgIH1cblxuICAgIG9uUmVjb3JkZXJVcGRhdGVyID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgdGhpcy5yZWNvcmRlckRhdGEucHVzaChldmVudCk7XG4gICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKGV2ZW50KTtcbiAgICB9XG5cbiAgICBnZXRTZXNzaW9uTWV0YSA9KCk9PiB7XG4gICAgICAgIGlmKCF0aGlzLnJlY29yZGVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbQVJDXSBGQVRBTCBFUlI6IFJlY29yZGVyIG5vdCBGb3VuZCcpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1ldGE6YW55ID0gdGhpcy5yZWNvcmRlci5nZXRBbGxNZXRhRGF0YShmYWxzZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzaWQ6IHRoaXMuc2lkLFxuICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgIGFpZDogdGhpcy5haWQsXG4gICAgICAgICAgICB0eXBlOidzZXNzaW9uJyxcbiAgICAgICAgICAgIGRldmljZVR5cGU6ICdkZXNrdG9wJyxcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIG1ldGFEYXRhOiB7XG4gICAgICAgICAgICAgIGJyb3dzZXJOYW1lOiBtZXRhLmJyb3dzZXIsXG4gICAgICAgICAgICAgIHBhZ2VVUkw6IHBhcnNlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKSxcbiAgICAgICAgICAgICAgb3M6IG1ldGEub3MsXG4gICAgICAgICAgICAgIGNwdUNvcmU6IG1ldGEuY29yZSxcbiAgICAgICAgICAgICAgZGV2aWNlTWVtb3J5OiBtZXRhLmRldmljZU1lbW9yeSxcbiAgICAgICAgICAgICAgc2NyZWVuVHlwZTogbWV0YS5pc1RvdWNoRGV2aWNlLFxuICAgICAgICAgICAgICBsYW5ndWFnZTogbWV0YS5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgY29va2llRW5hYmxlZDogbWV0YS5jb29raWVFbmFibGVkLFxuICAgICAgICAgICAgICByZWZlcnJlcjogcGFyc2VVUkwobWV0YS5yZWZlcnJlciB8fCBudWxsKSxcbiAgICAgICAgICAgICAgYnJvd3NlclZlcnNpb246IG1ldGEuYnJvd3NlcixcbiAgICAgICAgICAgICAgb3NWZXJzaW9uOiBtZXRhLm9zLFxuICAgICAgICAgICAgICB1c2VyQWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBldmVudFR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlJlcXVlc3RIYW5kbGVyIHtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcblxuXG4gICAgICAgIGNvbnN0IHRyYWNrWE1MUmVxID0gdGhpcy50cmFja1hNTFJlcTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogIHhtbEh0dHBSZXFcbiAgICAgICAgICovXG5cbiAgICAgICAgbGV0IG9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjtcbiAgICAgICAgKFhNTEh0dHBSZXF1ZXN0IGFzIGFueSkucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbihtZXRob2Q6YW55LCB1cmw6c3RyaW5nLCBhc3luYzpib29sZWFuKSB7XG4gICAgICAgICAgICBsZXQgcmVxID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGQ6YW55KSB7XG4gICAgICAgICAgICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tYTUxSZXEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXEuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmNcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcGVuLmNhbGwodGhpcywgbWV0aG9kLCB1cmwsIGFzeW5jKTtcbiAgICAgICAgfTsgXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogIEZldGNoXG4gICAgICAgICAqL1xuICAgICAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVGZXRjaChwcm9taXNlOmFueSwgdXJsOlN0cmluZywgcGFyYW1zOmFueSkge1xuICAgICAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBwcm9taXNlOyBcbiAgICAgICAgICAgIHRyYWNrWE1MUmVxKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3Auc3RhdHVzLFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IHBhcmFtcy5tZXRob2QgfHwgJ0dFVCcsXG4gICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLl9fZmV0Y2hfXyA9IHdpbmRvdy5mZXRjaDtcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmZldGNoID0odXJsOlN0cmluZywgcGFyYW1zOmFueSk9PiB7XG4gICAgICAgICAgICBsZXQgcmVxID0gKHdpbmRvdyBhcyBhbnkpLl9fZmV0Y2hfXyh1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICBoYW5kbGVGZXRjaChyZXEudGhlbigpLCB1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhY2tYTUxSZXEgPShhcmdzOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMueG1sSHR0cFJlcSxcbiAgICAgICAgICAgIC4uLmFyZ3NcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBjb21tYW5kc1xufSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93RXZlbnRIYW5kbGVyIHtcblxuICAgIGN0cmxLZXlTdGF0dXM6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICByZXNpemVEZWJvdW5jZTogYW55O1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG5cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG5cbiAgICAgICAgY29uc3QgdHJhY2tXaW5kb3dDb21tYW5kID0oZTogYW55KT0+IHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gKGRvY3VtZW50LmFsbCkgPyAod2luZG93LmV2ZW50IGFzIGFueSkua2V5Q29kZSA6IGUud2hpY2g7IFxuICAgICAgICAgICAgbGV0IGNtZCA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5jdHJsS2V5U3RhdHVzICYmIGNvZGUgPT09IDg2KSB7XG4gICAgICAgICAgICAgICAgY21kID0gY29tbWFuZHMuUEFTVEU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09PSA2NykgeyBcbiAgICAgICAgICAgICAgICBjbWQgPSBjb21tYW5kcy5DT1BZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN0cmxLZXlTdGF0dXMgJiYgY29kZSA9PT0gODMpIHsgXG4gICAgICAgICAgICAgICAgY21kID0gY29tbWFuZHMuU0FWRTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdHJsS2V5U3RhdHVzICYmIGNvZGUgPT09IDY4KSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLkJPT0tNQVJLO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjbWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY29tbWFuZEV4ZWN1dGVkLFxuICAgICAgICAgICAgICAgICAgICBjbWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhY2tDdHJsID0oZTogYW55LCBpc0tleURvd246Qm9vbGVhbik9PiB7XG4gICAgICAgICAgICBsZXQgY29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuICAgICAgICAgICAgbGV0IGlzTWFjID0gKHRoaXMuZ2V0UmVjb3JkZXIoKS5vc3x8JycpLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5kZXhPZignbWFjJykgIT09IC0xO1xuICAgICAgICAgICAgaWYoKGNvZGUgPT09IDkxICYmIGlzTWFjKSB8fCAoIWlzTWFjICYmIGNvZGUgPT09IDE3KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3RybEtleVN0YXR1cyA9IGlzS2V5RG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZT0+dHJhY2tDdHJsKGUsIHRydWUpLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZT0+dHJhY2tDdHJsKGUsIGZhbHNlKSwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhY2tXaW5kb3dDb21tYW5kLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudHJhY2tXaW5kb3dSZXNpemUoKTtcbiAgICAgICAgdGhpcy50cmFja0hhc2hDaGFuZ2UoKTtcbiAgICB9XG5cblxuICAgIHRyYWNrV2luZG93UmVzaXplID0oKT0+IHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplRGVib3VuY2UpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVEZWJvdW5jZSA9IHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLndpbmRvd1Jlc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb25zb2xlU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgfSwgNDAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrQ29uc29sZVN0YXR1cyA9KGdlbmVyYXRlRXZlbnQ9ZmFsc2UpPT4ge1xuICAgICAgICBsZXQgZGV2dG9vbHM6IEZ1bmN0aW9uID0gZnVuY3Rpb24oKXt9O1xuICAgICAgICAoZGV2dG9vbHMgYXMgYW55KS50b1N0cmluZyA9IGZ1bmN0aW9uKCkgeyB0aGlzLm9wZW5lZCA9IHRydWUgfVxuICAgICAgICBjb25zb2xlLmxvZygnJWMnLCBkZXZ0b29scyk7XG5cbiAgICAgICAgbGV0IHByZXZTdGF0dXMgPSB0aGlzLmdldFJlY29yZGVyKCkuY29uc29sZVN0YXR1cyB8fCBmYWxzZTtcbiAgICAgICAgbGV0IGN1cnJlbnRTdGF0dXMgPSAoZGV2dG9vbHMgYXMgYW55KS5vcGVuZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA+IDE1MCkgfHwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGggPiAxNTApKTtcbiAgICAgICAgaWYocHJldlN0YXR1cyAhPT0gY3VycmVudFN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMgPSBjdXJyZW50U3RhdHVzO1xuICAgICAgICAgICAgaWYoZ2VuZXJhdGVFdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jb25zb2xlU3RhdHVzQ2hhbmdlZCxcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZVN0YXR1czogdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBcblxuICAgIHRyYWNrSGFzaENoYW5nZSA9KCk9PiB7XG4gICAgICAgIHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSAoKT0+IHsgXG4gICAgICAgICAgICBsZXQgZXZlbnQ6YW55ID0gdGhpcy5nZXRSZWNvcmRlcigpLmdldFVSTERldGFpbHMoKTtcbiAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBldmVudFR5cGVzLmhhc2hDaGFuZ2VkO1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IFJlY29yZGVySGFuZGxlciBmcm9tICcuL1JlY29yZGVySGFuZGxlci9SZWNvcmRlckhhbmRsZXInO1xuXG5cbmNvbnN0IHN0YXJ0QVJDPShjbGllbnRJZDpTdHJpbmcsIGFwcElkOlN0cmluZyk9PiB7XG4gICAgY29uc29sZS5sb2coJ1tBUkNdIFJlY29yZGVyIEhhbmRsZXIgSW5pdGlhdGVkLCBDbGllbnQgSUQnLCBjbGllbnRJZCwgJ0FwcCBJRCcsIGFwcElkKVxuICAgIG5ldyBSZWNvcmRlckhhbmRsZXIoe2NsaWVudElkLCBhcHBJZH0pO1xufVxuXG4od2luZG93IGFzIGFueSkuc3RhcnRBUkMgPSBzdGFydEFSQztcblxuXG5leHBvcnQgZGVmYXVsdCBzdGFydEFSQzsiXSwic291cmNlUm9vdCI6IiJ9