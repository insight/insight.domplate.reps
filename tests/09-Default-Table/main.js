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
    "default/table",
    "default/string"
], {
    meta: {
        renderer: "structures/table"
    },
    value: {
        title: {
            type: "string",
            value: "Title!"
        },
        header: [
            {
                type: "string",
                value: "Column 1"
            },
            {
                type: "string",
                value: "Column 2"
            }
        ],
        body: [
            [
                {
                    type: "string",
                    value: "Row 1 Column 1"
                },
                {
                    type: "string",
                    value: "Row 1 Column 2"
                }
            ],
            [
                {
                    type: "string",
                    value: "Row 2 Column 1"
                },
                {
                    type: "string",
                    value: "Row 2 Column 2"
                }
            ]
        ]
    }
}, [
    "Column 1 Column 2",
    "Row 1 Column 1 Row 1 Column 2",
    "Row 2 Column 1 Row 2 Column 2"
].join("\n"));
