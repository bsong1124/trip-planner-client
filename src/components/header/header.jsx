import {Link} from "react-router-dom"
import "./Nav.css"

const Header = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/trips">My Trips</Link>
            {/* <Link to="/trips/:id/activities">Activities</Link> */}
            <Link to="/about">About</Link>
        </nav>
    )
}

export default Header