{
    struct: {
        node: {
            type: "unknown",
            value: "Hello World"
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            tag: T.SPAN({"class": "unknown"},
                        "$node.value"),

            shortTag: T.SPAN({"class": "unknown"},
                            "$node.value")

        };
    },
    css: (css () >>>

        SPAN.unknown {
            color: #FFFFFF;
            background-color: red;
        }

    <<<)
}