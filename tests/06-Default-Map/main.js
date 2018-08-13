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
    "default/map",
    "default/string"
], {
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
                type: "string",
                value: "key2"
            },
            {
                type: "string",
                value: "World"
            }
        ]
    ]
}, [
    "map(",
    "key1=>Hello,",
    "key2=>World",
    ")"
].join("\n"));
