{
    struct: {
        node: {
            type: "map",
            value: [
                [
                    {
                        type: "string",
                        value: "key1"
                    },
                    {
                        type: "string",
                        value: "Hello"
                    }
                ],
                [
                    {
                        type: "string",
                        value: "key2"
                    },
                    {
                        type: "string",
                        value: "World"
                    }
                ]
            ]
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            VAR_label: "map",
    
            CONST_Normal: "tag",
            CONST_Short: "shortTag",
    
            tag:
                T.SPAN({"class": "map", "_nodeObject": "$node"}, T.SPAN("$VAR_label("),
                    T.FOR("pair", "$context,$node,$CONST_Normal|mapIterator",
                        T.DIV({"class": "pair"},
                            T.TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                            T.SPAN({"class": "delimiter"}, "=>"),
                            T.SPAN({
                                    "class": "value",
                                    "onclick": "$onClick",
                                    "_nodeObject": "$pair.value.node",
                                    "_expandable": "$pair.value.expandable"
                                },
                                T.TAG("$pair.value.tag", {"node": "$pair.value.node"})
                            ),
                            T.IF("$pair.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            shortTag:
                T.SPAN({"class": "map", "_nodeObject": "$node"}, T.SPAN("$VAR_label("),
                    T.FOR("pair", "$context,$node,$CONST_Short|mapIterator",
                        T.SPAN({"class": "pair"},
                            T.TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                            T.SPAN({"class": "delimiter"}, "=>"),
                            T.SPAN({
                                    "class": "value",
                                    "onclick": "$onClick",
                                    "_nodeObject": "$pair.value.node",
                                    "_expandable": "$pair.value.expandable"
                                },
                                T.TAG("$pair.value.tag", {"node": "$pair.value.node"})
                            ),
                            T.IF("$pair.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            collapsedTag: 
                T.SPAN({"class": "map"}, T.SPAN("$VAR_label("),
                    T.SPAN({"class": "collapsed"}, "... $node|getItemCount ..."),
                T.SPAN(")")),
    
            moreTag:
                T.SPAN(" ... "),   
            
            getItemCount: function(node) {
                if(!node.value) return 0;
                return node.value.length;
            },

            onClick: function(event) {
                var row = domplate.util.getAncestorByClass(event.target, "value");
                if(row.expandable) {
                    this.toggleRow(row);
                }
                event.stopPropagation();
            },
            
            isCollapsible: function (node) {
                return (node.type=="reference" ||
                        node.type=="dictionary" ||
                        node.type=="map" ||
                        node.type=="array");
            },

            getTag: function (rep, type, node) {
                if (node.meta && node.meta.collapsed) {
                    if (this.isCollapsible(node)) {
                        type = "collapsedTag";
                    } else {
                        type = "shortTag";
                    }
                }
                if (typeof rep[type] === "undefined") {
                    if (type == "shortTag") {
                        return rep.tag;
                    }
                    throw new Error("Rep does not have tag of type: " + type);
                }
                return rep[type];
            },
            
            toggleRow: function(row)
            {
                var node = null;
                if (domplate.util.hasClass(row, "expanded")) {
                    node = this.collapsedTag.replace({
                        "node": row.nodeObject
                    }, row);
                    domplate.util.removeClass(row, "expanded");
                } else {
                    var valueRep = helpers.getTemplateForNode(row.nodeObject).tag;
                    node = valueRep.replace({
                        "node": row.nodeObject
                    }, row);
                    domplate.util.setClass(row, "expanded");
                }
            },
    
            mapIterator: function(context, node, type) {
                var pairs = [];
                if(!node.value) return pairs;
                for( var i=0 ; i<node.value.length ; i++ ) {

                    var valueRep = this.getTag(context.repForNode(node.value[i][1]), type, node.value[i][1]);
    
                    if(i>2 && type==this.CONST_Short) {
                        valueRep = this.moreTag;
                    }

                    pairs.push({
                        "key": {
                            "tag": this.getTag(context.repForNode(node.value[i][0]), type, node.value[i][0]),
                            "node": domplate.util.merge(node.value[i][0], {"wrapped": true})
                        },
                        "value": {
                            "tag": valueRep,
                            "node": domplate.util.merge(node.value[i][1], {"wrapped": true}),
                            "expandable": this.isCollapsible(node.value[i][1])
                        },
                        "more": (i<node.value.length-1)
                    });
    
                    if(i>2 && type==this.CONST_Short) {
                        pairs[pairs.length-1].more = false;
                        break;
                    }
                }
                return pairs;
            }
        };
    },
    css: (css () >>>

        :scope SPAN.map > SPAN {
            color: #9C9C9C;
            font-weight: bold;
        }
        
        :scope SPAN.map > DIV.pair {
            display: block;
            padding-left: 20px;
        }
        
        :scope SPAN.map > SPAN.pair {
            padding-left: 2px;
        }
        
        :scope SPAN.map > .pair > SPAN.delimiter,
        :scope SPAN.map > .pair > SPAN.separator {
            color: #9C9C9C;
            padding-left: 2px;
            padding-right: 2px;
        }

    <<<)
}
