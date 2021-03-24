import './Login.css';
import { useState } from "react";
import DataSender from '../api/DataSender';
import { Redirect } from "react-router-dom";
import Button from '../components/Button';
import Arrow from '../components/Arrow';
require('dotenv').config()

const Login = (props) => {
    const [error, setError] = useState();
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState("");

    const handleClick = e => {
        if (e) e.preventDefault();
        login({
            email: user.email,
            password: user.password
        });
    }

    function login(data) {
        setLoading(true);

        DataSender({
            route: `login`,
            method: 'POST',
            data: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setError(res.error);
                    setLoading(false);
                } else {
                    props.setUser(res, () => setRedirect('/profile'));
                    setLoading(false);
                }
            })
            .catch(e => {
                setError(e.message);
                setLoading(false);
            });
    }

    const handleChange = e => {
        const newUser = { ...user, [e.target.name]: e.target.value };
        setUser(newUser);
    }

    const handleTrial = e => {
        login({
            "email": process.env.REACT_APP_TRIAL_EMAIL,
            "password": process.env.REACT_APP_TRIAL_PASSWORD
        })
    }

    const handleNewUser = e => {
        setRedirect("edit")
    }

    if (redirect) return <Redirect to={redirect} />
console.log('here',
process.env.REACT_APP_BASE_URL,
process.env.REACT_APP_TRIAL_EMAIL,
process.env.REACT_APP_TRIAL_PASSWORD)
    return (
        <>
            {redirect ? <Redirect to={redirect} />
                : (
                    <div id="login">
                        <form>
                            <fieldset className="clearfix">
                                <p>
                                    <span className="fa fa-envelope"></span>
                                    <input type="text" name='email' value={user.email} onChange={handleChange}
                                        placeholder='e-mail' required />
                                </p>
                                <p><span className="fa fa-lock"></span>
                                    <input type="password" name='password' value={user.password} onChange={handleChange}
                                        placeholder='password' required />
                                </p>
                                <Button caption="Sign In" click={handleClick} />
                            </fieldset>
                        </form>
                        <div className="footer">
                            {loading ? <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                                : (
                                    <>
                                        <Arrow caption="Not a member? Sign up now" click={handleNewUser} />
                                        <Arrow caption="Free Trial" click={handleTrial} />
                                        {error && <p>{error.toUpperCase()}</p>}
                                    </>
                                )}
                        </div>
                    </div>
                )}
        </>
    );
}

export default Login;