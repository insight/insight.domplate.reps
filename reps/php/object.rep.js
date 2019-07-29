{
    struct: {
        node: {
            meta: {
                "lang": "php",
                "lang.class": "Foo",
                "lang.type": "object"
            },
            type: "dictionary",
            value: {
                key1: {
                    type: "string",
                    value: "Hello"
                },
                key2: {
                      type: "string",
                      value: "World"
                }
            }
        }
    },  
    extend: "../default/dictionary.rep",
    rep: function /*CodeBlock */ () {
        
        return {

            getLabel: function (node) {
                return (node.meta && node.meta["lang.class"]) || "Object";
            },
            
            getMemberNameDecorator: function (member) {
                var decorator = [];

                if (member.node.meta) {
                    if (member.node.meta["lang.visibility"]) {
                        decorator.push(member.node.meta["lang.visibility"]);
                    } else
                    if (member.node.meta["lang.undeclared"]) {
                        decorator.push("undeclared");
                    }
        
                    if (member.node.meta["lang.static"]) {
                        decorator.push("static");
                    }
                }
    
                return decorator.join("-");
            }
        };
    },
    css: (css () >>>

        SPAN.dictionary > SPAN {
            color: brown;
            font-weight: bold;
        }
        SPAN.dictionary > DIV.member {
            display: block;
            padding-left: 20px;
        }
        SPAN.dictionary > .member > SPAN.name {
            color: black;
            padding-left: 12px;
        }
        SPAN.dictionary > .member > SPAN.name[decorator=private-static] {
          background: url(images/object-member-visibility-sprite.png) no-repeat -4px -2px;
        }
        SPAN.dictionary > .member > SPAN.name[decorator=protected-static] {
          background: url(images/object-member-visibility-sprite.png) no-repeat -4px -18px;
        }
        SPAN.dictionary > .member > SPAN.name[decorator=public-static] {
          background: url(images/object-member-visibility-sprite.png) no-repeat -4px -34px;
        }
        SPAN.dictionary > .member > SPAN.name[decorator=undeclared-static] {
          background: url(images/object-member-visibility-sprite.png) no-repeat -4px -50px;
        }
        SPAN.dictionary > .member > SPAN.name[decorator=private] {
          background: url(images/object-member-visibility-sprite.png) no-repeat -4px -66px;
        }
        SPAN.dictionary > .member > SPAN.name[decorator=protected] {
          background: url(images/object-member-visibility-sprite.png) no-repeat -4px -82px;
        }
        SPAN.dictionary > .member > SPAN.name[decorator=public] {
          background: url(images/object-member-visibility-sprite.png) no-repeat -4px -98px;
        }
        SPAN.dictionary > .member > SPAN.name[decorator=undeclared] {
          background: url(images/object-member-visibility-sprite.png) no-repeat -4px -114px;
        }
        SPAN.dictionary > .member > SPAN.delimiter,
        SPAN.dictionary > .member > SPAN.separator,
        SPAN.dictionary > .member SPAN.more {
            color: brown;
        }

    <<<)
}