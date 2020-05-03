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
    "default/map",
    "default/array",
    "default/string",
    "default/constant"
], {
    type: "map",
    value: [
        [
            {
                type: "string",
                value: "key1"
            },
            {
                type: "string",
                value: "Hello"
            }
        ],
        [
            {
                type: "constant",
                value: "1"
            },
            {
                type: "array",
                value: [
                    {
                        type: "string",
                        value: "Hello"
                    },
                    {
                        type: "string",
                        value: "World!"
                    },
                    {
                        type: "map",
                        value: [
                            [
                                {
                                    type: "string",
                                    value: "key1"
                                },
                                {
                                    type: "string",
                                    value: "Hello"
                                }
                            ],
                            [
                                {
                                    type: "constant",
                                    value: "1"
                                },
                                {
                                    type: "array",
                                    value: [
                                        {
                                            type: "string",
                                            value: "Hello"
                                        },
                                        {
                                            type: "string",
                                            value: "World!"
                                        },
                                        {
                                            type: "string",
                                            value: "World!"
                                        }
                                    ]
                                }
                            ]
                        ]
                    }
                ]
            }
        ]
    ]
}, [
    "map(",
    "key1=>Hello,",
    "1=>array(",
    "Hello,",
    "World!,",
    "map(... 2 ...)",
    ")",
    ")"
].join("\n"));
