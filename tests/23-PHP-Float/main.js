#!/usr/bin/env bash.origin.test via github.com/nightwatchjs/nightwatch
/*
module.config = {
    "browsers": [
        "chrome"
    ],
    "test_runner": "mocha"
}
*/

require("../helpers").describeRepSuite("php/float", {
    meta: {
        "lang": "php",
        "lang.type": "float"
    },
    value: 1.1
}, "1.1");
