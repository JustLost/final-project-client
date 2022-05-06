import React, {useEffect} from "react"
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom"
import "./DelProjectModal.css"

function DelProjectModal(props) {
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("authToken");
    const { projectId } = useParams();

    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose()
        }
    }    

    
    const deleteProject = () => {
        axios
        .delete(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {headers: { Authorization: `Bearer ${storedToken}` }})
        .then(() => navigate("/projects"))
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown)
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
        }
    }, []);

    if (!props.show){
        return null
    };

    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">Delete Project</h3>
                </div>
                <div className="modal-body">
                    <h3 className="del-header">Are you sure you want to delete this project?</h3>
                    <p>This action cannot be undone!</p>
                    
                    <button className="button" onClick={deleteProject}>Delete</button>
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="c-button">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DelProjectModal