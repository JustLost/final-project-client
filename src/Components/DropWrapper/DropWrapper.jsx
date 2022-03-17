import React from "react";
import { useDrop } from "react-dnd";

function DropWrapper(onDrop, children, status) {
    const [{ isOver }, drop] = useDrop({
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;