import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Delete from './Delete';

function Property() {
  const params = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    let response = await axios.get(`http://localhost:8080/properties/${params.id}`);
    setData(response.data);
    //console.log(data);
    }
    fetchData();
  }, [params.id]);

  return (
    <div>
      <Link to={'/properties'}>All Properties</Link>
      <p>title {data.title}</p>
      <p>location {data.location}</p>
      <button><Link to={`/properties/${params.id}/edit`}>edit</Link></button>
      <Delete/>
    </div>
  );
}

export default Property;