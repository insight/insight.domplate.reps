
const WINDOW = window;

const DOMPLATE = require("domplate/dist/domplate.js").domplate;


function Renderer (options) {
    var self = this;

    var loader = options.loader || new exports.Loader(options);

    self.domplate = DOMPLATE;

    function InsightDomplateContext () {
        var self = this;

        self.repForNode = loader.repForNode.bind(loader);
        self.wrapperRepForNode = loader.wrapperRepForNode.bind(loader);

        self.dispatchEvent = function (name, args) {
            if (options.onEvent) {
                try {
                    options.onEvent(name, args);
                } catch (err) {
                    err.message += "(while dispatching event with name '" + name + "')";
                    err.stack[0] += "(while dispatching event with name '" + name + "')";
                    throw err;
                }
            }
        }
    }

    var context = new InsightDomplateContext();

    function ensureRepsForNodeLoaded (node) {

        // TODO: Optionally pre-fill with already loaded reps.
        // TODO: Move node traversal into helper module.
        var loadTypes = {};
        function traverse (node) {

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
                } else
                if (
                    node.meta["lang"] &&
                    node.meta["lang.type"]
                ) {
                    if (
                        node.meta["lang"] === "php" &&
                        node.meta["lang.type"] === "array"
                    ) {
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
                if (node.meta.wrapper) {
                    loadTypes[node.meta.wrapper] = true;
                }
            }

            if (typeof node.value !== 'undefined') {
                if (node.type === "array") {
                    node.value.forEach(function (node) {
                        traverse(node);
                    });
                } else
                if (node.type === "dictionary") {
                    Object.keys(node.value).forEach(function (key) {
                        traverse(node.value[key]);
                    });
                } else
                if (node.type === "map") {
                    node.value.forEach(function (pair) {
                        traverse(pair[0]);
                        traverse(pair[1]);
                    });
                } else
                if (node.type === "reference") {
                    if (node.value.instance) {
                        traverse(node.value.instance);
                    } else
                    if (typeof node.getInstance === 'function') {
                        traverse(node.getInstance());
                    }
                } else
                if (node.type === "table") {
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
                } else
                if (node.type === "trace") {
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

            var repUri = loader.repUriForType(type[0], type[1]);

            return loader.ensureRepForUri(repUri).then(function () {
                return null;
            });
        }));
    }

    self.renderNodeInto = function (node, selectorOrElement) {

        var el = (
            typeof selectorOrElement === 'string' && document.querySelector(selectorOrElement)
        ) || selectorOrElement;
        if (!el) {
            throw new Error("Could not find element for selector '" + selectorOrElement + "'!");
        }

        // TODO: Optionally skip this.
        // TODO: Once reps can be loaded async this can be optionally skipped.
        return ensureRepsForNodeLoaded(node).then(function () {

            var wrapperRep = context.wrapperRepForNode(node);

            if (wrapperRep) {

                wrapperRep.tag.replace({
                    context: context,
                    node: node
                }, el);

                return;
            }

            var rep = context.repForNode(node);

            rep.tag.replace({
                context: context,
                node: node
            }, el);
        });
    }
}

exports.Renderer = Renderer;


function Loader (options) {
    let self = this;

    if (!options.repsBaseUrl) {
        throw new Error("'options.repsBaseUrl' not set!");
    }

    var loadingReps = {};
    var loadedReps = {};

    self.domplate = DOMPLATE;

    self.ensureRepForUri = function (repUri) {

        if (!loadingReps[repUri]) {

            loadingReps[repUri] = new WINDOW.Promise(function (resolve, reject) {

                // TODO: Optionally check against PINF sandbox directly to see if rep is loaded
                //       instead of letting domplate load them.
                var url = options.repsBaseUrl + "/" + repUri;

                DOMPLATE.loadRep(url, { cssBaseUrl: options.repsBaseUrl.replace(/\/?$/, "/") + repUri.replace(/^([^\/]+\/).+$/, "$1") }, function (rep) {

                    setTimeout(function () {
                        rep.__ensureCssInjected();
                    }, 0);

                    loadedReps[repUri] = rep;

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

    self.repUriForType = function (lang, type) {
        type = type || "unknown";
        return lang + "/" + type;
    }

    function repUriForNode (node) {

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
            } else
            if (
                node.meta["lang"] &&
                node.meta["lang.type"]
            ) {
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

        return self.repUriForType(lang, type);
    }

    self.repForNode = function (node) {

        var repUri = repUriForNode(node);

        if (!loadedReps[repUri]) {
            throw new Error("Rep for uri '" + repUri + "' not loaded!");
        }

        return loadedReps[repUri];
    }
    self.wrapperRepForNode = function (node) {
        if (
            node.meta &&
            node.meta.wrapper
        ) {
            if (!loadedReps[node.meta.wrapper]) {
                throw new Error("Wrapper Rep for uri '" + node.meta.wrapper + "' not loaded!");
            }
            return loadedReps[node.meta.wrapper];
        }
        return null;
    }
}

exports.Loader = Loader;
