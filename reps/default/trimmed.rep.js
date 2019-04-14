{
    struct: {
        node: {
            type: "string",
            meta: {
                "encoder.trimmed": true,
                "encoder.notice": "Trimmed!"
            }
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {
    
            tag:
                T.SPAN({"class": "trimmed"},
                    "$node|getNotice"
                ),

            collapsedTag: 
                T.SPAN({"class": "trimmed"},
                    "$node|getNotice"
                ),

            getNotice: function(node) {
                return node.meta["encoder.notice"];
            }
        };
    },
    css: (css () >>>

        SPAN.trimmed {
            color: #FFFFFF;
            background-color: blue;
            padding-left: 5px;
            padding-right: 5px;
        }
    
    <<<)
}