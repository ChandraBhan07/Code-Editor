interface ResizableProps {
    axis: 'x' | 'y';
    name: string;
    children: React.ReactElement;
}

const Resizable: React.FC<ResizableProps> = ({ axis, name, children }) => {


    return (
        <div className={`${name}-wrapper`}>

            <div className={`${name}`}>
                {children}
            </div>

            <div className={`resizer-${axis}`}></div>

        </div>
    );

}

export default Resizable;