#!/usr/bin/env bash.origin.test via github.com/nightwatchjs/nightwatch

const LIB = require('bash.origin.lib').js;

exports.describeRepSuite = function (repUri, node, expected) {

    console.log(">>>TEST_IGNORE_LINE:\\[pinf.it\\].+Writing to:<<<");
    console.log('>>>TEST_IGNORE_LINE:\\[bash.origin.express\\] Routing request /<<<');    
    console.log(">>>TEST_IGNORE_LINE:^[\\d\\.]+\\s<<<");
    console.log(">>>TEST_IGNORE_LINE:Run tool step for:<<<");
    console.log('>>>TEST_IGNORE_LINE:\\[domplate\\] Load style: <<<');

    
    describe("Suite", function() {

        var repSources = {};
        var repPreviewUris = {};

        if (!Array.isArray(repUri)) {
            repUri = [ repUri ];
        }

        process.env.BUILD_INSIGHT_DOMPLATE_REPS = JSON.stringify(repUri);

        repUri.forEach(function (repUri) {
            repSources[repUri] = __dirname + "/../reps/" + repUri + ".rep.js";
            repPreviewUris[repUri] = "/dist/reps/" + repUri + ".preview.htm";
        });

//console.error("reps:", reps);

        const server = LIB.BASH_ORIGIN_EXPRESS.runForTestHooks(before, after, {
            // "mountPrefix": "/.tmp",
            "routes": {
// TODO: Move to '#!/gi0.PINF.it/#!inf.json'
                // "/dist/insight-domplate-renderer.browser.js": {
                //     "@it.pinf.org.browserify # router/v0": {
                //         "src": __dirname + "/../lib/renderer.js",
                //         "format": "browser",
                //         "expose": {
                //             "window": {
                //                 "insight-domplate-renderer": "Renderer"
                //             }
                //         }
                //     }
                // },
                "^/test-reps/": {
                    "gi0.PINF.it/build/v0 # /.tmp # /": {
                        "@domplate.reps # router/v1": {

                    // "@domplate.reps # router/v0": {
// TODO: Use namespaced object for 'it.pinf.core_mountPrefix'.
                        // "it.pinf.core_mountPrefix": "/domplate.reps",
                        // "externalizeCss": true,
                        // "compile": true,
                        // "repIdPrefix": "insight.domplate.reps/",
                        // "reps": repSources,
                        // "injectStruct": function (window) {
                        //     return {
                        //         "context": {
                        //             "repForNode": function (node) {
                        //                 return {
                        //                     tag: null,
                        //                     shortTag: null,
                        //                     collapsedTag: null
                        //                 };
                        //             }
                        //         }
                        //     };
                        // }
                        }
                    }
                },
                "/": [
                    '<head>',
                        '<script src="/test-reps/dist/insight-domplate-renderer.browser.js"></script>',
                        '<style>',
                            'DIV.rep {',
                                'padding: 2px 4px 1px 6px;',
                                'font-family: Lucida Grande, Tahoma, sans-serif;',
                                'font-size: 11px;',
                            '}',
                        '</style>',
                    '</head>',
                    '<body>',
                        `<h1>Browser rendered from compiled sources</h1>`,
                        `<h2>rep</h2>`,
                        '<div class="rep" id="rep"></div>',
                        '<hr>',
                        `<h2>repShort</h2>`,
                        '<div class="rep" id="repShort"></div>',
                        // '<hr>',
                        // `<h1>Compiled Preview</h1>`,
                        // Object.keys(repPreviewUris).map(function (repUri) {
                        //     return [
                        //         `<h2>${repUri}</h2>`,
                        //         `<iframe src="${repPreviewUris[repUri]}" width="100%" height="400"></iframe>`
                        //     ].join("\n");
                        // }).join("\n"),
                    '</body>',
                    '<script>',
                        '(new window["insight-domplate-renderer"]({ repsBaseUrl: "/test-reps/dist/reps" })).renderNodeInto(' + JSON.stringify(node) + ', "#rep").catch(console.error);',
                        '(new window["insight-domplate-renderer"]({ repsBaseUrl: "/test-reps/dist/reps" })).renderNodeInto(' + JSON.stringify(node) + ', "#repShort", { tagName: "shortTag" }).catch(console.error);',
                    '</script>'
                ].join("\n")
            }
        });

        it('Test', async function (client) {

            const PORT = (await server).config.port;

            client.url('http://localhost:' + PORT + '/').pause(500);

            if (process.env.BO_TEST_FLAG_DEV) client.pause(60 * 60 * 24 * 1000);
            
            client.waitForElementPresent('BODY', 3000);

            if (expected === null) {
                client.getText('BODY #rep', function (result) {
                    console.log("REP text from DOM:", JSON.stringify(result.value.split("\n"), null, 4) + '.join("\\n")');
                });
            } else {
                client.expect.element('BODY #rep').text.to.contain(expected);
            }
            client.expect.element('BODY #rep > [__dbid]').to.have.attribute('__dbid');
        });
    });


}
