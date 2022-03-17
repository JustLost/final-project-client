import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from 'react-router-dom';
import "./AddSprintForm.css"

function AddSprintForm(props) {
  const { projectId } = useParams();

  const [name, setName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [duration, setDuration] = useState("");
  const [standUps, setStandUps] = useState("");
  const [review, setReview] = useState("");
  const [tasks, setTasks] = useState("");
  const [retrospective, setRetrospective] = useState("");
  const navigate = useNavigate();
    
  const closeOnEscapeKeyDown = (e) => {
    if((e.charCode || e.keyCode) === 27){
      props.onClose()
    }
  }

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown)
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
    }
  }, [])

  if(!props.show){
    return null
  };  

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, startingDate, duration, standUps, review, tasks, retrospective, projectId };
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${process.env.REACT_APP_API_URL}/sprints`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setName("");
        setStartingDate();
        setDuration("");
        setStandUps();
        setReview();
        setTasks([]);
        setRetrospective();
        //props.refreshProjects();
        //console.log("id:", response.data._id)
        //navigate(`/sprints/${response.data._id}`)
        props.onClose();
      })
      .catch((err) => console.log(err));
  };

  return (  
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Add Sprint</h3>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Sprint Name</label>
                <br />
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="startingDate">Starting Date</label>
                <br />
                <input type="datetime-local" name="startingDate" value={startingDate} onChange={(e) => setStartingDate(e.target.value)} />
              </div>
              <div>
                <label htmlFor="duration">Duration</label>
                <br />
                <input type="text" placeholder="weeks" duration="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
              <div>
                <label htmlFor="standUps">Stand Ups</label>
                <br />
                <input type="datetime-local" name="standUps" value={standUps} onChange={(e) => setStandUps(e.target.value)} />
              </div>
              <div>
                <label htmlFor="review">Review</label>
                <br />
                <input type="datetime-local" name="review" value={review} onChange={(e) => setReview(e.target.value)} />
              </div> 
              {/* <div>
                <label htmlFor="tasks">Tasks</label>
                <br />
                <input type="text" name="tasks" value={tasks} onChange={(e) => setTasks(e.target.value)} />
              </div> */}
              <div>
                <label htmlFor="retrospective">Retrospective</label>
                <br />
                <input type="datetime-local" name="retrospective" value={retrospective} onChange={(e) => setRetrospective(e.target.value)} />
              </div>
              <button type="submit">Add Sprint</button>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button">close</button>
        </div>
      </div>
    </div>
  )
    
}

export default AddSprintForm;
