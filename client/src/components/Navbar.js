import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Real Estate Company
      </Link>
      <ul>
        <Link to="/properties">view properties</Link>
      </ul>
    </nav>
  )
}