import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import NotFound from '../NotFound';
import SignIn from './SignIn';
import { AuthContext } from '../utils/AuthContext';
import { useContext } from 'react';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from "react-router-dom";
import Flash from '../components/Flash';
import ServerError from '../ServerError';
import '../styles/Account.css';


function Account() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [userError, setUserError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [propertyError, setPropertyError] = useState(null)
  const [myProperties, setMyProperties] = useState([]);
  const [myPropertyError, setMyPropertyError] = useState(null)
  const [active, setActive] = useState(false);
const [typeFlash, setTypeFlash] = useState("default");
const [width, setWidth] = useState("default");
const [position, setPosition] = useState("default");
const [timer, setTimer] = useState(2000);
const message = useRef("");

  //prevent duplicate properties being rendered
  const propertySet = new Set();

  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      await axios.get(`/api/users/${user.id}`)
        .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { setUserData(res.data); } })
        .catch(err => { setUserError(true); setUserData(null) });
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if(!userData) return;
    if (!userData.savedProperties) return;
    for (let i = 0; i < userData.savedProperties.length; i++) {
      if(userData.savedProperties[i] == null) return;
      const fetchPropertyData = () => {
        axios.get(`/api/properties/${userData.savedProperties[i]}`)
          .then(res => {
            if (res.status !== 200) { throw Error('could not fetch the data for that resource') }
            else {
              propertySet.add(res.data);
              setProperties([...propertySet])
            }
          })
          .catch(err => { 
            if (err.response.status === 404){unsave(userData.savedProperties[i]);}
            });
      }
      fetchPropertyData();
    }
  }, [userData]);

  useEffect(() => {
    if (!userData) return;
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
  }, [userData]);

  //checks for deleted properties and unsaves them
  const unsave = async (propertyId) => {
    if(!user) return;
    try {
        const res = await axios.post("/api/users/unsaveproperty", {
        "id":`${user.id}`,
        "property":`${propertyId}`
        });
        //update sessionstorage with user data
        const res2 = await axios.get(`/api/users/${user.id}`)
        dispatch({ type: "REFRESH", payload: res2.data });
    } catch (err) {
        console.log(err)
    }
};

  const getFlashStateFromChild = (data) => {
    message.current = 'Property deleted';
    setTypeFlash('success');
    handleShowFlash();
  }

  const handleAddButton = () => {
    navigate('/add-property')
  }

  const handleUpdateUserButton = () => {
    navigate('/account/update')
  }

  const handleChangePasswordButton = () => {
    navigate('/account/change-password')
  }

  const hideFlash = () => {
    setActive(false);
};

const handleShowFlash = () => {
    hideFlash();
    if (message) {
      setActive(true)
        window.setTimeout(hideFlash, timer);
    }
};

  if(userError) { return (<ServerError/>) } 
  if (!user || !userData) { return (<SignIn />) } 
  else return (
      <div>
        <div className='account-buttons'>
        {userData.isAgent === 1 ? <button onClick={handleAddButton} className='btn btn-dark m-2'>Add property</button> : null}
        <button onClick={handleUpdateUserButton} className='btn btn-dark m-2'>Update user details</button>
        <button onClick={handleChangePasswordButton} className='btn btn-dark m-2'>Change password</button>
        </div>

        {userData.isAgent === 1 ? 
        <div className='d-flex justify-content-center'>
        <h1>My properties</h1> 
        </div>
        : null}

        <div>
          {
            myProperties.map((p, i) => (
              <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
                beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} photos={p.photos} agent={p.agent} func={getFlashStateFromChild}/>
            ))}
        </div>

        {properties.length !== 0 ? 
        <div className='d-flex justify-content-center'>
        <h1>Saved properties</h1> 
        </div>
        : null}

        <div>
          {
            properties.map((p, i) => (
              <PropertyCard key={i} price={p.price} title={p.title} location={p.location} description={p.description} id={p._id}
                beds={p.beds} baths={p.baths} receptions={p.receptions} type={p.type} photos={p.photos} />
            ))}
        </div>
        {active && (
            <Flash
                type={typeFlash}
                message={message.current}
                duration={3000}
                active={active}
                setActive={setActive}
                position={"bcenter"}
                width={"default"}
            />
        )}
      </div>
    );
}

export default Account;