import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./SprintDetailPage.css"

const moment = require('moment');

function SprintDetailPage() {

    const [sprint, setSprint] = useState(null);
    const { sprintId } = useParams();
    const storedToken = localStorage.getItem('authToken');
    const [showDetails, setShowDetails] = useState(false);    

    const fetchSprint = async () => {
        try {
            let response = await axios
            .get(`${process.env.REACT_APP_API_URL}/sprints/${sprintId}`, {headers: { Authorization: `Bearer ${storedToken}` }});
            console.log("respnseeee:", response.data)
            setSprint(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchSprint();
    }, []);

    const toggleShow = () => {
        setShowDetails(!showDetails);
    }

    return (
    <div>
        <div>
           <h1>Sprint</h1>
           <button onClick={toggleShow}>{showDetails ? 'Hide Sprint Details' : 'Show Sprint Details'}</button>
            {sprint && showDetails && (
                <>
                    <h3>{sprint.name}</h3>
                    <h4>{sprint.duration} weeks duration</h4>
                    <h4>Planning at:</h4>
                    <p>{moment(sprint.startingDate).format('YYYY-MM-DD HH:MM')}</p>
                    <h4>Review at:</h4>
                    <p>{moment(sprint.review).format('YYYY-MM-DD HH:MM')}</p>
                    <h4>Retrospective at:</h4>
                    <p>{moment(sprint.retrospective).format('YYYY-MM-DD HH:MM')}</p>
                    <h4>Standups at:</h4>
                    <p>Everyday: {moment(sprint.standUps).format('HH:MM')}</p>
                </>
            )} 
        </div>
        <div className='organized-tasks'>
            <div className='task-status'>
                <h2>tasks</h2>
                {/* //TODO: map a mostrar lista de tasks */}
                <p>{sprint.tasks[0].title}</p>
            </div>
            <div className='task-status'>
                <h2>To do</h2>
            </div>
            <div className='task-status'>
                <h2>Doing</h2>
            </div>
            <div className='task-status'>
                <h2>Blocked</h2>
            </div>
            <div className='task-status'>
                <h2>Done</h2> 
            </div>
            <div className='task-status'>
                <h2>Merge request</h2>
            </div>
        </div>
    </div>
  )
  //TODO: get tasks by status
}

export default SprintDetailPage