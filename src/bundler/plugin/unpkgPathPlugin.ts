import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
    return {
        name: "unpkgPath",
        setup(build: esbuild.PluginBuild) {

            // Resolve path of root entry file 
            // ^ denotes start and $ denoted end of pattern
            build.onResolve({ filter: /^index\.js$/ }, () => {
                return { path: 'index.js', namespace: 'a' }
            });

            // Resolve nested dependencies of any level
            // + denotes n from 1 to infinte
            build.onResolve({ filter: /^\.+\// }, async (args: any) => {
                return {
                    path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
                    namespace: 'a'
                }
            });

            build.onResolve({ filter: /.*/ }, (args: any) => {
                return {
                    path: `https://unpkg.com/${args.path}`,
                    namespace: 'a'
                }
            });


            
        }
    }
}