import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let id = '';
        const user = { username, email, password };
        axios({
            data: user,
            method: 'post',
            url: '/register',
        })
         .then(res => {
            console.log(res);
             navigate(`/signin`);
         })
    
      }

    return (
        <div>
            <h1>Register to save properties and much more</h1>
            <h2>Already registered? <Link to="/signin">Sign in</Link></h2>
            <div className="search-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email-address">Email address</label>
                    <input 
                    type="email" 
                    name="email-address" 
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setUsername(e.target.value);}}
                    ></input>

                    <label htmlFor="password">Password</label>
                    <input 
                    type="text" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button type="submit">Register</button>
                </form>
            </div>
            <h4><Link to="/register-as-agent">Register as agent</Link></h4>
        </div>
    );
};

export default Register;