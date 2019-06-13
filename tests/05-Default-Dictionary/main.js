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
    "default/dictionary",
    "default/string"
], {
    type: "dictionary",
    value: {
        key1: {
            type: "string",
            value: "Hello"
        },
        key2: {
            type: "string",
            value: "World!"
        },
        key3: {
            type: "dictionary",
            value: {
                sub1: {
                    type: "string",
                    value: "Sub Value!"
                }
            }
        }
    }
}, [
    "dictionary(",
    "key1:Hello,",
    "key2:World!,",
    "key3:dictionary(... 1 ...)",
    ")"
].join("\n"));
