import styled from 'styled-components'

const Styled = styled.div`  
    div {
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        font-weight: bold;
        text-transform: uppercase;
        width: 280px;
        height: 50px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .primary {
        color: var(--text-light-color) !important;
        background-color: var(--primary-color);
    }

    .secondary {
        color: var(--text-dark-color) !important;
        background-color: var(--secondary-color);
    }

    div:hover {
        opacity: 0.9;
    }

    .caption {
        background-color: transparent;
        text-align: center;
        width: fit-content;
    }
`;

const ColorButton = (props) => {
    return (
        <Styled>
            <div className={`${props.secondary ? "secondary" : "primary"}`} onClick={props.click}>
                <span className={`caption ${props.secondary ? "secondary" : "primary"}`}>{props.caption}</span>
            </div>
        </Styled>
    )
}

export default ColorButton;