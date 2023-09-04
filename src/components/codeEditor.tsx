import MonacoEditor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useRef } from 'react';
import * as prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string | undefined): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

    const editorRef = useRef<any>();
    const handleEditorDidMount = function (editor: editor.IStandaloneCodeEditor): void {
        editorRef.current = editor;
        editor.getModel()?.updateOptions({ tabSize: 2 });
    };

    const onFormatClick = () => {
        // get current value
        const unformatted = editorRef.current.getModel().getValue();

        // format value
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            semi: true,

        }).replace(/\n$/, '');

        // set the formatted value back
        editorRef.current.setValue(formatted);
    }

    return (
        <div className='editor-wrapper'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded button-format' onClick={onFormatClick}>Format</button>
            <MonacoEditor
                height="100%"
                onChange={onChange}
                theme="vs-dark"
                language="javascript"
                value={initialValue}
                onMount={handleEditorDidMount}
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    folding: false,
                    lineNumbersMinChars: 3,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
    )
}

export default CodeEditor;
