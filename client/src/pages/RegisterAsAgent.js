import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import Flash from "../components/Flash";
import "../styles/index.css"

const RegisterAsAgent = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agentName, setAgentName] = useState('');
    const [isAgent] = useState(1);
    const [agentPhoto, setAgentPhoto] = useState('');
    const [active, setActive] = useState(false);
    const [type, setType] = useState("default");
    const [timer] = useState(2000);
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

    return(

        <div className="d-flex justify-content-center">
        <div className="d-flex flex-column">

            <h1 className="mb-0 mx-1 mt-3 w-100">Register to</h1>
            <h1 className="mb-0 mx-1 mt-0 w-100">save properties</h1>
            <h1 className="mb-3 mx-1 mt-0 w-100">and much more</h1>
            <h2 className="mb-0 mx-1 w-100">Already registered?</h2> 
            <h2 className="mx-1 w-100"><Link to="/signin">Sign in</Link></h2>
            <h4 className="mx-1 w-100"><Link to="/register">Register as user</Link></h4>
            
                <form onSubmit={handleSubmit} className="d-flex flex-column mx-1">
                <label htmlFor="name">Agent Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={agentName}
                        className="mb-3 w-100"
                        onChange={(e) => { setAgentName(e.target.value); }}
                    ></input>

                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        id="email"
                        onChange={(e) => { setEmail(e.target.value); }}
                        className="mb-3 w-100"
                    ></input>

                    <label htmlFor="agentPhoto">Agent Photo</label>
                    <input onChange={handlePhoto} type="file" className="mb-3 w-100" required name="agentPhoto" accept="image/*"></input>

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        id="password"
                        className="mb-3 w-100"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button className="btn btn-dark mt-3 w-100" type="submit">Register</button>
                </form>
                
        </div>
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
    );
};

export default RegisterAsAgent;