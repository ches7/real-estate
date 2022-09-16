import { Link } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../utils/UserContext";

const SignIn = () => {

    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user])

    //prevent stale closure
    const ref = useRef({}).current;
    ref.user = user;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmailPassword = { email, password };
        await axios({
            data: userEmailPassword,
            method: 'post',
            url: 'http://localhost:8080/signin',
        })
         .then(res => {
            setUser(res.data.details._id);
            setTimeout(printUser, 1000);
         })
    
      }

    const printUser = () => {
       console.log(ref.user)
    }

    return (
        <div>
            <h1>Sign in to save properties and much more</h1>
            <h2>No account? <Link to="/register">Register</Link></h2>
            <div className="search-container">
            <form onSubmit={handleSubmit}>
                    <label htmlFor="email-address">Email address</label>
                    <input 
                    type="email" 
                    name="email-address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>

                    <label htmlFor="password">Password</label>
                    <input 
                    type="text" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;