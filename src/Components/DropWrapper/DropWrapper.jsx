import React from "react";
import { useDrop } from "react-dnd";

import Item from "../Item/Item";

function DropWrapper({onDrop, children, status}) {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "CARD",
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
            console.log("iteeeem:" ,item)
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
                
    });
    //console.log("childreeeeeen:", children)
    
    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement( children, { isOver })}
        </div>
    )
};

export default DropWrapper;