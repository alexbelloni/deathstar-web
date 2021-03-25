import { useState, useEffect } from "react";
import './Profile.css';
import DataSender from '../api/DataSender';
import { Redirect } from "react-router-dom";
import Arrow from '../components/Arrow';

const Profile = (props) => {
    const loggedUser = props.user;

    const [users, setUsers] = useState();
    const [token] = useState(loggedUser && loggedUser.token);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState("");
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);

        DataSender({
            token,
            route: `users`,
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                setUsers(res);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
                setLoading(false);
            });
    }, [token]);

    const handleClick = () => {
        props.signOut(() => setRedirect('/'));
    }

    function deleteUser(e, id) {
        e.preventDefault();

        //setLoading(true);

        DataSender({
            route: `user/${id}`,
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setError(res.error);
                    //setLoading(false);
                } else {
                    //setLoading(false);
                    setUsers(users.filter(u=>u._id !== id))
                }
            })
            .catch(e => {
                setError(e.message);
                //setLoading(false);
            });
    }

    if (!loggedUser) return <Redirect to="/" />

    if (redirect) return <Redirect to={redirect} />

    const admin = loggedUser.id === process.env.REACT_APP_ADMIN_ID;

    return (
        <>
            <div className="profile">
                <img className="avatar" alt='avatar' src={loggedUser.avatar || 
                    "https://lolfilter.com/files/thumbnails/950142184754388.png"
                    } />
                <div className="info">
                    <span className="username">{props.user.name}</span>
                    <span className="email">{props.user.email}</span>
                    <span className="email">{props.user.country}</span>
                </div>
            </div>
            <div className="signout-area">
                <Arrow caption="Sign out" click={handleClick} />
            </div>

            <div className="separator"></div>
            <div className="users">
                <p>Other Users:</p>
                {loading && <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>}
                {!loading && users && users.filter(u => u.email !== props.user.email).sort((a, b) => a.name < b.name ? -1 : 1).map((u, i) => (
                    <div key={i} className="user">
                        <div className="info-user">
                            <span className="username">
                                {admin && <span className="delete" onClick={e=>deleteUser(e, u._id)}><i className="fa fa-times-circle"></i> </span> }
                                <span className="fa fa-user"></span> {u.name}</span>
                            <span className="email">{u.country || "-"}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="separator"></div>
            {error && <p>{error.toUpperCase()}</p>}
        </>
    )
}

export default Profile;