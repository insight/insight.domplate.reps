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
    "default/unknown",
    "default/string",
    "wrappers/request",
], {
    meta: {
        "wrapper": "wrappers/request"
    },
    value: {
        title: {
            type: "string",
            value: "Title!"
        },
        typeLabel: {
            type: "string",
            value: "AJAX"
        }
    }
}, [
].join("\n"));
