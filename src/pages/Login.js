import './Login.css';
import { useState } from "react";
import DataSender from '../api/DataSender';
import { Redirect } from "react-router-dom";
import Button from '../components/Button';
import Arrow from '../components/Arrow';
import Utils from '../Utils';

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
        if (!Utils.validateEmail(data.email)) {
            setError("E-mail invalid");
            return
        }

        setLoading(true);
        Utils.applyLoadingForm("#form-login", true);

        DataSender({
            route: `login`,
            method: 'POST',
            data: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setError(res.error);
                } else {
                    props.setUser(res, () => setRedirect('/profile'));
                }
            })
            .catch(e => {
                setError(e.message);
            })
            .finally(()=>{
                setLoading(false);
                Utils.applyLoadingForm("#form-login", false);
            })
    }

    const handleChange = e => {
        const state = { ...user, [e.target.name]: e.target.value };
        setUser(state);
    }

    const handleFreeTrial = e => {
        login({
            "email": process.env.REACT_APP_TRIAL_EMAIL,
            "password": process.env.REACT_APP_TRIAL_PASSWORD
        })
    }

    const handleSignUp = e => {
        setRedirect("edit")
    }

    if (redirect) return <Redirect to={redirect} />

    return (
        <>
            {redirect ? <Redirect to={redirect} />
                : (
                    <div id="login">
                        <form id="form-login">
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
                                        <Arrow caption="Not a member? Sign up now" click={handleSignUp} />
                                        <Arrow caption="Free Trial" click={handleFreeTrial} />
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