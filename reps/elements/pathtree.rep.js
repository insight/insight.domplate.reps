{
    struct: {
        node: {
            meta: {
                "lang": "elements",
                "lang.type": "pathtree"
            },
            value: [
                "/insight/demo/_router.php",
                "/insight/demo/FirePHP.php"
            ]
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
                        T.DIV({"class": "member", "$expandable":"$member.expandable", "_memberObject": "$member", "_contextObject": "$context", "onclick": "$onToggle"},
                            T.SPAN({"class": "name", "decorator": "$member|getMemberNameDecorator", "onclick": "$onSelect"}, "$member.name"),
                            T.SPAN({"class": "delimiter"}, ""),
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
                            T.SPAN({"class": "delimiter"}, ""),
                            T.SPAN({"class": "value"},
                                T.TAG("$member.tag", {"context": "$context", "node": "$member.node", "member": "$member"})
                            ),
                            T.IF("$member.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            collapsedTag:
                T.SPAN({"class": "dictionary"}, T.SPAN("("),
                    T.SPAN({"class": "collapsed"}, "$node|getMemberCount"),
                T.SPAN(")")),
    
            expandableStub:
                T.TAG("$context,$member,$CONST_Collapsed|getTag", {"context": "$context", "node": "$member.node", "member": "$member"}),

            expandedStub:
                T.TAG("$tag", {"context": "$context", "node": "$node", "member": "$member"}),

            moreTag:
                T.SPAN({"class": "more"}, " ... "),

            getLabel: function(node) {
                return "pathtree";
            },
            
            getMemberNameDecorator: function(member) {
                return "";
            },
            
            getMemberCount: function(node) {
                if (!node.value.children) return 0;
                return node.value.children.length;
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

            _objectListToTree: function (list) {
                var map = {}, node, roots = [], i, parentIdParts, j, id;
                for (i = 0; i < list.length; i += 1) {    
                    id = list[i];
                    list[i] = {
                        id: id,
                        label: id.replace(/^.*(\/[^\/]+)$/, "$1"),
                        parentId: id.replace(/\/[^\/]+$/, "")
                    };
                    if (list[i].parentId && !map[list[i].parentId]) {
                        list.push(list[i].parentId);
                        map[list[i].parentId] = list.length - 1;
                    }
                            map[list[i].id] = i; // initialize the map
                    list[i].children = []; // initialize the children
                }
                for (i = 0; i < list.length; i += 1) {
                    node = list[i];
                    if (node.parentId !== "") {
                        // if you have dangling branches check that map[node.parentId] exists
                        list[map[node.parentId]].children.push(node);
                    } else {
                        roots.push(node);
                    }
                }
                return roots;
            },            

            dictionaryIterator: function(context, node, type) {
                var self = this;

                let value = node.value;

                var members = [];
                if (!value || value.length==0) return members;

                if (Array.isArray(value)) {
                    value = {
                        children: self._objectListToTree(value)
                    };
                    while (
                        value.children.length === 1 &&
                        value.children[0].children &&
                        value.children[0].children.length === 1
                    ) {
                        value.children = value.children[0].children;
                    }
                }

                if (
                    value.children &&
                    value.children.length
                ) {
                    var stop = false;
                    value.children.forEach(function (child, i) {
                        if (stop) {
                            return;
                        }

                        var member = {
                            "name": child.label,
                            "node": domplate.util.merge({
                                meta: node.meta,
                                value: child
                            }, {"wrapped": true}),
                            "more": (i < value.children -1),
                            "expandable": (child.children && child.children.length)
                        };
        
                        if(members.length>1 && type==self.CONST_Short) {
                            member["tag"] = self.moreTag;
                        } else {
                            member["tag"] = self.getTag(context, member, type);
                        }
    
                        members.push(member);
    
                        if (members.length>2 && type==self.CONST_Short) {
                            stop = true;
                        }
                    });
                }
                if(members.length>0) {
                    members[members.length-1]["more"] = false;
                }
                return members;
            },      

            onToggle: function (event) {
                if (!domplate.util.isLeftClick(event)) {
                    return;
                }

                var memberTag = domplate.util.getAncestorByClass(event.target, "member");
                var nameTag = domplate.util.getElementByClass(memberTag, "name");
                var nameTagRect = nameTag.getBoundingClientRect();

                var pointer = {
                    x: event.clientX,
                    y: event.clientY
                };

                if (
                    pointer.x < nameTagRect.left ||
                    pointer.x > nameTagRect.right ||
                    pointer.y < nameTagRect.top ||
                    pointer.y > nameTagRect.bottom
                ) {
                    if(domplate.util.hasClass(memberTag, "expandable")) {
                        if (this.toggleRow(memberTag)) {
                            event.stopPropagation();
                        }
                    }
                }
            },

            onSelect: function (event) {
                if (!domplate.util.isLeftClick(event)) {
                    return;
                }

                event.stopPropagation();

                var memberTag = domplate.util.getAncestorByClass(event.target, "member");

                memberTag.contextObject.dispatchEvent('click', [event, {
                    "rep": "insight.domplate.reps/elements/pathtree",
                    "node": memberTag.memberObject.node
                }]);
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
            color: #0000ff9c;
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
            padding-left: 15px;
            padding-top: 1px;
            padding-bottom: 1px;
        }
        SPAN.dictionary > DIV.member.expandable {
            background-image: url(images/twisty-closed.png);
            background-repeat: no-repeat;
            background-position: 1px 3px;
            cursor: pointer;
        }
        SPAN.dictionary > DIV.member.expandable.expanded {
            background-image: url(images/twisty-open.png);
        }
        
        SPAN.dictionary > .member > SPAN.name {
            color: #011b7b;
            font-weight: normal;
        }
        
        SPAN.dictionary > .member > SPAN.value {
            font-weight: normal;
            padding-top: 3px;
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
