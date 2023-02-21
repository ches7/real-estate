import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../utils/AuthContext";
import NotFound from "../NotFound";

const ChangePassword = () => {

    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { user, dispatch } = useContext(AuthContext);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     if (!user) return;
    //     await axios.get(`/api/users/${user.id}`)
    //       .then(res => { if (res.status !== 200) { throw Error('could not fetch the data for that resource') } else { 
    //         setEmail(res.data.email);
    //         setId(res.data.id);
    //         if(res.data.isAgent == 1){
    //             setIsAgent(1);
    //             setAgentName(res.data.agentName);
    //         }

    //      } })
    //       .catch(err => { setUserError(err.message); setEmail(null) });
    //   }
    //   fetchData();
    // }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            console.log('passwords do not match')
            return; /*flash error message*/};
        const id = user.id;
        await axios({
            data: { id, oldPassword, newPassword },
            method: 'patch',
            url: '/api/changepassword',
        })
         .then(res => {
            console.log(res);
         })
         const res2 = await axios.get(`/api/users/${user.id}`);
         console.log(res2)
            dispatch({ type: "REFRESH", payload: res2.data });
            navigate(`/account`);
    
      }

      if (!user) return <NotFound/>;
        return (
            <div>
            <h1>Update user details</h1>
            <h2><Link to="/account">Back to your account </Link></h2>
            <div className="search-container">
                <form onSubmit={handleSubmit}>

                    <label htmlFor="old-password">Old Password</label>
                    <input 
                    type="text" 
                    name="old-password" 
                    required
                    onChange={(e) => {setOldPassword(e.target.value);}}
                    ></input>

<label htmlFor="new-password">New Password</label>
                    <input 
                    type="text" 
                    name="new-password" 
                    required
                    onChange={(e) => {setNewPassword(e.target.value);}}
                    ></input>

<label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                    type="text" 
                    name="confirm-password" 
                    required
                    onChange={(e) => {setConfirmPassword(e.target.value);}}
                    ></input>

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
        )
};

export default ChangePassword;