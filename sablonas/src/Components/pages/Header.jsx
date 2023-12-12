import { Link } from "react-router-dom";
import styled from "styled-components";
const Styledheader= styled.header`
display:flex; 
justify-content: space-evenly;
height: 100px;
border-bottom:1px solid black;
>img{
    height: 70px;
}
`;


const Header = () => {
    return ( 
        <Styledheader>
            <img src="https://www.vingilis.eu/wp-content/uploads/2019/03/1-300x300.jpg" alt="Zveju logo" />
            <div>
                <span><Link to='/'>Pradzia</Link></span>
                <span><Link to='/klausimai/visiKlausimai'>Klausimai</Link></span>
            </div>
            <div>
                <button><Link to='/vartotojai/prisijungti'>Prisijungti</Link></button>
                <button>Registruotis</button>
            </div>
        </Styledheader>
     );
}
 
export default Header;