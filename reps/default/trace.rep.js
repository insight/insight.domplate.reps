{
    struct: {
        node: {
            meta: {
                renderer: "structures/trace"
            },
            value: {
                title: {
                    type: "string",
                    value: "Title!"
                },
                stack: [
                    {
                        file: "File ...",
                        line: "10",
                        class: "Class",
                        args: [
                            {
                                type: "string",
                                value: "Arg 1"
                            },
                            {
                                type: "string",
                                value: "Arg 2"
                            }
                        ]
                    },
                    {
                        file: "File ...",
                        line: "5",
                        function: "Function",
                        args: [
                            {
                                type: "string",
                                value: "Arg 1"
                            },
                            {
                                type: "string",
                                value: "Arg 2"
                            }
                        ]
                    }
                ]
            }
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            VAR_hideShortTagOnExpand: false,
            
            tag:
                T.DIV({"class": "structures-trace"},
                    T.TABLE({"cellpadding": 3, "cellspacing": 0},
                        T.TBODY(
                            T.TR(
                                T.TH({"class": "header-file"}, "File"),
                                T.TH({"class": "header-line"}, "Line"),
                                T.TH({"class": "header-inst"}, "Instruction")
                            ),
                            T.FOR("frame", "$node|getCallList",
                                T.TR({"_frameNodeObj": "$frame.node"},
                                    T.TD({"class": "cell-file", "onclick":"$onFileClick"}, "$frame.file"),
                                    T.TD({"class": "cell-line", "onclick":"$onFileClick"}, "$frame.line"),
                                    T.TD({"class": "cell-inst"},
                                        T.DIV("$frame|getFrameLabel(",
                                            T.FOR("arg", "$context,$frame|argIterator",
                                                T.DIV({"class": "arg", "_argNodeObj": "$arg.node", "onclick":"$onArgClick"},
                                                    T.TAG("$arg.tag", {"node": "$arg.node"}),
                                                    T.IF("$arg.more", T.SPAN({"class": "separator"}, ","))
                                                )
                                            ),
                                        ")")
                                    )
                                )
                            )
                        )
                    )
                ),
    
            shortTag:
                T.SPAN({"class": "structures-trace"}, T.TAG("$context,$node|getCaptionTag", {"node": "$node|getCaptionNode"})),
    
    
            onFileClick: function(event) {
                event.stopPropagation();
                var node = event.target.parentNode.frameNodeObj,
                    frame = node;
                if(!frame.file || !frame.line) {
                    return;
                }
                var args = {
                    "file": frame.file.value,
                    "line": frame.line.value
                };
                if(args["file"] && args["line"]) {
                    domplate.util.dispatchEvent('inspectFile', [event, {
                        "message": node.getObjectGraph().message,
                        "args": args
                    }]);
                }
            },
    
            onArgClick: function(event) {
                event.stopPropagation();
                var tag = event.target;
                while(tag.parentNode) {
                    if(tag.argNodeObj) {
                        break;
                    }
                    tag = tag.parentNode;
                }
                domplate.dispatchEvent('inspectNode', [event, {
                    "message": tag.argNodeObj.getObjectGraph().message,
                    "args": {"node": tag.argNodeObj}
                }]);
            },
    
            getCaptionTag: function(context, node) {
                var rep = context.repForNode(this.getCaptionNode(node));
                return rep.shortTag || rep.tag;
            },
    
            getCaptionNode: function(node) {
                return domplate.util.merge(node.value.title, {"wrapped": false});
            },

            getTrace: function(node) {
                return node.value.stack;
            },

            postRender: function(node)
            {
;debugger;                    
/*                    
                var node = this._getMasterRow(node);
                if (node.messageObject && typeof node.messageObject.postRender == "object")
                {
                    if (typeof node.messageObject.postRender.keeptitle !== "undefined")
                    {
                        node.setAttribute("keeptitle", node.messageObject.postRender.keeptitle?"true":"false");
                    }
                }
*/                    
            },

            getCallList: function(node) {

                // TODO: Do this in an init method
/*
                if (node.messageObject && typeof node.messageObject.postRender == "object") {
                    if (typeof node.messageObject.postRender.keeptitle !== "undefined") {
                        node.setAttribute("keeptitle", "true");
                    }
                }                    
*/
                try {
                    var list = [];
                    this.getTrace(node).forEach(function(node) {
                        var frame = node;
                        list.push({
                            'node': node,
                            'file': (frame.file)?frame.file:"",
                            'line': (frame.line)?frame.line:"",
                            'class': (frame["class"])?frame["class"]:"",
                            'function': (frame["function"])?frame["function"]:"",
                            'type': (frame.type)?frame.type:"",
                            'args': (frame.args)?frame.args:false
                        });
                    });
    
                    // Now that we have all call events, lets see if we can shorten the filenames.
                    // This only works for unix filepaths for now.
                    // TODO: Get this working for windows filepaths as well.
                    try {
                        if (list[0].file.substr(0, 1) == '/') {
                            var file_shortest = list[0].file.split('/');
                            var file_original_length = file_shortest.length;
                            for (var i = 1; i < list.length; i++) {
                                var file = list[i].file.split('/');
                                for (var j = 0; j < file_shortest.length; j++) {
                                    if (file_shortest[j] != file[j]) {
                                        file_shortest.splice(j, file_shortest.length - j);
                                        break;
                                    }
                                }
                            }
                            if (file_shortest.length > 2) {
                                if (file_shortest.length == file_original_length) {
                                    file_shortest.pop();
                                }
                                file_shortest = file_shortest.join('/');
                                for (var i = 0; i < list.length; i++) {
                                    list[i].file = '...' + list[i].file.substr(file_shortest.length);
                                }
                            }
                        }
                    } catch (e) {}
    
                    return list;
                } catch(err) {
                    // TODO: Log to context/domplate error console
                    console.error(err);
                }
            },
    
            getFrameLabel: function(frame)
            {
                try {
                    if (frame['class']) {
                        if (frame['type'] == 'throw') {
                            return 'throw ' + frame['class'];
                        } else
                        if (frame['type'] == 'trigger') {
                            return 'trigger_error';
                        } else {
                            return frame['class'] + frame['type'] + frame['function'];
                        }
                    }
                    return frame['function'];
                } catch(err) {
                    // TODO: Log to context/domplate error console
                    console.error(err);
                }
            },
    
            argIterator: function(context, frame)
            {
                try {
                    if(!frame.args) {
                        return [];
                    }
                    var items = [];
                    for (var i = 0; i < frame.args.length; i++) {
                        items.push({
                            "node": domplate.util.merge(frame.args[i], {"wrapped": true}),
                            "tag": context.repForNode(frame.args[i]).shortTag,
                            "more": (i < frame.args.length-1)
                        });
                    }
                    return items;
                } catch(err) {
                    // TODO: Log to context/domplate error console
                    console.error(err);
                }
            }

        };
    },
    css: (css () >>>

        :scope SPAN.structures-trace {
            background-image: url(images/edit-rule.png);
            background-repeat: no-repeat;
            background-position: 4px 1px;
            padding-left: 25px;
            font-weight: bold;
        }

        :scope DIV.structures-trace {
            padding: 0px;
            margin: 0px;
        }
        
        :scope DIV.structures-trace TABLE {
          border-bottom: 1px solid #D7D7D7;
        }
        
        :scope DIV.structures-trace TABLE TBODY TR TH,
        :scope DIV.structures-trace TABLE TBODY TR TD {
            padding: 3px;
            padding-left: 10px;
            padding-right: 10px;
        }
        
        :scope DIV.structures-trace TABLE TBODY TR TH.header-file {
          white-space:nowrap;
          font-weight: bold;
          text-align: left;
        }
        
        :scope DIV.structures-trace TABLE TBODY TR TH.header-line {
          white-space:nowrap;
          font-weight: bold;
          text-align: right;
        }
        :scope DIV.structures-trace TABLE TBODY TR TH.header-inst {
          white-space:nowrap;
          font-weight: bold;
          text-align: left;
        }
        
        :scope DIV.structures-trace TABLE TBODY TR TD.cell-file {
          vertical-align: top;
          border: 1px solid #D7D7D7;
          border-bottom: 0px;
          border-right: 0px;
        }
        :scope DIV.structures-trace TABLE TBODY TR TD.cell-line {
          white-space:nowrap;
          vertical-align: top;
          text-align: right;
          border:1px solid #D7D7D7;
          border-bottom: 0px;
          border-right: 0px;
        }
        :scope DIV.structures-trace TABLE TBODY TR TD.cell-line:hover,
        :scope DIV.structures-trace TABLE TBODY TR TD.cell-file:hover {
            background-color: #ffc73d;
            cursor: pointer;    
        }
        :scope DIV.structures-trace TABLE TBODY TR TD.cell-inst {
          vertical-align: top;
          padding-left: 10px;
          font-weight: bold;
          border:1px solid #D7D7D7;
          border-bottom: 0px;
        }
        
        :scope DIV.structures-trace TABLE TBODY TR TD.cell-inst DIV.arg {
          font-weight: normal;
          padding-left: 3px;
          padding-right: 3px;
          display: inline-block;
        }
        :scope DIV.structures-trace TABLE TBODY TR TD.cell-inst DIV.arg:hover {
            background-color: #ffc73d;
            cursor: pointer;    
        }
        
        :scope DIV.structures-trace TABLE TBODY TR TD.cell-inst .separator {
            padding-left: 1px;
            padding-right: 3px;
        }

    <<<)
}