import React, { useState, useEffect, useContext } from "react"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./TaskPage.css"

function TaskPage(props) {

  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const fetchTask = async () => {
      try {
        
        axios
        .get(`${process.env.REACT_APP_API_URL}/backlog/task/${taskId}`, {headers: { Authorization: `Bearer ${storedToken}` }})
        .then(response => setTask(response.data))
        //setTask(response.data);
        console.log("task detail:", task)
      } catch (error) {
        console.log(error)         
      }
  };

  useEffect(() => {
    fetchTask();
  }, []);
  
    

  return (
    <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{task && task.title} details</h2>
          </div>
          <div className="modal-body">
            <h3>Status:</h3> 
            {task && task.status}
            <h3>Description: </h3>
            {task && task.description}
            <h3>Creator: </h3>
            {task && task.creator}
            <h3>Task tag: </h3>
            {task && task.tag}
            <h3>Story Points: </h3>
            {task && task.storyPoints}
            </div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button">close</button>
        </div>
      </div>
      
    </div>
  )
}

export default TaskPage