#!/usr/bin/env bash.origin.test via github.com/nightwatchjs/nightwatch
/*
module.config = {
    "browsers": [
        "chrome"
    ],
    "test_runner": "mocha"
}
*/

require("../helpers").describeRepSuite("php/null", {
    meta: {
        "lang": "php",
        "lang.type": "null"
    },
    value: "null"
}, "NULL");