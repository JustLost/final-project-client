import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddSprintForm from "../../Components/AddSprintForm/AddSprintForm";
import "./SprintsPage.css"


function SprintsPage() {
    const [sprints, setSprints] = useState([]);

    const fetchSprints = async () => {
        try {
            const storedToken = localStorage.getItem("authToken");

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/sprints`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setSprints(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchSprints();
    }, []);

    return (
        <div className="sprints-list">
            <div>
                <h1>Sprints list</h1>
                {sprints.map((sprint) => {
                    return (
                        <div className="sprints" key="task._id">
                            <Link to={`/sprints/${sprint._id}`}>
                                <h3>{sprint.name}</h3>                                
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div>
                <AddSprintForm refreshSprints={fetchSprints}/>
            </div>
        </div>
    )
}

export default SprintsPage