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
                console.log(_this.skippedMutations);
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
            console.log('Started Recording');
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
        console.log('Recorder Initiated');
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
                var event = _this.getURLDetails();
                event.type = _Constants_Constants__WEBPACK_IMPORTED_MODULE_0__["eventTypes"].hashChanged;
                _this.getRecorder().generateEvent(event);
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
    console.log('Recorder Handler Initiated, Client ID', clientId, 'App ID', appId);
    new _RecorderHandler_RecorderHandler__WEBPACK_IMPORTED_MODULE_0__["default"]({ clientId: clientId, appId: appId });
};
window.startARC = startARC;
/* harmony default export */ __webpack_exports__["default"] = (startARC);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zb2xlSGFuZGxlci9Db25zb2xlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0NvbnN0YW50cy9Db25maWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9Db25zdGFudHMvQ29uc3RhbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvRG9tUGFyc2VyL0RvbVBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL0hlbHBlcnMvRG9jUmVhZHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9IZWxwZXJzL0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NESy9NZXRhRGF0YUhhbmRsZXIvTWV0YURhdGFIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvTXV0YXRpb25IYW5kbGVyL011dGF0aW9uSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL1JlY29yZGVyL1JlY29yZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvUmVjb3JkZXJIYW5kbGVyL1JlY29yZGVySGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL1dlYlJlcXVlc3RIYW5kbGVyL1dlYlJlcXVlc3RIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TREsvV2luZG93RXZlbnRIYW5kbGVyL1dpbmRvd0V2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0RLL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7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QUFRLENBQUM7QUFHbkIsdUVBQVEsRUFBQyIsImZpbGUiOiJhcHBseXRpY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9TREsvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBjb25zb2xlVHJhY2tMaXN0XG59IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlSGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG4gICAgdGVtcENvbnNvbGU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICAgICAgdGhpcy50cmFja0FsbENvbnNvbGVBY3Rpdml0eSgpO1xuICAgIH1cblxuXG4gICAgdHJhY2tDb25zb2xlID0ocGFyYW1zOmFueSwgdHlwZTphbnkpPT4ge1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuICAgICAgICBmb3IobGV0IGlkeD0wOyBpZHggPCBwYXJhbXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtc1tpZHhdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNvbnNvbGUsXG4gICAgICAgICAgICBjb25zb2xlVHlwZTogdHlwZSxcbiAgICAgICAgICAgIGFyZ3NcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0cmFja0FsbENvbnNvbGVBY3Rpdml0eSA9KCk9PiB7IFxuICAgICAgICBsZXQgdGVtcENvbnNvbGUgPSB7fTtcbiAgICAgICAgY29uc3QgdHJhY2tDb25zb2xlID0gdGhpcy50cmFja0NvbnNvbGU7XG4gICAgICAgIGZvciAobGV0IGlkeCBpbiBjb25zb2xlVHJhY2tMaXN0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mICg8YW55PmNvbnNvbGUpW2NvbnNvbGVUcmFja0xpc3RbaWR4XV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAoPGFueT50ZW1wQ29uc29sZSlbY29uc29sZVRyYWNrTGlzdFtpZHhdXSA9ICg8YW55PmNvbnNvbGUpW2NvbnNvbGVUcmFja0xpc3RbaWR4XV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIHRoaXMudGVtcENvbnNvbGUgPSB0ZW1wQ29uc29sZTtcbiAgICAgICAgY29uc3QgY2xvbmVDb25zb2xlID0gZnVuY3Rpb24gKGtleTphbnkgPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSBudWxsICYmIGtleSBpbiB0ZW1wQ29uc29sZSkge1xuICAgICAgICAgICAgICAgICg8YW55PmNvbnNvbGUpW2tleV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrQ29uc29sZShhcmd1bWVudHMsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PmNvbnNvbGUpW2tleV0gPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKCg8YW55PnRlbXBDb25zb2xlKVtrZXldLCBjb25zb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+Y29uc29sZSlba2V5XS5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICBjbG9uZUNvbnNvbGUoa2V5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZHggaW4gdGVtcENvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+Y29uc29sZSlbaWR4XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrQ29uc29sZShhcmd1bWVudHMsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoPGFueT5jb25zb2xlKVtpZHhdID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbCgoPGFueT50ZW1wQ29uc29sZSlbaWR4XSwgY29uc29sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoPGFueT5jb25zb2xlKVtpZHhdLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZUNvbnNvbGUoaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2xvbmVDb25zb2xlKCk7XG4gICAgICAgIHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oZXJyb3IsIHVybCwgbGluZSkge1xuICAgICAgICAgICAgdHJhY2tDb25zb2xlKFtlcnJvciwgdXJsLCBsaW5lXSwgJ25ld0Vycm9yJyk7XG4gICAgICAgIH07IFxuICAgIH1cblxufSIsImV4cG9ydCBjb25zdCByZWNvcmRlckNvbmZpZyA9IHtcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsICBcbn0iLCJleHBvcnQgY29uc3QgaG9zdCA9ICdodHRwczovL3Rlc3QuYXBwbHl0aWNzLmluJztcbmV4cG9ydCBjb25zdCBldmVudFR5cGVzID0ge1xuICAgIHNuYXBzaG90OiAnc25hcHNob3QnLFxuICAgIGNoYXJhY3RlckRhdGE6ICdjaGFyYWN0ZXJEYXRhJyxcbiAgICBjaGlsZExpc3Q6ICdjaGlsZExpc3QnLFxuICAgIGF0dHJpYnV0ZXM6ICdhdHRyaWJ1dGVzJyxcbiAgICBzY3JvbGw6ICdzY3JvbGwnLFxuICAgIGlucHV0VmFsdWU6ICdpbnB1dFZhbHVlJyxcbiAgICBtb3VzZUNsaWNrOiAnbW91c2VDbGljaycsXG4gICAgbW91c2VNb3ZlOiAnbW91c2VNb3ZlJyxcbiAgICBhc3NldExvYWRlZDogJ2Fzc2V0TG9hZGVkJyxcbiAgICBzdHlsZVNoZWV0c0xvYWRSZXE6ICdzdHlsZVNoZWV0c0xvYWRSZXEnLFxuICAgIHhtbEh0dHBSZXE6ICd4bWxIdHRwUmVxJyxcbiAgICBjb25zb2xlOiAnY29uc29sZScsXG4gICAgYnJvd3Nlck1ldGE6ICdicm93c2VyTWV0YScsXG4gICAgd2luZG93UmVzaXplOiAnd2luZG93UmVzaXplJyxcbiAgICBjb25zb2xlU3RhdHVzQ2hhbmdlZDogJ2NvbnNvbGVTdGF0dXNDaGFuZ2VkJyxcbiAgICBjb21tYW5kRXhlY3V0ZWQ6ICdjb21tYW5kRXhlY3V0ZWQnLFxuICAgIGhhc2hDaGFuZ2VkOiAnaGFzaENoYW5nZWQnXG59XG5leHBvcnQgY29uc3QgY29tbWFuZHMgPSB7XG4gICAgUEFTVEU6IFwiUEFTVEVcIixcbiAgICBDT1BZOiBcIkNPUFlcIixcbiAgICBCT09LTUFSSzogXCJCT09LTUFSS1wiLFxuICAgIFNBVkU6IFwiU0FWRVwiXG59XG5cbmV4cG9ydCBjb25zdCBibGFja2xpc3RlZEVsQnlDbGFzczogQXJyYXk8U3RyaW5nPiA9IFtdO1xuZXhwb3J0IGNvbnN0IGNvbnNvbGVUcmFja0xpc3Q6IEFycmF5PGFueT4gPSBbJ2luZm8nLCAnbG9nJywgJ3dhcm4nLCAnZXJyb3InXVxuZXhwb3J0IGNvbnN0IGJsYWNrbGlzdGVkQXR0cnM6IEFycmF5PFN0cmluZz4gPSBbJ3NyY3NldCddXG4iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBibGFja2xpc3RlZEVsQnlDbGFzcyxcbiAgICBibGFja2xpc3RlZEF0dHJzXG59IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21QYXJzZXIge1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuICAgIGNzc1J1bGVzOiBTdHJpbmcgPSAnJztcbiAgICBpbnB1dE5vZGVOYW1lczogQXJyYXk8U3RyaW5nPiA9IFsnVEVYVEFSRUEnLCAnSU5QVVQnXTsgXG4gICAgcmVhZEltYWdlU3JjOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgICByZWNvcmRTdHlsZSA9KCk9PiB7XG4gICAgICAgIHRoaXMuY3NzUnVsZXMgPSAnJztcbiAgICAgICAgZm9yKGxldCBpZHg9MDsgaWR4PGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBqZHg9MDsgamR4PCg8YW55PmRvY3VtZW50LnN0eWxlU2hlZXRzW2lkeF0pLnJ1bGVzLmxlbmd0aDsgamR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jc3NSdWxlcyArPSAoPGFueT5kb2N1bWVudC5zdHlsZVNoZWV0c1tpZHhdKS5ydWxlc1tqZHhdLmNzc1RleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyBcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuc3R5bGVTaGVldHNMb2FkUmVxLFxuICAgICAgICAgICAgICAgICAgICBocmVmOiBkb2N1bWVudC5zdHlsZVNoZWV0c1tpZHhdLmhyZWZcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmdldFJlY29yZGVyID0oKT0+IGFyZ3MuZ2V0UmVjb3JkZXIoKTtcbiAgICB9XG5cbiAgICBnZXRIVE1MID0obm9kZTphbnkpPT4ge1xuICAgICAgICBsZXQgZWw6YW55ID0ge307XG5cbiAgICAgICAgaWYobm9kZS5ub2RlTmFtZSA9PT0gJyN0ZXh0Jykge1xuICAgICAgICAgICAgZWwubm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lO1xuICAgICAgICAgICAgZWwudmFsdWUgPSBub2RlLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgIGVsLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC50YWdOYW1lID0gWydCT0RZJ10uaW5kZXhPZihub2RlLnRhZ05hbWUpICE9PSAtMSA/ICdESVYnIDogbm9kZS50YWdOYW1lO1xuICAgICAgICAgICAgZWwuYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICAgICAgZWwudHlwZSA9ICdlbGVtZW50JztcbiAgICAgICAgICAgIGlmKG5vZGUudGFnTmFtZSA9PT0gJ0lGUkFNRScpIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG5vZGUuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogbm9kZS5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobm9kZS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBhdHRySW5kZXg9MDsgYXR0ckluZGV4PG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGF0dHJJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGJsYWNrbGlzdGVkQXR0cnMuaW5kZXhPZihub2RlLmF0dHJpYnV0ZXNbYXR0ckluZGV4XS5sb2NhbE5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0ubG9jYWxOYW1lID09PSAnc3JjJyAmJiBub2RlLnRhZ05hbWUgIT09ICdJRlJBTUUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5yZWFkSW1hZ2VTcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3JjID0gdGhpcy5yZWFkU3JjKG5vZGUsIG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3JjVVJMID0gdGhpcy5jb252ZXJ0VG9BYnNvbHV0ZVBhdGgobm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNyYyA9IHRoaXMuY29udmVydFRvQWJzb2x1dGVQYXRoKG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmF0dHJpYnV0ZXNbbm9kZS5hdHRyaWJ1dGVzW2F0dHJJbmRleF0ubG9jYWxOYW1lXSA9IG5vZGUuYXR0cmlidXRlc1thdHRySW5kZXhdLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiAgRXZlbnQgQmluZGluZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgICAgIGlmKFsnJywgJ1gnLCAnWSddLm1hcChkPT5bJ3Njcm9sbCcsICdhdXRvJ10uaW5kZXhPZigoPGFueT5zdHlsZSlbJ292ZXJmbG93JytkXSkgIT09IC0xKS5maWx0ZXIoZD0+ZCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmJpbmRTY3JvbGwobm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaW5wdXROb2RlTmFtZXMuaW5kZXhPZihub2RlLm5vZGVOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuYmluZE9uS2V5dXAobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWwucmNpZCA9IG5vZGUucmNpZDtcbiAgICAgICAgZWwuY2hpbGROb2RlcyA9IFtdXG4gICAgICAgIGlmKG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgbm9kZS5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkOmFueSk9PiB7XG4gICAgICAgICAgICAgICAgaWYoY2hpbGQubm9kZU5hbWUgIT09ICdTQ1JJUFQnICYmIGNoaWxkLm5vZGVOYW1lICE9PSAnTk9TQ1JJUFQnICYmIGNoaWxkLm5vZGVOYW1lICE9PSAnI2NvbW1lbnQnICYmIHRoaXMuY2hlY2tOb2RlSXNWYWxpZChjaGlsZCkpICB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNoaWxkTm9kZXMucHVzaCh0aGlzLmdldEhUTUwoY2hpbGQpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cblxuICAgIHRha2VTbmFwc2hvdCA9KG5vZGU6YW55LCBpbml0aWFsOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5wb3B1bGF0ZUlkKG5vZGUpO1xuICAgICAgICBsZXQgY2xvbmUgPSB0aGlzLmdldEhUTUwobm9kZSk7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuc25hcHNob3QsIFxuICAgICAgICAgICAgZG9tOiBjbG9uZSwgXG4gICAgICAgICAgICBjc3NSdWxlczogdGhpcy5jc3NSdWxlcywgXG4gICAgICAgICAgICBpbml0aWFsLFxuICAgICAgICAgICAgc2NyZWVuV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgc2NyZWVuSGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICAgICAgICBzY3JvbGxUb3A6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgIGNvbnNvbGVTdGF0dXM6IHRoaXMuZ2V0UmVjb3JkZXIoKS5jb25zb2xlU3RhdHVzLFxuICAgICAgICAgICAgbG9jYXRpb246IHRoaXMuZ2V0UmVjb3JkZXIoKS5nZXRVUkxEZXRhaWxzKClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjaGVja05vZGVJc1ZhbGlkID0obm9kZTphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmNsYXNzTmFtZSAmJiBub2RlLmNsYXNzTmFtZS5pbmRleE9mICYmIGJsYWNrbGlzdGVkRWxCeUNsYXNzLmZpbHRlcihkPT4gbm9kZS5jbGFzc05hbWUuaW5kZXhPZihkKSAhPT0gLTEpLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmJsYWNrbGlzdGVkTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb252ZXJ0VG9BYnNvbHV0ZVBhdGggPShwYXRoOmFueSk9PiB7XG4gICAgICAgIGlmKHBhdGg9PW51bGwpXG4gICAgICAgICAgICByZXR1cm4gJ25vcGF0aCc7XG4gICAgICAgIHJldHVybiBuZXcgVVJMKHBhdGgsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pLmhyZWY7IFxuICAgIH1cblxuXG4gICAgZ2V0QmFzZTY0SW1hZ2UoaW1nOmFueSkge1xuICAgICAgICBsZXQgZGF0YVVSTCA9ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgICAgIHZhciBjdHg6YW55ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpO1xuICAgICAgICAgICAgZGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IFxuICAgICAgICByZXR1cm4gZGF0YVVSTDtcbiAgICB9XG5cbiAgICByZWFkU3JjID0obm9kZTphbnksIHVybDphbnkpPT4ge1xuICAgICAgICBpZihub2RlLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCYXNlNjRJbWFnZShub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgcmNpZDogbm9kZS5yY2lkLFxuICAgICAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgICAgIHNyYzogdGhpcy5nZXRCYXNlNjRJbWFnZShub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5hc3NldExvYWRlZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgJ2RvYyByZWFkeSc7XG5cbihmdW5jdGlvbihmdW5jTmFtZTphbnksIGJhc2VPYmo6YW55KSB7XG4gICAgZnVuY05hbWUgPSBmdW5jTmFtZSB8fCBcImRvY1JlYWR5XCI7XG4gICAgYmFzZU9iaiA9IGJhc2VPYmogfHwgd2luZG93O1xuICAgIHZhciByZWFkeUxpc3QgPSA8YW55PltdO1xuICAgIHZhciByZWFkeUZpcmVkID0gZmFsc2U7XG4gICAgdmFyIHJlYWR5RXZlbnRIYW5kbGVyc0luc3RhbGxlZCA9IGZhbHNlO1xuICAgIFxuICAgIGZ1bmN0aW9uIHJlYWR5KCkge1xuICAgICAgICBpZiAoIXJlYWR5RmlyZWQpIHtcbiAgICAgICAgICAgIHJlYWR5RmlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWFkeUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZWFkeUxpc3RbaV0uZm4uY2FsbCh3aW5kb3csIHJlYWR5TGlzdFtpXS5jdHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVhZHlMaXN0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVhZHlTdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgaWYgKCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgKSB7XG4gICAgICAgICAgICByZWFkeSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJhc2VPYmpbZnVuY05hbWVdID0gZnVuY3Rpb24oY2FsbGJhY2s6YW55LCBjb250ZXh0OmFueSkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjYWxsYmFjayBmb3IgZG9jUmVhZHkoZm4pIG11c3QgYmUgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVhZHlGaXJlZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtjYWxsYmFjayhjb250ZXh0KTt9LCAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlYWR5TGlzdC5wdXNoKHtmbjogY2FsbGJhY2ssIGN0eDogY29udGV4dH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHwgKCEoPGFueT5kb2N1bWVudCkuYXR0YWNoRXZlbnQgJiYgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChyZWFkeSwgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlYWR5RXZlbnRIYW5kbGVyc0luc3RhbGxlZCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCByZWFkeSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCByZWFkeSwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKCg8YW55PmRvY3VtZW50KS5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICAgICg8YW55PmRvY3VtZW50KS5hdHRhY2hFdmVudChcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLCByZWFkeVN0YXRlQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICAoPGFueT5kb2N1bWVudCkuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIiwgcmVhZHkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1tBUkNdOiBGYWlsZWQgdG8gVHJpZ2dlciBEb2MgcmVhZHknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVhZHlFdmVudEhhbmRsZXJzSW5zdGFsbGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfSkoXCJkb2NSZWFkeVwiLCB3aW5kb3cpOyIsImNvbnN0IGdlbmVyYXRlUmFuZG9tU3RyaW5nID0obGVuZ3RoOiBOdW1iZXIpPT4ge1xuICAgIGxldCByZXN1bHQgICAgICAgICAgID0gJyc7XG4gICAgbGV0IGNoYXJhY3RlcnMgICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGxldCBjaGFyYWN0ZXJzTGVuZ3RoID0gY2hhcmFjdGVycy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKyApIHtcbiAgICAgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTSUQgPSgpPT4ge1xuICAgIHJldHVybiBnZW5lcmF0ZVJhbmRvbVN0cmluZyg0KSArICctJyArIGdlbmVyYXRlUmFuZG9tU3RyaW5nKDQpICsgJy0nICsgZ2VuZXJhdGVSYW5kb21TdHJpbmcoMik7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRTSUQgPSgpPT4ge1xuICAgIGxldCBzaWQgPSAoPGFueT53aW5kb3cpLmFwcHJjX3NpZCB8fCBudWxsO1xuICAgIGlmKHNpZCA9PT0gbnVsbCkge1xuICAgICAgICBzaWQgPSBnZW5lcmF0ZVNJRCgpXG4gICAgfVxuICAgIHJldHVybiBzaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSlMoZmlsZTphbnksIGNhbGxiYWNrOmFueSkge1xuICAgIHZhciBqc0VsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAganNFbG0udHlwZSA9IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiO1xuICAgIGpzRWxtLnNyYyA9IGZpbGU7XG4gICAganNFbG0ub25sb2FkID0gY2FsbGJhY2s7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChqc0VsbSk7XG59XG4iLCJpbXBvcnQgeyBldmVudFR5cGVzIH0gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1ldGFEYXRhSGFuZGxlciB7XG5cbiAgICBnZXRSZWNvcmRlcjogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG4gICAgICAgIHRoaXMuZ2V0QWxsTWV0YURhdGEoKTtcbiAgICB9XG5cbiAgICBnZXRBbGxNZXRhRGF0YSA9KGdlbmVyYXRlRXZlbnQ9dHJ1ZSk9PiB7XG4gICAgICAgIGxldCBldmVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuYnJvd3Nlck1ldGEsXG4gICAgICAgICAgICBicm93c2VyOiB0aGlzLmdldEJyb3dzZXIoKSxcbiAgICAgICAgICAgIG9zOiB0aGlzLmdldE9TKCksXG4gICAgICAgICAgICBjb3JlOiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSxcbiAgICAgICAgICAgIGNvb2tpZUVuYWJsZWQ6IG5hdmlnYXRvci5jb29raWVFbmFibGVkLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IG5hdmlnYXRvci5sYW5ndWFnZSxcbiAgICAgICAgICAgIGRldmljZU1lbW9yeTogKDxhbnk+bmF2aWdhdG9yKS5kZXZpY2VNZW1vcnksXG4gICAgICAgICAgICBpc1RvdWNoRGV2aWNlOiB0aGlzLmdldElzVG91Y2hEZXZpY2UoKSxcbiAgICAgICAgICAgIHJlZmVycmVyOmRvY3VtZW50LnJlZmVycmVyLFxuICAgICAgICAgICAgYXBwVmVyc2lvbjogbmF2aWdhdG9yLmFwcFZlcnNpb24sXG4gICAgICAgICAgICB1c2VyQWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICAgICAgfTtcbiAgICAgICAgaWYoZ2VuZXJhdGVFdmVudClcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KGV2ZW50KVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cblxuICAgIGdldElzVG91Y2hEZXZpY2UoKSB7XG4gICAgICAgIHJldHVybiAgJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8ICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KVxuICAgICAgICAgICAgfHwgKG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDApXG4gICAgICAgICAgICB8fCAobmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKSlcbiAgICB9XG5cbiAgICBnZXRCcm93c2VyKCl7XG4gICAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQsIHRlbSxcbiAgICAgICAgTT0gdWEubWF0Y2goLyhvcGVyYXxjaHJvbWV8c2FmYXJpfGZpcmVmb3h8bXNpZXx0cmlkZW50KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKSB8fCBbXTtcbiAgICAgICAgaWYoL3RyaWRlbnQvaS50ZXN0KE1bMV0pKXtcbiAgICAgICAgICAgIHRlbT0gIC9cXGJydlsgOl0rKFxcZCspL2cuZXhlYyh1YSkgfHwgW107XG4gICAgICAgICAgICByZXR1cm4gJ0lFICcrKHRlbVsxXSB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoTVsxXT09PSAnQ2hyb21lJyl7XG4gICAgICAgICAgICB0ZW09IHVhLm1hdGNoKC9cXGIoT1BSfEVkZ2U/KVxcLyhcXGQrKS8pO1xuICAgICAgICAgICAgaWYodGVtIT0gbnVsbCkgcmV0dXJuIHRlbS5zbGljZSgxKS5qb2luKCcgJykucmVwbGFjZSgnT1BSJywgJ09wZXJhJykucmVwbGFjZSgnRWRnICcsICdFZGdlICcpO1xuICAgICAgICB9XG4gICAgICAgIE09IE1bMl0/IFtNWzFdLCBNWzJdXTogW25hdmlnYXRvci5hcHBOYW1lLCBuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgJy0/J107XG4gICAgICAgIGlmKCh0ZW09IHVhLm1hdGNoKC92ZXJzaW9uXFwvKFxcZCspL2kpKSE9IG51bGwpIE0uc3BsaWNlKDEsIDEsIHRlbVsxXSk7XG4gICAgICAgIHJldHVybiBNLmpvaW4oJyAnKTtcbiAgICB9XG5cbiAgICBnZXRPUygpIHtcbiAgICAgICAgdmFyIHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgICAgcGxhdGZvcm0gPSB3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtLFxuICAgICAgICAgICAgbWFjb3NQbGF0Zm9ybXMgPSBbJ01hY2ludG9zaCcsICdNYWNJbnRlbCcsICdNYWNQUEMnLCAnTWFjNjhLJ10sXG4gICAgICAgICAgICB3aW5kb3dzUGxhdGZvcm1zID0gWydXaW4zMicsICdXaW42NCcsICdXaW5kb3dzJywgJ1dpbkNFJ10sXG4gICAgICAgICAgICBpb3NQbGF0Zm9ybXMgPSBbJ2lQaG9uZScsICdpUGFkJywgJ2lQb2QnXSxcbiAgICAgICAgICAgIG9zID0gbnVsbDtcbiAgICAgIFxuICAgICAgICBpZiAobWFjb3NQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybSkgIT09IC0xKSB7XG4gICAgICAgICAgb3MgPSAnTWFjIE9TJztcbiAgICAgICAgfSBlbHNlIGlmIChpb3NQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybSkgIT09IC0xKSB7XG4gICAgICAgICAgb3MgPSAnaU9TJztcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3dzUGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0pICE9PSAtMSkge1xuICAgICAgICAgIG9zID0gJ1dpbmRvd3MnO1xuICAgICAgICB9IGVsc2UgaWYgKC9BbmRyb2lkLy50ZXN0KHVzZXJBZ2VudCkpIHtcbiAgICAgICAgICBvcyA9ICdBbmRyb2lkJztcbiAgICAgICAgfSBlbHNlIGlmICghb3MgJiYgL0xpbnV4Ly50ZXN0KHBsYXRmb3JtKSkge1xuICAgICAgICAgIG9zID0gJ0xpbnV4JztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkub3MgPSBvcztcbiAgICAgICAgcmV0dXJuIG9zO1xuICAgIH1cbn0gIiwiaW1wb3J0IHsgXG4gICAgZXZlbnRUeXBlcywgXG59IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdXRhdGlvbkhhbmRsZXIge1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuICAgIHNraXBwZWRNdXRhdGlvbnM6IGFueSA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihhcmdzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG4gICAgfVxuXG5cbiAgICBoYW5kbGVNdXRhdGlvbnMgPShtdXRhdGlvbnM6YW55KT0+IHtcbiAgICAgICAgbGV0IGJsYWNrbGlzdGVkTm9kZXM6IEFycmF5PGFueT4gPSB0aGlzLmdldFJlY29yZGVyKCkuZ2V0QmxhY2tMaXN0ZWROb2RlcygpO1xuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb246YW55KT0+IHtcbiAgICAgICAgICAgIGlmKCFtdXRhdGlvbi50YXJnZXQpIFxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgZm9yKGxldCBpZHggaW4gYmxhY2tsaXN0ZWROb2Rlcykge1xuICAgICAgICAgICAgICAgIGlmKGJsYWNrbGlzdGVkTm9kZXNbaWR4XS5jb250YWlucyhtdXRhdGlvbi50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpcHBlZE11dGF0aW9ucysrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNraXBwZWRNdXRhdGlvbnMpO1xuXG4gICAgICAgICAgICBzd2l0Y2gobXV0YXRpb24udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYXJhY3RlckRhdGFNdXRhdGlvbihtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBldmVudFR5cGVzLmNoaWxkTGlzdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGlsZExpc3QobXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlcy5hdHRyaWJ1dGVzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUF0dHJpYnV0ZXMobXV0YXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIGhhbmRsZUNoYXJhY3RlckRhdGFNdXRhdGlvbiA9KG11dGF0aW9uOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHJjaWQ6IG11dGF0aW9uLnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5jaGFyYWN0ZXJEYXRhLFxuICAgICAgICAgICAgdGV4dDogbXV0YXRpb24udGFyZ2V0LmRhdGFcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDaGlsZExpc3QgPShtdXRhdGlvbjphbnkpPT4ge1xuICAgICAgICBsZXQgcmVtb3ZlZE5vZGVzID0gW107XG4gICAgICAgIGxldCBhZGRlZE5vZGVzID0gW107XG4gICAgICAgIGZvcihsZXQgaWR4PTA7IGlkeCA8IG11dGF0aW9uLnJlbW92ZWROb2Rlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBpZihtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XS5yY2lkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVkTm9kZXMucHVzaChtdXRhdGlvbi5yZW1vdmVkTm9kZXNbaWR4XS5yY2lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkudW5iaW5kRnJvbUFsbEV2ZW50KG11dGF0aW9uLnJlbW92ZWROb2Rlc1tpZHhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGlkeD0wOyBpZHggPCBtdXRhdGlvbi5hZGRlZE5vZGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5wb3B1bGF0ZUlkKG11dGF0aW9uLmFkZGVkTm9kZXNbaWR4XSk7XG4gICAgICAgICAgICBhZGRlZE5vZGVzLnB1c2godGhpcy5nZXRSZWNvcmRlcigpLmdldEhUTUwobXV0YXRpb24uYWRkZWROb2Rlc1tpZHhdKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgcGFyZW50OiBtdXRhdGlvbi50YXJnZXQucmNpZCxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY2hpbGRMaXN0LFxuICAgICAgICAgICAgYWRkZWROb2RlcyxcbiAgICAgICAgICAgIHJlbW92ZWROb2RlcyxcbiAgICAgICAgICAgIG5leHRTaWJsaW5nOiBtdXRhdGlvbi5uZXh0U2libGluZyA/IG11dGF0aW9uLm5leHRTaWJsaW5nLnJjaWQgOiBudWxsLFxuICAgICAgICAgICAgcHJldmlvdXNTaWJsaW5nOiBtdXRhdGlvbi5wcmV2aW91c1NpYmxpbmcgPyBtdXRhdGlvbi5wcmV2aW91c1NpYmxpbmcucmNpZCA6IG51bGwsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQXR0cmlidXRlcyA9KG11dGF0aW9uOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHJjaWQ6IG11dGF0aW9uLnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdHlwZTogZXZlbnRUeXBlcy5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgYXR0cmlidXRlTmFtZTogbXV0YXRpb24uYXR0cmlidXRlTmFtZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZVZhbHVlOiBtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59IiwiaW1wb3J0IHsgZXZlbnRUeXBlcyB9IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuaW1wb3J0IHtyZWNvcmRlckNvbmZpZ30gZnJvbSAnLi4vQ29uc3RhbnRzL0NvbmZpZyc7XG5pbXBvcnQgTXV0YXRpb25IYW5kbGVyIGZyb20gJy4uL011dGF0aW9uSGFuZGxlci9NdXRhdGlvbkhhbmRsZXInO1xuaW1wb3J0IENvbnNvbGVIYW5kbGVyIGZyb20gJy4uL0NvbnNvbGVIYW5kbGVyL0NvbnNvbGVIYW5kbGVyJztcbmltcG9ydCBXaW5kb3dFdmVudEhhbmRsZXIgZnJvbSAnLi4vV2luZG93RXZlbnRIYW5kbGVyL1dpbmRvd0V2ZW50SGFuZGxlcic7XG5pbXBvcnQgRG9tUGFyc2VyIGZyb20gJy4uL0RvbVBhcnNlci9Eb21QYXJzZXInO1xuaW1wb3J0IFdlYlJlcXVlc3RIYW5kbGVyIGZyb20gJy4uL1dlYlJlcXVlc3RIYW5kbGVyL1dlYlJlcXVlc3RIYW5kbGVyJztcbmltcG9ydCBNZXRhRGF0YUhhbmRsZXIgZnJvbSAnLi4vTWV0YURhdGFIYW5kbGVyL01ldGFEYXRhSGFuZGxlcic7XG5cbmNvbnN0IE11dGF0aW9uT2JzZXJ2ZXIgPSAoPGFueT53aW5kb3cpLk11dGF0aW9uT2JzZXJ2ZXIgfHwgKDxhbnk+d2luZG93KS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyIHx8ICg8YW55PndpbmRvdykuTW96TXV0YXRpb25PYnNlcnZlcjtcblxubGV0IG9ic2VydmVyO1xubGV0IGN1cnJlbnROb2RlSWQgPSAxO1xubGV0IGRhdGE6IEFycmF5PGFueT4gPSBbXTtcbmxldCBkYXRhQnVmZmVyOiBBcnJheTxhbnk+ID0gW11cbmxldCBldmVudExpc3RlbmVyOmFueSA9IG51bGw7XG5sZXQgaW5pdGlhbFNuYXBzaG90U2VuZDogQm9vbGVhbiA9IGZhbHNlO1xuKDxhbnk+d2luZG93KS5yY0RhdGEgPSBbXVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRlciB7XG5cbiAgICBjaWQ6IFN0cmluZztcbiAgICBzaWQ6IFN0cmluZztcbiAgICBhaWQ6IFN0cmluZztcbiAgICBibGFja2xpc3RlZE5vZGVzOiBBcnJheTxhbnk+O1xuICAgIGNvbnNvbGVTdGF0dXM6IGFueTtcbiAgICBvczogYW55O1xuICAgIGN0cmxLZXlTdGF0dXM6IGFueTtcbiAgICBtdXRhaW9uSGFuZGxlcjogYW55O1xuICAgIGRvbVBhcnNlcjogYW55O1xuICAgIGNvbnNvbGVIYW5kbGVyOiBhbnk7XG4gICAgd2luZG93RXZlbnRIYW5kbGVyOiBhbnk7XG4gICAgd2ViUmVxdWVzdEhhbmRsZXI6IGFueTtcbiAgICBtZXRhRGF0YUhhbmRsZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGFyZ3M6IGFueSkge1xuICAgICAgICB0aGlzLmNpZCA9IGFyZ3MuY2lkO1xuICAgICAgICB0aGlzLnNpZCA9IGFyZ3Muc2lkO1xuICAgICAgICB0aGlzLmFpZCA9IGFyZ3MuYWlkO1xuICAgICAgICB0aGlzLmJsYWNrbGlzdGVkTm9kZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb25zb2xlSGFuZGxlciA9IG5ldyBDb25zb2xlSGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSlcbiAgICAgICAgdGhpcy5tdXRhaW9uSGFuZGxlciA9IG5ldyBNdXRhdGlvbkhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pXG4gICAgICAgIHRoaXMuZG9tUGFyc2VyID0gbmV3IERvbVBhcnNlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSk7XG4gICAgICAgIHRoaXMud2luZG93RXZlbnRIYW5kbGVyID0gbmV3IFdpbmRvd0V2ZW50SGFuZGxlcih7IGdldFJlY29yZGVyOiAoKT0+IHRoaXMgfSk7XG4gICAgICAgIHRoaXMud2ViUmVxdWVzdEhhbmRsZXIgPSBuZXcgV2ViUmVxdWVzdEhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pO1xuICAgICAgICB0aGlzLm1ldGFEYXRhSGFuZGxlciA9IG5ldyBNZXRhRGF0YUhhbmRsZXIoeyBnZXRSZWNvcmRlcjogKCk9PiB0aGlzIH0pO1xuICAgICAgICBjb25zb2xlLmxvZygnUmVjb3JkZXIgSW5pdGlhdGVkJyk7XG4gICAgfSAgICBcblxuICAgIHN0YXJ0ID0obm9kZTogYW55KT0+IHtcbiAgICAgICAgdGhpcy5kb21QYXJzZXIucmVjb3JkU3R5bGUoKTtcbiAgICAgICAgdGhpcy5iaW5kU2Nyb2xsKHdpbmRvdyk7XG4gICAgICAgIHRoaXMuYmluZE1vdXNlRXZlbnQoZG9jdW1lbnQpO1xuICAgICAgICB0aGlzLndpbmRvd0V2ZW50SGFuZGxlci5jaGVja0NvbnNvbGVTdGF0dXMoZmFsc2UpO1xuICAgICAgICB0aGlzLmRvbVBhcnNlci50YWtlU25hcHNob3Qobm9kZSwgdHJ1ZSk7XG4gICAgICAgIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uczphbnkpPT4ge1xuICAgICAgICAgICAgdGhpcy5tdXRhaW9uSGFuZGxlci5oYW5kbGVNdXRhdGlvbnMobXV0YXRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwgcmVjb3JkZXJDb25maWcpOyBcbiAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0ZWQgUmVjb3JkaW5nJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogIEhlbHBlcnNcbiAgICAgKiBcbiAgICAgKi9cblxuICAgIGJpbmRTY3JvbGwgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc1Njcm9sbCA9IHRydWU7XG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlT25TY3JvbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE9uS2V5dXAgPShub2RlOmFueSk9PiB7XG4gICAgICAgIGlmKG5vZGUuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgbm9kZS5pc09uS2V5dXAgPSB0cnVlO1xuICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlT25LZXl1cCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kTW91c2VFdmVudCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZSk7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZU1vdXNlQ2xpY2spO1xuICAgIH1cblxuICAgIHVuYmluZEZyb21BbGxFdmVudCA9KG5vZGU6YW55KT0+IHtcbiAgICAgICAgaWYobm9kZS5pc1Njcm9sbCAmJiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG5vZGUuaXNTY3JvbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVPblNjcm9sbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobm9kZS5pc09uS2V5dXAgJiYgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBub2RlLmlzT25LZXl1cCA9IGZhbHNlO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlT25LZXl1cCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWN1cnNpdmVseUNoZWNrVGFyZ2V0SGFzQ2xpY2tFdmVudHM6YW55ID0odGFyZ2V0OmFueSk9PiB7XG4gICAgICAgIGlmKHRhcmdldC5vbmNsaWNrIHx8IHRhcmdldC5vbm1vdXNlZG93biB8fCB0YXJnZXQub25tb3VzZXVwIHx8IHRhcmdldC5vbmNoYW5nZSB8fCBcbiAgICAgICAgICAgIFsnSU5QVVQnXS5pbmRleE9mKHRhcmdldC50YWdOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LnRhZ05hbWUgIT09ICdCT0RZJyAmJiB0YXJnZXQucGFyZW50Tm9kZSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVseUNoZWNrVGFyZ2V0SGFzQ2xpY2tFdmVudHModGFyZ2V0LnBhcmVudE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgRXZlbnQgSGFuZGxlcnNcbiAgICAgKi9cblxuICAgIGhhbmRsZU9uU2Nyb2xsID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBldmVudC50YXJnZXQgfHwgZXZlbnQ7XG5cbiAgICAgICAgaWYoIW5vZGUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgbGV0IHNjcm9sbCA9IHt9XG5cbiAgICAgICAgaWYobm9kZS5yY2lkID09IG51bGwpIHtcbiAgICAgICAgICAgIHNjcm9sbCA9IHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IG5vZGUuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBub2RlLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHJjaWQ6IC0xLFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Nyb2xsID0ge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogbm9kZS5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgc2Nyb2xsTGVmdDogbm9kZS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHJjaWQ6IG5vZGUucmNpZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICg8YW55PnNjcm9sbCkudHlwZSA9IGV2ZW50VHlwZXMuc2Nyb2xsO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoc2Nyb2xsKTtcbiAgICB9XG5cbiAgICBoYW5kbGVPbktleXVwID0oZXZlbnQ6YW55KT0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHJjaWQ6IGV2ZW50LnRhcmdldC5yY2lkLFxuICAgICAgICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuaW5wdXRWYWx1ZVxuICAgICAgICB9KTsgICAgICAgIFxuICAgIH1cblxuICAgIGhhbmRsZU1vdXNlTW92ZSA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICBtb3VzZVg6IGV2ZW50LnBhZ2VYIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICAgICAgICBtb3VzZVk6IGV2ZW50LnBhZ2VZIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMubW91c2VNb3ZlXG4gICAgICAgIH0pOyAgICAgXG4gICAgfVxuXG4gICAgaGFuZGxlTW91c2VDbGljayA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudCAmJiBldmVudC50YXJnZXQgPyBldmVudC50YXJnZXQgOiBudWxsO1xuICAgICAgICBsZXQgaXNSZXNwb25zaXZlID0gdGFyZ2V0ICE9PSBudWxsID8gdGhpcy5yZWN1cnNpdmVseUNoZWNrVGFyZ2V0SGFzQ2xpY2tFdmVudHModGFyZ2V0KSA6IGZhbHNlO1xuICAgICAgICBsZXQgaXNMaW5rID0gdGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldC5ocmVmID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgbW91c2VYOiBldmVudC5wYWdlWCxcbiAgICAgICAgICAgIG1vdXNlWTogZXZlbnQucGFnZVksXG4gICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLm1vdXNlQ2xpY2ssXG4gICAgICAgICAgICBpc1Jlc3BvbnNpdmUsXG4gICAgICAgICAgICBpc0xpbmtcbiAgICAgICAgfSk7ICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiAgUG9wdWxhdGUgSWRcbiAgICAgKiBcbiAgICAgKi9cbiBcbiAgICBwb3B1bGF0ZUlkID0obm9kZTphbnkpPT4ge1xuICAgICAgICBub2RlLnJjaWQgPSBjdXJyZW50Tm9kZUlkO1xuICAgICAgICBjdXJyZW50Tm9kZUlkKys7XG4gICAgICAgIGlmKG5vZGUuY2hpbGROb2RlcyAmJiBub2RlLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGUuY2hpbGROb2Rlcy5mb3JFYWNoKChjaGlsZDphbnkpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhdGVJZChjaGlsZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqICBNZXRhIERhdGFcbiAgICAgKi9cblxuICAgIGdldEFsbE1ldGFEYXRhID0oZ2VuZXJhdGVFdmVudD10cnVlKT0+IHRoaXMubWV0YURhdGFIYW5kbGVyLmdldEFsbE1ldGFEYXRhKGdlbmVyYXRlRXZlbnQpO1xuIFxuXG4gICAgLyoqXG4gICAgICogIFRoZSBFdmVudCBHZW5lcmF0b3JcbiAgICAgKi9cblxuICAgIGdlbmVyYXRlRXZlbnQgPShhY3Rpb246YW55KT0+IHtcbiAgICAgICAgbGV0IGV2ZW50OmFueSA9IHtcbiAgICAgICAgICAgIHRpbWU6IHBhcnNlRmxvYXQocGVyZm9ybWFuY2Uubm93KCkudG9GaXhlZCg0KSlcbiAgICAgICAgfSBcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgICAuLi5ldmVudCxcbiAgICAgICAgICAgIC4uLmFjdGlvblxuICAgICAgICB9IFxuICAgICAgICBpZighaW5pdGlhbFNuYXBzaG90U2VuZCAmJiBldmVudC5pbml0aWFsKSB7XG4gICAgICAgICAgICBpbml0aWFsU25hcHNob3RTZW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YUJ1ZmZlci5sZW5ndGggJiYgaW5pdGlhbFNuYXBzaG90U2VuZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGlkeCBpbiBkYXRhQnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRXZlbnQoZGF0YUJ1ZmZlcltpZHhdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhQnVmZmVyID0gW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxKVxuICAgICAgICB9XG4gICAgICAgIGlmKGluaXRpYWxTbmFwc2hvdFNlbmQpIHtcbiAgICAgICAgICAgIGRhdGEucHVzaChldmVudCk7XG4gICAgICAgICAgICB0aGlzLnB1Ymxpc2hMaXZlVXBkYXRlKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmKFtldmVudFR5cGVzLmF0dHJpYnV0ZXMsIGV2ZW50VHlwZXMuY2hhcmFjdGVyRGF0YSwgZXZlbnRUeXBlcy5jaGlsZExpc3RdLmluZGV4T2YoZXZlbnQudHlwZSkgPT09IC0xKXtcbiAgICAgICAgICAgIGRhdGFCdWZmZXIucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaXNoTGl2ZVVwZGF0ZSA9KGV2ZW50OiBhbnkpPT4ge1xuICAgICAgICBpZihldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBsZXQgbXNnOmFueSA9IHRoaXMud3JhcEV2ZW50KGV2ZW50KTsgXG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLnJjRGF0YS5wdXNoKG1zZyk7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyKG1zZywgZGF0YSk7XG4gICAgICAgIH0gICBcbiAgICB9XG5cbiAgICBnZXRMaXZlVXBkYXRlID0obGlzdGVuZXI6YW55KT0+IHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBldmVudExpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgICAgICBpZihkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBtc2cgPSB0aGlzLndyYXBFdmVudChkYXRhW2RhdGEubGVuZ3RoLTFdKVxuICAgICAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIobXNnLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyYXBFdmVudCA9KGRhdGE6YW55KT0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGE7IFxuICAgIH1cblxufSIsImltcG9ydCAnLi4vSGVscGVycy9Eb2NSZWFkeSc7XG5pbXBvcnQge2dldFNJRCwgbG9hZEpTLCBnZW5lcmF0ZVNJRH0gZnJvbSAnLi4vSGVscGVycy9IZWxwZXJzJztcbmltcG9ydCBSZWNvcmRlciBmcm9tICcuLi9SZWNvcmRlci9SZWNvcmRlcic7XG5pbXBvcnQge2hvc3R9IGZyb20gJy4uL0NvbnN0YW50cy9Db25zdGFudHMnO1xuXG5pbnRlcmZhY2UgUkhBcmdzIHtcbiAgICBjbGllbnRJZDogU3RyaW5nLFxuICAgIGFwcElkOiBTdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkZXJIYW5kbGVyIHtcblxuICAgIHNpZDogU3RyaW5nO1xuICAgIGNpZDogU3RyaW5nO1xuICAgIGFpZDogU3RyaW5nO1xuICAgIHJjRGF0YUJ1ZmZlcjogQXJyYXk8YW55PiA9IFtdO1xuICAgIHJlY29yZGVyRGF0YTogQXJyYXk8YW55PiA9IFtdO1xuICAgIHJlY29yZGVyOiBhbnkgPSBudWxsO1xuICAgIHNvY2tldDogYW55O1xuICAgIHNvY2tldEludGVyOiBhbnk7XG4gICAgaW5pdGlhdGVkOiBCb29sZWFuID0gZmFsc2U7XG4gICAgcGFja2V0SW5kZXg6IGFueSA9IDA7IFxuXG4gICAgY29uc3RydWN0b3IoYXJnczogUkhBcmdzKSB7XG5cbiAgICAgICAgdGhpcy5zaWQgPSBnZXRTSUQoKTtcbiAgICAgICAgdGhpcy5haWQgPSBhcmdzLmFwcElkO1xuICAgICAgICB0aGlzLmNpZCA9IGFyZ3MuY2xpZW50SWQ7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0RPQyBSZWFkeSAxJylcblxuICAgICAgICAoPGFueT53aW5kb3cpLmRvY1JlYWR5KCgpPT4ge1xuICAgICAgICAgICAgbG9hZEpTKCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zb2NrZXQuaW8vMi4zLjAvc29ja2V0LmlvLnNsaW0uanMnLCAoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb2NrZXQgbG9hZGVkJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvcmRlckRhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyID0gbmV3IFJlY29yZGVyKHtcbiAgICAgICAgICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgICAgICAgICAgYWlkOiB0aGlzLmFpZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjb3JkZXIuZ2V0TGl2ZVVwZGF0ZSh0aGlzLm9uUmVjb3JkZXJVcGRhdGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZGVyLnN0YXJ0KGRvY3VtZW50LmJvZHkpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGlvID0gKDxhbnk+d2luZG93KS5pbztcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldCA9IGlvLmNvbm5lY3QoaG9zdCwge3RyYW5zcG9ydHM6Wyd3ZWJzb2NrZXQnLCAncG9sbGluZyddfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgnY29ubmVjdCcsIHRoaXMub25Db25uZWN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5vbmNlKCdyZWNvbm5lY3QnLCB0aGlzLm9uQ29ubmVjdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jZSgnZGlzY29ubmVjdCcsIHRoaXMub25EaXNjb25uZWN0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIHdpbmRvdylcblxuICAgIH1cbiBcbiAgICBvbkRpc2Nvbm5lY3QgPSgpPT4ge1xuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uQ29ubmVjdCA9KCk9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQgdG8gU29ja2V0Jyk7XG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgU2VuZGluZyBTZXNzaW9uIE1ldGFcbiAgICAgICAgICovXG4gICAgICAgIGxldCBzZXNzaW9uTWV0YURhdGEgPSB0aGlzLmdldFNlc3Npb25NZXRhKCk7XG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Nlc3Npb25SZWNpdmVyJywgc2Vzc2lvbk1ldGFEYXRhKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogIFNlbmRpbmcgQnVmZmVyZWQgRGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgZm9yKGxldCBpZHggaW4gdGhpcy5yZWNvcmRlckRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFRvU2VydmVyKHRoaXMucmVjb3JkZXJEYXRhW2lkeF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb3JkZXJEYXRhID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBJbml0aWF0aW5nIFNlbmRlclxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zb2NrZXRJbnRlciA9IHNldEludGVydmFsKCgpPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5yY0RhdGFCdWZmZXIgJiYgdGhpcy5yY0RhdGFCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBUkNdIFNlbmRpbmcgRGF0YScsIHRoaXMucmNEYXRhQnVmZmVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2tldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgICAgICAgICAgY2lkOiB0aGlzLmNpZCxcbiAgICAgICAgICAgICAgICAgICAgYWlkOiB0aGlzLmFpZCxcbiAgICAgICAgICAgICAgICAgICAgcGlkOiB0aGlzLmdldFBJRCgpLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5wYWNrZXRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnJjRGF0YUJ1ZmZlclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5wYWNrZXRJbmRleCs9MTtcbiAgICAgICAgICAgICAgICBpZigoPGFueT53aW5kb3cpLkFSQ0RldiB8fCB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOmFueSA9ICBKU09OLnN0cmluZ2lmeShwYWNrZXQpLmxlbmd0aCAqIDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQVJDXSBQYWNrZXQgc2l6ZScsIHNpemUsICdCeXRlcywgJywgTWF0aC5jZWlsKHNpemUvMTAyNCksICdrYicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3Nlc3Npb25SZWNpdmVyJywgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJjRGF0YUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBnZXRQSUQgPSgpPT4gZ2VuZXJhdGVTSUQoKVxuXG4gICAgc2VuZFRvU2VydmVyID0oZXZlbnQ6IGFueSk9PiB7XG4gICAgICAgIGlmKCF0aGlzLmluaXRpYXRlZClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB0aGlzLnJjRGF0YUJ1ZmZlci5wdXNoKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvblJlY29yZGVyVXBkYXRlciA9KGV2ZW50OmFueSk9PiB7XG4gICAgICAgIHRoaXMucmVjb3JkZXJEYXRhLnB1c2goZXZlbnQpO1xuICAgICAgICB0aGlzLnNlbmRUb1NlcnZlcihldmVudCk7XG4gICAgfVxuXG4gICAgZ2V0U2Vzc2lvbk1ldGEgPSgpPT4ge1xuICAgICAgICBpZighdGhpcy5yZWNvcmRlcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignW0FSQ10gRkFUQUwgRVJSOiBSZWNvcmRlciBub3QgRm91bmQnKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtZXRhOmFueSA9IHRoaXMucmVjb3JkZXIuZ2V0QWxsTWV0YURhdGEoZmFsc2UpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2lkOiB0aGlzLnNpZCxcbiAgICAgICAgICAgIGNpZDogdGhpcy5jaWQsXG4gICAgICAgICAgICBhaWQ6IHRoaXMuYWlkLFxuICAgICAgICAgICAgdHlwZTonc2Vzc2lvbicsXG4gICAgICAgICAgICBkZXZpY2VUeXBlOiAnZGVza3RvcCcsXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgICBtZXRhRGF0YToge1xuICAgICAgICAgICAgICBicm93c2VyTmFtZTogbWV0YS5icm93c2VyLFxuICAgICAgICAgICAgICBvczogbWV0YS5vcyxcbiAgICAgICAgICAgICAgY3B1Q29yZTogbWV0YS5jb3JlLFxuICAgICAgICAgICAgICBkZXZpY2VNZW1vcnk6IG1ldGEuZGV2aWNlTWVtb3J5LFxuICAgICAgICAgICAgICBzY3JlZW5UeXBlOiBtZXRhLmlzVG91Y2hEZXZpY2UsXG4gICAgICAgICAgICAgIGxhbmd1YWdlOiBtZXRhLmxhbmd1YWdlLFxuICAgICAgICAgICAgICBjb29raWVFbmFibGVkOiBtZXRhLmNvb2tpZUVuYWJsZWQsXG4gICAgICAgICAgICAgIHJlZmVycmVyOiBtZXRhLnJlZmVycmVyLFxuICAgICAgICAgICAgICBicm93c2VyVmVyc2lvbjogbWV0YS5icm93c2VyLFxuICAgICAgICAgICAgICBvc1ZlcnNpb246IG1ldGEub3MsXG4gICAgICAgICAgICAgIHVzZXJBZ2VudDogbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7IGV2ZW50VHlwZXMgfSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViUmVxdWVzdEhhbmRsZXIge1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIgPSgpPT4gYXJncy5nZXRSZWNvcmRlcigpO1xuXG5cbiAgICAgICAgY29uc3QgdHJhY2tYTUxSZXEgPSB0aGlzLnRyYWNrWE1MUmVxO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgeG1sSHR0cFJlcVxuICAgICAgICAgKi9cblxuICAgICAgICBsZXQgb3BlbiA9IFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5vcGVuO1xuICAgICAgICAoPGFueT5YTUxIdHRwUmVxdWVzdCkucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbihtZXRob2Q6YW55LCB1cmw6c3RyaW5nLCBhc3luYzpib29sZWFuKSB7XG4gICAgICAgICAgICBsZXQgcmVxID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGQ6YW55KSB7XG4gICAgICAgICAgICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tYTUxSZXEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXEuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmNcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcGVuLmNhbGwodGhpcywgbWV0aG9kLCB1cmwsIGFzeW5jKTtcbiAgICAgICAgfTsgXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogIEZldGNoXG4gICAgICAgICAqL1xuICAgICAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVGZXRjaChwcm9taXNlOmFueSwgdXJsOlN0cmluZywgcGFyYW1zOmFueSkge1xuICAgICAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCBwcm9taXNlOyBcbiAgICAgICAgICAgIHRyYWNrWE1MUmVxKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3Auc3RhdHVzLFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IHBhcmFtcy5tZXRob2QgfHwgJ0dFVCcsXG4gICAgICAgICAgICAgICAgYXN5bmM6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgKDxhbnk+d2luZG93KS5fX2ZldGNoX18gPSB3aW5kb3cuZmV0Y2g7XG4gICAgICAgICg8YW55PndpbmRvdykuZmV0Y2ggPSh1cmw6U3RyaW5nLCBwYXJhbXM6YW55KT0+IHtcbiAgICAgICAgICAgIGxldCByZXEgPSAoPGFueT53aW5kb3cpLl9fZmV0Y2hfXyh1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICBoYW5kbGVGZXRjaChyZXEudGhlbigpLCB1cmwsIHBhcmFtcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJhY2tYTUxSZXEgPShhcmdzOmFueSk9PiB7XG4gICAgICAgIHRoaXMuZ2V0UmVjb3JkZXIoKS5nZW5lcmF0ZUV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMueG1sSHR0cFJlcSxcbiAgICAgICAgICAgIC4uLmFyZ3NcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBcbiAgICBldmVudFR5cGVzLCBcbiAgICBjb21tYW5kc1xufSBmcm9tICcuLi9Db25zdGFudHMvQ29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93RXZlbnRIYW5kbGVyIHtcblxuICAgIGN0cmxLZXlTdGF0dXM6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICByZXNpemVEZWJvdW5jZTogYW55O1xuXG4gICAgZ2V0UmVjb3JkZXI6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoYXJnczogYW55KSB7XG5cbiAgICAgICAgdGhpcy5nZXRSZWNvcmRlciA9KCk9PiBhcmdzLmdldFJlY29yZGVyKCk7XG5cbiAgICAgICAgY29uc3QgdHJhY2tXaW5kb3dDb21tYW5kID0oZTogYW55KT0+IHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gKGRvY3VtZW50LmFsbCkgPyAoPGFueT53aW5kb3cuZXZlbnQpLmtleUNvZGUgOiBlLndoaWNoOyBcbiAgICAgICAgICAgIGxldCBjbWQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDg2KSB7XG4gICAgICAgICAgICAgICAgY21kID0gY29tbWFuZHMuUEFTVEU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDY3KSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLkNPUFk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDgzKSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLlNBVkU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3RybEtleVN0YXR1cyAmJiBjb2RlID09IDY4KSB7IFxuICAgICAgICAgICAgICAgIGNtZCA9IGNvbW1hbmRzLkJPT0tNQVJLO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjbWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuZ2VuZXJhdGVFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50VHlwZXMuY29tbWFuZEV4ZWN1dGVkLFxuICAgICAgICAgICAgICAgICAgICBjbWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhY2tDdHJsID0oZTogYW55LCBpc0tleURvd246Qm9vbGVhbik9PiB7XG4gICAgICAgICAgICBsZXQgY29kZSA9IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuICAgICAgICAgICAgbGV0IGlzTWFjID0gKHRoaXMuZ2V0UmVjb3JkZXIoKS5vc3x8JycpLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5kZXhPZignbWFjJykgIT09IC0xO1xuICAgICAgICAgICAgaWYoKGNvZGUgPT09IDkxICYmIGlzTWFjKSB8fCAoIWlzTWFjICYmIGNvZGUgPT09IDE3KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3RybEtleVN0YXR1cyA9IGlzS2V5RG93bjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZT0+dHJhY2tDdHJsKGUsIHRydWUpLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZT0+dHJhY2tDdHJsKGUsIGZhbHNlKSwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhY2tXaW5kb3dDb21tYW5kLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudHJhY2tXaW5kb3dSZXNpemUoKTtcbiAgICAgICAgdGhpcy50cmFja0hhc2hDaGFuZ2UoKTtcbiAgICB9XG5cblxuICAgIHRyYWNrV2luZG93UmVzaXplID0oKT0+IHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplRGVib3VuY2UpO1xuICAgICAgICAgICAgdGhpcy5yZXNpemVEZWJvdW5jZSA9IHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLndpbmRvd1Jlc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxMZWZ0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tDb25zb2xlU3RhdHVzKHRydWUpO1xuICAgICAgICAgICAgfSwgNDAwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrQ29uc29sZVN0YXR1cyA9KGdlbmVyYXRlRXZlbnQ9ZmFsc2UpPT4ge1xuICAgICAgICBsZXQgZGV2dG9vbHM6IEZ1bmN0aW9uID0gZnVuY3Rpb24oKXt9O1xuICAgICAgICAoPGFueT5kZXZ0b29scykudG9TdHJpbmcgPSBmdW5jdGlvbigpIHsgdGhpcy5vcGVuZWQgPSB0cnVlIH1cbiAgICAgICAgY29uc29sZS5sb2coJyVjJywgZGV2dG9vbHMpO1xuXG4gICAgICAgIGxldCBwcmV2U3RhdHVzID0gdGhpcy5nZXRSZWNvcmRlcigpLmNvbnNvbGVTdGF0dXMgfHwgZmFsc2U7XG4gICAgICAgIGxldCBjdXJyZW50U3RhdHVzID0gKDxhbnk+ZGV2dG9vbHMpLm9wZW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0ID4gMTUwKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCA+IDE1MCkpO1xuICAgICAgICBpZihwcmV2U3RhdHVzICE9PSBjdXJyZW50U3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLmdldFJlY29yZGVyKCkuY29uc29sZVN0YXR1cyA9IGN1cnJlbnRTdGF0dXM7XG4gICAgICAgICAgICBpZihnZW5lcmF0ZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBldmVudFR5cGVzLmNvbnNvbGVTdGF0dXNDaGFuZ2VkLFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlU3RhdHVzOiB0aGlzLmdldFJlY29yZGVyKCkuY29uc29sZVN0YXR1cyxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIFxuXG4gICAgdHJhY2tIYXNoQ2hhbmdlID0oKT0+IHtcbiAgICAgICAgd2luZG93Lm9uaGFzaGNoYW5nZSA9ICgpPT4geyBcbiAgICAgICAgICAgIGxldCBldmVudDphbnkgPSB0aGlzLmdldFVSTERldGFpbHMoKTtcbiAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBldmVudFR5cGVzLmhhc2hDaGFuZ2VkO1xuICAgICAgICAgICAgdGhpcy5nZXRSZWNvcmRlcigpLmdlbmVyYXRlRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VVJMRGV0YWlscyA9KCk9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgICAgICBwcm90b2NvbDogd2luZG93LmxvY2F0aW9uLnByb3RvY29sLFxuICAgICAgICAgICAgaG9zdDogd2luZG93LmxvY2F0aW9uLmhvc3QsXG4gICAgICAgICAgICBob3N0bmFtZTogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLFxuICAgICAgICAgICAgcG9ydDogd2luZG93LmxvY2F0aW9uLnBvcnQsXG4gICAgICAgICAgICBwYXRobmFtZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgc2VhcmNoOiB3aW5kb3cubG9jYXRpb24uc2VhcmNoLFxuICAgICAgICAgICAgaGFzaDogd2luZG93LmxvY2F0aW9uLmhhc2gsXG4gICAgICAgICAgICBocmVmOiB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBSZWNvcmRlckhhbmRsZXIgZnJvbSAnLi9SZWNvcmRlckhhbmRsZXIvUmVjb3JkZXJIYW5kbGVyJztcblxuXG5jb25zdCBzdGFydEFSQz0oY2xpZW50SWQ6U3RyaW5nLCBhcHBJZDpTdHJpbmcpPT4ge1xuICAgIGNvbnNvbGUubG9nKCdSZWNvcmRlciBIYW5kbGVyIEluaXRpYXRlZCwgQ2xpZW50IElEJywgY2xpZW50SWQsICdBcHAgSUQnLCBhcHBJZClcbiAgICBuZXcgUmVjb3JkZXJIYW5kbGVyKHtjbGllbnRJZCwgYXBwSWR9KTtcbn1cblxuKDxhbnk+d2luZG93KS5zdGFydEFSQyA9IHN0YXJ0QVJDO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHN0YXJ0QVJDOyJdLCJzb3VyY2VSb290IjoiIn0=