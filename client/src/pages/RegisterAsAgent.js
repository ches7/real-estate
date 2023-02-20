import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterAsAgent = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agentName, setAgentName] = useState('');
    const [isAgent, setIsAgent] = useState(1);
    const [agentPhoto, setAgentPhoto] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { agentName, email, password, isAgent, agentPhoto };
        console.log(user);
        axios({
            data: user,
            method: 'post',
            url: '/api/registerasagent',
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {
                console.log(res);
                //     id = res.data._id;
                navigate(`/signin`);
            })

    }

    const handlePhoto = event => {
        const file = event.target.files[0]
        setAgentPhoto(file)
    }

    return (
        <div>
            <h1>Register to save properties and much more</h1>
            <h2>Already registered? <Link to="/signin">Sign in</Link></h2>
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
                        onChange={(e) => { setEmail(e.target.value); }}
                    ></input>

                    <label htmlFor="agentPhoto">Agent Photo</label>
                    <input onChange={handlePhoto} type="file" required name="agentPhoto" accept="image/*"></input>

                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button type="submit">Register</button>
                </form>
            </div>
            <h4><Link to="/register">Register as user</Link></h4>
        </div>
    );
};

export default RegisterAsAgent;