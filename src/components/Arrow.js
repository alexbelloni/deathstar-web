import './Arrow.css';

const Arrow = (props) => {
    return (
        <div className="arrow" onClick={props.click}>
            <span className="caption">{props.caption}</span>
            <span className={`fa ${props.icon || 'fa-arrow-right'}`}></span>
        </div>
    )
}

export default Arrow;