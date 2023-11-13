import axios from "axios";

export function Register({setActivePage}) {
    let message = null;
    const registerUSer = (event) => {
        const password = event.target.password;
        const confirmation = event.target.confirmation;
        if (password === confirmation) {
            const data = {
                username: event.target.username,
                password: event.target.password,
                email: event.target.email
            };
            axios.post("api/register", data);
            setActivePage("All posts");
            message = null;
        } else {
            message = <h2>Could not register user</h2>
        }
    }
    return (
        <>
            <h2>Register</h2>
            {message}
            <form >
                <div className="form-group">
                <input className="form-control" autofocus type="text" name="username" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="email" name="email" placeholder="Email Address"/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="password" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="confirmation" placeholder="Confirm Password"/>
                </div>
                <input className="btn btn-primary" type="submit" value="Register" onClick={registerUSer}/>
            </form>

            Already have an account? <a href="{% url 'login' %}">Log In here.</a>
        </>);
}