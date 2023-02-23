import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flash from "../components/Flash";

const RegisterAsAgent = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agentName, setAgentName] = useState('');
    const [isAgent, setIsAgent] = useState(1);
    const [agentPhoto, setAgentPhoto] = useState('');
    const [active, setActive] = useState(false);
    const [type, setType] = useState("default");
    const [width, setWidth] = useState("default");
    const [position, setPosition] = useState("default");
    const [timer, setTimer] = useState(2000);
    const message = useRef("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { agentName, email, password, isAgent, agentPhoto };
        axios({
            data: user,
            method: 'post',
            url: '/api/registerasagent',
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {
                message.current = res.data;
                setType('success');
                handleShowFlash();
                setTimeout(() => {navigate(`/signin`);}, 2000);
            }).catch(err => {
                message.current = err.response.data.message;
                setType('error');
                handleShowFlash();
            })

    }

    const hideFlash = () => {
        setActive(false);
    };

    const handleShowFlash = () => {
        hideFlash();
        if (message) {
            setActive(true);
            window.setTimeout(hideFlash, timer);
        }
    };

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
                {active && (
                    <Flash
                        type={type}
                        message={message.current}
                        duration={3000}
                        active={active}
                        setActive={setActive}
                        position={"bcenter"}
                        width={"default"}
                    />
                )}
            </div>
            <h4><Link to="/register">Register as user</Link></h4>
        </div>
    );
};

export default RegisterAsAgent;