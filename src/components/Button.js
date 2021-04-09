import './Button.css';

const Button = (props) => {
    return (
        <div className="button" style={{backgroundColor: props.selected ? '#fff' : ''}}>
            <input readOnly value={props.caption} onClick={props.click} style={{
                color: props.secondary ? "var(--text-dark-color)" : "var(--text-light-color)",
                backgroundColor: props.secondary ? "var(--secondary-color)" : "var(--primary-color)"
                }} onChange={()=>{}}></input>
        </div>
    )
}

export default Button;