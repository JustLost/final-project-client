import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddTaskForm.css"

function AddTaskForm(props) {
  const { projectId } = useParams();
  
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  //const [creator, setCreator] = useState("");
  const [assignedTo, setAssinedTo] = useState("");
  const [tag, setTag] = useState("none");
  const [storyPoints, setStoryPoints] = useState(1)
  //const navigate = useNavigate();

  //const handleTitle = (e) => setTitle(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  //const handleDescription = (e) => setDescription(e.target.value);
  //const handleCreator = (e) => setCreator(e.target.value);
  //const handleAssignedTo = (e) => setAssinedTo(e.target.value);

  const handleSubmit = (e) => {
    const creator = user;
    e.preventDefault();

    const body = {
      title,
      status,
      description,
      creator,
      assignedTo,
      tag,
      storyPoints
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${process.env.REACT_APP_API_URL}/backlog/${projectId}`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setTitle("");
        //TODO: outros
        //setSprints("");
        props.refresh();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="task-box">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Task title</label>          
          <br />
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description</label>          
          <br />
          <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>        
        <div>
          <label htmlFor="assignTo">Assign To</label>
          <br />
          <input type="text" name="review" value={assignedTo} onChange={(e) => setAssinedTo(e.target.value)} />
        </div>
        {/* <div>
            <h4>Task Status</h4>
            <input type="radio" name="myCheckbox" value="To do" onChange={handleStatus}  defaultChecked />
            <label htmlFor="role">To do</label>

            <input type="radio" name="myCheckbox" value="Doing" onChange={handleStatus} />
            <label htmlFor="role">Doing</label>

            <input type="radio" name="myCheckbox" value="Merge Request" onChange={handleStatus} />
            <label htmlFor="role">Merge Request</label>

            <input type="radio" name="myCheckbox" value="Blocked" onChange={handleStatus} />
            <label htmlFor="role">Blocked</label>

            <input type="radio" name="myCheckbox" value="Done" onChange={handleStatus} />
            <label htmlFor="role">Done</label>
        </div> */}
        <div>
            <h4>Task Tag:</h4>
            <input type="radio" name="myTagBox" value="none" onChange={(e) => setTag(e.target.value)} defaultChecked />
            <label htmlFor="tag">none</label>

            <input type="radio" name="myTagBox" value="User Story" onChange={(e) => setTag(e.target.value)} />
            <label htmlFor="tag">User Story</label>

            <input type="radio" name="myTagBox" value="Spike" onChange={(e) => setTag(e.target.value)} />
            <label htmlFor="tag">Spike</label>

            <input type="radio" name="myTagBox" value="Bug Fix" onChange={(e) => setTag(e.target.value)} />
            <label htmlFor="tag">Bug Fix</label>
        </div>
        <div>
            <h4>Story Points:</h4>
            <input type="radio" name="myPointsBox" value="1" onChange={(e) => setStoryPoints(e.target.value)} defaultChecked />
            <label htmlFor="storyPoints">1</label>

            <input type="radio" name="myPointsBox" value="2" onChange={(e) => setStoryPoints(e.target.value)} />
            <label htmlFor="storyPoints">2</label>

            <input type="radio" name="myPointsBox" value="3" onChange={(e) => setStoryPoints(e.target.value)} />
            <label htmlFor="storyPoints">3</label>

            <input type="radio" name="myPointsBox" value="5" onChange={(e) => setStoryPoints(e.target.value)} />
            <label htmlFor="storyPoints">5</label>

            <input type="radio" name="myPointsBox" value="8" onChange={(e) => setStoryPoints(e.target.value)} />
            <label htmlFor="storyPoints">8</label>
        </div>
        <button type="submit">Add task</button>
      </form>
    </div>
  );
}

export default AddTaskForm;
