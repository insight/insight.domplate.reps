#!/usr/bin/env bash.origin.test via github.com/nightwatchjs/nightwatch

exports.describeRepSuite = function (repUri, node, expected) {

    console.log(">>>TEST_IGNORE_LINE:^[\\d\\.]+\\s<<<");

    describe("Suite", function() {

        var reps = {};

        if (!Array.isArray(repUri)) {
            repUri = [ repUri ];
        }
        repUri.forEach(function (repUri) {
            reps[repUri] = __dirname + "/../reps/" + repUri + ".rep.js";
        });

        require('bash.origin.lib').js.BASH_ORIGIN_EXPRESS.runForTestHooks(before, after, {
            "routes": {
                "/dist/insight-domplate-renderer.browser.js": {
                    "@it.pinf.org.browserify#s1": {
                        "src": __dirname + "/../lib/renderer.js",
                        "format": "browser",
                        "expose": {
                            "window": {
                                "insight-domplate-renderer": "Renderer"
                            }
                        }
                    }
                },
                "^/reps/": {
                    "@github.com~cadorn~domplate#s1": {
                        "compile": true,
                        "dist": __dirname + "/../dist/reps",
                        "reps": reps,
                        "injectStruct": function (window) {

                            return {
                                "context": {
                                    "repForNode": function (node) {

                                        var tag = null;

                                        return {
                                            tag: tag,
                                            shortTag: tag,
                                            collapsedTag: tag
                                        };
                                    }
                                }
                            };
                        }
                    }
                },
                "/": [
                    '<head>',
                        '<script src="/reps/domplate.browser.js"></script>',
                        '<script src="/dist/insight-domplate-renderer.browser.js"></script>',
                        '<style>',
                            '#rep {',
                                'padding: 2px 4px 1px 6px;',
                                'font-family: Lucida Grande, Tahoma, sans-serif;',
                                'font-size: 11px;',
                            '}',
                        '</style>',
                    '</head>',
                    '<body>',
                        '<div id="rep"></div>',
                    '</body>',
                    '<script>',
                        '(new window["insight-domplate-renderer"]({ repsBaseUrl: "/reps" })).renderNodeInto(' + JSON.stringify(node) + ', "#rep").catch(console.error);',
                    '</script>'
                ].join("\n")
            }
        });

        it('Test', function (client) {

            client.url('http://localhost:' + process.env.PORT + '/').pause(500);

            if (process.env.BO_TEST_FLAG_DEV) client.pause(60 * 60 * 24 * 1000);
            
            client.waitForElementPresent('BODY', 3000);

            if (expected === null) {
                client.getText('BODY #rep', function (result) {
                    console.log("REP text from DOM:", JSON.stringify(result.value.split("\n"), null, 4) + '.join("\\n")');
                });
            } else {
                client.expect.element('BODY #rep').text.to.contain(expected);
            }
            client.expect.element('BODY #rep').to.have.attribute('_dbid');
        });
    });


}
