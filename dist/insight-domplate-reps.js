((function () {
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mainModule = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var WINDOW = window;
var DOMPLATE = WINDOW.domplate;

function InsightDomplateReps(options) {
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
                DOMPLATE.loadRep(options.repsBaseUrl + "/" + repUri, function (rep) {

                    resolve(rep);
                }, function (err) {
                    var error = new Error("Error loading rep for uri '" + repUri + "' from '" + url + "'!");
                    error.previous = err;
                    reject(err);
                });
            });
        }

        return loadingReps[repUri];
    }

    function repUriForType(type) {
        type = type || "unknown";
        return "default/" + type;
    }

    function repUriForNode(node) {
        return repUriForType(node.type);
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
        var loadTypes = {};
        function traverse(node) {
            if (node.type) {
                loadTypes[node.type] = true;
            }
            if (node.value) {
                if (Array.isArray(node.value)) {
                    node.value.forEach(function (node) {
                        traverse(node);
                    });
                }
            }
        }
        traverse(node);

        return Promise.all(Object.keys(loadTypes).map(function (type) {

            var repUri = repUriForType(type);

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

exports["insight-domplate-reps"] = InsightDomplateReps;
},{}]},{},[1])(1)
});
var mainModule = window.mainModule;
delete window.mainModule;
["insight-domplate-reps"].forEach(function (name) {
window[name] = mainModule[name];
});
})())