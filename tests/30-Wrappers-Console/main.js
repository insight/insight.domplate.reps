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
    "wrappers/console",
    "default/dictionary",
    "default/string"
], {
    meta: {
        "wrapper": "wrappers/console"
    },
    type: "dictionary",
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
            type: "dictionary",
            value: {
                sub1: {
                    type: "string",
                    value: "Sub Value!"
                }
            }
        }
    }
}, "dictionary(key1:Hello,key2:World!,key3: ... )");
