import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let id = '';
        const user = { email, password };
        axios({
            data: user,
            method: 'post',
            url: 'http://localhost:8080/signin',
        })
         .then(res => {
            console.log(res);
        //     id = res.data._id;
        //     navigate(`/properties/${id}`);
         })
    
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