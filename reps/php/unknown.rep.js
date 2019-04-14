{
    struct: {
        node: {
            meta: {
                "lang": "php",
                "lang.type": "unknown"
            }
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            tag:
                T.DIV({"class": "unknown"}, "UNKNOWN EXPANDED"),
    
            collapsedTag:
                T.DIV({"class": "unknown"}, "UNKNOWN COLLAPSED"),
    
            shortTag:
                T.DIV({"class": "unknown"}, "UNKNOWN SHORT")

        };
    },
    css: (css () >>>

        DIV.unknown {
            color: #FFFFFF;
            background-color: red;
        }

    <<<)
}