import {Link} from "react-router-dom"
import "./Nav.css"

const Header = () => {
    return (
        <nav className="Nav">
            <Link className="nav-el" to="/">Home</Link>
            <Link className="nav-el" to="/trips">My Trips</Link>
            {/* <Link to="/trips/:id/activities">Activities</Link> */}
            <Link className="nav-el" to="/about">About</Link>
        </nav>
    )
}

export default Header