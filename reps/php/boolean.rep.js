{
    struct: {
        node: {
            meta: {
                "lang": "php",
                "lang.type": "boolean"
            },
            value: "true"
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            tag:
                T.SPAN({"class": "boolean"}, "$node|getValue"),

            shortTag:
                T.SPAN({"class": "boolean"}, "$node|getValue"),

            getValue: function (node) {
                return node.value.toUpperCase();
            }
        };
    },
    css: (css () >>>

        :scope SPAN.boolean {
            color: navy;
        }

    <<<)
}