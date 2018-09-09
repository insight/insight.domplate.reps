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

        CONST_Normal: "tag",
        CONST_Short: "shortTag",
        CONST_Collapsed: "collapsedTag",

        tag: T.SPAN({ "class": "dictionary" }, T.SPAN("$node|getLabel("), T.FOR("member", "$context,$node,$CONST_Normal|dictionaryIterator", T.DIV({ "class": "member", "$expandable": "$member.expandable", "_memberObject": "$member", "_context": "$context", "onclick": "$onClick" }, T.SPAN({ "class": "name", "decorator": "$member|getMemberNameDecorator" }, "$member.name"), T.SPAN({ "class": "delimiter" }, ":"), T.SPAN({ "class": "value" }, T.TAG("$member.tag", { "context": "$context", "member": "$member", "node": "$member.node" })), T.IF("$member.more", T.SPAN({ "class": "separator" }, ",")))), T.SPAN(")")),

        shortTag: T.SPAN({ "class": "dictionary" }, T.SPAN("$node|getLabel("), T.FOR("member", "$context,$node,$CONST_Short|dictionaryIterator", T.SPAN({ "class": "member" }, T.SPAN({ "class": "name" }, "$member.name"), T.SPAN({ "class": "delimiter" }, ":"), T.SPAN({ "class": "value" }, T.TAG("$member.tag", { "context": "$context", "member": "$member", "node": "$member.node" })), T.IF("$member.more", T.SPAN({ "class": "separator" }, ",")))), T.SPAN(")")),

        collapsedTag: T.SPAN({ "class": "dictionary" }, T.SPAN("$node|getLabel("), T.SPAN({ "class": "collapsed" }, "... $node|getMemberCount ..."), T.SPAN(")")),

        expandableStub: T.TAG("$context,$member,$CONST_Collapsed|getTag", { "context": "$context", "node": "$member.node" }),

        expandedStub: T.TAG("$tag", { "context": "$context", "node": "$node", "member": "$member" }),

        moreTag: T.SPAN({ "class": "more" }, " ... "),

        getLabel: function getLabel(node) {
            return "dictionary";
        },

        getMemberNameDecorator: function getMemberNameDecorator(member) {
            return "";
        },

        getMemberCount: function getMemberCount(node) {
            if (!node.value) return 0;
            var count = 0;
            for (var name in node.value) {
                count++;
            }
            return count;
        },

        getTag: function getTag(context, member, type) {
            if (type === this.CONST_Short) {
                return context.repForNode(member.node).shortTag;
            } else if (type === this.CONST_Normal) {
                if (member.expandable) {
                    return this.expandableStub;
                } else {
                    return context.repForNode(member.node).tag;
                }
            } else if (type === this.CONST_Collapsed) {
                var rep = context.repForNode(member.node);
                if (typeof rep.collapsedTag === "undefined") {
                    throw "no 'collapsedTag' property in rep: " + rep.toString();
                }
                return rep.collapsedTag;
            }
        },

        dictionaryIterator: function dictionaryIterator(context, node, type) {
            var members = [];
            if (!node.value || node.value.length == 0) return members;
            for (var name in node.value) {

                var member = {
                    "name": name,
                    "node": domplate.util.merge(node.value[name], { "wrapped": true }),
                    "more": true,
                    "expandable": this.isExpandable(node.value[name])
                };

                if (members.length > 1 && type == this.CONST_Short) {
                    member["tag"] = this.moreTag;
                } else {
                    member["tag"] = this.getTag(context, member, type);
                }

                members.push(member);

                if (members.length > 2 && type == this.CONST_Short) {
                    break;
                }
            }
            if (members.length > 0) {
                members[members.length - 1]["more"] = false;
            }

            return members;
        },

        isExpandable: function isExpandable(node) {
            return node.type == "reference" || node.type == "dictionary" || node.type == "map" || node.type == "array";
        },

        onClick: function onClick(event) {
            if (!domplate.util.isLeftClick(event)) {
                return;
            }
            var row = domplate.util.getAncestorByClass(event.target, "member");
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
                    "member": row.memberObject,
                    "node": row.memberObject.node,
                    "context": row.context
                }, valueElement);
            } else {
                domplate.util.setClass(row, "expanded");
                this.expandedStub.replace({
                    "tag": row.context.repForNode(row.memberObject.node).tag,
                    "member": row.memberObject,
                    "node": row.memberObject.node,
                    "context": row.context
                }, valueElement);
            }
        }
    };
}
function css() {
    return atob("CltfZGJpZD0iNDc1YTI0Y2YxYjUyMTczODgxZWNhODc4YmJjOWNjNmZkNmVhMmYzOCJdIFNQQU4uZGljdGlvbmFyeSA+IFNQQU4gewogICAgY29sb3I6ICM5QzlDOUM7Cn0KCltfZGJpZD0iNDc1YTI0Y2YxYjUyMTczODgxZWNhODc4YmJjOWNjNmZkNmVhMmYzOCJdIFNQQU4uZGljdGlvbmFyeSA+IFNQQU4uY29sbGFwc2VkIHsKICAgIGNvbG9yOiAjMDAwMEZGOwogICAgZm9udC13ZWlnaHQ6IG5vcm1hbDsKICAgIHBhZGRpbmctbGVmdDogNXB4OwogICAgcGFkZGluZy1yaWdodDogNXB4Owp9CgpbX2RiaWQ9IjQ3NWEyNGNmMWI1MjE3Mzg4MWVjYTg3OGJiYzljYzZmZDZlYTJmMzgiXSBTUEFOLmRpY3Rpb25hcnkgPiBTUEFOLnN1bW1hcnkgewogICAgY29sb3I6ICMwMDAwRkY7CiAgICBmb250LXdlaWdodDogbm9ybWFsOwogICAgcGFkZGluZy1sZWZ0OiA1cHg7CiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7Cn0KCltfZGJpZD0iNDc1YTI0Y2YxYjUyMTczODgxZWNhODc4YmJjOWNjNmZkNmVhMmYzOCJdIFNQQU4uZGljdGlvbmFyeSA+IFNQQU4ubWVtYmVyIHsKICAgIGNvbG9yOiAjOUM5QzlDOwp9CgpbX2RiaWQ9IjQ3NWEyNGNmMWI1MjE3Mzg4MWVjYTg3OGJiYzljYzZmZDZlYTJmMzgiXSBTUEFOLmRpY3Rpb25hcnkgPiBESVYubWVtYmVyIHsKICAgIGRpc3BsYXk6IGJsb2NrOwogICAgcGFkZGluZy1sZWZ0OiAyMHB4Owp9CltfZGJpZD0iNDc1YTI0Y2YxYjUyMTczODgxZWNhODc4YmJjOWNjNmZkNmVhMmYzOCJdIFNQQU4uZGljdGlvbmFyeSA+IERJVi5tZW1iZXIuZXhwYW5kYWJsZSB7CiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaW1hZ2VzL3R3aXN0eS1jbG9zZWQucG5nKTsKICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7CiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA2cHggMnB4OwogICAgY3Vyc29yOiBwb2ludGVyOwp9CltfZGJpZD0iNDc1YTI0Y2YxYjUyMTczODgxZWNhODc4YmJjOWNjNmZkNmVhMmYzOCJdIFNQQU4uZGljdGlvbmFyeSA+IERJVi5tZW1iZXIuZXhwYW5kYWJsZS5leHBhbmRlZCB7CiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaW1hZ2VzL3R3aXN0eS1vcGVuLnBuZyk7Cn0KCltfZGJpZD0iNDc1YTI0Y2YxYjUyMTczODgxZWNhODc4YmJjOWNjNmZkNmVhMmYzOCJdIFNQQU4uZGljdGlvbmFyeSA+IC5tZW1iZXIgPiBTUEFOLm5hbWUgewogICAgY29sb3I6ICNFNTlEMDc7CiAgICBmb250LXdlaWdodDogbm9ybWFsOwp9CgpbX2RiaWQ9IjQ3NWEyNGNmMWI1MjE3Mzg4MWVjYTg3OGJiYzljYzZmZDZlYTJmMzgiXSBTUEFOLmRpY3Rpb25hcnkgPiAubWVtYmVyID4gU1BBTi52YWx1ZSB7CiAgICBmb250LXdlaWdodDogbm9ybWFsOwp9CgpbX2RiaWQ9IjQ3NWEyNGNmMWI1MjE3Mzg4MWVjYTg3OGJiYzljYzZmZDZlYTJmMzgiXSBTUEFOLmRpY3Rpb25hcnkgPiAubWVtYmVyID4gU1BBTi5kZWxpbWl0ZXIsCltfZGJpZD0iNDc1YTI0Y2YxYjUyMTczODgxZWNhODc4YmJjOWNjNmZkNmVhMmYzOCJdIFNQQU4uZGljdGlvbmFyeSA+IC5tZW1iZXIgPiBTUEFOLnNlcGFyYXRvciwKW19kYmlkPSI0NzVhMjRjZjFiNTIxNzM4ODFlY2E4NzhiYmM5Y2M2ZmQ2ZWEyZjM4Il0gU1BBTi5kaWN0aW9uYXJ5ID4gLm1lbWJlciBTUEFOLm1vcmUgewogICAgY29sb3I6ICM5QzlDOUM7CiAgICBwYWRkaW5nLWxlZnQ6IDJweDsKICAgIHBhZGRpbmctcmlnaHQ6IDJweDsKfSAgICAgICAgCg==");
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
            res.parentNode.setAttribute("_dbid", "475a24cf1b52173881eca878bbc9cc6fd6ea2f38");
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