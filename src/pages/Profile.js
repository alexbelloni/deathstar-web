import { useState, useEffect } from "react";
import './Profile.css';
import DataSender from '../api/DataSender';
import { Redirect } from "react-router-dom";

const Profile = (props) => {
    const loggedUser = props.user;

    const [users, setUsers] = useState();
    const [token] = useState(loggedUser && loggedUser.token);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState("");
    const [error, setError] = useState();

    useEffect(() => {
        if (!token) return
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
    }, []);

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
                    setUsers(users.filter(u=>u._id != id))
                }
            })
            .catch(e => {
                setError(e.message);
                //setLoading(false);
            });
    }

    if (!loggedUser) return <Redirect to="/" />

    if (redirect) return <Redirect to={redirect} />

    return (
        <div className="container">
            <div className="profile">
                <img className="avatar" alt='avatar' src={loggedUser.avatar} />
                <div className="info">
                    <span className="username">{props.user.name}</span>
                    <span className="email">{props.user.email}</span>
                    <span className="email">{props.user.country}</span>
                </div>
            </div>
            <div className="separator"></div>
            <div className="users">
                <p>Other Users:</p>
                {loading && <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>}
                {!loading && users && users.filter(u => u.email !== props.user.email).sort((a, b) => a.name - b.name).map((u, i) => (
                    <div key={i} className="user">
                        <div className="info-user">
                        
                            <span className="username">
                                {/* <span className="delete" onClick={e=>deleteUser(e, u._id)}><i className="fa fa-times-circle"></i> </span> */}
                                <span className="fa fa-user"></span> {u.name}</span>
                            <span className="email">{u.country || "-"}</span>
                            
                        </div>
                    </div>
                ))}
            </div>
            <div className="separator"></div>
            <p onClick={handleClick}><span className="link">Sign out</span><span className="fa fa-arrow-right"></span></p>
            {error && <p>{error.toUpperCase()}</p>}
        </div>
    )
}

export default Profile;