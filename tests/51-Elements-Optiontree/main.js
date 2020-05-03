#!/usr/bin/env bash.origin.test via github.com/nightwatchjs/nightwatch
/*
module.config = {
    "browsers": [
        "chrome"
    ],
    "test_runner": "mocha"
}
*/

require("../helpers").describeRepSuite([
    "default/string",
    "elements/optiontree"
], {
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
            value: "World!"
        },
        key3: {
            meta: {
                "lang": "elements",
                "lang.type": "optiontree"
            },
            value: {
                sub1: {
                    type: "string",
                    value: "Sub Value!"
                }
            }
        }
    }
}, [
    "key1:Hello,",
    "key2:World!,",
    "key3:filetree(... 1 ...)"
].join("\n"));
