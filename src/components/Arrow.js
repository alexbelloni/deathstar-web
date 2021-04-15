import styled from 'styled-components'

const Styled = styled.div`  
.arrow .caption {
    cursor: pointer;
  }
  
  .arrow .caption {
    color: #eee;
  }
  
  .arrow:hover {
    opacity: 0.9;
  }
  
  .arrow .fa {
    margin-left: 5px;
  }
`

const Arrow = (props) => {
    return (
        <Styled>
            <div className="arrow" onClick={props.click}>
                <span className="caption">{props.caption}</span>
                <span className={`fa ${props.icon || 'fa-arrow-right'}`}></span>
            </div>
        </Styled>
    )
}

export default Arrow;