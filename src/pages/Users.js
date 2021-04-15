import { useState, useEffect, useContext } from "react";
import styled from 'styled-components'
import DataSender from '../api/DataSender';
import { UserContext } from '../context';
import { Redirect } from "react-router-dom";

const Styled = styled.div`  
    text-align: center;

    p {
        margin-bottom: 5px;
    }

    .info-user {
        font-size: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: rgb(187, 183, 183);
    }

    .info-user .delete {
        color: #d44179;
        cursor: pointer;
    } 
`;

const Users = (props) => {
    const context = useContext(UserContext);
    const [error, setError] = useState();
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);

    const token = context && context.user && context.user.token

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
                setError('');
            })
            .catch(e => {
                setLoading(false);
                setError(e.message);
            });
    }, [token]);

    function deleteUser(e, id) {
        e.preventDefault();

        DataSender({
            token,
            route: `user/${id}`,
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setError(res.error);
                } else {
                    setUsers(users.filter(u => u.id !== id))
                }
            })
            .catch(e => {
                setError(e.message);
            });
    }

    const admin = token && context.user.id === process.env.REACT_APP_ADMIN_ID;

    return !token ? <Redirect to='/' /> : (
        <Styled>
            <p>Other Users:</p>
            {loading && <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>}
            {!loading && users && users.filter(u => u.email !== context.user.email).sort((a, b) => a.name < b.name ? -1 : 1).map((u, i) => (
                <div key={i} className="user">
                    <div className="info-user">
                        <span className="username">
                            {admin && <span className="delete" onClick={e => deleteUser(e, u.id)}><i className="fa fa-times-circle"></i> </span>}
                            {u.evaluator ? <span className="fa fa-star"></span> : <span className="fa fa-user"></span>} {u.name}</span>
                        <span className="email">{u.country || "-"}</span>
                    </div>
                </div>
            ))}

            {error && (
                <div className="footer">
                    <p>{error.toUpperCase()}</p>
                </div>
            )}
        </Styled>
    )
}

export default Users;