import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UsersContext from "../../context/vartotojaicontext";
import { useContext } from "react";



const Styledheader= styled.header`
display:flex; 
justify-content: space-evenly;
height: 100px;
border-bottom:1px solid black;
>img{
    height: 70px;
}
div.vartotojas{
    img{
        height:50px;
    }
}
`;


const Header = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
    const navigate = useNavigate();
    return (
        <Styledheader>
            <img src="https://www.vingilis.eu/wp-content/uploads/2019/03/1-300x300.jpg" alt="Zveju logo" />
            <div className="homeKlausimai">
                <span><Link to='/'>Pradzia</Link></span>
                <span><Link to='/klausimai/visiKlausimai'>Klausimai</Link></span>
            </div>
            <div>
                {
                    !loggedInUser ?
                        <div className="prisijungtiRegistruotis">
                            <button><Link to='/vartotojai/prisijungti'>Prisijungti</Link></button>
                            <button><Link to="/vartotojai/registruotis">Registruotis</Link></button> </div> :
                        <div className="vartotojas">
                            <img src={loggedInUser.nuotrauka} alt="profile picture" />
                            <span>{loggedInUser.vartotojoVardas}</span>
                            <button onClick={() => {
                                setLoggedInUser('');
                                navigate('/');
                            }}>Atsijungti </button>
                        </div>

                }
            </div>
        </Styledheader>
    );
}

export default Header;