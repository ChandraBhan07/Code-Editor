
import Resizable from "./resizable";
import { useState, useEffect } from "react";
import bundler from '../bundler';
import CodeEditor from "./codeEditor";
import Preview from "./preview";

import './code-cell.css';


const CodeCell = () => {
    const [input, setInput] = useState<any>('');
    const [code, setCode] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundler.bundle(input);
            setCode(output);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [input]);

    return (
        <div style={{ height: '300px', width: "100%" }}>

            <Resizable axis="y" name="codecell">

                <div className="codecell-element">
                    <div>
                        <Resizable axis='x' name="editor">
                            < CodeEditor
                                initialValue="// Happy coding ..."
                                onChange={(value) => setInput(value)}
                            />
                        </Resizable>
                    </div>

                    <div className="preview-wrapper">
                        <div className="preview">
                            <Preview code={code} />
                        </div>
                    </div>
                </div>


            </Resizable>

        </div>
    );
}
export default CodeCell;

