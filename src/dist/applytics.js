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
        this.trackAllConsoleActivity();
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
        this.recordStyle = function () {
            _this.cssRules = '';
            for (var idx = 0; idx < document.styleSheets.length; idx++) {
                try {
                    for (var jdx = 0; jdx < document.styleSheets[idx].rules.length; jdx++) {
                        _this.cssRules += document.styleSheets[idx].rules[jdx].cssText;
                    }
                }
                catch (e) {
                    _this.getRecorder().generateEvent({
                        type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].styleSheetsLoadReq,
                        href: document.styleSheets[idx].href
                    });
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
            var blacklistedNodes = _this.getRecorder().getBlackListedNodes();
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
                addedNodes.push(_this.getRecorder().getHTML(mutation.addedNodes[idx]));
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
            _this.generateEvent({
                mouseX: event.pageX - document.documentElement.scrollLeft,
                mouseY: event.pageY - document.documentElement.scrollTop,
                type: _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].mouseMove
            });
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
        this.consoleHandler = new _ConsoleHandler_ConsoleHandler__WEBPACK_IMPORTED_MODULE_3__["default"]({ getRecorder: function () { return _this; } });
        this.mutaionHandler = new _MutationHandler_MutationHandler__WEBPACK_IMPORTED_MODULE_2__["default"]({ getRecorder: function () { return _this; } });
        this.domParser = new _DomParser_DomParser__WEBPACK_IMPORTED_MODULE_5__["default"]({ getRecorder: function () { return _this; } });
        this.windowEventHandler = new _WindowEventHandler_WindowEventHandler__WEBPACK_IMPORTED_MODULE_4__["default"]({ getRecorder: function () { return _this; } });
        this.webRequestHandler = new _WebRequestHandler_WebRequestHandler__WEBPACK_IMPORTED_MODULE_6__["default"]({ getRecorder: function () { return _this; } });
        this.metaDataHandler = new _MetaDataHandler_MetaDataHandler__WEBPACK_IMPORTED_MODULE_7__["default"]({ getRecorder: function () { return _this; } });
        console.log('[ARC] Recorder Initiated. V 0.1.3');
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
            if (_this.ctrlKeyStatus && code == 86) {
                cmd = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["commands"].PASTE;
            }
            else if (_this.ctrlKeyStatus && code == 67) {
                cmd = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["commands"].COPY;
            }
            else if (_this.ctrlKeyStatus && code == 83) {
                cmd = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["commands"].SAVE;
            }
            else if (_this.ctrlKeyStatus && code == 68) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zb2xlSGFuZGxlci9Db25zb2xlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0NvbnN0YW50cy9Db25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zdGFudHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvRG9tUGFyc2VyL0RvbVBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0hlbHBlcnMvRG9jUmVhZHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9IZWxwZXJzL0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9NZXRhRGF0YUhhbmRsZXIvTWV0YURhdGFIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvTXV0YXRpb25IYW5kbGVyL011dGF0aW9uSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL1JlY29yZGVyL1JlY29yZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvUmVjb3JkZXJIYW5kbGVyL1JlY29yZGVySGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL1dlYlJlcXVlc3RIYW5kbGVyL1dlYlJlcXVlc3RIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvV2luZG93RXZlbnRIYW5kbGVyL1dpbmRvd0V2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7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QztBQUduQix1RUFBUSxFQUFDIiwiZmlsZSI6ImFwcGx5dGljcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL1NESy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IFxuICAgIGV2ZW50VHlwZXMsIFxuICAgIGNvbnNvbGVUcmFja0xpc3Rcbn0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnNvbGVIYW5kbGVyIHtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcbiAgICB0ZW1wQ29uc29sZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuICAgICAgICB0aGlzLnRyYWNrQWxsQ29uc29sZUFjdGl2aXR5KCk7XG4gICAgfVxuXG5cbiAgICB0cmFja0NvbnNvbGUgPShwYXJhbXM6YW55LCB0eXBlOmFueSk9PiB7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IHBhcmFtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2gocGFyYW1zW2lkeF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY29uc29sZSxcbiAgICAgICAgICAgIGNvbnNvbGVUeXBlOiB0eXBlLFxuICAgICAgICAgICAgYXJnc1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRyYWNrQWxsQ29uc29sZUFjdGl2aXR5ID0oKT0+IHsgXG4gICAgICAgIGxldCB0ZW1wQ29uc29sZSA9IHt9O1xuICAgICAgICBjb25zdCB0cmFja0NvbnNvbGUgPSB0aGlzLnRyYWNrQ29uc29sZTtcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGNvbnNvbGVUcmFja0xpc3QpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKDxhbnk+Y29uc29sZSlbY29uc29sZVRyYWNrTGlzdFtpZHhdXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICg8YW55PnRlbXBDb25zb2xlKVtjb25zb2xlVHJhY2tMaXN0W2lkeF1dID0gKDxhbnk+Y29uc29sZSlbY29uc29sZVRyYWNrTGlzdFtpZHhdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgdGhpcy50ZW1wQ29uc29sZSA9IHRlbXBDb25zb2xlO1xuICAgICAgICBjb25zdCBjbG9uZUNvbnNvbGUgPSBmdW5jdGlvbiAoa2V5OmFueSA9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09IG51bGwgJiYga2V5IGluIHRlbXBDb25zb2xlKSB7XG4gICAgICAgICAgICAgICAgKDxhbnk+Y29uc29sZSlba2V5XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tDb25zb2xlKGFyZ3VtZW50cywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+Y29uc29sZSlba2V5XSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoKDxhbnk+dGVtcENvbnNvbGUpW2tleV0sIGNvbnNvbGUpO1xuICAgICAgICAgICAgICAgICAgICAoPGFueT5jb25zb2xlKVtrZXldLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lQ29uc29sZShrZXkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkeCBpbiB0ZW1wQ29uc29sZSkge1xuICAgICAgICAgICAgICAgICAgICAoPGFueT5jb25zb2xlKVtpZHhdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tDb25zb2xlKGFyZ3VtZW50cywgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICg8YW55PmNvbnNvbGUpW2lkeF0gPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKCg8YW55PnRlbXBDb25zb2xlKVtpZHhdLCBjb25zb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICg8YW55PmNvbnNvbGUpW2lkeF0uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ29uc29sZShpZHgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbG9uZUNvbnNvbGUoKTtcbiAgICAgICAgd2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvciwgdXJsLCBsaW5lKSB7XG4gICAgICAgICAgICB0cmFja0NvbnNvbGUoW2Vycm9yLCB1cmwsIGxpbmVdLCAnbmV3RXJyb3InKTtcbiAgICAgICAgfTsgXG4gICAgfVxuXG59IiwiZXhwb3J0IGNvbnN0IHJlY29yZGVyQ29uZmlnID0ge1xuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZSwgIFxufSIsImV4cG9ydCBjb25zdCBob3N0ID0gJ2h0dHBzOi8vdGVzdC5hcHBseXRpY3MuaW4nO1xuZXhwb3J0IGNvbnN0IGV2ZW50VHlwZXMgPSB7XG4gICAgc25hcHNob3Q6ICdzbmFwc2hvdCcsXG4gICAgY2hhcmFjdGVyRGF0YTogJ2NoYXJhY3RlckRhdGEnLFxuICAgIGNoaWxkTGlzdDogJ2NoaWxkTGlzdCcsXG4gICAgYXR0cmlidXRlczogJ2F0dHJpYnV0ZXMnLFxuICAgIHNjcm9sbDogJ3Njcm9sbCcsXG4gICAgaW5wdXRWYWx1ZTogJ2lucHV0VmFsdWUnLFxuICAgIG1vdXNlQ2xpY2s6ICdtb3VzZUNsaWNrJyxcbiAgICBtb3VzZU1vdmU6ICdtb3VzZU1vdmUnLFxuICAgIGFzc2V0TG9hZGVkOiAnYXNzZXRMb2FkZWQnLFxuICAgIHN0eWxlU2hlZXRzTG9hZFJlcTogJ3N0eWxlU2hlZXRzTG9hZFJlcScsXG4gICAgeG1sSHR0cFJlcTogJ3htbEh0dHBSZXEnLFxuICAgIGNvbnNvbGU6ICdjb25zb2xlJyxcbiAgICBicm93c2VyTWV0YTogJ2Jyb3dzZXJNZXRhJyxcbiAgICB3aW5kb3dSZXNpemU6ICd3aW5kb3dSZXNpemUnLFxuICAgIGNvbnNvbGVTdGF0dXNDaGFuZ2VkOiAnY29uc29sZVN0YXR1c0NoYW5nZWQnLFxuICAgIGNvbW1hbmRFeGVjdXRlZDogJ2NvbW1hbmRFeGVjdXRlZCcsXG4gICAgaGFzaENoYW5nZWQ6ICdoYXNoQ2hhbmdlZCdcbn1cbmV4cG9ydCBjb25zdCBjb21tYW5kcyA9IHtcbiAgICBQQVNURTogXCJQQVNURVwiLFxuICAgIENPUFk6IFwiQ09QWVwiLFxuICAgIEJPT0tNQVJLOiBcIkJPT0tNQVJLXCIsXG4gICAgU0FWRTogXCJTQVZFXCJcbn1cblxuZXhwb3J0IGNvbnN0IGJsYWNrbGlzdGVkRWxCeUNsYXNzOiBBcnJheTxTdHJpbmc+ID0gW107XG5leHBvcnQgY29uc3QgY29uc29sZVRyYWNrTGlzdDogQXJyYXk8YW55PiA9IFsnaW5mbycsICdsb2cnLCAnd2FybicsICdlcnJvciddXG5leHBvcnQgY29uc3QgYmxhY2tsaXN0ZWRBdHRyczogQXJyYXk8U3RyaW5nPiA9IFsnc3Jjc2V0J11cbiIsImltcG9ydCB7IFxuICAgIGV2ZW50VHlwZXMsIFxuICAgIGJsYWNrbGlzdGVkRWxCeUNsYXNzLFxuICAgIGJsYWNrbGlzdGVkQXR0cnNcbn0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVBhcnNlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG4gICAgY3NzUnVsZXM6IFN0cmluZyA9ICcnO1xuICAgIGlucHV0Tm9kZU5hbWVzOiBBcnJheTxTdHJpbmc+ID0gWydURVhUQVJFQScsICdJTlBVVCddOyBcbiAgICByZWFkSW1hZ2VTcmM6IEJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHJlY29yZFN0eWxlID0oKT0+IHtcbiAgICAgICAgdGhpcy5jc3NSdWxlcyA9ICcnO1xuICAgICAgICBmb3IobGV0IGlkeD0wOyBpZHg8ZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGpkeD0wOyBqZHg8KDxhbnk+ZG9jdW1lbnQuc3R5bGVTaGVldHNbaWR4XSkucnVsZXMubGVuZ3RoOyBqZHgrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNzc1J1bGVzICs9ICg8YW55PmRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0pLnJ1bGVzW2pkeF0uY3NzVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5zdHlsZVNoZWV0c0xvYWRSZXEsXG4gICAgICAgICAgICAgICAgICAgIGhyZWY6IGRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0uaHJlZlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuICAgIH1cblxuICAgIGdldEhUTUwgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGxldCBlbDphbnkgPSB7fTtcblxuICAgICAgICBpZihub2RlLm5vZGVOYW1lID09PSAnI3RleHQnKSB7XG4gICAgICAgICAgICBlbC5ub2RlTmFtZSA9IG5vZGUubm9kZU5hbWU7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgZWwudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsLnRhZ05hbWUgPSBbJ0JPRFknXS5pbmRleE9mKG5vZGUudGFnTmFtZSkgIT09IC0xID8gJ0RJVicgOiBub2RlLnRhZ05hbWU7XG4gICAgICAgICAgICBlbC5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgICAgICBlbC50eXBlID0gJ2VsZW1lbnQnO1xuICAgICAgICAgICAgaWYobm9kZS50YWdOYW1lID09PSAnSUZSQU1FJykge1xuICAgICAgICAgICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogbm9kZS5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBub2RlLmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihub2RlLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGF0dHJJbmRleD0wOyBhdHRySW5kZXg8bm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDsgYXR0ckluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoYmxhY2tsaXN0ZWRBdHRycy5pbmRleE9mKG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLmxvY2FsTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS5sb2NhbE5hbWUgPT09ICdzcmMnICYmIG5vZGUudGFnTmFtZSAhPT0gJ0lGUkFNRScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWRJbWFnZVNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zcmMgPSB0aGlzLnJlYWRTcmMobm9kZSwgbm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5zcmNVUkwgPSB0aGlzLmNvbnZlcnRUb0Fic29sdXRlUGF0aChub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3JjID0gdGhpcy5jb252ZXJ0VG9BYnNvbHV0ZVBhdGgobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuYXR0cmlidXRlc1tub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS5sb2NhbE5hbWVdID0gbm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqICBFdmVudCBCaW5kaW5nXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICAgICAgaWYoWycnLCAnWCcsICdZJ10ubWFwKGQ9Plsnc2Nyb2xsJywgJ2F1dG8nXS5pbmRleE9mKCg8YW55PnN0eWxlKVsnb3ZlcmZsb3cnK2RdKSAhPT0gLTEpLmZpbHRlcihkPT5kKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuYmluZFNjcm9sbChub2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5pbnB1dE5vZGVOYW1lcy5pbmRleE9mKG5vZGUubm9kZU5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5iaW5kT25LZXl1cChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC5yY2lkID0gbm9kZS5yY2lkO1xuICAgICAgICBlbC5jaGlsZE5vZGVzID0gW11cbiAgICAgICAgaWYobm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICBub2RlLmNoaWxkTm9kZXMuZm9yRWFjaCgoY2hpbGQ6YW55KT0+IHtcbiAgICAgICAgICAgICAgICBpZihjaGlsZC5ub2RlTmFtZSAhPT0gJ1NDUklQVCcgJiYgY2hpbGQubm9kZU5hbWUgIT09ICdOT1NDUklQVCcgJiYgY2hpbGQubm9kZU5hbWUgIT09ICcjY29tbWVudCcgJiYgdGhpcy5jaGVja05vZGVJc1ZhbGlkKGNoaWxkKSkgIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuY2hpbGROb2Rlcy5wdXNoKHRoaXMuZ2V0SFRNTChjaGlsZCkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxuXG4gICAgdGFrZVNuYXBzaG90ID0obm9kZTphbnksIGluaXRpYWw6YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLnBvcHVsYXRlSWQobm9kZSk7XG4gICAgICAgIGxldCBjbG9uZSA9IHRoaXMuZ2V0SFRNTChub2RlKTtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5zbmFwc2hvdCwgXG4gICAgICAgICAgICBkb206IGNsb25lLCBcbiAgICAgICAgICAgIGNzc1J1bGVzOiB0aGlzLmNzc1J1bGVzLCBcbiAgICAgICAgICAgIGluaXRpYWwsXG4gICAgICAgICAgICBzY3JlZW5XaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgIHNjcm9sbFRvcDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIHNjcm9sbExlZnQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgY29uc29sZVN0YXR1czogdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMsXG4gICAgICAgICAgICBsb2NhdGlvbjogdGhpcy5nZXRSZWNvcmRlcigpLmdldFVSTERldGFpbHMoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrTm9kZUlzVmFsaWQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuY2xhc3NOYW1lICYmIG5vZGUuY2xhc3NOYW1lLmluZGV4T2YgJiYgYmxhY2tsaXN0ZWRFbEJ5Q2xhc3MuZmlsdGVyKGQ9PiBub2RlLmNsYXNzTmFtZS5pbmRleE9mKGQpICE9PSAtMSkubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuYmxhY2tsaXN0ZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnZlcnRUb0Fic29sdXRlUGF0aCA9KHBhdGg6YW55KT0+IHtcbiAgICAgICAgaWYocGF0aD09bnVsbClcbiAgICAgICAgICAgIHJldHVybiAnbm9wYXRoJztcbiAgICAgICAgcmV0dXJuIG5ldyBVUkwocGF0aCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbikuaHJlZjsgXG4gICAgfVxuXG5cbiAgICBnZXRCYXNlNjRJbWFnZShpbWc6YW55KSB7XG4gICAgICAgIGxldCBkYXRhVVJMID0gJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgdmFyIGN0eDphbnkgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodCk7XG4gICAgICAgICAgICBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gXG4gICAgICAgIHJldHVybiBkYXRhVVJMO1xuICAgIH1cblxuICAgIHJlYWRTcmMgPShub2RlOmFueSwgdXJsOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJhc2U2NEltYWdlKG5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICByY2lkOiBub2RlLnJjaWQsXG4gICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgc3JjOiB0aGlzLmdldEJhc2U2NEltYWdlKG5vZGUpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmFzc2V0TG9hZGVkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCAnZG9jIHJlYWR5JztcblxuKGZ1bmN0aW9uKGZ1bmNOYW1lOmFueSwgYmFzZU9iajphbnkpIHtcbiAgICBmdW5jTmFtZSA9IGZ1bmNOYW1lIHx8IFwiZG9jUmVhZHlcIjtcbiAgICBiYXNlT2JqID0gYmFzZU9iaiB8fCB3aW5kb3c7XG4gICAgdmFyIHJlYWR5TGlzdCA9IDxhbnk+W107XG4gICAgdmFyIHJlYWR5RmlyZWQgPSBmYWxzZTtcbiAgICB2YXIgcmVhZHlFdmVudEhhbmRsZXJzSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgXG4gICAgZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgICAgIGlmICghcmVhZHlGaXJlZCkge1xuICAgICAgICAgICAgcmVhZHlGaXJlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlYWR5TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlYWR5TGlzdFtpXS5mbi5jYWxsKHdpbmRvdywgcmVhZHlMaXN0W2ldLmN0eCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWFkeUxpc3QgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiByZWFkeVN0YXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiApIHtcbiAgICAgICAgICAgIHJlYWR5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmFzZU9ialtmdW5jTmFtZV0gPSBmdW5jdGlvbihjYWxsYmFjazphbnksIGNvbnRleHQ6YW55KSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNhbGxiYWNrIGZvciBkb2NSZWFkeShmbikgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFkeUZpcmVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge2NhbGxiYWNrKGNvbnRleHQpO30sIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVhZHlMaXN0LnB1c2goe2ZuOiBjYWxsYmFjaywgY3R4OiBjb250ZXh0fSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fCAoISg8YW55PmRvY3VtZW50KS5hdHRhY2hFdmVudCAmJiBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJlYWR5LCAxKTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVhZHlFdmVudEhhbmRsZXJzSW5zdGFsbGVkKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHJlYWR5LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHJlYWR5LCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoKDxhbnk+ZG9jdW1lbnQpLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgKDxhbnk+ZG9jdW1lbnQpLmF0dGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIHJlYWR5U3RhdGVDaGFuZ2UpO1xuICAgICAgICAgICAgICAgICg8YW55PmRvY3VtZW50KS5hdHRhY2hFdmVudChcIm9ubG9hZFwiLCByZWFkeSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignW0FSQ106IEZhaWxlZCB0byBUcmlnZ2VyIERvYyByZWFkeScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWFkeUV2ZW50SGFuZGxlcnNJbnN0YWxsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICB9KShcImRvY1JlYWR5XCIsIHdpbmRvdyk7IiwiY29uc3QgZ2VuZXJhdGVSYW5kb21TdHJpbmcgPShsZW5ndGg6IE51bWJlcik9PiB7XG4gICAgbGV0IHJlc3VsdCAgICAgICAgICAgPSAnJztcbiAgICBsZXQgY2hhcmFjdGVycyAgICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XG4gICAgbGV0IGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBsZW5ndGg7IGlkeCsrICkge1xuICAgICAgIHJlc3VsdCArPSBjaGFyYWN0ZXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzTGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVNJRCA9KCk9PiB7XG4gICAgcmV0dXJuIGdlbmVyYXRlUmFuZG9tU3RyaW5nKDQpICsgJy0nICsgZ2VuZXJhdGVSYW5kb21TdHJpbmcoNCkgKyAnLScgKyBnZW5lcmF0ZVJhbmRvbVN0cmluZygyKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFNJRCA9KCk9PiB7XG4gICAgbGV0IHNpZCA9ICg8YW55PndpbmRvdykuYXBwcmNfc2lkIHx8IG51bGw7XG4gICAgaWYoc2lkID09PSBudWxsKSB7XG4gICAgICAgIHNpZCA9IGdlbmVyYXRlU0lEKClcbiAgICB9XG4gICAgcmV0dXJuIHNpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRKUyhmaWxlOmFueSwgY2FsbGJhY2s6YW55KSB7XG4gICAgdmFyIGpzRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBqc0VsbS50eXBlID0gXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCI7XG4gICAganNFbG0uc3JjID0gZmlsZTtcbiAgICBqc0VsbS5vbmxvYWQgPSBjYWxsYmFjaztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGpzRWxtKTtcbn1cbiIsImltcG9ydCB7IGV2ZW50VHlwZXMgfSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0YURhdGFIYW5kbGVyIHtcblxuICAgIGdldFJlY29yZGVyOiBGdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICAgICAgdGhpcy5nZXRBbGxNZXRhRGF0YSgpO1xuICAgIH1cblxuICAgIGdldEFsbE1ldGFEYXRhID0oZ2VuZXJhdGVFdmVudD10cnVlKT0+IHtcbiAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5icm93c2VyTWV0YSxcbiAgICAgICAgICAgIGJyb3dzZXI6IHRoaXMuZ2V0QnJvd3NlcigpLFxuICAgICAgICAgICAgb3M6IHRoaXMuZ2V0T1MoKSxcbiAgICAgICAgICAgIGNvcmU6IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5LFxuICAgICAgICAgICAgY29va2llRW5hYmxlZDogbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQsXG4gICAgICAgICAgICBsYW5ndWFnZTogbmF2aWdhdG9yLmxhbmd1YWdlLFxuICAgICAgICAgICAgZGV2aWNlTWVtb3J5OiAoPGFueT5uYXZpZ2F0b3IpLmRldmljZU1lbW9yeSxcbiAgICAgICAgICAgIGlzVG91Y2hEZXZpY2U6IHRoaXMuZ2V0SXNUb3VjaERldmljZSgpLFxuICAgICAgICAgICAgcmVmZXJyZXI6ZG9jdW1lbnQucmVmZXJyZXIsXG4gICAgICAgICAgICBhcHBWZXJzaW9uOiBuYXZpZ2F0b3IuYXBwVmVyc2lvbixcbiAgICAgICAgICAgIHVzZXJBZ2VudDogbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICAgICB9O1xuICAgICAgICBpZihnZW5lcmF0ZUV2ZW50KVxuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoZXZlbnQpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuXG4gICAgZ2V0SXNUb3VjaERldmljZSgpIHtcbiAgICAgICAgcmV0dXJuICAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpXG4gICAgICAgICAgICB8fCAobmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMClcbiAgICAgICAgICAgIHx8IChuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDApKVxuICAgIH1cblxuICAgIGdldEJyb3dzZXIoKXtcbiAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCwgdGVtLFxuICAgICAgICBNPSB1YS5tYXRjaCgvKG9wZXJhfGNocm9tZXxzYWZhcml8ZmlyZWZveHxtc2llfHRyaWRlbnQoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpIHx8IFtdO1xuICAgICAgICBpZigvdHJpZGVudC9pLnRlc3QoTVsxXSkpe1xuICAgICAgICAgICAgdGVtPSAgL1xcYnJ2WyA6XSsoXFxkKykvZy5leGVjKHVhKSB8fCBbXTtcbiAgICAgICAgICAgIHJldHVybiAnSUUgJysodGVtWzFdIHx8ICcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZihNWzFdPT09ICdDaHJvbWUnKXtcbiAgICAgICAgICAgIHRlbT0gdWEubWF0Y2goL1xcYihPUFJ8RWRnZT8pXFwvKFxcZCspLyk7XG4gICAgICAgICAgICBpZih0ZW0hPSBudWxsKSByZXR1cm4gdGVtLnNsaWNlKDEpLmpvaW4oJyAnKS5yZXBsYWNlKCdPUFInLCAnT3BlcmEnKS5yZXBsYWNlKCdFZGcgJywgJ0VkZ2UgJyk7XG4gICAgICAgIH1cbiAgICAgICAgTT0gTVsyXT8gW01bMV0sIE1bMl1dOiBbbmF2aWdhdG9yLmFwcE5hbWUsIG5hdmlnYXRvci5hcHBWZXJzaW9uLCAnLT8nXTtcbiAgICAgICAgaWYoKHRlbT0gdWEubWF0Y2goL3ZlcnNpb25cXC8oXFxkKykvaSkpIT0gbnVsbCkgTS5zcGxpY2UoMSwgMSwgdGVtWzFdKTtcbiAgICAgICAgcmV0dXJuIE0uam9pbignICcpO1xuICAgIH1cblxuICAgIGdldE9TKCkge1xuICAgICAgICB2YXIgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0sXG4gICAgICAgICAgICBtYWNvc1BsYXRmb3JtcyA9IFsnTWFjaW50b3NoJywgJ01hY0ludGVsJywgJ01hY1BQQycsICdNYWM2OEsnXSxcbiAgICAgICAgICAgIHdpbmRvd3NQbGF0Zm9ybXMgPSBbJ1dpbjMyJywgJ1dpbjY0JywgJ1dpbmRvd3MnLCAnV2luQ0UnXSxcbiAgICAgICAgICAgIGlvc1BsYXRmb3JtcyA9IFsnaVBob25lJywgJ2lQYWQnLCAnaVBvZCddLFxuICAgICAgICAgICAgb3MgPSBudWxsO1xuICAgICAgXG4gICAgICAgIGlmIChtYWNvc1BsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcyA9ICdNYWMgT1MnO1xuICAgICAgICB9IGVsc2UgaWYgKGlvc1BsYXRmb3Jtcy5pbmRleE9mKHBsYXRmb3JtKSAhPT0gLTEpIHtcbiAgICAgICAgICBvcyA9ICdpT1MnO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd3NQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybSkgIT09IC0xKSB7XG4gICAgICAgICAgb3MgPSAnV2luZG93cyc7XG4gICAgICAgIH0gZWxzZSBpZiAoL0FuZHJvaWQvLnRlc3QodXNlckFnZW50KSkge1xuICAgICAgICAgIG9zID0gJ0FuZHJvaWQnO1xuICAgICAgICB9IGVsc2UgaWYgKCFvcyAmJiAvTGludXgvLnRlc3QocGxhdGZvcm0pKSB7XG4gICAgICAgICAgb3MgPSAnTGludXgnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5vcyA9IG9zO1xuICAgICAgICByZXR1cm4gb3M7XG4gICAgfVxufSAiLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbn0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11dGF0aW9uSGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG4gICAgc2tpcHBlZE11dGF0aW9uczogYW55ID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICB9XG5cblxuICAgIGhhbmRsZU11dGF0aW9ucyA9KG11dGF0aW9uczphbnkpPT4ge1xuICAgICAgICBsZXQgYmxhY2tsaXN0ZWROb2RlczogQXJyYXk8YW55PiA9IHRoaXMuZ2V0UmVjb3JkZXIoKS5nZXRCbGFja0xpc3RlZE5vZGVzKCk7XG4gICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICAgICAgaWYoIW11dGF0aW9uLnRhcmdldCkgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBmb3IobGV0IGlkeCBpbiBibGFja2xpc3RlZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgaWYoYmxhY2tsaXN0ZWROb2Rlc1tpZHhdLmNvbnRhaW5zKG11dGF0aW9uLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lwcGVkTXV0YXRpb25zKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaChtdXRhdGlvbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBldmVudFR5cGVzLmNoYXJhY3RlckRhdGE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhcmFjdGVyRGF0YU11dGF0aW9uKG11dGF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIGV2ZW50VHlwZXMuY2hpbGRMaXN0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoaWxkTGlzdChtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBldmVudFR5cGVzLmF0dHJpYnV0ZXM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQXR0cmlidXRlcyhtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgaGFuZGxlQ2hhcmFjdGVyRGF0YU11dGF0aW9uID0obXV0YXRpb246YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgcmNpZDogbXV0YXRpb24udGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNoYXJhY3RlckRhdGEsXG4gICAgICAgICAgICB0ZXh0OiBtdXRhdGlvbi50YXJnZXQuZGF0YVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZUNoaWxkTGlzdCA9KG11dGF0aW9uOmFueSk9PiB7XG4gICAgICAgIGxldCByZW1vdmVkTm9kZXMgPSBbXTtcbiAgICAgICAgbGV0IGFkZGVkTm9kZXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpZHg9MDsgaWR4IDwgbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGlmKG11dGF0aW9uLnJlbW92ZWROb2Rlc1tpZHhdLnJjaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZWROb2Rlcy5wdXNoKG11dGF0aW9uLnJlbW92ZWROb2Rlc1tpZHhdLnJjaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS51bmJpbmRGcm9tQWxsRXZlbnQobXV0YXRpb24ucmVtb3ZlZE5vZGVzW2lkeF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IG11dGF0aW9uLmFkZGVkTm9kZXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLnBvcHVsYXRlSWQobXV0YXRpb24uYWRkZWROb2Rlc1tpZHhdKTtcbiAgICAgICAgICAgIGFkZGVkTm9kZXMucHVzaCh0aGlzLmdldFJlY29yZGVyKCkuZ2V0SFRNTChtdXRhdGlvbi5hZGRlZE5vZGVzW2lkeF0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICBwYXJlbnQ6IG11dGF0aW9uLnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jaGlsZExpc3QsXG4gICAgICAgICAgICBhZGRlZE5vZGVzLFxuICAgICAgICAgICAgcmVtb3ZlZE5vZGVzLFxuICAgICAgICAgICAgbmV4dFNpYmxpbmc6IG11dGF0aW9uLm5leHRTaWJsaW5nID8gbXV0YXRpb24ubmV4dFNpYmxpbmcucmNpZCA6IG51bGwsXG4gICAgICAgICAgICBwcmV2aW91c1NpYmxpbmc6IG11dGF0aW9uLnByZXZpb3VzU2libGluZyA/IG11dGF0aW9uLnByZXZpb3VzU2libGluZy5yY2lkIDogbnVsbCxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVBdHRyaWJ1dGVzID0obXV0YXRpb246YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgcmNpZDogbXV0YXRpb24udGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lLFxuICAgICAgICAgICAgYXR0cmlidXRlVmFsdWU6IG11dGF0aW9uLnRhcmdldC5nZXRBdHRyaWJ1dGUobXV0YXRpb24uYXR0cmlidXRlTmFtZSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQgeyBldmVudFR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5pbXBvcnQge3JlY29yZGVyQ29uZmlnfSBmcm9tICcuLi9Db25zdGFudHMvQ29uZmlnJztcbmltcG9ydCBNdXRhdGlvbkhhbmRsZXIgZnJvbSAnLi4vTXV0YXRpb25IYW5kbGVyL011dGF0aW9uSGFuZGxlcic7XG5pbXBvcnQgQ29uc29sZUhhbmRsZXIgZnJvbSAnLi4vQ29uc29sZUhhbmRsZXIvQ29uc29sZUhhbmRsZXInO1xuaW1wb3J0IFdpbmRvd0V2ZW50SGFuZGxlciBmcm9tICcuLi9XaW5kb3dFdmVudEhhbmRsZXIvV2luZG93RXZlbnRIYW5kbGVyJztcbmltcG9ydCBEb21QYXJzZXIgZnJvbSAnLi4vRG9tUGFyc2VyL0RvbVBhcnNlcic7XG5pbXBvcnQgV2ViUmVxdWVzdEhhbmRsZXIgZnJvbSAnLi4vV2ViUmVxdWVzdEhhbmRsZXIvV2ViUmVxdWVzdEhhbmRsZXInO1xuaW1wb3J0IE1ldGFEYXRhSGFuZGxlciBmcm9tICcuLi9NZXRhRGF0YUhhbmRsZXIvTWV0YURhdGFIYW5kbGVyJztcblxuY29uc3QgTXV0YXRpb25PYnNlcnZlciA9ICg8YW55PndpbmRvdykuTXV0YXRpb25PYnNlcnZlciB8fCAoPGFueT53aW5kb3cpLldlYktpdE11dGF0aW9uT2JzZXJ2ZXIgfHwgKDxhbnk+d2luZG93KS5Nb3pNdXRhdGlvbk9ic2VydmVyO1xuXG5sZXQgb2JzZXJ2ZXI7XG5sZXQgY3VycmVudE5vZGVJZCA9IDE7XG5sZXQgZGF0YTogQXJyYXk8YW55PiA9IFtdO1xubGV0IGRhdGFCdWZmZXI6IEFycmF5PGFueT4gPSBbXVxubGV0IGV2ZW50TGlzdGVuZXI6YW55ID0gbnVsbDtcbmxldCBpbml0aWFsU25hcHNob3RTZW5kOiBCb29sZWFuID0gZmFsc2U7XG4oPGFueT53aW5kb3cpLnJjRGF0YSA9IFtdXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZGVyIHtcblxuICAgIGNpZDogU3RyaW5nO1xuICAgIHNpZDogU3RyaW5nO1xuICAgIGFpZDogU3RyaW5nO1xuICAgIGJsYWNrbGlzdGVkTm9kZXM6IEFycmF5PGFueT47XG4gICAgY29uc29sZVN0YXR1czogYW55O1xuICAgIG9zOiBhbnk7XG4gICAgY3RybEtleVN0YXR1czogYW55O1xuICAgIG11dGFpb25IYW5kbGVyOiBhbnk7XG4gICAgZG9tUGFyc2VyOiBhbnk7XG4gICAgY29uc29sZUhhbmRsZXI6IGFueTtcbiAgICB3aW5kb3dFdmVudEhhbmRsZXI6IGFueTtcbiAgICB3ZWJSZXF1ZXN0SGFuZGxlcjogYW55O1xuICAgIG1ldGFEYXRhSGFuZGxlcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuY2lkID0gYXJncy5jaWQ7XG4gICAgICAgIHRoaXMuc2lkID0gYXJncy5zaWQ7XG4gICAgICAgIHRoaXMuYWlkID0gYXJncy5haWQ7XG4gICAgICAgIHRoaXMuYmxhY2tsaXN0ZWROb2RlcyA9IFtdO1xuICAgICAgICB0aGlzLmNvbnNvbGVIYW5kbGVyID0gbmV3IENvbnNvbGVIYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KVxuICAgICAgICB0aGlzLm11dGFpb25IYW5kbGVyID0gbmV3IE11dGF0aW9uSGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSlcbiAgICAgICAgdGhpcy5kb21QYXJzZXIgPSBuZXcgRG9tUGFyc2VyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KTtcbiAgICAgICAgdGhpcy53aW5kb3dFdmVudEhhbmRsZXIgPSBuZXcgV2luZG93RXZlbnRIYW5kbGVyKHsgZ2V0UmVjb3JkZXI6ICgpPT4gdGhpcyB9KTtcbiAgICAgICAgdGhpcy53ZWJSZXF1ZXN0SGFuZGxlciA9IG5ldyBXZWJSZXF1ZXN0SGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSk7XG4gICAgICAgIHRoaXMubWV0YURhdGFIYW5kbGVyID0gbmV3IE1ldGFEYXRhSGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBSZWNvcmRlciBJbml0aWF0ZWQuIFYgMC4xLjMnKTtcbiAgICB9ICAgIFxuXG4gICAgc3RhcnQgPShub2RlOiBhbnkpPT4ge1xuICAgICAgICB0aGlzLmRvbVBhcnNlci5yZWNvcmRTdHlsZSgpO1xuICAgICAgICB0aGlzLmJpbmRTY3JvbGwod2luZG93KTtcbiAgICAgICAgdGhpcy5iaW5kTW91c2VFdmVudChkb2N1bWVudCk7XG4gICAgICAgIHRoaXMud2luZG93RXZlbnRIYW5kbGVyLmNoZWNrQ29uc29sZVN0YXR1cyhmYWxzZSk7XG4gICAgICAgIHRoaXMuZG9tUGFyc2VyLnRha2VTbmFwc2hvdChub2RlLCB0cnVlKTtcbiAgICAgICAgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zOmFueSk9PiB7XG4gICAgICAgICAgICB0aGlzLm11dGFpb25IYW5kbGVyLmhhbmRsZU11dGF0aW9ucyhtdXRhdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCByZWNvcmRlckNvbmZpZyk7IFxuICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gU3RhcnRlZCBSZWNvcmRpbmcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiAgSGVscGVyc1xuICAgICAqIFxuICAgICAqL1xuXG4gICAgYmluZFNjcm9sbCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgaWYobm9kZS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBub2RlLmlzU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPblNjcm9sbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kT25LZXl1cCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgaWYobm9kZS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBub2RlLmlzT25LZXl1cCA9IHRydWU7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVPbktleXVwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRNb3VzZUV2ZW50ID0obm9kZTphbnkpPT4ge1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlTW91c2VDbGljayk7XG4gICAgfVxuXG4gICAgdW5iaW5kRnJvbUFsbEV2ZW50ID0obm9kZTphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmlzU2Nyb2xsICYmIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZU9uU2Nyb2xsKTtcbiAgICAgICAgfVxuICAgICAgICBpZihub2RlLmlzT25LZXl1cCAmJiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG5vZGUuaXNPbktleXVwID0gZmFsc2U7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVPbktleXVwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY3Vyc2l2ZWx5Q2hlY2tUYXJnZXRIYXNDbGlja0V2ZW50czphbnkgPSh0YXJnZXQ6YW55KT0+IHtcbiAgICAgICAgaWYodGFyZ2V0Lm9uY2xpY2sgfHwgdGFyZ2V0Lm9ubW91c2Vkb3duIHx8IHRhcmdldC5vbm1vdXNldXAgfHwgdGFyZ2V0Lm9uY2hhbmdlIHx8IFxuICAgICAgICAgICAgWydJTlBVVCddLmluZGV4T2YodGFyZ2V0LnRhZ05hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZih0YXJnZXQudGFnTmFtZSAhPT0gJ0JPRFknICYmIHRhcmdldC5wYXJlbnROb2RlKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY3Vyc2l2ZWx5Q2hlY2tUYXJnZXRIYXNDbGlja0V2ZW50cyh0YXJnZXQucGFyZW50Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBFdmVudCBIYW5kbGVyc1xuICAgICAqL1xuXG4gICAgaGFuZGxlT25TY3JvbGwgPShldmVudDphbnkpPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldCB8fCBldmVudDtcblxuICAgICAgICBpZighbm9kZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgc2Nyb2xsID0ge31cblxuICAgICAgICBpZihub2RlLnJjaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgc2Nyb2xsID0ge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogbm9kZS5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgIHNjcm9sbExlZnQ6IG5vZGUuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgcmNpZDogLTEsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBub2RlLnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBub2RlLnNjcm9sbExlZnQsXG4gICAgICAgICAgICAgICAgcmNpZDogbm9kZS5yY2lkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgKDxhbnk+c2Nyb2xsKS50eXBlID0gZXZlbnRUeXBlcy5zY3JvbGw7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudChzY3JvbGwpO1xuICAgIH1cblxuICAgIGhhbmRsZU9uS2V5dXAgPShldmVudDphbnkpPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgcmNpZDogZXZlbnQudGFyZ2V0LnJjaWQsXG4gICAgICAgICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5pbnB1dFZhbHVlXG4gICAgICAgIH0pOyAgICAgICAgXG4gICAgfVxuXG4gICAgaGFuZGxlTW91c2VNb3ZlID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIG1vdXNlWDogZXZlbnQucGFnZVggLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIG1vdXNlWTogZXZlbnQucGFnZVkgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5tb3VzZU1vdmVcbiAgICAgICAgfSk7ICAgICBcbiAgICB9XG5cbiAgICBoYW5kbGVNb3VzZUNsaWNrID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCA/IGV2ZW50LnRhcmdldCA6IG51bGw7XG4gICAgICAgIGxldCBpc1Jlc3BvbnNpdmUgPSB0YXJnZXQgIT09IG51bGwgPyB0aGlzLnJlY3Vyc2l2ZWx5Q2hlY2tUYXJnZXRIYXNDbGlja0V2ZW50cyh0YXJnZXQpIDogZmFsc2U7XG4gICAgICAgIGxldCBpc0xpbmsgPSB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LmhyZWYgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICBtb3VzZVg6IGV2ZW50LnBhZ2VYLFxuICAgICAgICAgICAgbW91c2VZOiBldmVudC5wYWdlWSxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMubW91c2VDbGljayxcbiAgICAgICAgICAgIGlzUmVzcG9uc2l2ZSxcbiAgICAgICAgICAgIGlzTGlua1xuICAgICAgICB9KTsgICAgIFxuICAgIH1cblxuICAgIGdldFVSTERldGFpbHMgPSgpPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luLFxuICAgICAgICAgICAgcHJvdG9jb2w6IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCxcbiAgICAgICAgICAgIGhvc3Q6IHdpbmRvdy5sb2NhdGlvbi5ob3N0LFxuICAgICAgICAgICAgaG9zdG5hbWU6IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSxcbiAgICAgICAgICAgIHBvcnQ6IHdpbmRvdy5sb2NhdGlvbi5wb3J0LFxuICAgICAgICAgICAgcGF0aG5hbWU6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgICAgIHNlYXJjaDogd2luZG93LmxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgICAgIGhhc2g6IHdpbmRvdy5sb2NhdGlvbi5oYXNoLFxuICAgICAgICAgICAgaHJlZjogd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqICBQb3B1bGF0ZSBJZFxuICAgICAqIFxuICAgICAqL1xuIFxuICAgIHBvcHVsYXRlSWQgPShub2RlOmFueSk9PiB7XG4gICAgICAgIG5vZGUucmNpZCA9IGN1cnJlbnROb2RlSWQ7XG4gICAgICAgIGN1cnJlbnROb2RlSWQrKztcbiAgICAgICAgaWYobm9kZS5jaGlsZE5vZGVzICYmIG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgbm9kZS5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkOmFueSk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZUlkKGNoaWxkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogIE1ldGEgRGF0YVxuICAgICAqL1xuXG4gICAgZ2V0QWxsTWV0YURhdGEgPShnZW5lcmF0ZUV2ZW50PXRydWUpPT4gdGhpcy5tZXRhRGF0YUhhbmRsZXIuZ2V0QWxsTWV0YURhdGEoZ2VuZXJhdGVFdmVudCk7XG4gXG5cbiAgICAvKipcbiAgICAgKiAgVGhlIEV2ZW50IEdlbmVyYXRvclxuICAgICAqL1xuXG4gICAgIFxuXG4gICAgZ2VuZXJhdGVFdmVudCA9KGFjdGlvbjphbnkpPT4ge1xuICAgICAgICBsZXQgZXZlbnQ6YW55ID0ge1xuICAgICAgICAgICAgdGltZTogcGFyc2VGbG9hdChwZXJmb3JtYW5jZS5ub3coKS50b0ZpeGVkKDQpKVxuICAgICAgICB9IFxuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICAgIC4uLmV2ZW50LFxuICAgICAgICAgICAgLi4uYWN0aW9uXG4gICAgICAgIH0gXG4gICAgICAgIGlmKCFpbml0aWFsU25hcHNob3RTZW5kICYmIGV2ZW50LmluaXRpYWwpIHtcbiAgICAgICAgICAgIGluaXRpYWxTbmFwc2hvdFNlbmQgPSB0cnVlO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcbiAgICAgICAgICAgICAgICBpZihkYXRhQnVmZmVyLmxlbmd0aCAmJiBpbml0aWFsU25hcHNob3RTZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaWR4IGluIGRhdGFCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudChkYXRhQnVmZmVyW2lkeF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFCdWZmZXIgPSBbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEpXG4gICAgICAgIH1cbiAgICAgICAgaWYoaW5pdGlhbFNuYXBzaG90U2VuZCkge1xuICAgICAgICAgICAgZGF0YS5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMucHVibGlzaExpdmVVcGRhdGUoZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYoW2V2ZW50VHlwZXMuYXR0cmlidXRlcywgZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhLCBldmVudFR5cGVzLmNoaWxkTGlzdF0uaW5kZXhPZihldmVudC50eXBlKSA9PT0gLTEpe1xuICAgICAgICAgICAgZGF0YUJ1ZmZlci5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1Ymxpc2hMaXZlVXBkYXRlID0oZXZlbnQ6IGFueSk9PiB7XG4gICAgICAgIGlmKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGxldCBtc2c6YW55ID0gdGhpcy53cmFwRXZlbnQoZXZlbnQpOyBcbiAgICAgICAgICAgICg8YW55PndpbmRvdykucmNEYXRhLnB1c2gobXNnKTtcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIobXNnLCBkYXRhKTtcbiAgICAgICAgfSAgIFxuICAgIH1cblxuICAgIGdldExpdmVVcGRhdGUgPShsaXN0ZW5lcjphbnkpPT4ge1xuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgICAgIGlmKGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IHRoaXMud3JhcEV2ZW50KGRhdGFbZGF0YS5sZW5ndGgtMV0pXG4gICAgICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcihtc2csIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JhcEV2ZW50ID0oZGF0YTphbnkpPT4ge1xuICAgICAgICByZXR1cm4gZGF0YTsgXG4gICAgfVxuXG59IiwiaW1wb3J0ICcuLi9IZWxwZXJzL0RvY1JlYWR5JztcbmltcG9ydCB7Z2V0U0lELCBsb2FkSlMsIGdlbmVyYXRlU0lEfSBmcm9tICcuLi9IZWxwZXJzL0hlbHBlcnMnO1xuaW1wb3J0IFJlY29yZGVyIGZyb20gJy4uL1JlY29yZGVyL1JlY29yZGVyJztcbmltcG9ydCB7aG9zdH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmludGVyZmFjZSBSSEFyZ3Mge1xuICAgIGNsaWVudElkOiBTdHJpbmcsXG4gICAgYXBwSWQ6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRlckhhbmRsZXIge1xuXG4gICAgc2lkOiBTdHJpbmc7XG4gICAgY2lkOiBTdHJpbmc7XG4gICAgYWlkOiBTdHJpbmc7XG4gICAgcmNEYXRhQnVmZmVyOiBBcnJheTxhbnk+ID0gW107XG4gICAgcmVjb3JkZXJEYXRhOiBBcnJheTxhbnk+ID0gW107XG4gICAgcmVjb3JkZXI6IGFueSA9IG51bGw7XG4gICAgc29ja2V0OiBhbnk7XG4gICAgc29ja2V0SW50ZXI6IGFueTtcbiAgICBpbml0aWF0ZWQ6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBwYWNrZXRJbmRleDogYW55ID0gMDsgXG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBSSEFyZ3MpIHtcblxuICAgICAgICB0aGlzLnNpZCA9IGdldFNJRCgpO1xuICAgICAgICB0aGlzLmFpZCA9IGFyZ3MuYXBwSWQ7XG4gICAgICAgIHRoaXMuY2lkID0gYXJncy5jbGllbnRJZDtcblxuICAgICAgICBjb25zb2xlLmxvZygnW0FSQ10gV2FpdGluZyBmb3IgZG9jdW1lbnQgcmVhZHkgc3RhdGUnKTtcblxuICAgICAgICAoPGFueT53aW5kb3cpLmRvY1JlYWR5KCgpPT4ge1xuICAgICAgICAgICAgbG9hZEpTKCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zb2NrZXQuaW8vMi4zLjAvc29ja2V0LmlvLnNsaW0uanMnLCAoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBTb2NrZXQgbG9hZGVkJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlckRhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyID0gbmV3IFJlY29yZGVyKHtcbiAgICAgICAgICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgICAgICAgICAgYWlkOiB0aGlzLmFpZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuZ2V0TGl2ZVVwZGF0ZSh0aGlzLm9uUmVjb3JkZXJVcGRhdGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyLnN0YXJ0KGRvY3VtZW50LmJvZHkpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGlvID0gKDxhbnk+d2luZG93KS5pbztcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoaG9zdCwge3RyYW5zcG9ydHM6Wyd3ZWJzb2NrZXQnLCAncG9sbGluZyddfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgnY29ubmVjdCcsIHRoaXMub25Db25uZWN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vbmNlKCdyZWNvbm5lY3QnLCB0aGlzLm9uQ29ubmVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgnZGlzY29ubmVjdCcsIHRoaXMub25EaXNjb25uZWN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIHdpbmRvdylcblxuICAgIH1cbiBcbiAgICBvbkRpc2Nvbm5lY3QgPSgpPT4ge1xuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQ29ubmVjdCA9KCk9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBDb25uZWN0ZWQgdG8gU29ja2V0Jyk7XG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgU2VuZGluZyBTZXNzaW9uIE1ldGFcbiAgICAgICAgICovXG4gICAgICAgIGxldCBzZXNzaW9uTWV0YURhdGEgPSB0aGlzLmdldFNlc3Npb25NZXRhKCk7XG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Nlc3Npb25SZWNpdmVyJywgc2Vzc2lvbk1ldGFEYXRhKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogIFNlbmRpbmcgQnVmZmVyZWQgRGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgZm9yKGxldCBpZHggaW4gdGhpcy5yZWNvcmRlckRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKHRoaXMucmVjb3JkZXJEYXRhW2lkeF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb3JkZXJEYXRhID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbml0aWF0aW5nIFNlbmRlclxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zb2NrZXRJbnRlciA9IHNldEludGVydmFsKCgpPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5yY0RhdGFCdWZmZXIgJiYgdGhpcy5yY0RhdGFCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFNlbmRpbmcgRGF0YScsIHRoaXMucmNEYXRhQnVmZmVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2tldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgICAgICAgICAgYWlkOiB0aGlzLmFpZCxcbiAgICAgICAgICAgICAgICAgICAgcGlkOiB0aGlzLmdldFBJRCgpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5wYWNrZXRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnJjRGF0YUJ1ZmZlclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrZXRJbmRleCs9MTtcbiAgICAgICAgICAgICAgICBpZigoPGFueT53aW5kb3cpLkFSQ0RldiB8fCB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOmFueSA9ICBKU09OLnN0cmluZ2lmeShwYWNrZXQpLmxlbmd0aCAqIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBQYWNrZXQgc2l6ZScsIHNpemUsICdCeXRlcywgJywgTWF0aC5jZWlsKHNpemUvMTAyNCksICdrYicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Nlc3Npb25SZWNpdmVyJywgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJjRGF0YUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBnZXRQSUQgPSgpPT4gZ2VuZXJhdGVTSUQoKVxuXG4gICAgc2VuZFRvU2VydmVyID0oZXZlbnQ6IGFueSk9PiB7XG4gICAgICAgIGlmKCF0aGlzLmluaXRpYXRlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLnJjRGF0YUJ1ZmZlci5wdXNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvblJlY29yZGVyVXBkYXRlciA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIHRoaXMucmVjb3JkZXJEYXRhLnB1c2goZXZlbnQpO1xuICAgICAgICB0aGlzLnNlbmRUb1NlcnZlcihldmVudCk7XG4gICAgfVxuXG4gICAgZ2V0U2Vzc2lvbk1ldGEgPSgpPT4ge1xuICAgICAgICBpZighdGhpcy5yZWNvcmRlcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignW0FSQ10gRkFUQUwgRVJSOiBSZWNvcmRlciBub3QgRm91bmQnKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtZXRhOmFueSA9IHRoaXMucmVjb3JkZXIuZ2V0QWxsTWV0YURhdGEoZmFsc2UpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgIGNpZDogdGhpcy5jaWQsXG4gICAgICAgICAgICBhaWQ6IHRoaXMuYWlkLFxuICAgICAgICAgICAgdHlwZTonc2Vzc2lvbicsXG4gICAgICAgICAgICBkZXZpY2VUeXBlOiAnZGVza3RvcCcsXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgICBtZXRhRGF0YToge1xuICAgICAgICAgICAgICBicm93c2VyTmFtZTogbWV0YS5icm93c2VyLFxuICAgICAgICAgICAgICBvczogbWV0YS5vcyxcbiAgICAgICAgICAgICAgY3B1Q29yZTogbWV0YS5jb3JlLFxuICAgICAgICAgICAgICBkZXZpY2VNZW1vcnk6IG1ldGEuZGV2aWNlTWVtb3J5LFxuICAgICAgICAgICAgICBzY3JlZW5UeXBlOiBtZXRhLmlzVG91Y2hEZXZpY2UsXG4gICAgICAgICAgICAgIGxhbmd1YWdlOiBtZXRhLmxhbmd1YWdlLFxuICAgICAgICAgICAgICBjb29raWVFbmFibGVkOiBtZXRhLmNvb2tpZUVuYWJsZWQsXG4gICAgICAgICAgICAgIHJlZmVycmVyOiBtZXRhLnJlZmVycmVyLFxuICAgICAgICAgICAgICBicm93c2VyVmVyc2lvbjogbWV0YS5icm93c2VyLFxuICAgICAgICAgICAgICBvc1ZlcnNpb246IG1ldGEub3MsXG4gICAgICAgICAgICAgIHVzZXJBZ2VudDogbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IGV2ZW50VHlwZXMgfSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViUmVxdWVzdEhhbmRsZXIge1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuXG5cbiAgICAgICAgY29uc3QgdHJhY2tYTUxSZXEgPSB0aGlzLnRyYWNrWE1MUmVxO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgeG1sSHR0cFJlcVxuICAgICAgICAgKi9cblxuICAgICAgICBsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xuICAgICAgICAoPGFueT5YTUxIdHRwUmVxdWVzdCkucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbihtZXRob2Q6YW55LCB1cmw6c3RyaW5nLCBhc3luYzpib29sZWFuKSB7XG4gICAgICAgICAgICBsZXQgcmVxID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGQ6YW55KSB7XG4gICAgICAgICAgICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tYTUxSZXEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXEuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmNcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcGVuLmNhbGwodGhpcywgbWV0aG9kLCB1cmwsIGFzeW5jKTtcbiAgICAgICAgfTsgXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogIEZldGNoXG4gICAgICAgICAqL1xuICAgICAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVGZXRjaChwcm9taXNlOmFueSwgdXJsOlN0cmluZywgcGFyYW1zOmFueSkge1xuICAgICAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBwcm9taXNlOyBcbiAgICAgICAgICAgIHRyYWNrWE1MUmVxKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3Auc3RhdHVzLFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IHBhcmFtcy5tZXRob2QgfHwgJ0dFVCcsXG4gICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgKDxhbnk+d2luZG93KS5fX2ZldGNoX18gPSB3aW5kb3cuZmV0Y2g7XG4gICAgICAgICg8YW55PndpbmRvdykuZmV0Y2ggPSh1cmw6U3RyaW5nLCBwYXJhbXM6YW55KT0+IHtcbiAgICAgICAgICAgIGxldCByZXEgPSAoPGFueT53aW5kb3cpLl9fZmV0Y2hfXyh1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICBoYW5kbGVGZXRjaChyZXEudGhlbigpLCB1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhY2tYTUxSZXEgPShhcmdzOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMueG1sSHR0cFJlcSxcbiAgICAgICAgICAgIC4uLmFyZ3NcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBjb21tYW5kc1xufSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93RXZlbnRIYW5kbGVyIHtcblxuICAgIGN0cmxLZXlTdGF0dXM6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICByZXNpemVEZWJvdW5jZTogYW55O1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG5cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG5cbiAgICAgICAgY29uc3QgdHJhY2tXaW5kb3dDb21tYW5kID0oZTogYW55KT0+IHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gKGRvY3VtZW50LmFsbCkgPyAoPGFueT53aW5kb3cuZXZlbnQpLmtleUNvZGUgOiBlLndoaWNoOyBcbiAgICAgICAgICAgIGxldCBjbWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDg2KSB7XG4gICAgICAgICAgICAgICAgY21kID0gY29tbWFuZHMuUEFTVEU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDY3KSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLkNPUFk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDgzKSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLlNBVkU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDY4KSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLkJPT0tNQVJLO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjbWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY29tbWFuZEV4ZWN1dGVkLFxuICAgICAgICAgICAgICAgICAgICBjbWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhY2tDdHJsID0oZTogYW55LCBpc0tleURvd246Qm9vbGVhbik9PiB7XG4gICAgICAgICAgICBsZXQgY29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuICAgICAgICAgICAgbGV0IGlzTWFjID0gKHRoaXMuZ2V0UmVjb3JkZXIoKS5vc3x8JycpLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5kZXhPZignbWFjJykgIT09IC0xO1xuICAgICAgICAgICAgaWYoKGNvZGUgPT09IDkxICYmIGlzTWFjKSB8fCAoIWlzTWFjICYmIGNvZGUgPT09IDE3KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3RybEtleVN0YXR1cyA9IGlzS2V5RG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZT0+dHJhY2tDdHJsKGUsIHRydWUpLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZT0+dHJhY2tDdHJsKGUsIGZhbHNlKSwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhY2tXaW5kb3dDb21tYW5kLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudHJhY2tXaW5kb3dSZXNpemUoKTtcbiAgICAgICAgdGhpcy50cmFja0hhc2hDaGFuZ2UoKTtcbiAgICB9XG5cblxuICAgIHRyYWNrV2luZG93UmVzaXplID0oKT0+IHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplRGVib3VuY2UpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVEZWJvdW5jZSA9IHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLndpbmRvd1Jlc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb25zb2xlU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgfSwgNDAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrQ29uc29sZVN0YXR1cyA9KGdlbmVyYXRlRXZlbnQ9ZmFsc2UpPT4ge1xuICAgICAgICBsZXQgZGV2dG9vbHM6IEZ1bmN0aW9uID0gZnVuY3Rpb24oKXt9O1xuICAgICAgICAoPGFueT5kZXZ0b29scykudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgdGhpcy5vcGVuZWQgPSB0cnVlIH1cbiAgICAgICAgY29uc29sZS5sb2coJyVjJywgZGV2dG9vbHMpO1xuXG4gICAgICAgIGxldCBwcmV2U3RhdHVzID0gdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMgfHwgZmFsc2U7XG4gICAgICAgIGxldCBjdXJyZW50U3RhdHVzID0gKDxhbnk+ZGV2dG9vbHMpLm9wZW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0ID4gMTUwKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCA+IDE1MCkpO1xuICAgICAgICBpZihwcmV2U3RhdHVzICE9PSBjdXJyZW50U3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuY29uc29sZVN0YXR1cyA9IGN1cnJlbnRTdGF0dXM7XG4gICAgICAgICAgICBpZihnZW5lcmF0ZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNvbnNvbGVTdGF0dXNDaGFuZ2VkLFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlU3RhdHVzOiB0aGlzLmdldFJlY29yZGVyKCkuY29uc29sZVN0YXR1cyxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIFxuXG4gICAgdHJhY2tIYXNoQ2hhbmdlID0oKT0+IHtcbiAgICAgICAgd2luZG93Lm9uaGFzaGNoYW5nZSA9ICgpPT4geyBcbiAgICAgICAgICAgIGxldCBldmVudDphbnkgPSB0aGlzLmdldFJlY29yZGVyKCkuZ2V0VVJMRGV0YWlscygpO1xuICAgICAgICAgICAgZXZlbnQudHlwZSA9IGV2ZW50VHlwZXMuaGFzaENoYW5nZWQ7XG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgUmVjb3JkZXJIYW5kbGVyIGZyb20gJy4vUmVjb3JkZXJIYW5kbGVyL1JlY29yZGVySGFuZGxlcic7XG5cblxuY29uc3Qgc3RhcnRBUkM9KGNsaWVudElkOlN0cmluZywgYXBwSWQ6U3RyaW5nKT0+IHtcbiAgICBjb25zb2xlLmxvZygnW0FSQ10gUmVjb3JkZXIgSGFuZGxlciBJbml0aWF0ZWQsIENsaWVudCBJRCcsIGNsaWVudElkLCAnQXBwIElEJywgYXBwSWQpXG4gICAgbmV3IFJlY29yZGVySGFuZGxlcih7Y2xpZW50SWQsIGFwcElkfSk7XG59XG5cbig8YW55PndpbmRvdykuc3RhcnRBUkMgPSBzdGFydEFSQztcblxuXG5leHBvcnQgZGVmYXVsdCBzdGFydEFSQzsiXSwic291cmNlUm9vdCI6IiJ9