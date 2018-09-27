((function (_require, _exports, _module) {
var bundle = { require: _require, exports: _exports, module: _module };
var exports = undefined;
var module = undefined;
var define = function (deps, init) {
var exports = init();
[["insight-domplate-renderer","Renderer"]].forEach(function (expose) {
window[expose[0]] = exports[expose[1]];
});
}; define.amd = true;

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mainModule = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var WINDOW = window;
var DOMPLATE = WINDOW.domplate;

function Renderer(options) {
    var self = this;

    if (!options.repsBaseUrl) {
        throw new Error("'options.repsBaseUrl' not set!");
    }

    var loadingReps = {};
    var loadedReps = {};
    function ensureRepForUri(repUri) {

        if (!loadingReps[repUri]) {

            loadingReps[repUri] = new WINDOW.Promise(function (resolve, reject) {

                // TODO: Optionally check against PINF sandbox directly to see if rep is loaded
                //       instead of letting domplate load them.
                var url = options.repsBaseUrl + "/" + repUri;

                DOMPLATE.loadRep(url, { cssBaseUrl: options.repsBaseUrl.replace(/\/?$/, "/") + repUri.replace(/^([^\/]+\/).+$/, "$1") }, function (rep) {

                    resolve(rep);
                }, function (err) {
                    var error = new Error("Error loading rep for uri '" + repUri + "' from '" + url + "'!");
                    error.previous = err;
                    reject(error);
                });
            });
        }

        return loadingReps[repUri];
    }

    function repUriForType(lang, type) {
        type = type || "unknown";
        return lang + "/" + type;
    }

    function repUriForNode(node) {

        var lang = "default";
        var type = node.type;

        if (node.meta) {
            if (node.meta["encoder.trimmed"]) {
                type = "trimmed";
            } else
                // DEPRECATED
                if (node.meta.renderer === "structures/table") {
                    type = "table";
                } else
                    // DEPRECATED
                    if (node.meta.renderer === "structures/trace") {
                        type = "trace";
                    } else if (node.meta["lang"] && node.meta["lang.type"]) {
                        lang = node.meta["lang"];
                        type = node.meta["lang.type"];

                        if (lang === "php") {
                            if (type === "array") {
                                if (node.value[0] && Array.isArray(node.value[0])) {
                                    type = "array-associative";
                                } else {
                                    type = "array-indexed";
                                }
                            }
                        }
                    }
        }

        return repUriForType(lang, type);
    }

    function InsightDomplateContext() {
        var self = this;

        self.repForNode = function (node) {

            var repUri = repUriForNode(node);

            if (!loadedReps[repUri]) {
                throw new Error("Rep for uri '" + repUri + "' not loaded!");
            }

            return loadedReps[repUri];
        };
    }

    var context = new InsightDomplateContext();

    function ensureRepsForNodeLoaded(node) {

        // TODO: Optionally pre-fill with already loaded reps.
        // TODO: Move node traversal into helper module.
        var loadTypes = {};
        function traverse(node) {

            if (node.type) {
                loadTypes["default/" + node.type] = true;
            }

            if (node.meta) {
                if (node.meta["encoder.trimmed"]) {
                    loadTypes["default/trimmed"] = true;
                } else
                    // DEPRECATED
                    if (node.meta.renderer === "structures/table") {
                        loadTypes["default/table"] = true;
                        node.type = "table";
                    } else
                        // DEPRECATED
                        if (node.meta.renderer === "structures/trace") {
                            loadTypes["default/trace"] = true;
                            node.type = "trace";
                        } else if (node.meta["lang"] && node.meta["lang.type"]) {
                            if (node.meta["lang"] === "php" && node.meta["lang.type"] === "array") {
                                if (node.value[0] && Array.isArray(node.value[0])) {
                                    loadTypes["php/array-associative"] = true;
                                    node.value.forEach(function (pair) {
                                        traverse(pair[0]);
                                        traverse(pair[1]);
                                    });
                                } else {
                                    loadTypes["php/array-indexed"] = true;
                                    node.value.forEach(function (node) {
                                        traverse(node);
                                    });
                                }
                            } else {
                                loadTypes[node.meta["lang"] + "/" + node.meta["lang.type"]] = true;
                            }
                        }
            }

            if (node.value) {
                if (node.type === "array") {
                    node.value.forEach(function (node) {
                        traverse(node);
                    });
                } else if (node.type === "dictionary") {
                    Object.keys(node.value).forEach(function (key) {
                        traverse(node.value[key]);
                    });
                } else if (node.type === "map") {
                    node.value.forEach(function (pair) {
                        traverse(pair[0]);
                        traverse(pair[1]);
                    });
                } else if (node.type === "reference") {
                    if (node.value.instance) {
                        traverse(node.value.instance);
                    }
                } else if (node.type === "table") {
                    if (node.value.title) {
                        traverse(node.value.title);
                    }
                    if (node.value.header) {
                        node.value.header.forEach(function (node) {
                            traverse(node);
                        });
                    }
                    if (node.value.body) {
                        node.value.body.forEach(function (row) {
                            row.forEach(function (cell) {
                                traverse(cell);
                            });
                        });
                    }
                } else if (node.type === "trace") {
                    if (node.value.title) {
                        traverse(node.value.title);
                    }
                    if (node.value.stack) {
                        node.value.stack.forEach(function (frame) {
                            frame.args.forEach(function (arg) {
                                traverse(arg);
                            });
                        });
                    }
                }
            }
        }
        traverse(node);

        return Promise.all(Object.keys(loadTypes).map(function (type) {

            type = type.split("/");

            var repUri = repUriForType(type[0], type[1]);

            return ensureRepForUri(repUri).then(function (rep) {

                loadedReps[repUri] = rep;

                return null;
            });
        }));
    }

    self.renderNodeInto = function (node, selector) {

        var el = document.querySelector(selector);
        if (!el) {
            throw new Error("Could not find element for selector '" + selector + "'!");
        }

        // TODO: Optionally skip this.
        return ensureRepsForNodeLoaded(node).then(function () {

            var rep = context.repForNode(node);

            rep.tag.replace({
                context: context,
                node: node
            }, el);
        });
    };
}

exports.Renderer = Renderer;
},{}]},{},[1])(1)
});
})((typeof require !== "undefined" && require) || undefined, (typeof exports !== "undefined" && exports) || undefined, (typeof module !== "undefined" && module) || undefined, ))