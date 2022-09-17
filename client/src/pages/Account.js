import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NotFound from '../NotFound';
import { AuthContext } from '../utils/AuthContext';
import { useContext } from 'react';

function Account() {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const { user, loading, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:8080/users/${user._id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setData(res.data); } })
        .catch(err => { setError(err.message); setData(null) });
    }
    fetchData();
  }, [user]);

  if (error) {
    return (<NotFound />)
  } else
    return (
      <div>
        {data.email}
      </div>
    );
}

export default Account;