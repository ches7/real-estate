import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";

const SignIn = () => {

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "SIGNIN_START" });
        try {
            const res = await axios.post("/signin", credentials);
            console.log(res.data.details);
            dispatch({ type: "SIGNIN_SUCCESS", payload: res.data.details });
            navigate("/");
        } catch (err) {
            console.log(err.response.data);
            dispatch({ type: "SIGNIN_FAILURE", payload: err.response.data });
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
                    { error && <span>{error.message}</span>}
            </div>
        </div>
    );
};

export default SignIn;