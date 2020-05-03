
// exports['gi0.pinf.it/core/v0/tool'] = async function (workspace, LIB) {

//     return async function (instance) {

// //console.log("[domplate] instance::::", instance);

//         if (/\/router\/v0$/.test(instance.kindId)) {
//             return async function (invocation) {

// //console.log("[domplate.router] init route app");

//                 return {
//                     // TODO: Use a better signature here.
//                     routeApp: async function (routeOptions) {

// // console.error("return route app API:", routeOptions);

//                         // routeOptions.basedir = routeOptions.basedir || invocation.dirs.source;
//                         // routeOptions.dist = LIB.PATH.join(invocation.dirs.dist, (invocation.mount && invocation.mount.path) || '');

// //console.error('invocation.mount::', routeOptions);

// // console.error("return route app API:", api);

// // console.log("invocation", invocation);

// //                        return LIB.EXPRESS.static(invocation.dirs.dist);
//                         // TODO: Use a helper for this.
//                         return function (req, res, next) {
                            
// // console.error("service request", req.url);                            
//                             const path = LIB.PATH.join(invocation.dirs.dist, req.url);

//                             var contentType = LIB.MIME_TYPES.lookup(path);
//                             if (contentType) {
//                                 res.writeHead(200, {
//                                     "Content-Type": contentType
//                                 });
//                             }

//                             const fs = LIB.FS.createReadStream(path);
//                             fs.pipe(res);
//                             return;
//                         }
//                     }
//                 };
//             }
//         } else
//         if (/\/builder\/v0$/.test(instance.kindId)) {

// console.log("[domplate.reps] init builder/v0");

//             return async function (invocation) {

// console.log("[domplate.reps] builder/v0 invocation", invocation);

//             }
//         }
//     };
// }




let runHomeInstructions = null;

exports['gi0.PINF.it/build/v0'] = async function (LIB, CLASSES) {

    class BuildStep extends CLASSES.BuildStep {

        async onHome (result, home, workspace) {

            await runHomeInstructions();

            return {
                "path": result.path
            };
        }
    }

    return BuildStep;    
}

exports.inf = async function (INF, NS) {
    return {
        invoke: async function (pointer, value, options) {
            if (pointer === 'onHome()') {
                runHomeInstructions = async function () {

                    // await options.callerNamespace.componentInitContext.load(value);

                    return INF.load(value);
                }
                return true;
            }
        }
    };
}
