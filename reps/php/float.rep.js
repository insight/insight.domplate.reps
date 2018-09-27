{
    struct: {
        node: {
            meta: {
                "lang": "php",
                "lang.type": "float"
            },
            value: 1.1
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            tag:
                T.SPAN({"class": "float"}, "$node|getValue"),

            shortTag:
                T.SPAN({"class": "float"}, "$node|getValue"),

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

        :scope SPAN.float {
            color: green;
        }

    <<<)
}
