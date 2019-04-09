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
    VAR_label: "map",
    CONST_Normal: "tag",
    CONST_Short: "shortTag",
    tag: T.SPAN({
      "class": "map",
      "_nodeObject": "$node"
    }, T.SPAN("$VAR_label("), T.FOR("pair", "$context,$node,$CONST_Normal|mapIterator", T.DIV({
      "class": "pair"
    }, T.TAG("$pair.key.tag", {
      "node": "$pair.key.node"
    }), T.SPAN({
      "class": "delimiter"
    }, "=>"), T.SPAN({
      "class": "value",
      "onclick": "$onClick",
      "_nodeObject": "$pair.value.node",
      "_expandable": "$pair.value.expandable"
    }, T.TAG("$pair.value.tag", {
      "node": "$pair.value.node"
    })), T.IF("$pair.more", T.SPAN({
      "class": "separator"
    }, ",")))), T.SPAN(")")),
    shortTag: T.SPAN({
      "class": "map",
      "_nodeObject": "$node"
    }, T.SPAN("$VAR_label("), T.FOR("pair", "$context,$node,$CONST_Short|mapIterator", T.SPAN({
      "class": "pair"
    }, T.TAG("$pair.key.tag", {
      "node": "$pair.key.node"
    }), T.SPAN({
      "class": "delimiter"
    }, "=>"), T.SPAN({
      "class": "value",
      "onclick": "$onClick",
      "_nodeObject": "$pair.value.node",
      "_expandable": "$pair.value.expandable"
    }, T.TAG("$pair.value.tag", {
      "node": "$pair.value.node"
    })), T.IF("$pair.more", T.SPAN({
      "class": "separator"
    }, ",")))), T.SPAN(")")),
    collapsedTag: T.SPAN({
      "class": "map"
    }, T.SPAN("$VAR_label("), T.SPAN({
      "class": "collapsed"
    }, "... $node|getItemCount ..."), T.SPAN(")")),
    moreTag: T.SPAN(" ... "),
    getItemCount: function getItemCount(node) {
      if (!node.value) return 0;
      return node.value.length;
    },
    onClick: function onClick(event) {
      var row = domplate.util.getAncestorByClass(event.target, "value");

      if (row.expandable) {
        this.toggleRow(row);
      }

      event.stopPropagation();
    },
    isCollapsible: function isCollapsible(node) {
      return node.type == "reference" || node.type == "dictionary" || node.type == "map" || node.type == "array";
    },
    getTag: function getTag(rep, type, node) {
      if (node.meta && node.meta.collapsed) {
        if (this.isCollapsible(node)) {
          type = "collapsedTag";
        } else {
          type = "shortTag";
        }
      }

      if (typeof rep[type] === "undefined") {
        if (type == "shortTag") {
          return rep.tag;
        }

        throw new Error("Rep does not have tag of type: " + type);
      }

      return rep[type];
    },
    toggleRow: function toggleRow(row) {
      var node = null;

      if (domplate.util.hasClass(row, "expanded")) {
        node = this.collapsedTag.replace({
          "node": row.nodeObject
        }, row);
        domplate.util.removeClass(row, "expanded");
      } else {
        var valueRep = helpers.getTemplateForNode(row.nodeObject).tag;
        node = valueRep.replace({
          "node": row.nodeObject
        }, row);
        domplate.util.setClass(row, "expanded");
      }
    },
    mapIterator: function mapIterator(context, node, type) {
      var pairs = [];
      if (!node.value) return pairs;

      for (var i = 0; i < node.value.length; i++) {
        var valueRep = this.getTag(context.repForNode(node.value[i][1]), type, node.value[i][1]);

        if (i > 2 && type == this.CONST_Short) {
          valueRep = this.moreTag;
        }

        pairs.push({
          "key": {
            "tag": this.getTag(context.repForNode(node.value[i][0]), type, node.value[i][0]),
            "node": domplate.util.merge(node.value[i][0], {
              "wrapped": true
            })
          },
          "value": {
            "tag": valueRep,
            "node": domplate.util.merge(node.value[i][1], {
              "wrapped": true
            }),
            "expandable": this.isCollapsible(node.value[i][1])
          },
          "more": i < node.value.length - 1
        });

        if (i > 2 && type == this.CONST_Short) {
          pairs[pairs.length - 1].more = false;
          break;
        }
      }

      return pairs;
    }
  };
}

