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

        tag: T.DIV({ "class": "structures-trace" }, T.TABLE({ "cellpadding": 3, "cellspacing": 0 }, T.TBODY(T.TR(T.TH({ "class": "header-file" }, "File"), T.TH({ "class": "header-line" }, "Line"), T.TH({ "class": "header-inst" }, "Instruction")), T.FOR("frame", "$node|getCallList", T.TR({ "_frameNodeObj": "$frame.node" }, T.TD({ "class": "cell-file", "onclick": "$onFileClick" }, "$frame.file"), T.TD({ "class": "cell-line", "onclick": "$onFileClick" }, "$frame.line"), T.TD({ "class": "cell-inst" }, T.DIV("$frame|getFrameLabel(", T.FOR("arg", "$context,$frame|argIterator", T.DIV({ "class": "arg", "_argNodeObj": "$arg.node", "onclick": "$onArgClick" }, T.TAG("$arg.tag", { "node": "$arg.node" }), T.IF("$arg.more", T.SPAN({ "class": "separator" }, ",")))), ")"))))))),

        shortTag: T.SPAN({ "class": "structures-trace" }, T.TAG("$context,$node|getCaptionTag", { "node": "$node|getCaptionNode" })),

        onFileClick: function onFileClick(event) {
            event.stopPropagation();
            var node = event.target.parentNode.frameNodeObj,
                frame = node;
            if (!frame.file || !frame.line) {
                return;
            }
            var args = {
                "file": frame.file.value,
                "line": frame.line.value
            };
            if (args["file"] && args["line"]) {
                domplate.util.dispatchEvent('inspectFile', [event, {
                    "message": node.getObjectGraph().message,
                    "args": args
                }]);
            }
        },

        onArgClick: function onArgClick(event) {
            event.stopPropagation();
            var tag = event.target;
            while (tag.parentNode) {
                if (tag.argNodeObj) {
                    break;
                }
                tag = tag.parentNode;
            }
            domplate.dispatchEvent('inspectNode', [event, {
                "message": tag.argNodeObj.getObjectGraph().message,
                "args": { "node": tag.argNodeObj }
            }]);
        },

        getCaptionTag: function getCaptionTag(context, node) {
            var rep = context.repForNode(this.getCaptionNode(node));
            return rep.shortTag || rep.tag;
        },

        getCaptionNode: function getCaptionNode(node) {
            return domplate.util.merge(node.value.title, { "wrapped": false });
        },

        getTrace: function getTrace(node) {
            return node.value.stack;
        },

        postRender: function postRender(node) {
            ;debugger;
            /*                    
                    var node = this._getMasterRow(node);
                    if (node.messageObject && typeof node.messageObject.postRender == "object")
                    {
                        if (typeof node.messageObject.postRender.keeptitle !== "undefined")
                        {
                            node.setAttribute("keeptitle", node.messageObject.postRender.keeptitle?"true":"false");
                        }
                    }
            */
        },

        getCallList: function getCallList(node) {

            /*
                    if (node.messageObject && typeof node.messageObject.postRender == "object") {
                        if (typeof node.messageObject.postRender.keeptitle !== "undefined") {
                            node.setAttribute("keeptitle", "true");
                        }
                    }                    
            */
            try {
                var list = [];
                this.getTrace(node).forEach(function (node) {
                    var frame = node;
                    list.push({
                        'node': node,
                        'file': frame.file ? frame.file : "",
                        'line': frame.line ? frame.line : "",
                        'class': frame["class"] ? frame["class"] : "",
                        'function': frame["function"] ? frame["function"] : "",
                        'type': frame.type ? frame.type : "",
                        'args': frame.args ? frame.args : false
                    });
                });

                try {
                    if (list[0].file.substr(0, 1) == '/') {
                        var file_shortest = list[0].file.split('/');
                        var file_original_length = file_shortest.length;
                        for (var i = 1; i < list.length; i++) {
                            var file = list[i].file.split('/');
                            for (var j = 0; j < file_shortest.length; j++) {
                                if (file_shortest[j] != file[j]) {
                                    file_shortest.splice(j, file_shortest.length - j);
                                    break;
                                }
                            }
                        }
                        if (file_shortest.length > 2) {
                            if (file_shortest.length == file_original_length) {
                                file_shortest.pop();
                            }
                            file_shortest = file_shortest.join('/');
                            for (var i = 0; i < list.length; i++) {
                                list[i].file = '...' + list[i].file.substr(file_shortest.length);
                            }
                        }
                    }
                } catch (e) {}

                return list;
            } catch (err) {
                console.error(err);
            }
        },

        getFrameLabel: function getFrameLabel(frame) {
            try {
                if (frame['class']) {
                    if (frame['type'] == 'throw') {
                        return 'throw ' + frame['class'];
                    } else if (frame['type'] == 'trigger') {
                        return 'trigger_error';
                    } else {
                        return frame['class'] + frame['type'] + frame['function'];
                    }
                }
                return frame['function'];
            } catch (err) {
                console.error(err);
            }
        },

        argIterator: function argIterator(context, frame) {
            try {
                if (!frame.args) {
                    return [];
                }
                var items = [];
                for (var i = 0; i < frame.args.length; i++) {
                    items.push({
                        "node": domplate.util.merge(frame.args[i], { "wrapped": true }),
                        "tag": context.repForNode(frame.args[i]).shortTag,
                        "more": i < frame.args.length - 1
                    });
                }
                return items;
            } catch (err) {
                console.error(err);
            }
        }

    };
}
function css() {
    return atob("CltfZGJpZD0iYjA1MTQzZDUxODUxZGM5MzJhNGIyNzQyY2U4MDZjNWNhZjA2ZGE4NSJdIFNQQU4uc3RydWN0dXJlcy10cmFjZSB7CiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaW1hZ2VzL2VkaXQtcnVsZS5wbmcpOwogICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsKICAgIGJhY2tncm91bmQtcG9zaXRpb246IDRweCAxcHg7CiAgICBwYWRkaW5nLWxlZnQ6IDI1cHg7CiAgICBmb250LXdlaWdodDogYm9sZDsKfQoKW19kYmlkPSJiMDUxNDNkNTE4NTFkYzkzMmE0YjI3NDJjZTgwNmM1Y2FmMDZkYTg1Il0gRElWLnN0cnVjdHVyZXMtdHJhY2UgewogICAgcGFkZGluZzogMHB4OwogICAgbWFyZ2luOiAwcHg7Cn0KCltfZGJpZD0iYjA1MTQzZDUxODUxZGM5MzJhNGIyNzQyY2U4MDZjNWNhZjA2ZGE4NSJdIERJVi5zdHJ1Y3R1cmVzLXRyYWNlIFRBQkxFIHsKICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0Q3RDdENzsKfQoKW19kYmlkPSJiMDUxNDNkNTE4NTFkYzkzMmE0YjI3NDJjZTgwNmM1Y2FmMDZkYTg1Il0gRElWLnN0cnVjdHVyZXMtdHJhY2UgVEFCTEUgVEJPRFkgVFIgVEgsCltfZGJpZD0iYjA1MTQzZDUxODUxZGM5MzJhNGIyNzQyY2U4MDZjNWNhZjA2ZGE4NSJdIERJVi5zdHJ1Y3R1cmVzLXRyYWNlIFRBQkxFIFRCT0RZIFRSIFREIHsKICAgIHBhZGRpbmc6IDNweDsKICAgIHBhZGRpbmctbGVmdDogMTBweDsKICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7Cn0KCltfZGJpZD0iYjA1MTQzZDUxODUxZGM5MzJhNGIyNzQyY2U4MDZjNWNhZjA2ZGE4NSJdIERJVi5zdHJ1Y3R1cmVzLXRyYWNlIFRBQkxFIFRCT0RZIFRSIFRILmhlYWRlci1maWxlIHsKICB3aGl0ZS1zcGFjZTpub3dyYXA7CiAgZm9udC13ZWlnaHQ6IGJvbGQ7CiAgdGV4dC1hbGlnbjogbGVmdDsKfQoKW19kYmlkPSJiMDUxNDNkNTE4NTFkYzkzMmE0YjI3NDJjZTgwNmM1Y2FmMDZkYTg1Il0gRElWLnN0cnVjdHVyZXMtdHJhY2UgVEFCTEUgVEJPRFkgVFIgVEguaGVhZGVyLWxpbmUgewogIHdoaXRlLXNwYWNlOm5vd3JhcDsKICBmb250LXdlaWdodDogYm9sZDsKICB0ZXh0LWFsaWduOiByaWdodDsKfQpbX2RiaWQ9ImIwNTE0M2Q1MTg1MWRjOTMyYTRiMjc0MmNlODA2YzVjYWYwNmRhODUiXSBESVYuc3RydWN0dXJlcy10cmFjZSBUQUJMRSBUQk9EWSBUUiBUSC5oZWFkZXItaW5zdCB7CiAgd2hpdGUtc3BhY2U6bm93cmFwOwogIGZvbnQtd2VpZ2h0OiBib2xkOwogIHRleHQtYWxpZ246IGxlZnQ7Cn0KCltfZGJpZD0iYjA1MTQzZDUxODUxZGM5MzJhNGIyNzQyY2U4MDZjNWNhZjA2ZGE4NSJdIERJVi5zdHJ1Y3R1cmVzLXRyYWNlIFRBQkxFIFRCT0RZIFRSIFRELmNlbGwtZmlsZSB7CiAgdmVydGljYWwtYWxpZ246IHRvcDsKICBib3JkZXI6IDFweCBzb2xpZCAjRDdEN0Q3OwogIGJvcmRlci1ib3R0b206IDBweDsKICBib3JkZXItcmlnaHQ6IDBweDsKfQpbX2RiaWQ9ImIwNTE0M2Q1MTg1MWRjOTMyYTRiMjc0MmNlODA2YzVjYWYwNmRhODUiXSBESVYuc3RydWN0dXJlcy10cmFjZSBUQUJMRSBUQk9EWSBUUiBURC5jZWxsLWxpbmUgewogIHdoaXRlLXNwYWNlOm5vd3JhcDsKICB2ZXJ0aWNhbC1hbGlnbjogdG9wOwogIHRleHQtYWxpZ246IHJpZ2h0OwogIGJvcmRlcjoxcHggc29saWQgI0Q3RDdENzsKICBib3JkZXItYm90dG9tOiAwcHg7CiAgYm9yZGVyLXJpZ2h0OiAwcHg7Cn0KW19kYmlkPSJiMDUxNDNkNTE4NTFkYzkzMmE0YjI3NDJjZTgwNmM1Y2FmMDZkYTg1Il0gRElWLnN0cnVjdHVyZXMtdHJhY2UgVEFCTEUgVEJPRFkgVFIgVEQuY2VsbC1saW5lOmhvdmVyLApbX2RiaWQ9ImIwNTE0M2Q1MTg1MWRjOTMyYTRiMjc0MmNlODA2YzVjYWYwNmRhODUiXSBESVYuc3RydWN0dXJlcy10cmFjZSBUQUJMRSBUQk9EWSBUUiBURC5jZWxsLWZpbGU6aG92ZXIgewogICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzczZDsKICAgIGN1cnNvcjogcG9pbnRlcjsgICAgCn0KW19kYmlkPSJiMDUxNDNkNTE4NTFkYzkzMmE0YjI3NDJjZTgwNmM1Y2FmMDZkYTg1Il0gRElWLnN0cnVjdHVyZXMtdHJhY2UgVEFCTEUgVEJPRFkgVFIgVEQuY2VsbC1pbnN0IHsKICB2ZXJ0aWNhbC1hbGlnbjogdG9wOwogIHBhZGRpbmctbGVmdDogMTBweDsKICBmb250LXdlaWdodDogYm9sZDsKICBib3JkZXI6MXB4IHNvbGlkICNEN0Q3RDc7CiAgYm9yZGVyLWJvdHRvbTogMHB4Owp9CgpbX2RiaWQ9ImIwNTE0M2Q1MTg1MWRjOTMyYTRiMjc0MmNlODA2YzVjYWYwNmRhODUiXSBESVYuc3RydWN0dXJlcy10cmFjZSBUQUJMRSBUQk9EWSBUUiBURC5jZWxsLWluc3QgRElWLmFyZyB7CiAgZm9udC13ZWlnaHQ6IG5vcm1hbDsKICBwYWRkaW5nLWxlZnQ6IDNweDsKICBwYWRkaW5nLXJpZ2h0OiAzcHg7CiAgZGlzcGxheTogaW5saW5lLWJsb2NrOwp9CltfZGJpZD0iYjA1MTQzZDUxODUxZGM5MzJhNGIyNzQyY2U4MDZjNWNhZjA2ZGE4NSJdIERJVi5zdHJ1Y3R1cmVzLXRyYWNlIFRBQkxFIFRCT0RZIFRSIFRELmNlbGwtaW5zdCBESVYuYXJnOmhvdmVyIHsKICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmM3M2Q7CiAgICBjdXJzb3I6IHBvaW50ZXI7ICAgIAp9CgpbX2RiaWQ9ImIwNTE0M2Q1MTg1MWRjOTMyYTRiMjc0MmNlODA2YzVjYWYwNmRhODUiXSBESVYuc3RydWN0dXJlcy10cmFjZSBUQUJMRSBUQk9EWSBUUiBURC5jZWxsLWluc3QgLnNlcGFyYXRvciB7CiAgICBwYWRkaW5nLWxlZnQ6IDFweDsKICAgIHBhZGRpbmctcmlnaHQ6IDNweDsKfQo=");
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
            res.parentNode.setAttribute("_dbid", "b05143d51851dc932a4b2742ce806c5caf06da85");
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