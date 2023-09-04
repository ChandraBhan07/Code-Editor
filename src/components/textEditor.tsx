import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import './text-editor.css';

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState<string | undefined>('# Header');

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {

        // listener to only update when click outside, if ref contains target element then nothing
        const listener = (event: MouseEvent) => {
            // click inisde of editor
            if (ref.current && event.target && ref.current.contains(event.target as Node)) return;
            setEditing(false);
        };
        document.addEventListener('click', listener, { capture: true });

        return () => {
            document.removeEventListener('click', listener, { capture: true });
        }
    }, [])

    if (editing) {
        return (
            <div ref={ref} className='text-editor'>
                <MDEditor
                    value={value}
                    onChange={setValue}
                />
            </div>
        )
    }
    return (
        <div onClick={() => setEditing(true)} className='text-editor border border-neutral-300/75 p-6 px-7'>
            <MDEditor.Markdown source={value} />
        </div>
    )
}

export default TextEditor;