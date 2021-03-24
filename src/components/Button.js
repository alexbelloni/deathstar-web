import './Button.css';

const Button = (props) => {
    return (
        <div className="button">
            <input type="submit" value={props.caption} onClick={props.click} style={{backgroundColor: props.secondary ? "var(--secondary-color)" : "var(--primary-color)"}}></input>
        </div>
    )
}

export default Button;