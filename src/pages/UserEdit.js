import { useState } from "react";
import DataSender from '../api/DataSender';
import { Redirect } from "react-router-dom";
import ColorButton from '../components/ColorButton';
import Utils from '../Utils';
import styled from 'styled-components'

const Styled = styled.div`  
    .user-edit {
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

    .buttons>*{
        margin-bottom: 15px;
    }
`

const UserEdit = (props) => {
    const [error, setError] = useState();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState("");

    const handleClick = e => {
        if (e) e.preventDefault();
        save();
    }

    function save() {

        if (!user.name || !user.email || !user.password) {
            setError("Fields required");
            return
        }

        if (user.password !== user.passwordconfirm) {
            setError("Password not confirmed");
            return
        }

        if (!Utils.validateEmail(user.email)) {
            setError("E-mail invalid");
            return
        }

        setLoading(true);
        Utils.applyLoadingForm("#form-useredit", true);

        const data = user;

        DataSender({
            withoutToken: true,
            route: `user`,
            method: 'POST',
            data: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setError(res.error);
                    setLoading(false);
                    Utils.applyLoadingForm("#form-useredit", false);
                } else {
                    setRedirect("/");
                }
            })
            .catch(e => {
                setError(e.message);
                setLoading(false);
                Utils.applyLoadingForm("#form-useredit", false);
            });
    }

    const handleChange = e => {
        const newUser = { ...user, [e.target.name]: e.target.value };
        setUser(newUser);
    }

    const handleCancelClick = e => {
        if (e) e.preventDefault();
        setRedirect("/");
    }

    return redirect ? <Redirect to={redirect} />
        : (
            <Styled>
                <div id="user-edit" className="container user-edit">
                    <form id="form-useredit">
                        <fieldset className="clearfix">
                            <p>
                                <span className="fa fa-user"></span>
                                <input type="text" name='name' value={user.name} onChange={handleChange}
                                    placeholder='name *' required />
                            </p>
                            <p>
                                <span className="fa fa-envelope"></span>
                                <input type="text" name='email' value={user.email} onChange={handleChange}
                                    placeholder='e-mail *' required />
                            </p>
                            <p><span className="fa fa-lock"></span>
                                <input type="password" name='password' value={user.password} onChange={handleChange}
                                    placeholder='password *' required />
                            </p>
                            <p><span className="fa fa-lock"></span>
                                <input type="password" name='passwordconfirm' value={user.passwordconfirm} onChange={handleChange}
                                    placeholder='confirm password' required />
                            </p>
                            <p>
                                <span className="fa fa-globe"></span>
                                <input type="text" name='country' value={user.country} onChange={handleChange}
                                    placeholder='country' required />
                            </p>
                            <div className="buttons">
                                <ColorButton caption="Save" click={handleClick} />
                                <ColorButton caption="Cancel" click={handleCancelClick} secondary />
                            </div>
                        </fieldset>
                    </form>
                    <footer>
                        {loading ? <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                            : (
                                <>
                                    {error && <p>{error.toUpperCase()}</p>}
                                </>
                            )}
                    </footer>
                    {props.footer}
                </div>
            </Styled>
        );
}

export default UserEdit;