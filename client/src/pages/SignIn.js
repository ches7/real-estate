import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import Flash from "../components/Flash";

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
        <div>
            <h1>Sign in to save properties and much more</h1>
            <h2>No account? <Link to="/register">Register</Link></h2>
            <div className="search-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                    ></input>

                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        onChange={handleChange}
                    ></input>
                    <button type="submit">Sign in</button>
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
        </div>
    );
};

export default SignIn;