function css() {
  return atob("CltfZGJpZD0iNDZiZWUzZmVmNmZjNDcxYTRmMjk4NDQ0ZDMxOTc2ODNhZmQ3ZWQxYiJdIFNQQU4ubWFwID4gU1BBTiB7CiAgICBjb2xvcjogIzlDOUM5QzsKICAgIGZvbnQtd2VpZ2h0OiBib2xkOwp9CgpbX2RiaWQ9IjQ2YmVlM2ZlZjZmYzQ3MWE0ZjI5ODQ0NGQzMTk3NjgzYWZkN2VkMWIiXSBTUEFOLm1hcCA+IERJVi5wYWlyIHsKICAgIGRpc3BsYXk6IGJsb2NrOwogICAgcGFkZGluZy1sZWZ0OiAyMHB4Owp9CgpbX2RiaWQ9IjQ2YmVlM2ZlZjZmYzQ3MWE0ZjI5ODQ0NGQzMTk3NjgzYWZkN2VkMWIiXSBTUEFOLm1hcCA+IFNQQU4ucGFpciB7CiAgICBwYWRkaW5nLWxlZnQ6IDJweDsKfQoKW19kYmlkPSI0NmJlZTNmZWY2ZmM0NzFhNGYyOTg0NDRkMzE5NzY4M2FmZDdlZDFiIl0gU1BBTi5tYXAgPiAucGFpciA+IFNQQU4uZGVsaW1pdGVyLApbX2RiaWQ9IjQ2YmVlM2ZlZjZmYzQ3MWE0ZjI5ODQ0NGQzMTk3NjgzYWZkN2VkMWIiXSBTUEFOLm1hcCA+IC5wYWlyID4gU1BBTi5zZXBhcmF0b3IgewogICAgY29sb3I6ICM5QzlDOUM7CiAgICBwYWRkaW5nLWxlZnQ6IDJweDsKICAgIHBhZGRpbmctcmlnaHQ6IDJweDsKfQo=");
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
return (function (root, context, o, d0, d1) {  DomplateDebug.startGroup([' .. Run DOM .. ','span'],arguments);  DomplateDebug.logJs('js','(function (root, context, o, d0, d1) {  DomplateDebug.startGroup([\' .. Run DOM .. \',\'span\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  var l0 = 0;  var if_0 = 0;  var e0 = 0;  var e1 = 0;  with (this) {        node = __path__(root, o);node.nodeObject = d0;      l0 = __loop__.apply(this, [d1, function(i0,l0,d0,d1,d2,d3,d4,d5,d6,d7) {       DomplateDebug.logVar(\'  .. i0 (counterName)\',i0);       DomplateDebug.logVar(\'  .. l0 (loopName)\',l0);        node = __path__(root, o,0+1+l0+0,0);        e0 = __link__(node, d0, d1);        node = __path__(root, o,0+1+l0+0,0+e0+1);node.addEventListener("click", __bind__(this, d2), false);node.nodeObject = d3;node.expandable = d4;        node = __path__(root, o,0+1+l0+0,0+e0+1,0);        e1 = __link__(node, d5, d6);      if_0 = __if__.apply(this, [d7, function(if_0) {       DomplateDebug.logVar(\'  .. d0\',d0);       DomplateDebug.logVar(\'  .. if_0 (ifName)\',if_0);      }]);        return 0+1;      }]);  }  DomplateDebug.endGroup();  return 1;})');  var l0 = 0;  var if_0 = 0;  var e0 = 0;  var e1 = 0;  with (this) {        node = __path__(root, o);node.nodeObject = d0;      l0 = __loop__.apply(this, [d1, function(i0,l0,d0,d1,d2,d3,d4,d5,d6,d7) {       DomplateDebug.logVar('  .. i0 (counterName)',i0);       DomplateDebug.logVar('  .. l0 (loopName)',l0);        node = __path__(root, o,0+1+l0+0,0);        e0 = __link__(node, d0, d1);        node = __path__(root, o,0+1+l0+0,0+e0+1);node.addEventListener("click", __bind__(this, d2), false);node.nodeObject = d3;node.expandable = d4;        node = __path__(root, o,0+1+l0+0,0+e0+1,0);        e1 = __link__(node, d5, d6);      if_0 = __if__.apply(this, [d7, function(if_0) {       DomplateDebug.logVar('  .. d0',d0);       DomplateDebug.logVar('  .. if_0 (ifName)',if_0);      }]);        return 0+1;      }]);  }  DomplateDebug.endGroup();  return 1;})
}
,
"shortTag":function (context) {
var DomplateDebug = context.DomplateDebug;
var __path__ = context.__path__;
var __bind__ = context.__bind__;
var __if__ = context.__if__;
var __link__ = context.__link__;
var __loop__ = context.__loop__;
return (function (root, context, o, d0, d1) {  DomplateDebug.startGroup([' .. Run DOM .. ','span'],arguments);  DomplateDebug.logJs('js','(function (root, context, o, d0, d1) {  DomplateDebug.startGroup([\' .. Run DOM .. \',\'span\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  var l0 = 0;  var if_0 = 0;  var e0 = 0;  var e1 = 0;  with (this) {        node = __path__(root, o);node.nodeObject = d0;      l0 = __loop__.apply(this, [d1, function(i0,l0,d0,d1,d2,d3,d4,d5,d6,d7) {       DomplateDebug.logVar(\'  .. i0 (counterName)\',i0);       DomplateDebug.logVar(\'  .. l0 (loopName)\',l0);        node = __path__(root, o,0+1+l0+0,0);        e0 = __link__(node, d0, d1);        node = __path__(root, o,0+1+l0+0,0+e0+1);node.addEventListener("click", __bind__(this, d2), false);node.nodeObject = d3;node.expandable = d4;        node = __path__(root, o,0+1+l0+0,0+e0+1,0);        e1 = __link__(node, d5, d6);      if_0 = __if__.apply(this, [d7, function(if_0) {       DomplateDebug.logVar(\'  .. d0\',d0);       DomplateDebug.logVar(\'  .. if_0 (ifName)\',if_0);      }]);        return 0+1;      }]);  }  DomplateDebug.endGroup();  return 1;})');  var l0 = 0;  var if_0 = 0;  var e0 = 0;  var e1 = 0;  with (this) {        node = __path__(root, o);node.nodeObject = d0;      l0 = __loop__.apply(this, [d1, function(i0,l0,d0,d1,d2,d3,d4,d5,d6,d7) {       DomplateDebug.logVar('  .. i0 (counterName)',i0);       DomplateDebug.logVar('  .. l0 (loopName)',l0);        node = __path__(root, o,0+1+l0+0,0);        e0 = __link__(node, d0, d1);        node = __path__(root, o,0+1+l0+0,0+e0+1);node.addEventListener("click", __bind__(this, d2), false);node.nodeObject = d3;node.expandable = d4;        node = __path__(root, o,0+1+l0+0,0+e0+1,0);        e1 = __link__(node, d5, d6);      if_0 = __if__.apply(this, [d7, function(if_0) {       DomplateDebug.logVar('  .. d0',d0);       DomplateDebug.logVar('  .. if_0 (ifName)',if_0);      }]);        return 0+1;      }]);  }  DomplateDebug.endGroup();  return 1;})
}
,
"collapsedTag":function (context) {
var DomplateDebug = context.DomplateDebug;
var __path__ = context.__path__;
var __bind__ = context.__bind__;
var __if__ = context.__if__;
var __link__ = context.__link__;
var __loop__ = context.__loop__;
return (function (root, context, o) {  DomplateDebug.startGroup([' .. Run DOM .. ','span'],arguments);  DomplateDebug.logJs('js','(function (root, context, o) {  DomplateDebug.startGroup([\' .. Run DOM .. \',\'span\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  with (this) {  }  DomplateDebug.endGroup();  return 1;})');  with (this) {  }  DomplateDebug.endGroup();  return 1;})
}
,
"moreTag":function (context) {
var DomplateDebug = context.DomplateDebug;
var __path__ = context.__path__;
var __bind__ = context.__bind__;
var __if__ = context.__if__;
var __link__ = context.__link__;
var __loop__ = context.__loop__;
return (function (root, context, o) {  DomplateDebug.startGroup([' .. Run DOM .. ','span'],arguments);  DomplateDebug.logJs('js','(function (root, context, o) {  DomplateDebug.startGroup([\' .. Run DOM .. \',\'span\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  with (this) {  }  DomplateDebug.endGroup();  return 1;})');  with (this) {  }  DomplateDebug.endGroup();  return 1;})
}
};
  rep.__markup = {
"tag":function (context) {
var DomplateDebug = context.DomplateDebug;
var __escape__ = context.__escape__;
var __if__ = context.__if__;
var __loop__ = context.__loop__;
var __link__ = context.__link__;
return (function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([' .. Run Markup .. ','span'],arguments);  DomplateDebug.logJs('js','(function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([\' .. Run Markup .. \',\'span\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  with (this) {  with (__in__) {    __code__.push("","<span", " class=\"","map", " ", "\"",">","<span", " class=\"", " ", "\"",">",__escape__(VAR_label),"(","</span>");__out__.push(node);    __loop__.apply(this, [mapIterator(context,node,CONST_Normal), __out__, function(pair, __out__) {    __code__.push("","<div", " class=\"","pair", " ", "\"",">");__link__(pair.key.tag, __code__, __out__, {"node":pair.key.node});    __code__.push("","<span", " class=\"","delimiter", " ", "\"",">","=>","</span>","<span", " class=\"","value", " ", "\"",">");__out__.push(onClick,pair.value.node,pair.value.expandable);__link__(pair.value.tag, __code__, __out__, {"node":pair.value.node});    __code__.push("","</span>");__if__.apply(this, [pair.more, __out__, function(__out__) {    __code__.push("","<span", " class=\"","separator", " ", "\"",">",",","</span>");}]);    __code__.push("","</div>");    }]);    __code__.push("","<span", " class=\"", " ", "\"",">",")","</span>","</span>");  }DomplateDebug.endGroup();}})');  with (this) {  with (__in__) {    __code__.push("","<span", " class=\"","map", " ", "\"",">","<span", " class=\"", " ", "\"",">",__escape__(VAR_label),"(","</span>");__out__.push(node);    __loop__.apply(this, [mapIterator(context,node,CONST_Normal), __out__, function(pair, __out__) {    __code__.push("","<div", " class=\"","pair", " ", "\"",">");__link__(pair.key.tag, __code__, __out__, {"node":pair.key.node});    __code__.push("","<span", " class=\"","delimiter", " ", "\"",">","=>","</span>","<span", " class=\"","value", " ", "\"",">");__out__.push(onClick,pair.value.node,pair.value.expandable);__link__(pair.value.tag, __code__, __out__, {"node":pair.value.node});    __code__.push("","</span>");__if__.apply(this, [pair.more, __out__, function(__out__) {    __code__.push("","<span", " class=\"","separator", " ", "\"",">",",","</span>");}]);    __code__.push("","</div>");    }]);    __code__.push("","<span", " class=\"", " ", "\"",">",")","</span>","</span>");  }DomplateDebug.endGroup();}})
}
,
"shortTag":function (context) {
var DomplateDebug = context.DomplateDebug;
var __escape__ = context.__escape__;
var __if__ = context.__if__;
var __loop__ = context.__loop__;
var __link__ = context.__link__;
return (function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([' .. Run Markup .. ','span'],arguments);  DomplateDebug.logJs('js','(function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([\' .. Run Markup .. \',\'span\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  with (this) {  with (__in__) {    __code__.push("","<span", " class=\"","map", " ", "\"",">","<span", " class=\"", " ", "\"",">",__escape__(VAR_label),"(","</span>");__out__.push(node);    __loop__.apply(this, [mapIterator(context,node,CONST_Short), __out__, function(pair, __out__) {    __code__.push("","<span", " class=\"","pair", " ", "\"",">");__link__(pair.key.tag, __code__, __out__, {"node":pair.key.node});    __code__.push("","<span", " class=\"","delimiter", " ", "\"",">","=>","</span>","<span", " class=\"","value", " ", "\"",">");__out__.push(onClick,pair.value.node,pair.value.expandable);__link__(pair.value.tag, __code__, __out__, {"node":pair.value.node});    __code__.push("","</span>");__if__.apply(this, [pair.more, __out__, function(__out__) {    __code__.push("","<span", " class=\"","separator", " ", "\"",">",",","</span>");}]);    __code__.push("","</span>");    }]);    __code__.push("","<span", " class=\"", " ", "\"",">",")","</span>","</span>");  }DomplateDebug.endGroup();}})');  with (this) {  with (__in__) {    __code__.push("","<span", " class=\"","map", " ", "\"",">","<span", " class=\"", " ", "\"",">",__escape__(VAR_label),"(","</span>");__out__.push(node);    __loop__.apply(this, [mapIterator(context,node,CONST_Short), __out__, function(pair, __out__) {    __code__.push("","<span", " class=\"","pair", " ", "\"",">");__link__(pair.key.tag, __code__, __out__, {"node":pair.key.node});    __code__.push("","<span", " class=\"","delimiter", " ", "\"",">","=>","</span>","<span", " class=\"","value", " ", "\"",">");__out__.push(onClick,pair.value.node,pair.value.expandable);__link__(pair.value.tag, __code__, __out__, {"node":pair.value.node});    __code__.push("","</span>");__if__.apply(this, [pair.more, __out__, function(__out__) {    __code__.push("","<span", " class=\"","separator", " ", "\"",">",",","</span>");}]);    __code__.push("","</span>");    }]);    __code__.push("","<span", " class=\"", " ", "\"",">",")","</span>","</span>");  }DomplateDebug.endGroup();}})
}
,
"collapsedTag":function (context) {
var DomplateDebug = context.DomplateDebug;
var __escape__ = context.__escape__;
var __if__ = context.__if__;
var __loop__ = context.__loop__;
var __link__ = context.__link__;
return (function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([' .. Run Markup .. ','span'],arguments);  DomplateDebug.logJs('js','(function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([\' .. Run Markup .. \',\'span\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  with (this) {  with (__in__) {    __code__.push("","<span", " class=\"","map", " ", "\"",">","<span", " class=\"", " ", "\"",">",__escape__(VAR_label),"(","</span>","<span", " class=\"","collapsed", " ", "\"",">","... ",__escape__(getItemCount(node))," ...","</span>","<span", " class=\"", " ", "\"",">",")","</span>","</span>");  }DomplateDebug.endGroup();}})');  with (this) {  with (__in__) {    __code__.push("","<span", " class=\"","map", " ", "\"",">","<span", " class=\"", " ", "\"",">",__escape__(VAR_label),"(","</span>","<span", " class=\"","collapsed", " ", "\"",">","... ",__escape__(getItemCount(node))," ...","</span>","<span", " class=\"", " ", "\"",">",")","</span>","</span>");  }DomplateDebug.endGroup();}})
}
,
"moreTag":function (context) {
var DomplateDebug = context.DomplateDebug;
var __escape__ = context.__escape__;
var __if__ = context.__if__;
var __loop__ = context.__loop__;
var __link__ = context.__link__;
return (function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([' .. Run Markup .. ','span'],arguments);  DomplateDebug.logJs('js','(function (__code__, __context__, __in__, __out__) {  DomplateDebug.startGroup([\' .. Run Markup .. \',\'span\'],arguments);  DomplateDebug.logJs(\'js\',\'__SELF__JS__\');  with (this) {  with (__in__) {    __code__.push("","<span", " class=\"", " ", "\"",">"," ... ","</span>");  }DomplateDebug.endGroup();}})');  with (this) {  with (__in__) {    __code__.push("","<span", " class=\"", " ", "\"",">"," ... ","</span>");  }DomplateDebug.endGroup();}})
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
      res.parentNode.setAttribute("_dbid", "46bee3fef6fc471a4f298444d3197683afd7ed1b");
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