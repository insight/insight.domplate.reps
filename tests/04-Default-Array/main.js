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
    "default/array",
    "default/string"
], {
    type: "array",
    value: [
        {
            type: "string",
            value: "Hello"
        },
        {
            type: "string",
            value: "World!"
        }
    ]
}, [
    "array(",
    "Hello,",
    "World!",
    ")"
].join("\n"));
