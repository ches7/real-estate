import { Link } from "react-router-dom"
import axios from "axios";
import { UserContext } from "../utils/UserContext";
import { useContext, useEffect } from "react";

export default function Navbar() {

    const { user, setUser } = useContext(UserContext);

    // useEffect(() => {
    //     localStorage.setItem("user", JSON.stringify(user));
    // }, [user])

    const handleSignOut = (e) => {
        e.preventDefault();
        axios({
            method: 'get',
            url: 'http://localhost:8080/signout',
        })
         .then(res => {
            console.log(res);
           testing();
            
        //     id = res.data._id;
        //     navigate(`/properties/${id}`);
         })
    
      };

    const testing = () => {
        setUser(null)
    }

  return (
<nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
    <div className="container-fluid">
        <Link to="/" className="navbar-brand">Real Estate Company</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"
            aria-controls="navmenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
            <div className="navbar-nav">
                <Link to="/properties" className="nav-link">For sale</Link>
                <Link to="/properties" className="nav-link">To rent</Link>
            </div>
            {user ? (<div className="navbar-nav ms-auto">
                {/* <button className="border-0 bg-dark nav-link text-white">{user._id}</button> */}
                <button className="border-0 bg-dark nav-link text-white" onClick={handleSignOut}>Sign out</button>
            </div>) : (<div className="navbar-nav ms-auto">
                <Link to="/signin" className="nav-link">Sign in</Link>
            </div>)}
        </div>
    </div>
</nav>

  )
}