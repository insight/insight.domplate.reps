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
    "default/string",
    "elements/pathtree"
], {
    meta: {
        "lang": "elements",
        "lang.type": "pathtree"
    },
    value: [
        "/foo/insight/demo/_router.php",
        "/foo/insight/vendor/autoload.php",
        "/foo/insight/vendor/composer/autoload_real.php",
        "/foo/insight/vendor/composer/ClassLoader.php",
        "/foo/insight/vendor/composer/autoload_static.php",
        "/foo/insight/vendor/symfony/polyfill-ctype/bootstrap.php",
        "/foo/insight/vendor/myclabs/deep-copy/src/DeepCopy/deep_copy.php",
        "/foo/insight/demo/FirePHP.php"
    ]
}, [
    "/insight(2)"
].join("\n"));
