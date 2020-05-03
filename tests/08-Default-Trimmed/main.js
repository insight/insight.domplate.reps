#!/usr/bin/env bash.origin.test via github.com/nightwatchjs/nightwatch
/*
module.config = {
    "browsers": [
        "chrome"
    ],
    "test_runner": "mocha"
}
*/


// TODO: What is 'meta["encoder.trimmed.partial"]' for?

require("../helpers").describeRepSuite([
    "default/string",
    "default/trimmed"
], {
    type: "string",
    meta: {
        "encoder.trimmed": true,
        "encoder.notice": "Trimmed!"
    }
}, [
    "Trimmed!"
].join("\n"));
