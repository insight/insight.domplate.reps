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
    "default/reference",
    "default/string"
], {
    type: "reference",
    value: {
        instance: {
            type: "string",
            value: "Hello World!"
        }
    }
}, [
    "Hello World!"
].join("\n"));
