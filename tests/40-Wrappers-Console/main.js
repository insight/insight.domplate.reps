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
    "default/constant",
    "default/map",
    "default/string"
], {
    meta: {
        "wrapper": "wrappers/console",
        "label": "Label:",
        "file": "/file/path/filename.ext",
        "line": 100
    },
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
                type: "constant",
                value: "1"
            },
            {
                type: "dictionary",
                value: {
                    key1: {
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
                                    type: "constant",
                                    value: "1"
                                },
                                {
                                    type: "string",
                                    value: "World!"
                                }
                            ]
                        ]
                    },
                    key2: {
                        type: "dictionary",
                        value: {
                            sub1: {
                                type: "string",
                                value: "Sub Value 1!"
                            },
                            sub2: {
                                type: "dictionary",
                                value: {
                                    sub1: {
                                        type: "string",
                                        value: "Sub Value 2!"
                                    }
                                }
                            }
                        }
                    },
                    key3: {
                        type: "string",
                        value: "World!"
                    }
                }
            }
        ]
    ]
}, "Label:map(key1=>Hello,1=>dictionary(key1:map(key1=>Hello,1=>World!),key2:dictionary(sub1:Sub Value 1!,sub2:dictionary(sub1:Sub Value 2!)),key3: ... ))");
