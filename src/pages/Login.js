import { useState, useContext } from "react";
import DataSender from '../api/DataSender';
import { Redirect } from "react-router-dom";
import Button from '../components/ColorButton';
import Arrow from '../components/Arrow';
import Utils from '../Utils';
import { UserContext } from '../context';
import styled from 'styled-components'

const Styled = styled.div` 
#login {
    width: 280px;
  }
  
  form span {
    background-color: #363b41;
    border-radius: 3px 0px 0px 3px;
    color: #606468;
    display: block;
    float: left;
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 50px;
  }
  
  form input {
    height: 50px;
  }
  
  form input[type="text"], input[type="password"] {
    background-color: #3b4148;
    border-radius: 0px 3px 3px 0px;
    color: #606468;
    margin-bottom: 1em;
    padding: 0 16px;
    width: 230px;
  }
  
  p {
    text-align: center;
  }
  
  p span {
    padding-left: 5px;
  }
  
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
}

.footer>* {
    text-align: center;
    margin: 5px 0;
}
`

const Login = () => {
    const [error, setError] = useState();
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState("");

    const context = useContext(UserContext);

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
            withoutToken: true,
            route: `login`,
            method: 'POST',
            data: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setLoading(false);
                    Utils.applyLoadingForm("#form-login", false);
                    setError(res.error);
                    setUser({ email: "", password: "" });
                } else {
                    context.setUser(res);
                    setRedirect('/profile');
                }
            })
            .catch(e => {
                setLoading(false);
                Utils.applyLoadingForm("#form-login", false);
                setError(e.message);
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

    return redirect ? <Redirect to={redirect} />
        : (
            <Styled>
                <section className="container">
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
                                <Button caption="Sign In" click={handleClick} readonly />
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
                </section>
            </Styled>
        );
}

export default Login;