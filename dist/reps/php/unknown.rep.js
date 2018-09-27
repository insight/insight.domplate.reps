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

        tag: T.DIV({ "class": "unknown" }, "UNKNOWN EXPANDED"),

        collapsedTag: T.DIV({ "class": "unknown" }, "UNKNOWN COLLAPSED"),

        shortTag: T.DIV({ "class": "unknown" }, "UNKNOWN SHORT")

    };
}
function css() {
    return atob("CltfZGJpZD0iMDI4ZDk5NGJjNzAyYzMwY2MzNDgwYjdhYzEzMDI4OTcxNWNjNTM2ZSJdIERJVi51bmtub3duIHsKICAgIGNvbG9yOiAjRkZGRkZGOwogICAgYmFja2dyb3VuZC1jb2xvcjogcmVkOwp9Cg==");
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
            res.parentNode.setAttribute("_dbid", "028d994bc702c30cc3480b7ac130289715cc536e");
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