import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function SprintDetailPage() {

    const [sprint, setSprint] = useState(null);
    const { sprintId } = useParams();
    const storedToken = localStorage.getItem('authToken');

    const fetchSprint = async () => {
        try {
            let response = await axios
            .get(`${process.env.REACT_APP_API_URL}/sprints/${sprintId}`, {headers: { Authorization: `Bearer ${storedToken}` }});
            //console.log(response.data)
            setSprint(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchSprint();
    }, []);

    return (
    <div>
        <h1>Sprint Detail</h1>
        {sprint && (
            <>
                <h3>{sprint.name}</h3>
                <h4>{sprint.duration} weeks duration</h4>
                <h4>Planning at:</h4>
                <p>{sprint.startingDate}</p>
                <h4>Review at:</h4>
                <p>{sprint.review}</p>
                <h4>Retrospective at:</h4>
                <p>{sprint.retrospective}</p>
                <h4>Standups at:</h4>
                <p>{sprint.standUps}</p>

            </>
        )}
    </div>
  )
}

export default SprintDetailPage