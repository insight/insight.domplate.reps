#!/usr/bin/env bash.origin.test via github.com/nightwatchjs/nightwatch
/*
module.config = {
    "browsers": [
        "chrome"
    ],
    "test_runner": "mocha"
}
*/

console.log('>>>TEST_IGNORE_LINE:\\[bash.origin.express\\] Routing request /<<<');

require("../helpers").describeRepSuite([
    "php/array-associative",
    "php/string"
], {
    meta: {
        "lang": "php",
        "lang.type": "array"
    },
    value: [
        [
            {
                meta: {
                    "lang": "php",
                    "lang.type": "string"
                },
                value: "key1"
            },
            {
                meta: {
                    "lang": "php",
                    "lang.type": "string"
                },
                value: "Hello"
            }
        ],
        [
            {
                meta: {
                    "lang": "php",
                    "lang.type": "string"
                },
                value: "key2"
            },
            {
                meta: {
                    "lang": "php",
                    "lang.type": "string"
                },
                value: "World!"
            }
        ]
    ]
}, [
    "map(",
    "'key1'=>'Hello',",
    "'key2'=>'World!'",
    ")"
].join("\n"));
