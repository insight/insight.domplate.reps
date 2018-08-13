#!/usr/bin/env bash.origin.test via github.com/nightwatchjs/nightwatch

exports.describeRepSuite = function (repUri, value, expected) {

    console.log(">>>TEST_IGNORE_LINE:^[\\d\\.]+\\s<<<");

    describe("Suite", function() {

        var reps = {};

        var repId = repUri.replace(/[\/\.]/g, "_");

        reps[repId] = __dirname + "/../reps/" + repUri + ".rep.js";

        require('bash.origin.workspace').LIB.BASH_ORIGIN_EXPRESS.runForTestHooks(before, after, {
            "routes": {
                "^/reps/": {
                    "@github.com~cadorn~domplate#s1": {
                        "compile": false,
                        "reps": reps
                    }
                },
                "/": [
                    '<head>',
                        '<script src="/reps/domplate-eval.js"></script>',
                    '</head>',
                    '<body>',
                        '<div id="rep"></div>',
                    '</body>',
                    '<script>',
                        'window.domplate.loadRep("/reps/' + repId + '", function (rep) {',
                            'rep.tag.replace({ node: { value: ' + JSON.stringify(value) + ' } }, document.querySelector("#rep"));',
                        '}, console.error);',
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
                    console.log("REP text from DOM:", JSON.stringify(result, null, 4));
                });
            } else {
                client.expect.element('BODY #rep').text.to.contain(expected);
            }
            client.expect.element('BODY #rep').to.have.attribute('_dbid');
        });
    });


}
