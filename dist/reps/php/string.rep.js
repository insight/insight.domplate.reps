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
    VAR_wrapped: false,
    tag: T.SPAN({
      "class": "string",
      "wrapped": "$node.wrapped"
    }, T.IF("$node.wrapped", "'"), T.FOR("line", "$node|getValue", "$line.value", T.IF("$line.special", T.SPAN({
      "class": "special"
    }, "$line.specialvalue")), T.IF("$line.more", T.BR()), T.IF("$line.trimmed", T.TAG("$node|getTrimmedTag", {
      "node": "$node"
    }))), T.IF("$node.wrapped", "'")),
    shortTag: T.SPAN({
      "class": "string",
      "wrapped": "$node.wrapped"
    }, T.IF("$node.wrapped", "'"), T.FOR("line", "$node|getShortValue", "$line.value", T.IF("$line.special", T.SPAN({
      "class": "special"
    }, "$line.specialvalue")), T.IF("$line.more", T.BR()), T.IF("$line.trimmed", T.TAG("$node|getTrimmedTag", {
      "node": "$node"
    }))), T.IF("$node.wrapped", "'")),
    trimmedNoticeTag: T.SPAN({
      "class": "trimmed"
    }, "$node|getNotice"),
    getNotice: function getNotice(node) {
      return node.meta["encoder.notice"];
    },
    getTrimmedTag: function getTrimmedTag() {
      return this.trimmedNoticeTag;
    },
    getValue: function getValue(node) {
      var parts = node.value.split("\\n");
      var lines = [];

      for (var i = 0, c = parts.length; i < c; i++) {
        lines.push({
          "value": parts[i],
          "more": i < c - 1 ? true : false,
          "special": false
        });
      }

      if (node.meta["encoder.trimmed"] && node.meta["encoder.notice"]) {
        lines.push({
          "value": "",
          "trimmed": true
        });
      }

      return lines;
    },
    getShortValue: function getShortValue(node) {
      var trimEnabled = true;
      var trimLength = 50;
      var trimNewlines = true;
      var meta = typeof node.getObjectGraph === "function" ? node.getObjectGraph().getMeta() : null;

      if (meta) {
        if (!node.parentNode) {
          if (typeof meta["string.trim.enabled"] == "undefined" || !meta["string.trim.enabled"]) {
            trimLength = 500;
          }
        }

        if (typeof meta["string.trim.enabled"] != "undefined") {
          trimEnabled = meta["string.trim.enabled"];
        }

        if (typeof meta["string.trim.length"] != "undefined" && meta["string.trim.length"] >= 5) {
          trimLength = meta["string.trim.length"];
        }

        if (typeof meta["string.trim.newlines"] != "undefined") {
          trimNewlines = meta["string.trim.newlines"];
        }
      }

      var str = node.value;

      if (trimEnabled) {
        if (trimLength > -1) {
          str = this._cropString(str, trimLength);
        }

        if (trimNewlines) {
          str = this._escapeNewLines(str);
        }
      }

      var parts = str.split("\\n");
      var lines = [],
          parts2;

      for (var i = 0, ci = parts.length; i < ci; i++) {
        parts2 = parts[i].split("|:_!_:|");

        for (var j = 0, cj = parts2.length; j < cj; j++) {
          if (parts2[j] == "STRING_CROP") {
            lines.push({
              "value": "",
              "more": false,
              "special": true,
              "specialvalue": "..."
            });
          } else if (parts2[j] == "STRING_NEWLINE") {
            lines.push({
              "value": "",
              "more": false,
              "special": true,
              "specialvalue": "\\\n"
            });
          } else {
            lines.push({
              "value": parts2[j],
              "more": i < ci - 1 && j == cj - 1 ? true : false
            });
          }
        }
      }

      if (node.meta["encoder.trimmed"] && node.meta["encoder.notice"]) {
        lines.push({
          "value": "",
          "trimmed": true
        });
      }

      return lines;
    },
    _cropString: function _cropString(value, limit) {
      limit = limit || 50;

      if (value.length > limit) {
        return value.substr(0, limit / 2) + "|:_!_:|STRING_CROP|:_!_:|" + value.substr(value.length - limit / 2);
      } else {
        return value;
      }
    },
    _escapeNewLines: function _escapeNewLines(value) {
      return ("" + value).replace(/\r/g, "\\r").replace(/\\n/g, "|:_!_:|STRING_NEWLINE|:_!_:|");
    }
  };
}

function css() {
  return atob("CltfZGJpZD0iNjg1ZjViZWQzYjVkNjZlNzU2ZDE4YzNjYTEwNDAyMjgzYzI1ZWViMyJdIFNQQU4ubnVsbCB7CiAgICBjb2xvcjogbmF2eTsKfQoKW19kYmlkPSI2ODVmNWJlZDNiNWQ2NmU3NTZkMThjM2NhMTA0MDIyODNjMjVlZWIzIl0gU1BBTi5zdHJpbmcgewogICAgY29sb3I6IGJsYWNrOwp9CgpbX2RiaWQ9IjY4NWY1YmVkM2I1ZDY2ZTc1NmQxOGMzY2ExMDQwMjI4M2MyNWVlYjMiXSBTUEFOLnN0cmluZ1t3cmFwcGVkPXRydWVdIHsKICAgIGNvbG9yOiByZWQ7Cn0KCltfZGJpZD0iNjg1ZjViZWQzYjVkNjZlNzU2ZDE4YzNjYTEwNDAyMjgzYzI1ZWViMyJdIFNQQU4uc3RyaW5nID4gU1BBTi5zcGVjaWFsIHsKICAgIGNvbG9yOiBncmF5OwogICAgZm9udC13ZWlnaHQ6IGJvbGQ7CiAgICBwYWRkaW5nLWxlZnQ6IDNweDsKICAgIHBhZGRpbmctcmlnaHQ6IDNweDsKfQoKW19kYmlkPSI2ODVmNWJlZDNiNWQ2NmU3NTZkMThjM2NhMTA0MDIyODNjMjVlZWIzIl0gU1BBTi5zdHJpbmcgPiBTUEFOLnRyaW1tZWQgewogICAgY29sb3I6ICNGRkZGRkY7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlOwogICAgcGFkZGluZy1sZWZ0OiA1cHg7CiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7CiAgICBtYXJnaW4tbGVmdDogNXB4Owp9Cg==");
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
      res.parentNode.setAttribute("_dbid", "685f5bed3b5d66e756d18c3ca10402283c25eeb3");
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