import styled from 'styled-components'
import Arrow from './Arrow';
import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from '../context';

const Styled = styled.div`  
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`;

const ActionArea = (props) => {
    const [redirect, setRedirect] = useState("");
    const context = useContext(UserContext)

    return redirect ? <Redirect to={redirect} />
        : (
            <Styled>
                {props.quiz && <Arrow caption="Quiz" icon='fa-rocket' click={() => setRedirect('/questions')} />}
                {props.profile && <Arrow caption="Profile" icon="fa-user" click={() => setRedirect('/profile')} />}
                <Arrow caption="Sign out" icon="fa-sign-out" click={() => {
                    context.setUser();
                    setRedirect('/');
                }} />
            </Styled>
        )
}

export default ActionArea;