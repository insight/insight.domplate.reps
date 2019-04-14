{
    struct: {
        node: {
            meta: {
                "lang": "php",
                "lang.type": "integer"
            },
            value: 1000
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            tag:
                T.SPAN({"class": "integer"}, "$node|getValue"),

            shortTag:
                T.SPAN({"class": "integer"}, "$node|getValue"),

            getValue: function (node) {
                return this._addCommas(node.value);
            },

            // @see http://www.mredkj.com/javascript/numberFormat.html
            _addCommas: function (nStr) {
                nStr += '';
                x = nStr.split('.');
                x1 = x[0];
                x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            }            
        };
    },
    css: (css () >>>

        SPAN.integer {
            color: green;
        }

    <<<)
}