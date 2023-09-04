import { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
    code: string;
}

const html = `
    <html> 
        <head>
        </head>
        <body>
        <div id="root"></div>
        <script>
            const handleError = (err) => {
                const root = document.querySelector("#root");
                root.innerHTML = '<div style="color : red;"><h5>' + err + '</h5></div>';
                console.error(err);
            };

            document.addEventListener('testevent', e => console.log('test event', e));
            document.addEventListener('bundle', e => console.log('bundle', e));

            window.addEventListener('error',(event)=> {
                console.log('a', event);
                handleError(event.error);
            });

            window.addEventListener('message', (event) => {
                try{
                    console.log('message', event.data);
                    eval(event.data);
                }
                catch(e){
                   handleError(e.message);
                }
            }, false);
        </script>
        </body>
    </html>
    `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;

        // give proper time to populate iframe html
        setTimeout(() => {
            // event emitter - event message
            iframe.current.contentWindow.postMessage(code, '*')
        }, 50);

    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                title='preview'
                ref={iframe}
                srcDoc={html}
                sandbox="allow-scripts" />
        </div>
    )

};

export default Preview;