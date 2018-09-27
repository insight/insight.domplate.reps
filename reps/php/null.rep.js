{
    struct: {
        node: {
            meta: {
                "lang": "php",
                "lang.type": "null"
            },
            value: "null"
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            tag:
                T.SPAN({"class": "null"}, "$node|getValue"),

            shortTag:
                T.SPAN({"class": "null"}, "$node|getValue"),

            getValue: function (node) {
                return node.value.toUpperCase();
            }
        };
    },
    css: (css () >>>

        :scope SPAN.null {
            color: navy;
        }

    <<<)
}