{
    struct: {
        node: {
            meta: {
                "lang": "php",
                "lang.type": "string"
            },
            value: "Hello World"
        }
    },
    rep: function /*CodeBlock */ () {

        var T = domplate.tags;
        
        return {

            VAR_wrapped: false,
    
            tag:
                T.SPAN({"class": "string", "wrapped": "$node.wrapped"},
                    T.IF("$node.wrapped", "'"),
                    T.FOR("line", "$node|getValue",
                        "$line.value",
                        T.IF("$line.special", T.SPAN({"class": "special"}, "$line.specialvalue")),
                        T.IF("$line.more", T.BR()),
                        T.IF("$line.trimmed", T.TAG("$node|getTrimmedTag", {"node": "$node"}))
                    ),
                    T.IF("$node.wrapped", "'")),
    
            shortTag:
                T.SPAN({"class": "string", "wrapped": "$node.wrapped"},
                    T.IF("$node.wrapped", "'"),
                    T.FOR("line", "$node|getShortValue",
                        "$line.value",
                        T.IF("$line.special", T.SPAN({"class": "special"}, "$line.specialvalue")),
                        T.IF("$line.more", T.BR()),
                        T.IF("$line.trimmed", T.TAG("$node|getTrimmedTag", {"node": "$node"}))
                    ),
                    T.IF("$node.wrapped", "'")),
    
            // TODO: Should be using the insight/util/trimmed tag but the tag inclusion is not working
            trimmedNoticeTag: 
                T.SPAN({"class": "trimmed"},
                    "$node|getNotice"
                ),
    
            getNotice: function(node) {
                return node.meta["encoder.notice"];
            },
                    
            getTrimmedTag: function() {
                return this.trimmedNoticeTag;
            },
    
            getValue: function(node) {
                var parts = node.value.split("\n");
                var lines = [];
                for( var i=0,c=parts.length ; i<c ; i++ ) {
                    lines.push({
                        "value": parts[i],
                        "more": (i<c-1)?true:false,
                        "special": false
                    });
                }
                if(node.meta["encoder.trimmed"] && node.meta["encoder.notice"]) {
                    lines.push({
                        "value": "",
                        "trimmed": true
                    });
                }
                return lines;
            },

            getShortValue: function(node) {

                // TODO: This needs to be optimized

                var trimEnabled = true;
                var trimLength = 50;
                var trimNewlines = true;

                var meta = (typeof node.getObjectGraph === "function") ? node.getObjectGraph().getMeta() : null;
                if (meta) {
                    if(!node.parentNode) {
                        // if a top-level string display 500 chars (but trim newlines)
                        // but only if we are not asked to specifically trim
                        if(typeof meta["string.trim.enabled"] == "undefined" || !meta["string.trim.enabled"]) {
                            trimLength = 500;
                        }
                    }
                    if(typeof meta["string.trim.enabled"] != "undefined") {
                        trimEnabled = meta["string.trim.enabled"];
                    }
                    if(typeof meta["string.trim.length"] != "undefined" && meta["string.trim.length"]>=5) {
                        trimLength = meta["string.trim.length"];
                    }
                    if(typeof meta["string.trim.newlines"] != "undefined") {
                        trimNewlines = meta["string.trim.newlines"];
                    }
                }
    
                var str = node.value;
                if(trimEnabled) {
                    if(trimLength>-1) {
                        str = this._cropString(str, trimLength);
                    }
                    if(trimNewlines) {
                        str = this._escapeNewLines(str);
                    }
                }
    
                var parts = str.split("\n");
                var lines = [],
                    parts2;
                for( var i=0,ci=parts.length ; i<ci ; i++ ) {
                    parts2 = parts[i].split("|:_!_:|");
                    for( var j=0,cj=parts2.length ; j<cj ; j++ ) {
                        if(parts2[j]=="STRING_CROP") {
                            lines.push({
                                "value": "",
                                "more": false,
                                "special": true,
                                "specialvalue": "..."
                            });
                        } else
                        if(parts2[j]=="STRING_NEWLINE") {
                            lines.push({
                                "value": "",
                                "more": false,
                                "special": true,
                                "specialvalue": "\\n"
                            });
                        } else {
                            lines.push({
                                "value": parts2[j],
                                "more": (i<ci-1 && j==cj-1)?true:false
                            });
                        }
                    }
                }
                if(node.meta["encoder.trimmed"] && node.meta["encoder.notice"]) {
                    lines.push({
                        "value": "",
                        "trimmed": true
                    });
                }
                return lines;
            },


            _cropString: function (value, limit) {
                limit = limit || 50;
                if (value.length > limit) {
                    return value.substr(0, limit/2) + "|:_!_:|STRING_CROP|:_!_:|" + value.substr(value.length-limit/2);
                } else {
                    return value;
                }
            },
            
            _escapeNewLines: function (value) {
                return (""+value).replace(/\r/g, "\\r").replace(/\n/g, "|:_!_:|STRING_NEWLINE|:_!_:|");
            }
            
        };
    },
    css: (css () >>>

        :scope SPAN.null {
            color: navy;
        }

        :scope SPAN.string {
            color: black;
        }

        :scope SPAN.string[wrapped=true] {
            color: red;
        }

        :scope SPAN.string > SPAN.special {
            color: gray;
            font-weight: bold;
            padding-left: 3px;
            padding-right: 3px;
        }

        :scope SPAN.string > SPAN.trimmed {
            color: #FFFFFF;
            background-color: blue;
            padding-left: 5px;
            padding-right: 5px;
            margin-left: 5px;
        }

    <<<)
}
