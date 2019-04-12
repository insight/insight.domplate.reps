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


function impl(domplate) {
  var T = domplate.tags;
  return {
    tag: T.DIV({
      "class": "viewer-harness"
    }, T.TAG("$context,$node|_getTag", {
      "node": "$node"
    })),
    _getTag: function _getTag(context, node) {
      var rep = context.repForNode(node);
      return rep.tag;
    }
  };
}

function css() {
  return atob("CltfZGJpZD0iOTczNTdjZTIyOTE3OWI5M2U5NGRlOWY4NjM4ZmQ5YzRjMDA4ZTM4MyJdIERJVi52aWV3ZXItaGFybmVzcyB7CiAgICBwYWRkaW5nOiAycHggNHB4IDFweCA2cHg7CiAgICBmb250LWZhbWlseTogTHVjaWRhIEdyYW5kZSwgVGFob21hLCBzYW5zLXNlcmlmOwogICAgZm9udC1zaXplOiAxMXB4Owp9Cg==");
}

exports.main = function (options) {
  options = options || {};
  var domplate = window.domplate;
  var rep = impl(domplate);
  rep.__dom = {
"tag":function (context) {
var DomplateDebug = context.DomplateDebug;
var __path__ = context.__path__;
var __bind__ = context.__bind__;
var __if__ = context.__if__;
var __link__ = context.__link__;
var __loop__ = context.__loop__;
return (function (root, context, o, d0, d1) {  DomplateDebug.startGroup([' .. Run DOM .. ','div'],arguments);  DomplateDebug.logJs('js','(function (root, context, o, d0, d1) {  DomplateDebug.startGroup([\' .. Run DOM .. \',\'div\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  var e0 = 0;  with (this) {        node = __path__(root, o,0);        e0 = __link__(node, d0, d1);  }  DomplateDebug.endGroup();  return 1;})');  var e0 = 0;  with (this) {        node = __path__(root, o,0);        e0 = __link__(node, d0, d1);  }  DomplateDebug.endGroup();  return 1;})
}
};
  rep.__markup = {
"tag":function (context) {
var DomplateDebug = context.DomplateDebug;
var __escape__ = context.__escape__;
var __if__ = context.__if__;
var __loop__ = context.__loop__;
var __link__ = context.__link__;
return (function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([' .. Run Markup .. ','div'],arguments);  DomplateDebug.logJs('js','(function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([\' .. Run Markup .. \',\'div\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  with (this) {  with (__in__) {    __code__.push("","<div", " class=\"","viewer-harness", " ", "\"",">");__link__(_getTag(context,node), __code__, __out__, {"node":node});    __code__.push("","</div>");  }DomplateDebug.endGroup();}})');  with (this) {  with (__in__) {    __code__.push("","<div", " class=\"","viewer-harness", " ", "\"",">");__link__(_getTag(context,node), __code__, __out__, {"node":node});    __code__.push("","</div>");  }DomplateDebug.endGroup();}})
}
};
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
      res.parentNode.setAttribute("_dbid", "97357ce229179b93e94de9f8638fd9c4c008e383");
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