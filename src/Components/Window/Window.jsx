import React from "react"
import Modal from "react-modal";

function Window({show, onClose, item}) {
  return (    
    <Modal
        ariaHideApp={false}
        isOpen={show}
        onRequestClose={onClose}
        className={"dd-modal"}
        overlayClassName={"overlay"}
    >
       
        <div className={"close-btn-ctn"}>
            <h2 style={{ flex: "1 90%" }}>{item.title}</h2>
            
            
        </div>
        <div className="task-details">
            <h3>Description:</h3>
            <p>{item.description}</p>
            <h3>Status:</h3>
            <p>{item.status}</p>
            <h3>Tag:</h3>
            <p>{item.tag}</p>
            <h3>Story points:</h3>
            <p>{item.storyPoints}</p>
            <h3>Assigned to:</h3>
            <p>{item.assigndTo}</p>
            
        </div>
        <div className="button-div">
            <button className="close-button" onClick={onClose}>close</button>
        </div>
        
        
    </Modal>
  )
}

export default Window