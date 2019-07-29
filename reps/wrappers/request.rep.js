{
    struct: {
        node: {
            meta: {
                "wrapper": "wrappers/request"
            },
            value: {
                title: {
                    type: "string",
                    value: "Title!"
                },
                typeLabel: {
                    type: "string",
                    value: "AJAX"
                }
            }
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;

        return {

            CONST_Short: "shortTag",

            tag:
                T.DIV(
                    {
                        "class": "$node|_getMessageClass",
                        "_messageObject": "$node",
                        "_contextObject": "$context",
                        "onclick":"$onClick",
                        "expanded": "true",
                        "_templateObject": "$node|_getTemplateObject"
                    },
                    T.DIV(
                        {
                            "class": "$node|_getHeaderClass"
                        },
                        T.DIV({"class": "expander"}),
                        T.DIV({"class": "labels"},
                            "$context,$node|_getTypeLabelValueString"
                        ),
                        T.SPAN(
                            {"class": "summary"},
                            T.TAG("$context,$node,$CONST_Short|_getTitleTag", {
                                "node": "$context,$node|_getTitleValue",
                                "context": "$context"
                            })
                        )
                    ),
                    T.DIV({"class": "body"})
                ),

            _getTemplateObject: function () {
                return this;
            },
    
            _getMessageClass: function (message) {
                return "console-request";
            },
    
            _getHeaderClass: function (message) {
                return "header";
            },

            _getTitleTag: function (context, node, type) {
                var rep = context.repForNode(node.value.title);
                if (type == this.CONST_Short) {
                    if (rep.shortTag) {
                        return rep.shortTag;
                    }
                }
                return rep.tag;
            },

            _getTitleValue: function (context, node) {
                return node.value.title;
            },

            _getTypeLabelValueString: function (context, node) {
                return node.value.typeLabel.value;
            },

            onClick: function (event) {
                    var masterRow = this._getMasterRow(event.target),
                        headerTag = domplate.util.getChildByClass(masterRow, "header"),
                        labelsTag = domplate.util.getChildByClass(headerTag, "labels"),
                        summaryTag = domplate.util.getChildByClass(headerTag, "summary"),
                        bodyTag = domplate.util.getChildByClass(masterRow, "body");

                    var pointer = {
                        x: event.clientX,
                        y: event.clientY
                    };
                    var masterRect = {
                        "left": headerTag.getBoundingClientRect().left-2,
                        "top": headerTag.getBoundingClientRect().top-2,
                        // labelsTag.getBoundingClientRect().left is 0 if labels tag not showing
                        "right": labelsTag.getBoundingClientRect().left || headerTag.getBoundingClientRect().right,
                        "bottom": headerTag.getBoundingClientRect().bottom+1
                    };
        
                    if (pointer.x >= masterRect.left && pointer.x <= masterRect.right && pointer.y >= masterRect.top && pointer.y <= masterRect.bottom) {
                        event.stopPropagation();
                        
                        if(masterRow.getAttribute("expanded")=="true") {
        
                            masterRow.setAttribute("expanded", "false");

                            // masterRow.contextObject.dispatchEvent('contract', [event, {
                            //     "message": masterRow.messageObject,
                            //     "masterTag": masterRow,
                            //     "summaryTag": summaryTag,
                            //     "bodyTag": bodyTag
                            // }]);
                        } else {

                            masterRow.setAttribute("expanded", "true");

                            // masterRow.contextObject.dispatchEvent('expand', [event, {
                            //     "message": masterRow.messageObject,
                            //     "masterTag": masterRow,
                            //     "summaryTag": summaryTag,
                            //     "bodyTag": bodyTag
                            // }]);

                            //if(!bodyTag.innerHTML) {
                            //    this.expandForMasterRow(masterRow, bodyTag);
                            //}
                        }
                    } else {
                        event.stopPropagation();

                        // masterRow.contextObject.dispatchEvent('click', [event, {
                        //     "message": masterRow.messageObject,
                        //     "masterTag": masterRow,
                        //     "bodyTag": bodyTag
                        // }]);
                    }
            },

//            expandForMasterRow: function (masterRow, bodyTag) {

//                masterRow.setAttribute("expanded", "true");
//                masterRow.messageObject.render(bodyTag, "detail", masterRow.messageObject);

//console.log("EXPAND", masterRow, bodyTag);
/*
                var rep = masterRow.contextObject.repForNode(masterRow.messageObject);

                rep.tag.replace({
                    "node": masterRow.messageObject,
                    "context": masterRow.contextObject
                }, bodyTag, rep);
*/
//            },

            _getMasterRow: function (row) {
                while (true) {
                    if(!row.parentNode) {
                        return null;
                    }
                    if(domplate.util.hasClass(row, "console-request")) {
                        break;
                    }
                    row = row.parentNode;
                }
                return row;
            }
        };
    },
    css: (css () >>>

        DIV.console-request {
            position: relative;
            margin: 0;
            border-bottom: 1px solid #D7D7D7;
            padding: 0px;
            background-color: steelblue;
        }
        DIV.console-request.selected {
            background-color: #35FC03 !important;
        }
        DIV.console-request > DIV.header {
            position: relative;
            padding-left: 34px;
            padding-right: 10px;
            padding-top: 4px;
            padding-bottom: 4px;
            cursor: pointer;
            min-height: 16px;
        }
        DIV.console-request[expanded=false] > DIV.header:hover {
            background-color: #ffc73d;
        }
        DIV.console-request > DIV.header > DIV.expander {
            background-color: black;
            width: 18px;
            height: 18px;
            display: inline-block;
            float: left;
            position: relative;
            top: -1px;
            margin-left: -14px;
        }
        DIV.console-request > DIV.header > DIV.expander:hover {
            cursor: pointer;
        }
        DIV.console-request[expanded=false] > DIV.header > DIV.expander {
            background: url(images/plus-small-white.png) no-repeat;
            background-position: 0px 1px;
        }
        DIV.console-request[expanded=true] > DIV.header > DIV.expander {
            background: url(images/minus-small-white.png) no-repeat;
            background-position: 0px 1px;
        }
        DIV.console-request > DIV.header > SPAN.fileline > DIV > DIV.label {
            float: left;
            margin-top: 0px;
        }
        DIV.console-request > DIV.header > SPAN.summary > SPAN > SPAN.count {
            color: #8c8c8c;
        }
        DIV.console-request > DIV.header > SPAN.fileline {
            color: #8c8c8c;
            word-wrap: break-word;
            float: right;
        }
        DIV.console-request > DIV.header > SPAN.summary > SPAN {
            color: #e6e6e6;
        }
        DIV.console-request[expandedSummary=true] > DIV.header > SPAN.summary {
            display: none;
        }
        DIV.console-request > DIV.header {
            text-align: left !important;
        }
        DIV.console-request[keeptitle=true] > DIV.header > SPAN.summary {
            display: inline !important;
        }
        DIV.console-request > DIV.header > DIV.labels {
            display: inline-block;
            position: relative;
            top: 0px;
            left: 10px;
            float: right;
            margin-left: 0px;
            margin-right: 5px;
            font-weight: bold;
            color: #c8daea;
            padding-top: 1px;
        }
        DIV.console-request > DIV.body {
            padding: 0px;
            margin: 0px;
            background-color: #ffffff;
        }
        DIV.console-request[expanded=false] > DIV.body {
            display: none;
        }
        DIV.console-request .hidden {
            display: none !important;
        }

    <<<)
}