import styled from 'styled-components'
import Arrow from './Arrow';

const Styled = styled.div`  

`;

const Page = (props) => {
    return (
        <Styled>
        <div className="separator"></div>
        <footer>
          <Arrow caption="© 2021 Death Star"
            icon='fa-external-link'
            click={() => { window.location = "https://alexandrebelloni.com" }} />
        </footer>
        </Styled>
    )
}

export default Page;