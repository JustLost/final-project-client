import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./SprintDetailPage.css"

import Item from "../../Components/Item/Item";
import DropWrapper from "../../Components/DropWrapper/DropWrapper";
import Col from '../../Components/Col/Col';

const moment = require('moment');

const statuses = [ "To do", "Doing", "Merge Request", "Done", "Blocked" ];
const data = null;

function SprintDetailPage() {
    const [sprint, setSprint] = useState(null);
    const { sprintId } = useParams();
    const storedToken = localStorage.getItem('authToken');
    const [showDetails, setShowDetails] = useState(false); 

    const [items, setItems] = useState(data);

    const fetchSprint = async () => {
        try {
            let response = await axios
            .get(`${process.env.REACT_APP_API_URL}/sprints/${sprintId}`, {headers: { Authorization: `Bearer ${storedToken}` }});
            console.log("respnseeee:", response.data)
            setSprint(response.data);
            setItems(response.data.tasks);
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

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status});
            return [ ...newItems ];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return  [ ...newItems ];
        });
    };

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
                    <p>{moment(sprint.startingDate).format('DD-MM-YYYY HH:MM')}</p>
                    <h4>Review at:</h4>
                    <p>{moment(sprint.review).format('DD-MM-YYYY HH:MM')}</p>
                    <h4>Retrospective at:</h4>
                    <p>{moment(sprint.retrospective).format('DD-MM-YYYY HH:MM')}</p>
                    <h4>Standups at:</h4>
                    <p>Everyday: {moment(sprint.standUps).format('HH:MM')}</p>
                </>
            )} 
        </div>
        <div className={"row"}>
            {statuses.map((s, index) => {
                return (                    
                    <div key={index} className={"col-wrapper"}>
                        <h2 className={"col-header"}>{s.toUpperCase()}</h2>

                        <DropWrapper onDrop={onDrop} status={s}>
                            <Col>
                                {items && items
                                    .filter(i => i.status === s)
                                    .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                }
                            </Col>
                        </DropWrapper>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default SprintDetailPage