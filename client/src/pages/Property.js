import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Delete from './Delete';
import NotFound from '../NotFound';

function Property() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
    await axios.get(`http://localhost:8080/properties/${params.id}`)
      .then(res => {if (res.status !== 200){throw Error('could not fetch the data for that resource')} else { setData(res.data); }})
      .catch(err => {setError(err.message); setData(null)});
    } 
    fetchData();
  }, [params.id]);

  return (
    <div>
      { error && <NotFound/> }
      { data && <p>title {data.title}</p> }
      { data && <p>location {data.location}</p> }
      { data && <button><Link to={`/properties/${params.id}/edit`}>edit</Link></button> }
      { data && <Delete/> }
    </div>
  );
}

export default Property;