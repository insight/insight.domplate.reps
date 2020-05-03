{
    struct: {
        node: {
            meta: {
                "lang": "elements",
                "lang.type": "optiontree"
            },
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
        },
        member: {}
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            CONST_Normal: "tag",
            CONST_Short: "shortTag",
            CONST_Collapsed: "collapsedTag",
    
            tag:
                T.SPAN({"class": "dictionary"},
                    T.FOR("member", "$context,$node,$CONST_Normal|dictionaryIterator",
                        T.DIV({"class": "member", "$expandable":"$member.expandable", "_memberObject": "$member", "_contextObject": "$context", "onclick": "$onClick"},
                            T.SPAN({"class": "name", "decorator": "$member|getMemberNameDecorator"}, "$member.name"),
                            T.SPAN({"class": "delimiter"}, ":"),
                            T.SPAN({"class": "value"},
                                T.TAG("$member.tag", {"context": "$context", "node": "$member.node", "member": "$member"})
                            ),
                            T.IF("$member.more", T.SPAN({"class": "separator"}, ","))
                        )
                    )
                ),
    
            shortTag:
                T.SPAN({"class": "dictionary"}, T.SPAN("$node|getLabel("),
                    T.FOR("member", "$context,$node,$CONST_Short|dictionaryIterator",
                        T.SPAN({"class": "member"},
                            T.SPAN({"class": "name"}, "$member.name"),
                            T.SPAN({"class": "delimiter"}, ":"),
                            T.SPAN({"class": "value"},
                                T.TAG("$member.tag", {"context": "$context", "node": "$member.node", "member": "$member"})
                            ),
                            T.IF("$member.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            collapsedTag:
                T.SPAN({"class": "dictionary"}, T.SPAN("$node|getLabel("),
                    T.SPAN({"class": "collapsed"}, "... $node|getMemberCount ..."),
                T.SPAN(")")),
    
            expandableStub:
                T.TAG("$context,$member,$CONST_Collapsed|getTag", {"context": "$context", "node": "$member.node", "member": "$member"}),

            expandedStub:
                T.TAG("$tag", {"context": "$context", "node": "$node", "member": "$member"}),

            moreTag:
                T.SPAN({"class": "more"}, " ... "),

            getLabel: function(node) {
                return "filetree";
            },
            
            getMemberNameDecorator: function(member) {
                return "";
            },
            
            getMemberCount: function(node) {
                if(!node.value) return 0;
                var count = 0;
                for( var name in node.value ) {
                    count++;
                }
                return count;
            },
            
            getTag: function(context, member, type) {
                if(type===this.CONST_Short) {
                    return context.repForNode(member.node).shortTag;
                } else
                if(type===this.CONST_Normal) {
                    if(member.expandable) {
                        return this.expandableStub;
                    } else {
                        return context.repForNode(member.node).tag;
                    }
                } else
                if(type===this.CONST_Collapsed) {
                    var rep = context.repForNode(member.node);                    
                    if (typeof rep.collapsedTag === "undefined") {
                        console.error("rep", rep);
                        throw "no 'collapsedTag' property in rep: " + rep.toString();
                    }
                    return rep.collapsedTag;
                }
            },
            
            dictionaryIterator: function(context, node, type) {
                var members = [];
                if (!node.value || node.value.length==0) return members;
                for (var name in node.value) {
    
                    var member = {
                        "name": name,
                        "node": domplate.util.merge(node.value[name], {"wrapped": true}),
                        "more": true,
                        "expandable": this.isExpandable(node.value[name])
                    };
    
                    if(members.length>1 && type==this.CONST_Short) {
                        member["tag"] = this.moreTag;
                    } else {
                        member["tag"] = this.getTag(context, member, type);
                    }

                    members.push(member);

                    if (members.length>2 && type==this.CONST_Short) {
                        break;
                    }
                }
                if(members.length>0) {
                    members[members.length-1]["more"] = false;
                }
                
                return members;
            },
            
            isExpandable: function (node) {

return true;

                return (node.type=="reference" ||
                        node.type=="filetree" ||
                        node.type=="map" ||
                        node.type=="array");
            },
            
            onClick: function (event) {
                if (!domplate.util.isLeftClick(event)) {
                    return;
                }
                var row = domplate.util.getAncestorByClass(event.target, "member");
                if(domplate.util.hasClass(row, "expandable")) {
                    if (this.toggleRow(row)) {
                        event.stopPropagation();
                    }
                }
            },

            _isTagExpandable: function (tag) {
                while (true) {
                    if(!tag.parentNode) {
                        return true;
                    }
                    if(tag.getAttribute("allowTagExpand") === "false") {
                        return false;
                    }
                    tag = tag.parentNode;
                }
            },
            
            toggleRow: function (row) {
                if (!this._isTagExpandable(row)) {
                    return false;
                }
                var valueElement = domplate.util.getElementByClass(row, "value");
                if (domplate.util.hasClass(row, "expanded")) {
                    domplate.util.removeClass(row, "expanded");

                    this.expandedStub.replace({
                        "tag": this.expandableStub,
                        "member": row.memberObject,
                        "node": row.memberObject.node,
                        "context": row.contextObject
                    }, valueElement);
                } else {
                    domplate.util.setClass(row, "expanded");

                    this.expandedStub.replace({
                        "tag": row.contextObject.repForNode(row.memberObject.node).tag,
                        "member": row.memberObject,
                        "node": row.memberObject.node,
                        "context": row.contextObject
                    }, valueElement);
                }
                return true;
            }
        };
    },
    css: (css () >>>

        SPAN.dictionary > SPAN {
            color: #9C9C9C;
        }
        
        SPAN.dictionary > SPAN.collapsed {
            color: #0000FF;
            font-weight: normal;
            padding-left: 5px;
            padding-right: 5px;
        }
        
        SPAN.dictionary > SPAN.summary {
            color: #0000FF;
            font-weight: normal;
            padding-left: 5px;
            padding-right: 5px;
        }
        
        SPAN.dictionary > SPAN.member {
            color: #9C9C9C;
        }
        
        SPAN.dictionary > DIV.member {
            display: block;
            padding-left: 20px;
        }
        SPAN.dictionary > DIV.member.expandable {
            background-image: url(images/twisty-closed.png);
            background-repeat: no-repeat;
            background-position: 6px 2px;
            cursor: pointer;
        }
        SPAN.dictionary > DIV.member.expandable.expanded {
            background-image: url(images/twisty-open.png);
        }
        
        SPAN.dictionary > .member > SPAN.name {
            color: #E59D07;
            font-weight: normal;
        }
        
        SPAN.dictionary > .member > SPAN.value {
            font-weight: normal;
        }
        
        SPAN.dictionary > .member > SPAN.delimiter,
        SPAN.dictionary > .member > SPAN.separator,
        SPAN.dictionary > .member SPAN.more {
            color: #9C9C9C;
            padding-left: 2px;
            padding-right: 2px;
        }        

    <<<)
}
