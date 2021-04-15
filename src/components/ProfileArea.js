import styled from 'styled-components'
import { useContext } from 'react';
import { UserContext } from '../context';

const Styled = styled.div`  
    display: flex;
    flex-direction: row;
    align-items: center;

 .avatar {
    max-width: 100px;
    border-radius: 50%;
}

 .info {
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.info>* {
    margin: 2px 0;
}

 .info .username {
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    color: white;
}
`;

const ProfileArea = (props) => {
    const { user } = useContext(UserContext);

    return !user ? ""
        : (
            <Styled>
                <div className="profile">
                    <img className="avatar" alt='avatar' src={user.avatar ||
                        "https://lolfilter.com/files/thumbnails/950142184754388.png"
                    } />
                    <div className="info">
                        <span className="username">{user.name}</span>
                        <span className="email">{user.email}</span>
                        <span className="email">{user.country}</span>
                    </div>

                </div>
            </Styled>
        )
}

export default ProfileArea;