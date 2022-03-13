import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddTaskForm(props) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [assignedTo, setAssinedTo] = useState("");

  const navigate = useNavigate();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleCreator = (e) => setCreator(e.target.value);
  const handleAssignedTo = (e) => setAssinedTo(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      title,
      status,
      description,
      creator,
      assignedTo,
    };

    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${process.env.REACT_APP_API_URL}/tasks`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setTitle("");
        //setSprints("");
        props.refreshProjects();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Add Task</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Task title</label>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <div>
          <input type="radio" name="myCheckbox" value="To do" onChange={handleStatus} />
          <label htmlFor="role">To do</label>

          <input type="radio" name="myCheckbox" value="Doing" onChange={handleStatus} />
          <label htmlFor="role">Doing</label>

          <input type="radio" name="myCheckbox" value="Merge Request" onChange={handleStatus} />
          <label htmlFor="role">Merge Request</label>

          <input type="radio" name="myCheckbox" value="Blocked" onChange={handleStatus} />
          <label htmlFor="role">Blocked</label>

          <input type="radio" name="myCheckbox" value="Done" onChange={handleStatus} />
          <label htmlFor="role">Done</label>

        </div>

        <label htmlFor="description">Description</label>
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* <label htmlFor="creator">Creator</label>
        <input type="time" name="standUps" value={creator} onChange={(e) => setCreator(e.target.value)} /> */}

        <label htmlFor="assignTo">Assign To</label>
        <input type="text" name="review" value={assignedTo} onChange={(e) => setAssinedTo(e.target.value)} />

        <button type="submit">Add task</button>
      </form>
    </div>
  );
}

export default AddTaskForm;
