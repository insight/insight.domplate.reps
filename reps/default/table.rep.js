{
    struct: {
        node: {
            meta: {
                renderer: "structures/table"
            },
            value: {
                title: {
                    type: "string",
                    value: "Title!"
                },
                header: [
                    {
                        type: "string",
                        value: "Column 1"
                    },
                    {
                        type: "string",
                        value: "Column 2"
                    }
                ],
                body: [
                    [
                        {
                            type: "string",
                            value: "Row 1 Column 1"
                        },
                        {
                            type: "string",
                            value: "Row 1 Column 2"
                        }
                    ],
                    [
                        {
                            type: "string",
                            value: "Row 2 Column 1"
                        },
                        {
                            type: "string",
                            value: "Row 2 Column 2"
                        }
                    ]
                ]
            }
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            VAR_hideShortTagOnExpand: false,

            meta: {
                console: {
                    enableInspect: false
                }
            },

            tag:
                T.DIV({"class": "table"},
                    T.TABLE({"cellpadding": 3, "cellspacing": 0},
                        T.TBODY(
                            T.TR({"class":"$node|getHeaderClass"},
                                T.FOR("column", "$context,$node|getHeaders",
                                    T.TH({"class": "header"}, T.TAG("$column.tag", {"node": "$column.node"}))
                                ),
                                T.IF("$node|hasNoHeader",
                                    T.TH()    // needed to fix gecko bug that does not render table border if empty <tr/> in table
                                )
                            ),
                            T.FOR("row", "$node|getRows",
                                T.TR(
                                    T.FOR("cell", "$context,$row|getCells",
                                        T.TD({"class": "cell", "_cellNodeObj": "$cell.node", "onclick":"$onCellClick"},
                                            T.TAG("$cell.tag", {"node": "$cell.node", "context": "$context"}))
                                    )
                                )
                            )
                        )
                    )
                ),

            shortTag:
                T.SPAN({"class": "table"}, T.TAG("$context,$node|getTitleTag", {"node": "$node|getTitleNode", "context": "$context"})),

            getTitleTagDbid: function(context, node) {
                var tag = this.getTitleTag(context, node);
                if (!tag) return '';
                return tag.__dbid;
            },

            getTitleTag: function(context, node) {
                var rep = context.repForNode(this.getTitleNode(node));
                return rep.shortTag || rep.tag;
            },

            getTitleNode: function(node) {
                return domplate.util.merge(node.value.title, {"wrapped": false});
            },
            
            getHeaderClass: function(node)
            {
                if (this.hasNoHeader(node)) {
                    return "hide";
                } else {
                    return "";
                }
            },

            hasNoHeader: function(node) {
                return (!node.value.header);
            },

            getHeaders: function(context, node) {
                var header = node.value.header;
                var items = [];
                for (var i = 0; i < header.length; i++) {
                    var rep = context.repForNode(header[i]);
                    items.push({
                        "node": domplate.util.merge(header[i], {"wrapped": false}),
                        "tag": rep.shortTag || rep.tag
                    });
                }
                return items;
            },
    
            getRows: function(node) {
                return node.value.body || [];
            },
    
            getCells: function(context, row) {
                var items = [];
                if(domplate.util.isArrayLike(row)) {
                    for (var i = 0; i < row.length; i++) {
                        var rep = context.repForNode(row[i]);
                        var item = {
                            "node": domplate.util.merge(row[i], {"wrapped": false}),
                            "tag": rep.shortTag || rep.tag
                        };
                        items.push(item);
                    }
                } else
                if(row.meta && row.meta['encoder.trimmed']) {
                    var rep = context.repForNode(row);
                    var item = {
                        "node": domplate.util.merge(row, {"wrapped": false}),
                        "tag": rep.shortTag || rep.tag
                    };
                    items.push(item);
                }
                return items;
            },
    
            onCellClick: function(event) {
                event.stopPropagation();

                var masterRow = this._getMasterRow(event.target);
                //masterRow.messageObject

                var tag = event.target;
                while(tag.parentNode) {
                    if (tag.cellNodeObj) {
                        break;
                    }
                    tag = tag.parentNode;
                }

                masterRow.contextObject.dispatchEvent('inspectNode', [event, {
                    //"message": tag.argNodeObj.messageObject,
                    //"masterTag": masterRow,
                    "args": {
                        "node": tag.cellNodeObj
                    }
                }]);
            },

            _getMasterRow: function(row)
            {
                while(true) {
                    if(!row.parentNode) {
                        return null;
                    }
                    if(domplate.util.hasClass(row, "console-message")) {
                        break;
                    }
                    row = row.parentNode;
                }
                return row;
            }

        };
    },
    css: (css () >>>

        SPAN.table {
            background-image: url(images/table.png);
            background-repeat: no-repeat;
            background-position: 4px -1px;
            padding-left: 25px;
        }
        
        DIV.table {
            padding: 0px;
            margin: 0px;
        }
        
        DIV.table TABLE {
          border-bottom: 1px solid #D7D7D7;
          border-right: 1px solid #D7D7D7;
        }
        
        DIV.table TABLE TBODY TR.hide {
          display: none;
        }
        
        DIV.table TABLE TBODY TR TH.header {
          vertical-align: top;
          font-weight: bold;
          text-align: center;
          border: 1px solid #D7D7D7;
          border-bottom: 0px;
          border-right: 0px;
          background-color: #ececec;
          padding: 2px;
          padding-left: 10px;
          padding-right: 10px;
        }
        
        DIV.table TABLE TBODY TR TD.cell {
          vertical-align: top;
          padding-right: 10px;
          border: 1px solid #D7D7D7;
          border-bottom: 0px;
          border-right: 0px;
          padding: 2px;
          padding-left: 10px;
          padding-right: 10px;
        }
        
        DIV.table TABLE TBODY TR TD.cell:hover {
            background-color: #ffc73d;
            cursor: pointer;    
        }        

    <<<)
}