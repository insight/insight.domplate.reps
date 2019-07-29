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

console.log('>>>TEST_IGNORE_LINE:\\[bash.origin.express\\] Routing request /<<<');

require("../helpers").describeRepSuite([
    "default/string",
    "default/reference",
    "default/dictionary",
    "php/object",
    "wrappers/console"
], {
    instances: [
        {
            meta: {
                "lang": "php",
                "lang.class": "Foo",
                "lang.type": "object"
            },
            type: "dictionary",
            value: {
                key1: {
                    type: "string",
                    value: "Hello"
                },
                key2: {
                      meta: {
                          "lang.visibility": "private"
                      },
                      type: "string",
                      value: "World"
                },
                key3: {
                    type: "reference",
                    value: 1
                }
            }
        },
        {
            type: "dictionary",
            value: {
                Hello: {
                    type: "string",
                    value: "World"
                }
            }
        }
    ],
    meta: {
        "lang": "php"
    },
    type: "reference",
    value: 0
}, [
    "Foo(",
    "key1:Hello,",
    "key2:World,",
    "key3:dictionary(... 1 ...)",
    ")"
].join("\n"));
