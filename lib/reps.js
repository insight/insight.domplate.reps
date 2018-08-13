
const WINDOW = window;
const DOMPLATE = WINDOW.domplate;


function InsightDomplateReps (options) {
    var self = this;

    if (!options.repsBaseUrl) {
        throw new Error("'options.repsBaseUrl' not set!");
    }

    var loadingReps = {};
    var loadedReps = {};
    function ensureRepForUri (repUri) {

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

    function repUriForType (type) {
        type = type || "unknown";
        return "default/" + type;
    }

    function repUriForNode (node) {
        return repUriForType(node.type);
    }

    function InsightDomplateContext () {
        var self = this;

        self.repForNode = function (node) {

            var repUri = repUriForNode(node);

            if (!loadedReps[repUri]) {
                throw new Error("Rep for uri '" + repUri + "' not loaded!");
            }

            return loadedReps[repUri];
        }
    }

    var context = new InsightDomplateContext();

    function ensureRepsForNodeLoaded (node) {

        // TODO: Optionally pre-fill with already loaded reps.
        var loadTypes = {};
        function traverse (node) {

            loadTypes[node.type] = true;

            if (node.value) {
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
    }
}

exports["insight-domplate-reps"] = InsightDomplateReps;
