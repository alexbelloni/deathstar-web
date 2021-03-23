import { useState, useEffect } from "react";
import './Profile.css';

const Profile = (props) => {
    const [users, setUsers] = useState();
    const [token] = useState(props.user.token);

    useEffect(() => {
        if (!token) return

        fetch(`${process.env.REACT_APP_BASE_URL}users`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: null
        })
            .then(res => res.json())
            .then(res => {
                setUsers(res)
            })
            .catch(e => console.log(e));
    }, [token]);

    const handleClick = () => {
        props.signOut();
    }

    return (
        <div className="container">
            <div className="profile">
                <img className="avatar" alt='avatar' src={props.user.avatar} />
                <div className="info">
                    <span className="username">{props.user.name}</span>
                    <span className="email">{props.user.email}</span>
                    <span className="email">{props.user.country}</span>
                </div>
            </div>
            <div className="separator"></div>
            <div className="users">
                <p>Other Users:</p>
                {users && users.filter(u => u.email !== props.user.email).sort((a, b) => a.name - b.name).map((u, i) => (
                    <div key={i} className="user">
                        <div className="info-user">
                            <span className="username">{u.name}</span>
                            <span className="email">{u.country || "-"}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="separator"></div>
            <p onClick={handleClick}><span className="link">Sign out</span><span className="fontawesome-arrow-right"></span></p>
        </div>
    )
}

export default Profile;