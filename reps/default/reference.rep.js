{
    struct: {
        node: {
            type: "reference",
            value: {
                instance: {
                    type: "string",
                    value: "Hello World!"
                }
            }
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            CONST_Normal: "tag",
            CONST_Short: "shortTag",
            CONST_Collapsed: "collapsedTag",
    
            tag:
                T.SPAN({"class": "reference"},
                T.TAG("$context,$node,$CONST_Normal|getTag", {"context": "$context", "node": "$context,$node|getInstanceNode"})),
            
            shortTag:
                T.SPAN({"class": "reference"},
                T.TAG("$context,$node,$CONST_Collapsed|getTag", {"context": "$context", "node": "$context,$node|getInstanceNode"})),
    
            collapsedTag:
                T.SPAN({"class": "reference"},
                T.TAG("$context,$node,$CONST_Collapsed|getTag", {"context": "$context", "node": "$context,$node|getInstanceNode"})),
                
            getTag: function(context, node, type) {
                return context.repForNode(this.getInstanceNode(context, node))[type];
            },

            getInstanceNode: function (context, node) {

                if (node.value.instance) {

                    return node.value.instance;
                } else
                if (typeof node.value.getInstanceNode === "function") {

                    return node.value.getInstanceNode(node);
                }

                return context.getInstanceNode(node);
            }
        };
    },
    css: (css () >>>

    <<<)
}