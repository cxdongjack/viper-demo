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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/viperjs/dom.js
/*
 * selector
 */

/* exported $ */
function $(selector, $context) {
    return ($context === undefined ? document : $context).querySelector(selector);
}

/* exported $$ */
function $$(selector, $context) {
    return ($context === undefined ? document : $context).querySelectorAll(selector);
}

/* exported is */
function is($elem, selector) {
    return $elem.webkitMatchesSelector(selector);
}

/* exported closest */
function closest($elem, selector, $context) {
    for ( ; $elem && $elem !== $context; $elem = $elem.parentElement) {
        if (is($elem, selector)) {
            return $elem;
        }
    }

    return null;
}

/*
 * event
 */

/* exported on */
function on($elem, type, listener, useCapture) {
    $elem.addEventListener(type, listener, !!useCapture);
}

/* exported off */
function off($elem, type, listener, useCapture) {
    $elem.removeEventListener(type, listener, !!useCapture);
}

/* exported trigger */
function trigger($elem, type, data, noBubbles) {
    var event = document.createEvent('HTMLEvents');

    event.initEvent(type, !noBubbles, true);
    event.data = data;
    $elem.dispatchEvent(event);

    return event;
}

/*
 * classList
 */

/* exported hasClass */
function hasClass($elem, className) {
    return $elem.classList.contains(className);
}

/* exported addClass */
function addClass($elem, className) {
    $elem.classList.add(className);
}

/* exported removeClass */
function removeClass($elem, className) {
    $elem.classList.remove(className);
}

/* exported toggleClass */
function toggleClass($elem, className) {
    $elem.classList.toggle(className);
}

/*
 * utils
 */

var _dataStorageKey = 'domData' + ~~(Math.random() * 1e9),
    _dataStorage,
    _dataUid = 1;

/*
 *  把_dataStorage暴露到window上便于线上调试
 */
function _initDataStorage() {
    if (!_dataStorage) {
        _dataStorage = window[_dataStorageKey] = {};
    }
}

/* exported data */
function data($elem) {
    var uid = $elem == document ? 'document' : ($elem.dataset.domUid || ($elem.dataset.domUid = _dataUid++));

    _initDataStorage();

    return _dataStorage[uid] || (_dataStorage[uid] = {});
}

/* exported presetData */
function presetData(data) {
    var ret;

    _initDataStorage();
    _dataStorage[_dataUid] = data;
    ret = 'data-dom-uid="' + _dataUid++ + '"';

    if (data.__init__) {
        ret += ' data-dom-init="1"';
    }

    if (data.__del__) {
        ret += ' data-dom-del="1"';
    }

    return ret;
}

function _cleanData($elem) {
    var uid = $elem.dataset.domUid;

    if (uid && _dataStorage) {
        delete _dataStorage[uid];
    }
}

function _cleanChildrenData($elem) {
    var $$children = $$('*', $elem),
        i;

    for (i = 0; i < $$children.length; i++) {
        _cleanData($$children[i]);
    }
}

function _init($elem) {
    var data = data($elem),
        constructors = data.__init__,
        i;

    delete data.__init__;
    delete $elem.dataset.domInit;

    if (!constructors) {
        return;
    }

    for (i = 0; i < constructors.length; i++) {
        constructors[i]($elem);
    }
}

function _initChildren($$children) {
    var total = $$children.length,
        i;

    // 逆序初始化，保证子节点总是比父节点更早初始化
    for (i = total - 1; i >= 0; i--) {
        _init($$children[i]);
    }
}


/* exported onDestroy */
function onDestroy($elem, destructor) {
    var data = data($elem);

    data.__del__ = data.__del__ || [];
    data.__del__.push(destructor);
    $elem.dataset.domDel = 1;
}

function _destroy($elem) {
    var destructors = data($elem).__del__,
        i;

    if (!destructors) {
        return;
    }

    i = destructors.length;

    while (i--) {
        destructors[i]($elem);
    }
}

function _destroyChildren($elem) {
    var $$children = $$('[data-dom-del]', $elem),
        i = $$children.length;

    while (i--) {
        _destroy($$children[i]);
    }
}

