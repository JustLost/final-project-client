import React, { useState } from "react";
import axios from "axios";
import "./AddProjectForm.css"

function AddProjectForm(props) {
  const [name, setName] = useState("");
  const [sprints, setSprints] = useState("");
  const [description, setDescription] = useState("");
  const [sprintDuration, setSprintDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, sprints, description, sprintDuration };
    const storedToken = localStorage.getItem("authToken");

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
    <div className="add-project">
      <h2>Add Project</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Project Name:</label>
            <br />
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          
          <div>
            <label htmlFor="description">Description:</label>
            <br />
            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          {/* <label htmlFor="sprints">Number of Sprints</label>
          <input type="text" name="sprints" value={sprints} onChange={(e) => setSprints(e.target.value)} /> */}

          <div>
            <label htmlFor="sprintDuration" placeholder="Weeks">Sprint Duration:</label>
            <br />
            <input type="number" name="sprintDuration" value={sprintDuration} onChange={(e) => setSprintDuration(e.target.value)} />
          </div>

          <button type="submit">Add Project</button>
        </form>
      </div>
    </div>
  );
}

export default AddProjectForm;
