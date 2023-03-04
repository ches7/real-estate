import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import Flash from "../components/Flash";
import "../styles/index.css"

const SignIn = () => {

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });
    const [active, setActive] = useState(false);
    const [type, setType] = useState("default");
    const [width, setWidth] = useState("default");
    const [position, setPosition] = useState("default");
    const [timer, setTimer] = useState(2000);
    const message = useRef("")

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "SIGNIN_START" });
        try {
            const res = await axios.post("/api/signin", credentials);
            dispatch({ type: "SIGNIN_SUCCESS", payload: res.data.details });
            navigate("/");
        } catch (err) {
            message.current = err.response.data.message;
            setType('error');
            handleShowFlash();
            dispatch({ type: "SIGNIN_FAILURE", payload: err.response.data });
        }
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
        <div className="container d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column">

            <div className="d-flex justify-content-center">
            <div className="d-flex flex-column w-50">
            <h1 className="mb-3">Sign in to save properties and much more</h1>
            <h2 className="mb-3">No account? <Link to="/register">Register</Link></h2>
            </div>
            </div>
            
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit} className="d-flex flex-column w-50">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        className="mb-3"
                    ></input>

                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        className="mb-3"
                        onChange={handleChange}
                    ></input>
                    <div className="align-self-center w-50">
                    <button className="btn btn-dark mt-3 w-100" type="submit">Sign in</button>
                    </div>
                </form>
                
            </div>
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

export default SignIn;