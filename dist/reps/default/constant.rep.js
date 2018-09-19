PINF.bundle("", function(__require) {
	__require.memoize("/main.js", function (_require, _exports, _module) {
var bundle = { require: _require, exports: _exports, module: _module };
var exports = undefined;
var module = undefined;
var define = function (deps, init) {
_module.exports = init();
}; define.amd = true;
       var pmodule = bundle.module;

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mainModule = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function impl(domplate) {

            var T = domplate.tags;

            return {

                        tag: T.SPAN({ "class": "constant" }, "$node.value"),

                        shortTag: T.SPAN({ "class": "constant" }, "$node.value")

            };
}
function css() {
            return atob("CltfZGJpZD0iZGFlNWZmNDViYjcyMmY2NmQ1OGYyNTQ5NGU3Njg4MzhiZDE2ZTlkOCJdIFNQQU4uY29uc3RhbnQgewogICAgY29sb3I6ICMwMDAwRkY7Cn0K");
}
exports.main = function (options) {
            options = options || {};
            var domplate = window.domplate;
            var rep = impl(domplate);
            rep.__dom = "%%DOM%%";
            rep.__markup = "%%MARKUP%%";
            var res = domplate.domplate(rep);
            var renderedCss = false;
            Object.keys(rep).forEach(function (tagName) {
                        if (!rep[tagName].tag) return;
                        var replace_orig = res[tagName].replace;
                        res[tagName].replace = function () {
                                    var res = replace_orig.apply(this, arguments);
                                    if (!res) return;
                                    if (renderedCss) return;
                                    renderedCss = true;
                                    res.parentNode.setAttribute("_dbid", "dae5ff45bb722f66d58f25494e768838bd16e9d8");
                                    var node = document.createElement("style");
                                    var cssCode = css();
                                    if (options.cssBaseUrl) {
                                                cssCode = cssCode.replace(/(url\s*\()([^\)]+\))/g, "$1" + options.cssBaseUrl + "$2");
                                    }
                                    node.innerHTML = cssCode;
                                    document.body.appendChild(node);
                                    return res;
                        };
            });
            return res;
};
},{}]},{},[1])(1)
});
	});
});