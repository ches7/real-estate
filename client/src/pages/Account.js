import React, { useState, useEffect } from 'react';
import axios from "axios";
import NotFound from '../NotFound';
import { AuthContext } from '../utils/AuthContext';
import { useContext } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from "react-router-dom";


function Account() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [userError, setUserError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [propertyError, setPropertyError] = useState(null)
  const [myProperties, setMyProperties] = useState([]);
  const [myPropertyError, setMyPropertyError] = useState(null)

  //prevent duplicate properties being rendered
  const propertySet = new Set();

  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/api/users/${user.id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setUserData(res.data); } })
        .catch(err => { setUserError(err.message); setUserData(null) });
    }
    fetchData();
    console.log('here');

  }, [user]);

  useEffect(() => {
    if (!userData.savedProperties) return;
    for (let i = 0; i < userData.savedProperties.length; i++) {
      const fetchPropertyData = () => {
        axios.get(`/api/properties/${userData.savedProperties[i]}`)
          .then(res => {
            if (res.status !== 200) { throw Error('could not fetch the data for that resource') }

            else {
              propertySet.add(res.data);
              setProperties([...propertySet])
            }
          })

          .catch(err => { setPropertyError(err.message); });
      }
      fetchPropertyData();
      console.log('here2')
    }
  }, [userData])

  useEffect(() => {
    if (!userData.isAgent) return;
      const fetchMyPropertyData = async () => {
        await axios.get(`/api/properties?agent=${user.id}`)
          .then(res => {
            if (res.status !== 200) { throw Error('could not fetch the data for that resource') }
            else {
              setMyProperties(res.data)
            }
          })
          .catch(err => { setMyPropertyError(err.message); });
      }
      fetchMyPropertyData();
      console.log('here3')
  }, [userData])


  const handleAddButton = () => {
    navigate('/add-property')
  }

  const handleUpdateButton = () => {
    navigate('/account/update')
  }

  if (userError || !userData) {
  // if (userError || !userData || propertyError) {
    return (<NotFound />)
  } else
    return (
      <div>
        {userData.isAgent === 1 ? <button onClick={handleAddButton}>Add property</button> : null}
        <button onClick={handleUpdateButton}>Update user details</button>

        {userData.isAgent === 1 ? <h1>My properties</h1> : null}
        <div>
          {
            myProperties.map((p, i) => (
              <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
                beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} photos={p.photos} agent={p.agent}/>
            ))}
        </div>

        <h1>Saved properties</h1>

        <div>
          {
            properties.map((p, i) => (
              <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
                beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} photos={p.photos} />
            ))}
        </div>
      </div>


    );
}

export default Account;