import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function Edit() {
    const params = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(`http://localhost:8080/properties/${params.id}`);
            setTitle(response.data.title);
            setLocation(response.data.location);
            setDescription(response.data.description);
        }
        fetchData();
    }, [params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const property = { title, location, description };
        axios({
            data: property,
            method: 'patch',
            url: `http://localhost:8080/properties/${params.id}`,
        }).then(navigate(`/properties/${params.id}`));

    }

    return (
        <div className="create">
            <Link to={`/properties/${params.id}`}>This Property</Link>

            <h2>Edit Property</h2>
            <form onSubmit={handleSubmit}>
                <label>Property title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Property location:</label>
                <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <label>Property description:</label>
                <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button>Add Property</button>
            </form>
        </div>
    );
}

export default Edit;