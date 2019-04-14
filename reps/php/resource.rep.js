{
    struct: {
        node: {
            meta: {
                "lang": "php",
                "lang.type": "resource"
            },
            value: "resource"
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            tag:
                T.SPAN({"class": "resource"}, "[$node|getValue]"),

            shortTag:
                T.SPAN({"class": "resource"}, "[$node|getValue]"),

            getValue: function (node) {
                return node.value.toUpperCase();
            }
        };
    },
    css: (css () >>>

        SPAN.resource {
            color: navy;
        }

    <<<)
}
