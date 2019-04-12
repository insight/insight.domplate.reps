{
    struct: {
        node: {
            meta: {
                wrapper: "wrappers/viewer"
            },
            type: "string",
            value: "Hello World!"
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {
    
            tag:
                T.DIV({
                    "class": "viewer-harness"
                }, T.TAG("$context,$node|_getTag", {
                    "node": "$node"
                })),

            _getTag: function (context, node) {
                var rep = context.repForNode(node);
                return rep.tag;
            }
        };
    },
    css: (css () >>>

        :scope DIV.viewer-harness {
            padding: 2px 4px 1px 6px;
            font-family: Lucida Grande, Tahoma, sans-serif;
            font-size: 11px;
        }

    <<<)
}