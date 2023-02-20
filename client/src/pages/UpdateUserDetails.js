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
    const [id, setId] = useState(null);

    const { user, dispatch } = useContext(AuthContext);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios({
            data: { email, id },
            method: 'patch',
            url: '/api/update',
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

    if(!isAgent){
        return (
            <div>
            <h1>Update user details</h1>
            <h2><Link to="/account">Back to your account </Link></h2>
            <div className="search-container">
                <form onSubmit={handleSubmit}>

                    <label htmlFor="email-address">Email address</label>
                    <input 
                    type="email" 
                    name="email-address" 
                    required
                    value={email}
                    onChange={(e) => {setEmail(e.target.value);}}
                    ></input>

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
        )
    }
    return (
        <div>
            <h1>Update user details</h1>
            <h2><Link to="/account">Back to your account </Link></h2>
            <div className="search-container">
                <form onSubmit={handleSubmit}>
                <label htmlFor="name">Agent Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={agentName}
                        onChange={(e) => { setAgentName(e.target.value); }}
                    ></input>

                    <label htmlFor="email-address">Email address</label>
                    <input 
                    type="email" 
                    name="email-address" 
                    required
                    value={email}
                    onChange={(e) => {setEmail(e.target.value);}}
                    ></input>

<label htmlFor="agentPhoto">Agent Photo</label>
                    <input onChange={handlePhoto} type="file" required name="agentPhoto" accept="image/*"></input>

                    {/* <label htmlFor="password">Password</label>
                    <input 
                    type="text" 
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input> */}
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserDetails;