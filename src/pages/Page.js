import styled from 'styled-components'
import ActionArea from '../components/ActionArea';
import ProfileArea from '../components/ProfileArea';
import Footer from '../components/Footer';


const Styled = styled.div`  
    padding: 10px 25px;

    @media (min-width: 600px){
        padding: 10px 100px;
    }

    @media (min-width: 1100px){
        padding: 10px 200px;
    }

    @media (min-width: 1400px){
        padding: 10px 300px;
    }
`;

const Page = (props) => {
    return (
        <Styled>
            <ProfileArea />
            <ActionArea {...props} />
            <div className="separator"></div>
            {props.component}
            <Footer />
        </Styled>
    )
}

export default Page;