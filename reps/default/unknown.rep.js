{
    struct: {
        node: {
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

        :scope SPAN.unknown {
            color: #FFFFFF;
            background-color: red;
        }

    <<<)
}