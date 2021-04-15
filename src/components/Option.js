import styled from 'styled-components'

const Styled = styled.div`  
    color: var(--secondary-color);
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    padding: 20px;

    i {
        margin-right: 10px;
    }

    &&:hover {
        font-size: 18px;
    }

    && .selected{
        font-size: 18px;
        color: var(--primary-color);
    }

`;

const Option = (props) => {
    return (
        <Styled>
            <div className={props.selected ? 'selected' : ''} onClick={() => props.onSelect(props.optionId)}>
                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                {props.caption}
            </div>
        </Styled>
    )
}

export default Option;