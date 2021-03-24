import './UserEdit.css';
import { useState } from "react";
import DataSender from '../api/DataSender';
import { Redirect } from "react-router-dom";
import Button from '../components/Button';

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

        if (!user || !user.name || !user.email || !user.password) {
            setError("Fields required");
            return
        }

        setLoading(true);

        const data = user;

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
                    props.setUser(res, () => setRedirect("/"));
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

    const handleCancelClick = e => {
        if (e) e.preventDefault();
        setRedirect("/");
    }

    if (redirect) return <Redirect to={redirect} />

    return (
        <div id="user-edit">
            <form>
                <fieldset className="clearfix">
                    <p>
                        <span className="fa fa-user"></span>
                        <input type="text" name='name' value={user && user.name} onChange={handleChange}
                            placeholder='name *' required />
                    </p>
                    <p>
                        <span className="fa fa-envelope"></span>
                        <input type="text" name='email' value={user && user.email} onChange={handleChange}
                            placeholder='e-mail *' required />
                    </p>
                    <p><span className="fa fa-lock"></span>
                        <input type="password" name='password' value={user && user.password} onChange={handleChange}
                            placeholder='password *' required />
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
                    <div className="buttons">
                        <Button caption="Save" click={handleClick} />
                        <Button caption="Cancel" click={handleCancelClick} secondary />
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
        </div>
    );
}

export default UserEdit;