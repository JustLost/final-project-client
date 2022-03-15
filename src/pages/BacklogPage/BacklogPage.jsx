import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddTaskForm from '../../Components/AddTaskForm/AddTaskForm';

function BacklogPage() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {            
            const storedToken = localStorage.getItem('authToken');

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/backlog`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            setTasks(response.data);
            console.log('dataaaaaaaaaa: ', response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

  return (
    <div>
        <h1>Backlog</h1>
        
        {tasks.map((task) => {
            return (
                <div key={task._id}>
                    <Link to={`/tasks/${task._id}`}>
                        <h3>{task.title}</h3>
                    </Link>
                </div>   
            )
        })}
    </div>
  )
}

export default BacklogPage