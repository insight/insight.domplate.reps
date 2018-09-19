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

        VAR_label: "array",

        CONST_Normal: "tag",
        CONST_Short: "shortTag",
        CONST_Collapsed: "collapsedTag",

        tag: T.SPAN({ "class": "array" }, T.SPAN("$VAR_label("), T.FOR("element", "$context,$node,$CONST_Normal|elementIterator", T.DIV({ "class": "element", "$expandable": "$element.expandable", "_elementObject": "$element", "onclick": "$onClick" }, T.SPAN({ "class": "value" }, T.TAG("$element.tag", { "element": "$element", "node": "$element.node" })), T.IF("$element.more", T.SPAN({ "class": "separator" }, ",")))), T.SPAN(")")),

        collapsedTag: T.SPAN({ "class": "array" }, T.SPAN("$VAR_label("), T.SPAN({ "class": "collapsed" }, "... $node|getElementCount ..."), T.SPAN(")")),

        shortTag: T.SPAN({ "class": "array" }, T.SPAN("$VAR_label("), T.FOR("element", "$context,$node,$CONST_Short|elementIterator", T.SPAN({ "class": "element" }, T.SPAN({ "class": "value" }, T.TAG("$element.tag", { "element": "$element", "node": "$element.node" })), T.IF("$element.more", T.SPAN({ "class": "separator" }, ",")))), T.SPAN(")")),

        expandableStub: T.TAG("$context,$element,$CONST_Collapsed|getTag", { "node": "$element.node" }),

        expandedStub: T.TAG("$tag", { "node": "$node", "element": "$element" }),

        moreTag: T.SPAN(" ... "),

        getElementCount: function getElementCount(node) {
            if (!node.value) return 0;
            return node.value.length || 0;
        },

        getTag: function getTag(context, element, type) {
            if (type === this.CONST_Short) {
                return context.repForNode(element.node).shortTag;
            } else if (type === this.CONST_Normal) {
                if (element.expandable) {
                    return this.expandableStub;
                } else {
                    return context.repForNode(element.node).tag;
                }
            } else if (type === this.CONST_Collapsed) {
                var rep = context.repForNode(element.node);
                if (typeof rep.collapsedTag === "undefined") {
                    throw "no 'collapsedTag' property in rep: " + rep.toString();
                }
                return rep.collapsedTag;
            }
        },

        elementIterator: function elementIterator(context, node, type) {
            var elements = [];
            if (!node.value) return elements;
            for (var i = 0; i < node.value.length; i++) {

                var element = {
                    "node": domplate.util.merge(node.value[i], { "wrapped": true }),
                    "more": i < node.value.length - 1,
                    "expandable": this.isExpandable(node.value[i])
                };

                if (i > 2 && type == this.CONST_Short) {
                    element["tag"] = this.moreTag;
                } else {
                    element["tag"] = this.getTag(context, element, type);
                }

                elements.push(element);

                if (i > 2 && type == this.CONST_Short) {
                    elements[elements.length - 1].more = false;
                    break;
                }
            }
            return elements;
        },

        isExpandable: function isExpandable(node) {
            return node.type == "reference" || node.type == "dictionary" || node.type == "map" || node.type == "array";
        },

        onClick: function onClick(event) {
            if (!domplate.util.isLeftClick(event)) {
                return;
            }
            var row = domplate.util.getAncestorByClass(event.target, "element");
            if (domplate.util.hasClass(row, "expandable")) {
                this.toggleRow(row);
            }
            event.stopPropagation();
        },

        toggleRow: function toggleRow(row) {
            var valueElement = domplate.util.getElementByClass(row, "value");
            if (domplate.util.hasClass(row, "expanded")) {
                domplate.util.removeClass(row, "expanded");
                this.expandedStub.replace({
                    "tag": this.expandableStub,
                    "element": row.elementObject,
                    "node": row.elementObject.node
                }, valueElement);
            } else {
                domplate.util.setClass(row, "expanded");
                this.expandedStub.replace({
                    "tag": helpers.getTemplateForNode(row.elementObject.node).tag,
                    "element": row.elementObject,
                    "node": row.elementObject.node
                }, valueElement);
            }
        }
    };
}
function css() {
    return atob("CltfZGJpZD0iZmE2NmVjOWIxMTcwNzYwYjYyMTQwMzY5MjljMTA2MjcyNzEyYTM2ZCJdIFNQQU4uYXJyYXkgPiBTUEFOIHsKICAgIGNvbG9yOiAjOUM5QzlDOwogICAgZm9udC13ZWlnaHQ6IGJvbGQ7Cn0KCltfZGJpZD0iZmE2NmVjOWIxMTcwNzYwYjYyMTQwMzY5MjljMTA2MjcyNzEyYTM2ZCJdIFNQQU4uYXJyYXkgPiBTUEFOLmNvbGxhcHNlZCB7CiAgICBjb2xvcjogIzAwMDBGRjsKICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7CiAgICBwYWRkaW5nLWxlZnQ6IDVweDsKICAgIHBhZGRpbmctcmlnaHQ6IDVweDsKfQoKW19kYmlkPSJmYTY2ZWM5YjExNzA3NjBiNjIxNDAzNjkyOWMxMDYyNzI3MTJhMzZkIl0gU1BBTi5hcnJheSA+IFNQQU4uc3VtbWFyeSB7CiAgICBjb2xvcjogIzAwMDBGRjsKICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7CiAgICBwYWRkaW5nLWxlZnQ6IDVweDsKICAgIHBhZGRpbmctcmlnaHQ6IDVweDsKfQoKW19kYmlkPSJmYTY2ZWM5YjExNzA3NjBiNjIxNDAzNjkyOWMxMDYyNzI3MTJhMzZkIl0gU1BBTi5hcnJheSA+IERJVi5lbGVtZW50IHsKICAgIGRpc3BsYXk6IGJsb2NrOwogICAgcGFkZGluZy1sZWZ0OiAyMHB4Owp9CgpbX2RiaWQ9ImZhNjZlYzliMTE3MDc2MGI2MjE0MDM2OTI5YzEwNjI3MjcxMmEzNmQiXSBTUEFOLmFycmF5ID4gU1BBTi5lbGVtZW50IHsKICAgIHBhZGRpbmctbGVmdDogMnB4Owp9CgpbX2RiaWQ9ImZhNjZlYzliMTE3MDc2MGI2MjE0MDM2OTI5YzEwNjI3MjcxMmEzNmQiXSBTUEFOLmFycmF5ID4gRElWLmVsZW1lbnQuZXhwYW5kYWJsZSB7CiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaW1hZ2VzL3R3aXN0eS1jbG9zZWQucG5nKTsKICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7CiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA2cHggMnB4OwogICAgY3Vyc29yOiBwb2ludGVyOwp9CltfZGJpZD0iZmE2NmVjOWIxMTcwNzYwYjYyMTQwMzY5MjljMTA2MjcyNzEyYTM2ZCJdIFNQQU4uYXJyYXkgPiBESVYuZWxlbWVudC5leHBhbmRhYmxlLmV4cGFuZGVkIHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChpbWFnZXMvdHdpc3R5LW9wZW4ucG5nKTsKfQoKW19kYmlkPSJmYTY2ZWM5YjExNzA3NjBiNjIxNDAzNjkyOWMxMDYyNzI3MTJhMzZkIl0gU1BBTi5hcnJheSA+IC5lbGVtZW50ID4gU1BBTi52YWx1ZSB7Cn0KCltfZGJpZD0iZmE2NmVjOWIxMTcwNzYwYjYyMTQwMzY5MjljMTA2MjcyNzEyYTM2ZCJdIFNQQU4uYXJyYXkgPiAuZWxlbWVudCA+IFNQQU4uc2VwYXJhdG9yIHsKICAgIGNvbG9yOiAjOUM5QzlDOwp9Cg==");
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
            res.parentNode.setAttribute("_dbid", "fa66ec9b1170760b6214036929c106272712a36d");
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