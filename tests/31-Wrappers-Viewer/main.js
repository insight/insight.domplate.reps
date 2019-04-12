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
    "wrappers/viewer",
    "default/string"
], {
    meta: {
        "wrapper": "wrappers/viewer"
    },
    type: "string",
    value: "Hello World!"
}, "Hello World!");
