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
    "php/array-indexed",
    "php/string"
], {
    meta: {
        "lang": "php",
        "lang.type": "array"
    },
    value: [
        {
            meta: {
                "lang": "php",
                "lang.type": "string"
            },
            value: "Hello"
        },
        {
            meta: {
                "lang": "php",
                "lang.type": "string"
            },
            value: "World!"
        }
    ]
}, [
    "array(",
    "'Hello',",
    "'World!'",
    ")"
].join("\n"));
