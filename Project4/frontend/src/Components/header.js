import { useContext } from "react"
import UserContext from "../user-context"


export default function Header({setActivePage}) {
    const [user, ] = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-brand" onClick={(e) => setActivePage("Network")}>Network</button>
            <div>
                <ul className="navbar-nav mr-auto">
                    {user && 
                    <li className="nav-item">
                        <button className="nav-link" onClick={(e) => setActivePage("Network")}><strong>{ user.username }</strong></button>
                    </li>}
                    <li className="nav-item">
                        <button className="nav-link" onClick={(e) => setActivePage("All Posts")}>All Posts</button>
                    </li>
                    { user && <>
                    <li className="nav-item">
                        <button className="nav-link" onClick={(e) => setActivePage("Following")}>Following</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={(e) => setActivePage("Logout")}>Log Out</button>
                    </li></>}
                    { !user && <>
                    <li className="nav-item">
                        <button className="nav-link" onClick={(e) => setActivePage("Login")}>Log In</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={(e) => setActivePage("Register")}>Register</button>
                    </li></>}
                </ul>
            </div>
        </nav>
    )
}