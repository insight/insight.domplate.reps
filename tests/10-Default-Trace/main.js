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
    "default/trace",
    "default/string"
], {
    meta: {
        renderer: "structures/trace"
    },
    value: {
        title: {
            type: "string",
            value: "Title!"
        },
        stack: [
            {
                file: "File ...",
                line: "10",
                class: "Class",
                args: [
                    {
                        type: "string",
                        value: "Arg 1"
                    },
                    {
                        type: "string",
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
                        type: "string",
                        value: "Arg 1"
                    },
                    {
                        type: "string",
                        value: "Arg 2"
                    }
                ]
            }
        ]
    }
}, [
    "File Line Instruction",
    "File ... 10",
    "Class(Arg 1,Arg 2)",
    "File ... 5",
    "Function(Arg 1,Arg 2)"
].join("\n"));
