PINF.bundle("", function(__require) {
	__require.memoize("/main.js", function (_require, _exports, _module) {
var bundle = { require: _require, exports: _exports, module: _module };
var exports = undefined;
var module = undefined;
var define = function (deps, init) {
_module.exports = init();
}; define.amd = true;
       var pmodule = bundle.module;

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mainModule = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function impl(domplate) {
  var T = domplate.tags;
  return {
    tag: T.SPAN({
      "class": "resource"
    }, "[$node|getValue]"),
    shortTag: T.SPAN({
      "class": "resource"
    }, "[$node|getValue]"),
    getValue: function getValue(node) {
      return node.value.toUpperCase();
    }
  };
}

function css() {
  return atob("CltfZGJpZD0iYzNhZGVjNjg4NzE4NTJhMGM3MGE0ZTlhY2Y0ZjFjOWVhMjEyZjg0MCJdIFNQQU4ucmVzb3VyY2UgewogICAgY29sb3I6IG5hdnk7Cn0K");
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
      res.parentNode.setAttribute("_dbid", "c3adec68871852a0c70a4e9acf4f1c9ea212f840");
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