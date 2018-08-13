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
    "default/dictionary",
    "default/string"
], {
    type: "dictionary",
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
}, [
    "dictionary(",
    "key1:Hello,",
    "key2:World",
    ")"
].join("\n"));
