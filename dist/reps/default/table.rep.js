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

        VAR_hideShortTagOnExpand: false,

        tag: T.DIV({ "class": "table" }, T.TABLE({ "cellpadding": 3, "cellspacing": 0 }, T.TBODY(T.TR({ "class": "$node|getHeaderClass" }, T.FOR("column", "$context,$node|getHeaders", T.TH({ "class": "header" }, T.TAG("$column.tag", { "node": "$column.node" }))), T.IF("$node|hasNoHeader", T.TH() // needed to fix gecko bug that does not render table border if empty <tr/> in table
        )), T.FOR("row", "$node|getRows", T.TR(T.FOR("cell", "$context,$row|getCells", T.TD({ "class": "cell", "_cellNodeObj": "$cell.node", "onclick": "$onCellClick" }, T.TAG("$cell.tag", { "node": "$cell.node" })))))))),

        shortTag: T.SPAN({ "class": "table" }, T.TAG("$context,$node|getTitleTag", { "node": "$node|getTitleNode" })),

        getTitleTag: function getTitleTag(context, node) {
            var rep = context.repForNode(this.getTitleNode(node));
            return rep.shortTag || rep.tag;
        },

        getTitleNode: function getTitleNode(node) {
            return domplate.util.merge(node.value.title, { "wrapped": false });
        },

        getHeaderClass: function getHeaderClass(node) {
            if (this.hasNoHeader(node)) {
                return "hide";
            } else {
                return "";
            }
        },

        hasNoHeader: function hasNoHeader(node) {
            return !node.value.header;
        },

        getHeaders: function getHeaders(context, node) {
            var header = node.value.header;
            var items = [];
            for (var i = 0; i < header.length; i++) {
                var rep = context.repForNode(header[i]);
                items.push({
                    "node": domplate.util.merge(header[i], { "wrapped": false }),
                    "tag": rep.shortTag || rep.tag
                });
            }
            return items;
        },

        getRows: function getRows(node) {
            return node.value.body || [];
        },

        getCells: function getCells(context, row) {
            var items = [];
            if (domplate.util.isArrayLike(row)) {
                for (var i = 0; i < row.length; i++) {
                    var rep = context.repForNode(row[i]);
                    items.push({
                        "node": domplate.util.merge(row[i], { "wrapped": false }),
                        "tag": rep.shortTag || rep.tag
                    });
                }
            } else if (row.meta && row.meta['encoder.trimmed']) {
                var rep = context.repForNode(row);
                items.push({
                    "node": domplate.util.merge(row, { "wrapped": false }),
                    "tag": rep.shortTag || rep.tag
                });
            }
            return items;
        },

        onCellClick: function onCellClick(event) {
            event.stopPropagation();

            var tag = event.target;
            while (tag.parentNode) {
                if (tag.cellNodeObj) {
                    break;
                }
                tag = tag.parentNode;
            }
            domplate.dispatchEvent('inspectNode', [event, {
                "args": { "node": tag.cellNodeObj }
            }]);
        },

        _getMasterRow: function _getMasterRow(row) {
            while (true) {
                if (!row.parentNode) {
                    return null;
                }
                if (domplate.util.hasClass(row, "console-message")) {
                    break;
                }
                row = row.parentNode;
            }
            return row;
        }

    };
}
function css() {
    return atob("CltfZGJpZD0iNDhkMjMyMzY0YzEyM2E1OTBiOTUxOTliMTNhOTM4MjVmNjM3NWQ1YiJdIFNQQU4udGFibGUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGltYWdlcy90YWJsZS5wbmcpOwogICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsKICAgIGJhY2tncm91bmQtcG9zaXRpb246IDRweCAtMXB4OwogICAgcGFkZGluZy1sZWZ0OiAyNXB4Owp9CgpbX2RiaWQ9IjQ4ZDIzMjM2NGMxMjNhNTkwYjk1MTk5YjEzYTkzODI1ZjYzNzVkNWIiXSBESVYudGFibGUgewogICAgcGFkZGluZzogMHB4OwogICAgbWFyZ2luOiAwcHg7Cn0KCltfZGJpZD0iNDhkMjMyMzY0YzEyM2E1OTBiOTUxOTliMTNhOTM4MjVmNjM3NWQ1YiJdIERJVi50YWJsZSBUQUJMRSB7CiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNEN0Q3RDc7CiAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI0Q3RDdENzsKfQoKW19kYmlkPSI0OGQyMzIzNjRjMTIzYTU5MGI5NTE5OWIxM2E5MzgyNWY2Mzc1ZDViIl0gRElWLnRhYmxlIFRBQkxFIFRCT0RZIFRSLmhpZGUgewogIGRpc3BsYXk6IG5vbmU7Cn0KCltfZGJpZD0iNDhkMjMyMzY0YzEyM2E1OTBiOTUxOTliMTNhOTM4MjVmNjM3NWQ1YiJdIERJVi50YWJsZSBUQUJMRSBUQk9EWSBUUiBUSC5oZWFkZXIgewogIHZlcnRpY2FsLWFsaWduOiB0b3A7CiAgZm9udC13ZWlnaHQ6IGJvbGQ7CiAgdGV4dC1hbGlnbjogY2VudGVyOwogIGJvcmRlcjogMXB4IHNvbGlkICNEN0Q3RDc7CiAgYm9yZGVyLWJvdHRvbTogMHB4OwogIGJvcmRlci1yaWdodDogMHB4OwogIGJhY2tncm91bmQtY29sb3I6ICNlY2VjZWM7CiAgcGFkZGluZzogMnB4OwogIHBhZGRpbmctbGVmdDogMTBweDsKICBwYWRkaW5nLXJpZ2h0OiAxMHB4Owp9CgpbX2RiaWQ9IjQ4ZDIzMjM2NGMxMjNhNTkwYjk1MTk5YjEzYTkzODI1ZjYzNzVkNWIiXSBESVYudGFibGUgVEFCTEUgVEJPRFkgVFIgVEQuY2VsbCB7CiAgdmVydGljYWwtYWxpZ246IHRvcDsKICBwYWRkaW5nLXJpZ2h0OiAxMHB4OwogIGJvcmRlcjogMXB4IHNvbGlkICNEN0Q3RDc7CiAgYm9yZGVyLWJvdHRvbTogMHB4OwogIGJvcmRlci1yaWdodDogMHB4OwogIHBhZGRpbmc6IDJweDsKICBwYWRkaW5nLWxlZnQ6IDEwcHg7CiAgcGFkZGluZy1yaWdodDogMTBweDsKfQoKW19kYmlkPSI0OGQyMzIzNjRjMTIzYTU5MGI5NTE5OWIxM2E5MzgyNWY2Mzc1ZDViIl0gRElWLnRhYmxlIFRBQkxFIFRCT0RZIFRSIFRELmNlbGw6aG92ZXIgewogICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzczZDsKICAgIGN1cnNvcjogcG9pbnRlcjsgICAgCn0gICAgICAgIAo=");
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
            res.parentNode.setAttribute("_dbid", "48d232364c123a590b95199b13a93825f6375d5b");
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