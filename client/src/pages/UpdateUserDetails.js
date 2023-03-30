import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../utils/AuthContext";

const UpdateUserDetails = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [isAgent, setIsAgent] = useState(0);
    const [agentName, setAgentName] = useState(null);
    const [agentPhoto, setAgentPhoto] = useState(null);
    const [userError, setUserError] = useState(null);
    
    const { user, dispatch } = useContext(AuthContext);
    const [id, setId] = useState(user.id);

    useEffect(() => {
      const fetchData = async () => {
        if (!user) return;
        await axios.get(`/api/users/${user.id}`)
          .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { 
            setEmail(res.data.email);
            setId(res.data.id);
            if(res.data.isAgent == 1){
                setIsAgent(1);
                setAgentName(res.data.agentName);
            }

         } })
          .catch(err => { setUserError(err.message); setEmail(null) });
      }
      fetchData();
    }, [user]);

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        await axios({
            data: { email, id },
            method: 'patch',
            url: '/api/updateuser',
        })
         .then(res => {
            console.log(res);
         })
         const res2 = await axios.get(`/api/users/${user.id}`);
         console.log(res2)
            dispatch({ type: "REFRESH", payload: res2.data });
            navigate(`/account`);
    
      }

      const handleAgentSubmit = async (e) => {
        e.preventDefault();
        await axios({
            data: { email, id, agentName, agentPhoto },
            method: 'patch',
            url: '/api/updateagent',
            headers: { 'Content-Type': 'multipart/form-data' }
        })
         .then(res => {
            console.log(res);
         })
         const res2 = await axios.get(`/api/users/${user.id}`);
         console.log(res2)
            dispatch({ type: "REFRESH", payload: res2.data });
            navigate(`/account`);
    
      }

      const handlePhoto = event => {
        const file = event.target.files[0]
        setAgentPhoto(file)
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        await axios({
            data: { id },
            method: 'delete',
            url: '/api/deleteuser'
        })
         .then(res => {
            console.log(res);
         })
            dispatch({ type: "SIGNOUT" });
            navigate(`/`);
    }

    if(!isAgent){
        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column">
            <h1 className="mt-3">Update user details</h1>
            <p><Link to="/account">Back to your account </Link></p>
                <form onSubmit={handleUserSubmit}>

                    <label htmlFor="email-address">Email address</label>
                    <input 
                    type="email" 
                    name="email-address" 
                    required
                    value={email}
                    onChange={(e) => {setEmail(e.target.value);}}
                    className="mb-3"
                    ></input>

                    <button type="submit" className="btn btn-dark mb-5">Update</button>
                </form>
            <button className="btn btn-danger mt-5" onClick={handleDeleteAccount}>Delete account</button>
        </div>
        </div>
        )
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
            <h1 className="mt-3">Update user details</h1>
            <p><Link to="/account">Back to your account </Link></p>
                <form onSubmit={handleAgentSubmit} className="d-flex flex-column">
                <label htmlFor="name">Agent Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={agentName}
                        onChange={(e) => { setAgentName(e.target.value); }}
                        className="mb-3"
                    ></input>

                    <label htmlFor="email-address">Email address</label>
                    <input 
                    type="email" 
                    name="email-address" 
                    required
                    value={email}
                    onChange={(e) => {setEmail(e.target.value);}}
                    className="mb-3"
                    ></input>

                    <label htmlFor="agentPhoto">Agent Photo</label>
                    <input onChange={handlePhoto} type="file" required name="agentPhoto" accept="image/*" className="mb-3"></input>

                    <button type="submit" className="btn btn-dark mb-5">Update</button>
                </form>
            <button className="btn btn-danger mt-5" onClick={handleDeleteAccount}>Delete account</button>
            </div>
        </div>
    );
};

export default UpdateUserDetails;