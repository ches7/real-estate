import React, { useState, useEffect } from 'react';
import axios from "axios";
import NotFound from '../NotFound';
import { AuthContext } from '../utils/AuthContext';
import { useContext } from 'react';
import PropertyCard from '../components/PropertyCard';

function Account() {

  const [userData, setUserData] = useState([]);
  const [userError, setUserError] = useState(null);
  const [properties, setProperties] = useState([])

  const { user, dispatch } = useContext(AuthContext);


  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://localhost:8080/users/${user._id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setUserData(res.data); } })
        .catch(err => { setUserError(err.message); setUserData(null) });
    }
    fetchData();

  }, [user]);

  useEffect(() => {
    if (userData.savedProperties) {
      for (let i = 0; i < userData.savedProperties.length; i++) {
        const fetchPropertyData = async () => {
          await axios.get(`http://localhost:8080/properties/${userData.savedProperties[i]}`)
            .then(res => {
              if (res.status !== 200) { throw Error('could not fetch the data for that resource') }
              else { setProperties(oldArray => [...oldArray, res.data]) }
            })
            .catch(err => { /*console.log(err)*/ });
        }
        fetchPropertyData();
      }
      console.log(properties);
    }
  }, [userData])

  if (userError) {
    return (<NotFound />)
  } else
    return (
      <div>
        <h1>Saved properties</h1>

        <div>
          {properties.map((p, i) => (
            <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
              beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} />
          ))}
        </div>
      </div>


    );
}

export default Account;