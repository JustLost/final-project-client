import React, { useState } from "react";
import axios from "axios";

function AddSprintForm(props) {
  const [name, setName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [duration, setDuration] = useState("");
  const [standUps, setStandUps] = useState("");
  const [review, setReview] = useState("");
  const [tasks, setTasks] = useState("");
  const [retrospective, setRetrospective] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, startingDate, duration, standUps, review, tasks, retrospective };
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${process.env.REACT_APP_API_URL}/projects`, body, {headers: { Authorization: `Bearer ${storedToken}` }})
      .then((response) => {
        setName("");
        //setSprints("");
        props.refreshProjects();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Add Sprint</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Sprint Name</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="startingDate">StartingDate</label>
        <input type="date" name="startingDate" value={startingDate} onChange={(e) => setStartingDate(e.target.value)} />

        <label htmlFor="duration">Duration</label>
        <input type="text" duration="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />

        <label htmlFor="standUps">Stand Ups</label>
        <input type="time" name="standUps" value={standUps} onChange={(e) => setStandUps(e.target.value)} />

        <label htmlFor="review">Review</label>
        <input type="date" name="review" value={review} onChange={(e) => setReview(e.target.value)} />

        <label htmlFor="tasks">Tasks</label>
        <input type="text" name="tasks" value={tasks} onChange={(e) => setTasks(e.target.value)} />

        <label htmlFor="retrospective">Retrospective</label>
        <input type="date" name="retrospective" value={retrospective} onChange={(e) => setRetrospective(e.target.value)} />

        <button type="submit">Add Sprint</button>
      </form>
    </div>
  );
}

export default AddSprintForm;
