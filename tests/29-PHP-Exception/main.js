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
    "wrappers/console",
    "php/string",
    "php/exception"
], {
    meta: {
        "wrapper": "wrappers/console",
        "lang": "php",
        "lang.type": "exception",
        "priority": "error",
        "keeptitle": true
    },
    value: {
        title: {
            meta: {
                "lang": "php",
                "lang.type": "string"
            },
            value: "Title!"
        },
        stack: [
            {
                file: "File ...",
                line: "10",
                class: "Class",
                args: [
                    {
                        meta: {
                            "lang": "php",
                            "lang.type": "string"
                        },
                        value: "Arg 1"
                    },
                    {
                        meta: {
                            "lang": "php",
                            "lang.type": "string"
                        },
                        value: "Arg 2"
                    }
                ]
            },
            {
                file: "File ...",
                line: "5",
                function: "Function",
                args: [
                    {
                        meta: {
                            "lang": "php",
                            "lang.type": "string"
                        },
                        value: "Arg 1"
                    },
                    {
                        meta: {
                            "lang": "php",
                            "lang.type": "string"
                        },
                        value: "Arg 2"
                    }
                ]
            }
        ]
    }
}, [
    "Title!"
].join("\n"));
