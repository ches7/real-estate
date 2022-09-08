import { Link } from "react-router-dom"

export default function Navbar() {
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
            <div className="navbar-nav ms-auto">
                <Link to="/signin" className="nav-link">Sign in</Link>
            </div>
        </div>
    </div>
</nav>

  )
}