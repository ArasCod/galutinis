import styled from "styled-components";
import UsersContext from "../../context/vartotojaicontext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Vienoklausimokortele = ({data}) => {
    const { users } = useContext(UsersContext);

    return ( 
        <div>
            <h1><Link to={`/klausimai/${data.id}`}>{data.pavadinimas}</Link></h1>
            <p>{data.klausimas}</p>
            <div>
                <span>{data.sukurta}</span>
                {data.redaguota ? <span>{data.redagavimodata}</span> : ''}
                {
                        users.filter(user => user.id === data.vartotojoId).map(user => {
                            return <span>{user.vartotojoVardas}</span>
                        })
                    }
         </div>
        </div>
     );
}
 
export default Vienoklausimokortele;