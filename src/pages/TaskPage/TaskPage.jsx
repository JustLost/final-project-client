import React, { useState, useEffect, useContext } from "react"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./TaskPage.css"

function TaskPage() {

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
    <div>
        <div>
            <h1>{task && task.title} details</h1>
            <h3>Status: {task && task.status}</h3>
            <h3>{task && task.description}</h3>
            {task && task.creator}
            {task && task.tag}
            {task && task.storyPoints}
        </div>
        
    </div>
  )
}

export default TaskPage