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

        VAR_label: "map",

        CONST_Normal: "tag",
        CONST_Short: "shortTag",

        tag: T.SPAN({ "class": "map", "_nodeObject": "$node" }, T.SPAN("$VAR_label("), T.FOR("pair", "$context,$node,$CONST_Normal|mapIterator", T.DIV({ "class": "pair" }, T.TAG("$pair.key.tag", { "node": "$pair.key.node" }), T.SPAN({ "class": "delimiter" }, "=>"), T.SPAN({
            "class": "value",
            "onclick": "$onClick",
            "_nodeObject": "$pair.value.node",
            "_expandable": "$pair.value.expandable"
        }, T.TAG("$pair.value.tag", { "node": "$pair.value.node" })), T.IF("$pair.more", T.SPAN({ "class": "separator" }, ",")))), T.SPAN(")")),

        shortTag: T.SPAN({ "class": "map", "_nodeObject": "$node" }, T.SPAN("$VAR_label("), T.FOR("pair", "$context,$node,$CONST_Short|mapIterator", T.SPAN({ "class": "pair" }, T.TAG("$pair.key.tag", { "node": "$pair.key.node" }), T.SPAN({ "class": "delimiter" }, "=>"), T.SPAN({
            "class": "value",
            "onclick": "$onClick",
            "_nodeObject": "$pair.value.node",
            "_expandable": "$pair.value.expandable"
        }, T.TAG("$pair.value.tag", { "node": "$pair.value.node" })), T.IF("$pair.more", T.SPAN({ "class": "separator" }, ",")))), T.SPAN(")")),

        collapsedTag: T.SPAN({ "class": "map" }, T.SPAN("$VAR_label("), T.SPAN({ "class": "collapsed" }, "... $node|getItemCount ..."), T.SPAN(")")),

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
                        "node": domplate.util.merge(node.value[i][0], { "wrapped": true })
                    },
                    "value": {
                        "tag": valueRep,
                        "node": domplate.util.merge(node.value[i][1], { "wrapped": true }),
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
    return atob("CltfZGJpZD0iYTMwYjllMmU0MGU4MzI0Mjg5OTBmZmVmOTUzNGM2MWVjYzA4MzQ4MiJdIFNQQU4ubWFwID4gU1BBTiB7CiAgICBjb2xvcjogIzlDOUM5QzsKICAgIGZvbnQtd2VpZ2h0OiBib2xkOwp9CgpbX2RiaWQ9ImEzMGI5ZTJlNDBlODMyNDI4OTkwZmZlZjk1MzRjNjFlY2MwODM0ODIiXSBTUEFOLm1hcCA+IERJVi5wYWlyIHsKICAgIGRpc3BsYXk6IGJsb2NrOwogICAgcGFkZGluZy1sZWZ0OiAyMHB4Owp9CgpbX2RiaWQ9ImEzMGI5ZTJlNDBlODMyNDI4OTkwZmZlZjk1MzRjNjFlY2MwODM0ODIiXSBTUEFOLm1hcCA+IFNQQU4ucGFpciB7CiAgICBwYWRkaW5nLWxlZnQ6IDJweDsKfQoKW19kYmlkPSJhMzBiOWUyZTQwZTgzMjQyODk5MGZmZWY5NTM0YzYxZWNjMDgzNDgyIl0gU1BBTi5tYXAgPiAucGFpciA+IFNQQU4uZGVsaW1pdGVyLApbX2RiaWQ9ImEzMGI5ZTJlNDBlODMyNDI4OTkwZmZlZjk1MzRjNjFlY2MwODM0ODIiXSBTUEFOLm1hcCA+IC5wYWlyID4gU1BBTi5zZXBhcmF0b3IgewogICAgY29sb3I6ICM5QzlDOUM7CiAgICBwYWRkaW5nLWxlZnQ6IDJweDsKICAgIHBhZGRpbmctcmlnaHQ6IDJweDsKfQoKCltfZGJpZD0iYTMwYjllMmU0MGU4MzI0Mjg5OTBmZmVmOTUzNGM2MWVjYzA4MzQ4MiJdIFNQQU4ubWFwID4gU1BBTiB7CiAgICBjb2xvcjogZ3JlZW47CiAgICBmb250LXdlaWdodDogbm9ybWFsOwp9CgpbX2RiaWQ9ImEzMGI5ZTJlNDBlODMyNDI4OTkwZmZlZjk1MzRjNjFlY2MwODM0ODIiXSBTUEFOLm1hcCA+IC5wYWlyID4gU1BBTi5kZWxpbWl0ZXIsCltfZGJpZD0iYTMwYjllMmU0MGU4MzI0Mjg5OTBmZmVmOTUzNGM2MWVjYzA4MzQ4MiJdIFNQQU4ubWFwID4gLnBhaXIgPiBTUEFOLnNlcGFyYXRvciB7CiAgICBjb2xvcjogZ3JlZW47Cn0K");
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
            res.parentNode.setAttribute("_dbid", "a30b9e2e40e832428990ffef9534c61ecc083482");
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