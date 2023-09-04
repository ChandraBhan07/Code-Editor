import React from "react";
import ReactDOM from 'react-dom/client';
import bundler from './bundler';
import CodeCell from "./components/codeCell";
import TextEditor from "./components/textEditor";

const App = () => {
    bundler.initialize();
    return (
        <div>
            <CodeCell />

            <TextEditor />
        </div>
    );
};

ReactDOM.createRoot(document.querySelector('#root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

