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

    return(
        <div className="d-flex justify-content-center">
        <div className="d-flex flex-column">

            <h1 className="mb-0 mx-1 mt-3 w-100">Register to</h1>
            <h1 className="mb-0 mx-1 mt-0 w-100">save properties</h1>
            <h1 className="mb-3 mx-1 mt-0 w-100">and much more</h1>
            <h2 className="mb-3 mx-1 w-100">Already registered? </h2>
            <h2 className="mx-1 w-100"><Link to="/signin">Sign in</Link></h2>
            <h4 className="mx-1 w-100"><Link to="/register-as-agent">Register as agent</Link></h4>

                <form onSubmit={handleSubmit} className="d-flex flex-column mx-1">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        id="email"
                        onChange={(e) => { setEmail(e.target.value); }}
                        className="mb-3 w-100"
                    ></input>

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

export default Register;