import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "../Window/Window";


function Item( {item, index, moveItem, status} ) {
    const ref = useRef(null);

    const [{canDrop}, drop] = useDrop({
        accept: "CARD",
        collect: monitor => ({
            canDrop: monitor.canDrop()
        }),
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
        
    });

    const [{ isDragging }, drag] = useDrag({
        type: "CARD",
        item: {...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    drag(drop(ref));
    //console.log("iteeeeeeeeeeeem:", item)
    return (
        <>
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}
                onClick={onOpen}
            >
                <div  />
                <p>{`${item.title}`}</p>
            </div>
            <Window
                item={item}
                onClose={onClose}
                show={show}
            />
        </>
    );
}

export default Item;