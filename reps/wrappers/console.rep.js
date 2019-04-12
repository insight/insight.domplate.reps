{
    struct: {
        node: {
            meta: {
                wrapper: "wrappers/console"
            },
            type: "string",
            value: "Hello World!"        
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
                        "onmouseover":"$onMouseOver",
                        "onmousemove":"$onMouseMove",
                        "onmouseout":"$onMouseOut",
                        "onclick":"$onClick",
                        "expandable": "$node|_isExpandable",
                        "expanded": "false",
                        "_templateObject": "$node|_getTemplateObject"
                    },
                    T.DIV(
                        {
                            "class": "$node|_getHeaderClass",
                            "hideOnExpand": "$context,$node|_getHideShortTagOnExpand"
                        },
                        T.DIV({"class": "expander"}),
                        T.DIV({"class": "actions"},
                            T.DIV({"class": "inspect", "onclick":"$onClick"}),
                            T.DIV({"class": "file $node|_getFileActionClass", "onclick":"$onClick"})
                        ),
                        T.SPAN(
                            {"class": "summary"},
                            T.SPAN({"class": "label"},    // WORKAROUND: T.IF does not work at top level due to a bug
                                T.IF("$node|_hasLabel", T.SPAN("$node|_getLabel"))
                            ),
                            T.TAG("$context,$node,$CONST_Short|_getTag", {
                                "node": "$context,$node|_getValue"
//                                "message": "$node"
                            })
                        ),
                        T.SPAN({"class": "fileline"}, 
                            T.DIV(  // WORKAROUND: T.IF does not work at top level due to a bug
                                T.IF("$node|_hasLabel", T.DIV({"class": "label"}, "$node|_getLabel"))
                            ),
                            T.DIV("$node|_getFileLine"))
                    ),
                    T.DIV({"class": "$node|_getBodyClass"})
                ),

            groupNoMessagesTag:
                T.DIV({"class": "group-no-messages"}, "No Messages"),    

            _getTemplateObject: function () {
                return this;
            },
    
            _getMessageClass: function (message) {

                // TODO: Move this into more of an 'init' method
                message.postRender = {};
                
                if(typeof message.meta["group.start"] != "undefined") {
                    return "console-message " + "console-message-group";
                } else {
                    return "console-message";
                }
            },
    
            _getHeaderClass: function (message) {
                if(!message.meta || !message.meta["priority"]) {
                    return "header";
                }
                return "header header-priority-" + message.meta["priority"];
            },
    
            _getBodyClass: function (message) {
                if(!message.meta || !message.meta["priority"]) {
                    return "body";
                }
                return "body body-priority-" + message.meta["priority"];
            },
            
            _getFileLine: function (message) {
                if(!message.meta) {
                    return "";
                }
                var str = [];
                if(message.meta["file"]) {
                    str.push(domplate.util.cropStringLeft(message.meta["file"], 75));
                }
                if(message.meta["line"]) {
                    str.push("@");
                    str.push(message.meta["line"]);
                }
                return str.join(" ");
            },
    
            // TODO: Need better way to set/determine if tag should be hidden
            _getHideShortTagOnExpand: function (context, node) {
                if(typeof node.meta["group.start"] != "undefined") {
                    return "false";
                }
                var rep = context.repForNode(node);
                if(rep.VAR_hideShortTagOnExpand===false) {
                    return "false";
                    
                }
                if(node.type == "reference") {
                    if (node.meta["lang.type"] == "exception") {
                        return "false";
                    }
                }
                return "true";
            },
    
            _isExpandable: function (message) {
/*
                switch(message.getObjectGraph().getOrigin().type) {
                    case "array":
                    case "reference":
                    case "dictionary":
                    case "map":
                    case "text":
                        break;
                }
*/
                return true;
            },
            
            _getFileActionClass: function (message) {
                if(message.meta["file"]) return "";
                return "hidden";
            },
    
            _getTag: function (context, node, type) {
                var rep = context.repForNode(node);
                if (type == this.CONST_Short) {
                    if (rep.shortTag) {
                        return rep.shortTag;
                    }
                }
                return rep.tag;
            },
            
            _getRep: function (message) {
                return message.template;
/*
                var rep;
                
                if(message.meta && message.meta["renderer"]) {
                    rep = helpers.getTemplateForId(message.meta["renderer"]);
                } else {
                    rep = helpers.getTemplateForNode(message.getObjectGraph().getOrigin());
                }
                return rep;
*/
            },
    
            _hasLabel: function (message) {
                if (message.meta && typeof message.meta["label"] != "undefined") {
                    return true;
                } else {
                    return false;
                }
            },
    
            _getLabel: function (message) {
                if (this._hasLabel(message)) {
                    return message.meta["label"];
                } else {
                    return "";
                }
            },
    
            _getValue: function (context, node) {
                if (typeof node.meta["group.start"] != "undefined") {
                    node.meta["string.trim.enabled"] = false;
                }
                return node;
            },
    
            onMouseMove: function (event) {
    /*            
                if(activeInfoTip) {
                    var x = event.clientX, y = event.clientY;
                    infoTipModule.showInfoTip(activeInfoTip, {
                        showInfoTip: function() {
                            return true;
                        }
                    }, event.target, x, y, event.rangeParent, event.rangeOffset);
                }
    */            
            },
        
            onMouseOver: function (event) {
                // set a class on our logRow parent identifying this log row as fireconsole controlled
                // this is used for hover and selected styling
                //domplate.util.setClass(this._getMasterRow(event.target).parentNode, "logRow-" + PACK.__NS__ + "console-message");
    
                if(domplate.util.getChildByClass(this._getMasterRow(event.target), "__no_inspect")) {
                    return;
                }
    
                // populate file/line info tip
    /*            
                var meta = this._getMasterRow(event.target).repObject.meta;
                if(meta && (meta["fc.msg.file"] || meta["fc.msg.line"])) {
                    activeInfoTip = event.target.ownerDocument.getElementsByClassName('infoTip')[0];
                    this.fileLineInfoTipTag.replace({
                        "file": meta["fc.msg.file"] || "?",
                        "line": meta["fc.msg.line"] || "?"
                    }, activeInfoTip);
                } else {
                    activeInfoTip = null;
                }
    */            
            },
        
            onMouseOut: function (event) {
    //            if(activeInfoTip) {
    //                infoTipModule.hideInfoTip(activeInfoTip);
    //            }
            },
            
            onClick: function (event) {
    //            if(this.util.getChildByClass(this._getMasterRow(event.target), "__no_inspect")) {
    //                return;
    //            }
                    var masterRow = this._getMasterRow(event.target),
                        headerTag = domplate.util.getChildByClass(masterRow, "header"),
                        actionsTag = domplate.util.getChildByClass(headerTag, "actions"),
                        summaryTag = domplate.util.getChildByClass(headerTag, "summary"),
                        bodyTag = domplate.util.getChildByClass(masterRow, "body");

                    var pointer = {
                        x: event.clientX,
                        y: event.clientY
                    };
                    var masterRect = {
                        "left": headerTag.getBoundingClientRect().left-2,
                        "top": headerTag.getBoundingClientRect().top-2,
                        // actionsTag.getBoundingClientRect().left is 0 if actions tag not showing
                        "right": actionsTag.getBoundingClientRect().left || headerTag.getBoundingClientRect().right,
                        "bottom": headerTag.getBoundingClientRect().bottom+1
                    };
        
                    if (pointer.x >= masterRect.left && pointer.x <= masterRect.right && pointer.y >= masterRect.top && pointer.y <= masterRect.bottom) {
                        event.stopPropagation();
                        
                        if(masterRow.getAttribute("expanded")=="true") {
        
                            masterRow.setAttribute("expanded", "false");

                            masterRow.contextObject.dispatchEvent('contract', [event, {
                                "message": masterRow.messageObject,
                                "masterTag": masterRow,
                                "summaryTag": summaryTag,
                                "bodyTag": bodyTag
                            }]);
                        } else {

                            masterRow.setAttribute("expanded", "true");

                            masterRow.contextObject.dispatchEvent('expand', [event, {
                                "message": masterRow.messageObject,
                                "masterTag": masterRow,
                                "summaryTag": summaryTag,
                                "bodyTag": bodyTag
                            }]);

                            if(!bodyTag.innerHTML) {
                                if(typeof masterRow.messageObject.meta["group.start"] != "undefined") {                                            
                                    this.groupNoMessagesTag.replace({}, bodyTag, this);
                                } else {
                                    this.expandForMasterRow(masterRow, bodyTag);
                                }
                                this.postRender(bodyTag);
                            }
                        }
                    } else
                    if(domplate.util.hasClass(event.target, "inspect")) {
                        event.stopPropagation();

                        masterRow.contextObject.dispatchEvent('inspectMessage', [event, {
                            "message": masterRow.messageObject,
                            "masterTag": masterRow,
                            "summaryTag": summaryTag,
                            "bodyTag": bodyTag,
                            "args": {
                                "node": masterRow.messageObject
                            }
                        }]);
                    } else
                    if(domplate.util.hasClass(event.target, "file")) {
                        event.stopPropagation();
                        var args = {
                            "file": masterRow.messageObject.meta.file,
                            "line": masterRow.messageObject.meta.line
                        };
                        if(args["file"] && args["line"]) {

                            masterRow.contextObject.dispatchEvent('inspectFile', [event, {
                                "message": masterRow.messageObject,
                                "masterTag": masterRow,
                                "summaryTag": summaryTag,
                                "bodyTag": bodyTag,
                                "args": args
                            }]);
                        }
                    } else {
                        event.stopPropagation();

                        masterRow.contextObject.dispatchEvent('click', [event, {
                            "message": masterRow.messageObject,
                            "masterTag": masterRow,
                            "valueTag": valueTag,
                            "bodyTag": bodyTag
                        }]);
                    }
            },

            setCount: function (node, count) {
                try {
                    var masterRow = this._getMasterRow(node),
                        headerTag = domplate.util.getChildByClass(masterRow, "header"),
                        summaryTag = domplate.util.getChildByClass(headerTag, "summary");

                    summaryTag.children[1].innerHTML += ' <span class="count">(' + count + ')</span>';

                } catch(e) {
                    helpers.logger.error("Error setting count for node!: " + e);
                }                                                
            },
        
            postRender: function (node) {
                var node = this._getMasterRow(node);
                if (node.messageObject && typeof node.messageObject.postRender == "object") {
                    if (typeof node.messageObject.postRender.keeptitle !== "undefined") {
                        node.setAttribute("keeptitle", node.messageObject.postRender.keeptitle?"true":"false");
                    }
                }
            },

            expandForMasterRow: function (masterRow, bodyTag) {

                masterRow.setAttribute("expanded", "true");
//                masterRow.messageObject.render(bodyTag, "detail", masterRow.messageObject);

                var rep = masterRow.contextObject.repForNode(masterRow.messageObject);

                rep.tag.replace({
                    "node": masterRow.messageObject
                }, bodyTag, rep);


/*
                this.expandedStub.replace({
                    "tag": row.context.repForNode(row.memberObject.node).tag,
                    "member": row.memberObject,
                    "node": row.memberObject.node,
                    "context": row.context
                }, valueElement);
*/                

/*
                var rep = this._getRep(masterRow.messageObject, this.CONST_Normal);
                rep.tag.replace({
                    "node": masterRow.messageObject.getObjectGraph().getOrigin(),
                    "message": masterRow.messageObject
                }, bodyTag, rep);
*/
            },
    
            _getMasterRow: function (row) {
                while (true) {
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

        :scope DIV.console-message {
            position: relative;
            margin: 0;
            border-bottom: 1px solid #D7D7D7;
            padding: 0px;
            background-color: #FFFFFF;
        }
        :scope DIV.console-message.selected {
            background-color: #35FC03 !important;
        }
        :scope DIV.console-message-group[expanded=true] {
            background-color: #77CDD9;
        }
        :scope DIV.console-message > DIV.header {
            position: relative;
            padding-left: 34px;
            padding-right: 10px;
            padding-top: 3px;
            padding-bottom: 4px;
            cursor: pointer;
        }
        :scope DIV.console-message[expanded=true] > DIV.header {
            text-align: right;
            min-height: 16px;
        }
        :scope DIV.console-message[expanded=false] > DIV.header:hover {
            background-color: #ffc73d;
        }
        :scope DIV.console-message-group > DIV.header {
            background: url(images/document_page_next.png) no-repeat;
            background-position: 2px 3px;
            font-weight: bold;
            background-color: #77CDD9;
        }
        :scope DIV.console-message > DIV.header-priority-info {
            background: url(images/information.png) no-repeat;
            background-position: 2px 3px;
            background-color: #c6eeff;
        }
        :scope DIV.console-message > DIV.header-priority-warn {
            background: url(images/exclamation-diamond.png) no-repeat;
            background-position: 2px 3px;
            background-color: #ffe68d;
        }
        :scope DIV.console-message > DIV.header-priority-error {
            background: url(images/exclamation-red.png) no-repeat;
            background-position: 2px 3px;
            background-color: #ffa7a7;
        }
        :scope DIV.console-message > DIV.header > DIV.expander {
            background-color: black;
            width: 18px;
            height: 18px;
            display: inline-block;
            float: left;
            position: relative;
            top: -1px;
            margin-left: -14px;
        }
        :scope DIV.console-message > DIV.header > DIV.expander:hover {
            cursor: pointer;
        }
        :scope DIV.console-message[expanded=false] > DIV.header > DIV.expander {
            background: url(images/plus-small-white.png) no-repeat;
            background-position: 0px 1px;
        }
        :scope DIV.console-message[expanded=true] > DIV.header > DIV.expander {
            background: url(images/minus-small-white.png) no-repeat;
            background-position: 0px 1px;
        }
        :scope DIV.console-message > DIV.header > SPAN.summary > SPAN.label > SPAN,
        :scope DIV.console-message > DIV.header > SPAN.fileline > DIV > DIV.label {
            margin-right: 5px;
            background-color: rgba(69,68,60,1);
            padding-left: 5px;
            padding-right: 5px;
            color: white;
            vertical-align: top;
            margin-top: 1px;
        }
        :scope DIV.console-message > DIV.header > SPAN.fileline > DIV > DIV.label {
            float: left;
            margin-top: 0px;
        }
        :scope DIV.console-message > DIV.header > SPAN.summary > SPAN > SPAN.count {
            color: #8c8c8c;
        }
        :scope DIV.console-message > DIV.header > SPAN.fileline {
            color: #8c8c8c;
            word-wrap: break-word;
        }
        :scope DIV.console-message[expanded=true] > DIV.header > SPAN.summary {
            display: none;
        }
        :scope DIV.console-message[keeptitle=true] > DIV.header,
        :scope DIV.console-message-group > DIV.header {
            text-align: left !important;
        }
        :scope DIV.console-message[keeptitle=true] > DIV.header > SPAN.fileline,
        :scope DIV.console-message-group > DIV.header > SPAN.fileline {
            display: none !important;
        }
        :scope DIV.console-message[keeptitle=true] > DIV.header > SPAN.summary,
        :scope DIV.console-message-group > DIV.header > SPAN.summary {
            display: inline !important;
        }
        :scope DIV.console-message-group > DIV.header > DIV.actions {
            display: none !important;
        }
        :scope DIV.console-message-group > DIV.header > SPAN.summary > SPAN > SPAN.count {
            color: #ffffff !important;
        }
        :scope DIV.console-message[expanded=false] > DIV.header > SPAN.fileline {
            display: none;
        }
        :scope DIV.console-message > DIV.header > DIV.actions {
            display: inline-block;
            position: relative;
            top: 0px;
            left: 10px;
            float: right;
            margin-left: 0px;
            margin-right: 5px;
        }
        :scope DIV.console-message > DIV.header > DIV.actions DIV.inspect {
            display: inline-block;
            background: url(images/node-magnifier.png) no-repeat;
            width: 16px;
            height: 16px;
            margin-right: 4px;
        }
        :scope DIV.console-message > DIV.header > DIV.actions > DIV.file {
            display: inline-block;
            background: url(images/document-binary.png) no-repeat;
            width: 16px;
            height: 16px;
            margin-right: 4px;
        }
        :scope DIV.console-message > DIV.header > DIV.actions > DIV.inspect:hover,
        :scope DIV.console-message > DIV.header > DIV.actions > DIV.file:hover {
            cursor: pointer;
        }
        :scope DIV.console-message > DIV.body {
            padding: 6px;
            margin: 3px;
            margin-top: 0px;
        }
        :scope DIV.console-message[expanded=false] > DIV.body {
            display: none;
        }
        :scope DIV.console-message-group > DIV.body {
            padding: 0px;
            margin: 0px;
            margin-left: 20px;
            border-top: 1px solid #000000;
            border-left: 1px solid #000000;
            margin-bottom: -1px;
        }
        :scope DIV.console-message > DIV.body-priority-info {
            border: 3px solid #c6eeff;
            margin: 0px;
            border-top: 0px;
        }
        :scope DIV.console-message > DIV.body-priority-warn {
            border: 3px solid #ffe68d;
            margin: 0px;
            border-top: 0px;
        }
        :scope DIV.console-message > DIV.body-priority-error {
            border: 3px solid #ffa7a7;
            margin: 0px;
            border-top: 0px;
        }
        :scope DIV.console-message > DIV.body > DIV.group-no-messages {
            background-color: white;
            padding-left: 4px;
            padding-right: 4px;
            padding-top: 3px;
            padding-bottom: 3px;
            color: gray;
        }
        :scope DIV.console-message .hidden {
            display: none !important;
        }

    <<<)
}