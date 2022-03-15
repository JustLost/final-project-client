import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

function AddSprintForm(props) {
  const { projectId } = useParams();

  const [name, setName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [duration, setDuration] = useState("");
  const [standUps, setStandUps] = useState("");
  const [review, setReview] = useState("");
  const [tasks, setTasks] = useState("");
  const [retrospective, setRetrospective] = useState("");

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
        props.refreshProjects();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Add Sprint</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Sprint Name</label>
          <br />
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="startingDate">Starting Date</label>
          <br />
          <input type="date" name="startingDate" value={startingDate} onChange={(e) => setStartingDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <br />
          <input type="text" placeholder="weeks" duration="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div>
          <label htmlFor="standUps">Stand Ups</label>
          <br />
          <input type="date" name="standUps" value={standUps} onChange={(e) => setStandUps(e.target.value)} />
        </div>
        <div>
          <label htmlFor="review">Review</label>
          <br />
          <input type="date" name="review" value={review} onChange={(e) => setReview(e.target.value)} />
        </div> 
        <div>
          <label htmlFor="tasks">Tasks</label>
          <br />
          <input type="text" name="tasks" value={tasks} onChange={(e) => setTasks(e.target.value)} />
        </div>
        <div>
          <label htmlFor="retrospective">Retrospective</label>
          <br />
          <input type="date" name="retrospective" value={retrospective} onChange={(e) => setRetrospective(e.target.value)} />
        </div>
        <button type="submit">Add Sprint</button>
      </form>
    </div>
  );
}

export default AddSprintForm;
