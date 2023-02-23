import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Flash from "../components/Flash";

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAgent, setIsAgent] = useState(0);
    const [active, setActive] = useState(false);
    const [type, setType] = useState("default");
    const [width, setWidth] = useState("default");
    const [position, setPosition] = useState("default");
    const [timer, setTimer] = useState(2000);
    const message = useRef("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, password, isAgent };
        axios({
            data: user,
            method: 'post',
            url: '/api/register',
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
    };

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
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }}
                    ></input>

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
            <h4><Link to="/register-as-agent">Register as agent</Link></h4>
        </div>
    );
};

export default Register;