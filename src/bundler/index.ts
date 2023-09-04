import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugin/unpkgPathPlugin";
import { fetchPlugin } from "./plugin/fetchPlugin";
import { useEffect } from "react";

const bundle = async (rawCode: string): Promise<any> => {
    try {
        const result = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
            define: {
                global: 'window'
            }
        });

        return result.outputFiles[0].text;
    }
    catch (err) {
        new ErrorEvent('bundle')
        // const myEvent = new CustomEvent('testevent', { detail: 'test event data' });
        // window.dispatchEvent(event);
        // document.dispatchEvent(myEvent);
        return
    }
};

const initialize = (): void => {

    const startService = async () => {
        await esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
    }
    useEffect(() => {
        startService()
    }, []);
};

export default { initialize, bundle };