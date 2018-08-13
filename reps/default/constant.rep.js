{
    struct: {
        node: {
            type: "constant",
            value: "Hello World"
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            tag: T.SPAN({"class": "constant"},
                        "$node.value"),

            shortTag: T.SPAN({"class": "constant"},
                            "$node.value")

        };
    },
    css: (css () >>>

        :scope SPAN.constant {
            color: #0000FF;
        }

    <<<)
}