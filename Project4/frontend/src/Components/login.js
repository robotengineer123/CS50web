import { useContext, useState } from "react";
import UserContext from "../user-context";
import axios from "axios";
export default function Login({setActivePage}) {
    const [message, setMessage] = useState("");
    const [, setUser] = useContext(UserContext);
    const username = <input autoFocus className="form-control" type="text" name="username" placeholder="Username"></input>;
    const password = <input className="form-control" type="password" name="password" placeholder="Password"></input>
    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('api/login', {username: username.value, password: password.value});
            if (response.status === 201) {
                setUser(response.data);
            }   
        } catch (error) {
            console.log(error);
            setMessage("Invalid credentials");
        }
    }
    return (
        <>
            <h2>Login</h2>
            {message ? <div className="alert alert-danger">{message}</div> : null}
            
            <form onSubmit={login}>
                <div className="form-group">
                    {username}
                </div>
                <div className="form-group">
                    {password}
                </div>
                <input className="btn btn-primary" type="submit" value={"Login"}/>
            </form>
            Don't have an account? <button className="btn btn-link" onClick={()=>setActivePage('Register')}>Register here.</button>
        </>
    );
}