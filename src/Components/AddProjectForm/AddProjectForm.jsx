import React, { useState } from "react";
import axios from "axios";

function AddProjectForm(props) {
  const [name, setName] = useState("");
  const [sprints, setSprints] = useState("");
  const [description, setDescription] = useState("");
  const [sprintDuration, setSprintDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, sprints, description, sprintDuration };
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${process.env.REACT_APP_API_URL}/projects`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setName("");
        setSprints("");
        props.refreshProjects();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Add Project</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Project Name</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="description">Description</label>
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        {/* <label htmlFor="sprints">Number of Sprints</label>
        <input type="text" name="sprints" value={sprints} onChange={(e) => setSprints(e.target.value)} /> */}

        <label htmlFor="sprintDuration">Sprint Duration</label>
        <input type="text" name="sprintDuration" value={sprintDuration} onChange={(e) => setSprintDuration(e.target.value)} />

        <button><a href="/new/task">Add a Task</a></button>
        <button><a href="/">Add Team</a></button>

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default AddProjectForm;
