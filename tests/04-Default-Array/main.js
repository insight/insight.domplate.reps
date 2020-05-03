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
console.log(">>>TEST_IGNORE_LINE:\\[pinf.it\\].+Writing to:<<<");

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
