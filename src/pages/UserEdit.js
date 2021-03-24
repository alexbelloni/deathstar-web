import './UserEdit.css';
import { useState } from "react";
import DataSender from '../api/DataSender';
import { Redirect} from "react-router-dom";

const UserEdit = (props) => {
    const [error, setError] = useState();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState("");

    const handleClick = e => {
        if (e) e.preventDefault();
        save();
    }

    function save() {
        setLoading(true);

        const data = user;
        //console.log(user); return

        DataSender({
            route: `user`,
            method: 'POST',
            data: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setError(res.error);
                    setLoading(false);
                } else {
                    props.setUser(res, ()=>setRedirect("/"));
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

    if (redirect) return <Redirect to={redirect} />

    return (
        <div className="container">
            <div id="login">
                <form>
                    <fieldset className="clearfix">
                        <p>
                            <span className="fa fa-user"></span>
                            <input type="text" name='name' value={user && user.name} onChange={handleChange}
                                placeholder='name' required />
                        </p>
                        <p>
                            <span className="fa fa-envelope"></span>
                            <input type="text" name='email' value={user && user.email} onChange={handleChange}
                                placeholder='e-mail' required />
                        </p>
                        <p><span className="fa fa-lock"></span>
                            <input type="password" name='password' value={user && user.password} onChange={handleChange}
                                placeholder='password' required />
                        </p>
                        <p><span className="fa fa-lock"></span>
                            <input type="password" name='passwordconfirm' value={user && user.passwordconfirm} onChange={handleChange}
                                placeholder='confirm password' required />
                        </p>
                        <p>
                            <span className="fa fa-globe"></span>
                            <input type="text" name='country' value={user && user.country} onChange={handleChange}
                                placeholder='country' required />
                        </p>
                        <p>
                            <input type="submit" value="Save" onClick={handleClick}></input>
                        </p>
                    </fieldset>
                </form>
                <footer>
                    {loading ? <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                        : (
                            <>
                                <p onClick={()=>setRedirect("/")}><span className="link">Cancel</span><span className="fa fa-arrow-right"></span></p>
                                {error && <p>{error.toUpperCase()}</p>}
                            </>
                        )}
                </footer>
            </div>
        </div>
    );
}

export default UserEdit;