/* exported remove */
function remove($elem) {
    // 删除所有nodeType的节点
    if ($elem.nodeType != 1) {
        return detach($elem);
    }

    _destroyChildren($elem);

    if ($elem.dataset.domDel) {
        _destroy($elem);
    }

    _cleanChildrenData($elem);
    _cleanData($elem);
    detach($elem);
}

/* exported detach */
function detach($elem) {
    if ($elem.parentNode) {
        $elem.parentNode.removeChild($elem);
    }
}

/* exported hide */
function hide($elem) {
    $elem.style.display = 'none';
}

/* exported show */
function show($elem) {
    $elem.style.display = '';
}

/* exported toggle */
function toggle($elem) {
    $elem.style.display = $elem.style.display == 'none' ? '' : 'none';
}

/* exported repaint */
function repaint($elem) {
    $elem.getBoundingClientRect();
}

/* exported inViewport */
function inViewport($elem, threshold, viewportRect) {
    var rect = $elem.getBoundingClientRect();

    threshold = threshold || {};

    threshold = Object__extend({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }, typeof threshold == 'number' ? {
        top: threshold,
        bottom: threshold,
        left: threshold,
        right: threshold,
    } : threshold);

    viewportRect = Object__extend({
        top: 0,
        bottom: window.innerHeight,
        left: 0,
        right: window.innerWidth,
    }, viewportRect);

    return  isVisible($elem) &&
            rect.width &&
            rect.height &&
            rect.bottom > viewportRect.top - threshold.top &&
            rect.right > viewportRect.left - threshold.left &&
            rect.top < viewportRect.bottom + threshold.bottom &&
            rect.left < viewportRect.right + threshold.right;
}

/* exported isHidden */
function isHidden($elem) {
    var style;

    for ( ; $elem; $elem = $elem.parentElement) {
        style = getComputedStyle($elem);

        if (style.display == 'none' || style.visibility == 'hidden' || style.opacity == 0) {
            return true;
        }
    }

    return false;
}

/* exported isVisible */
function isVisible($elem) {
    return !isHidden($elem);
}

/* exported getHtml */
function getHtml($elem) {
    return $elem.innerHTML;
}

/* exported setHtml */
function setHtml($elem, html) {
    var $$children;
    _destroyChildren($elem);
    _cleanChildrenData($elem);
    $elem.innerHTML = html;
    $$children = $$('[data-dom-init]', $elem);
    _initChildren($$children);
}

/* exported getText */
function getText($elem) {
    return $elem.textContent;
}

/* exported setText */
function setText($elem, text) {
    _destroyChildren($elem);
    _cleanChildrenData($elem);
    $elem.textContent = text;
}

function _buildFragment(html) {
    var $range = document.createRange();

    $range.selectNode(document.body);
    var $frag = $range.createContextualFragment(html);

    if ($frag.children) {
        return $frag;
    }

    // IOS 8，frag 的 children 是 undefined
    var div = document.createElement('div');
    div.appendChild($frag);
    return div;
}

/* exported prependHtml */
function prependHtml($elem, html) {
    var $fragment = _buildFragment(html),
        $$children = $$('[data-dom-init]', $fragment);

    $elem.insertBefore($fragment, $elem.firstChild);

    _initChildren($$children);
}

/* exported appendHtml */
function appendHtml($elem, html) {
    var $fragment = _buildFragment(html),
        $$children = $$('[data-dom-init]', $fragment);

    $elem.appendChild($fragment);

    _initChildren($$children);
}

/* exported insertHtmlBefore */
function insertHtmlBefore($elem, html) {
    var $fragment = _buildFragment(html),
        $$children = $$('[data-dom-init]', $fragment);

    $elem.parentNode.insertBefore($fragment, $elem);

    _initChildren($$children);
}

/* exported insertHtmlAfter */
function insertHtmlAfter($elem, html) {
    var $fragment = _buildFragment(html),
        $$children = $$('[data-dom-init]', $fragment);

    $elem.parentNode.insertBefore($fragment, $elem.nextSibling);

    _initChildren($$children);
}

// CONCATENATED MODULE: ./src/index.js


function sss() {var out='\
    <div>Hello webpack</div>\
';return out;}

function component() {
    return sss();
}

appendHtml(document.body, component());


/***/ })
/******/ ]);