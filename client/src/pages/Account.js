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
  const [properties, setProperties] = useState([])

  const { user, dispatch } = useContext(AuthContext);

  //for making multiple requests and setting response to state
  const propertiesArray = [];

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/users/${user._id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setUserData(res.data); } })
        .catch(err => { setUserError(err.message); setUserData(null) });
    }
    fetchData();

  }, [user]);

  useEffect(() => {
    if (userData.savedProperties) {
      setProperties([]);
      for (let i = 0; i < userData.savedProperties.length; i++) {
        const fetchPropertyData = async () => {
          await axios.get(`/properties/${userData.savedProperties[i]}`)
            .then(res => {
              if (res.status !== 200) { throw Error('could not fetch the data for that resource') }
              //else if (properties[i]._id !== res.data._id) { setProperties(oldArray => [...oldArray, res.data]); console.log(properties) }
              else if (true) { setProperties(oldArray => [...oldArray, res.data]); /*console.log(properties[i]) returns undefined --> loop running faster than setting state */ }
              
              else { console.log('intredasting') }
              //else { setProperties([res.data]) }
             // else {
                
                // for (let j = 0; i < propertiesArray.length; j++){
                //   if (propertiesArray[j]._id !== res.data._id){
                //     propertiesArray.push(res.data);
                //   }
                // }
              
               // propertiesArray.push(res.data)

              //}
            })
            .catch(err => { /*console.log(err)*/ });
        }
        fetchPropertyData();
      }
      
    }
  }, [userData])



  const handleAddButton = () => {
    navigate('/add-property')
  }

  const handleUpdateButton = () => {
    navigate('/account/update')
  }

  // if (userData.agent === "true"){
  //   console.log('success');
  // }

  const uniqueProperties = new Set(properties);
  const uniqueProperties2 = Array.from(uniqueProperties);
  console.log(uniqueProperties2)

  if (userError) {
    return (<NotFound />)
  } else
    return (
      <div>
        {userData.agent === "true" ? <button onClick={handleAddButton}>Add property</button> : null}
        <button onClick={handleUpdateButton}>Update user details</button>
        <h1>Saved properties</h1>

        <div>
          {
          
          uniqueProperties2.map((p, i) => (
            <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
              beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} photos={p.photos}/>
          ))}
        </div>
      </div>


    );
}

export default Account;