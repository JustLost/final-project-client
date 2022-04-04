import React from "react"
import Modal from "react-modal";

function Window({show, onClose, item}) {
    
    // document.getElementById("root") && Modal.setAppElement("#root");
    //console.log("iteeem:", item)
  return (    
    <Modal
        ariaHideApp={false}
        isOpen={show}
        onRequestClose={onClose}
        // className={"modal"}
        overlayClassName={"overlay"}
    >
       
        <div className={"close-btn-ctn"}>
            <h1 style={{ flex: "1 90%" }}>{item.title}</h1>
            <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div>
            <h2>Description</h2>
            <p>{item.description}</p>
            <h2>Status</h2>
            <p>{item.status}</p>
        </div>
    </Modal>
  )
}

export default Window