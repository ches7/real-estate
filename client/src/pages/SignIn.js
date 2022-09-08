import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div>
            <h1>Sign in to save properties and much more</h1>
            <h2>No account? <Link to="/register">Register</Link></h2>
            <div className="search-container">
                <form action="">
                    <label htmlFor="email-address">Email address</label>
                    <input type="text" name="email-address"></input>
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password"></input>
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;