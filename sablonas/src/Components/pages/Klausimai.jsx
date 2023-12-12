import {useContext} from 'react';
import QuestionsContext from '../../context/klausimaicontext';
import UsersContext from '../../context/vartotojaicontext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Vienoklausimokortele from '../UI/Vienasklausimaskortele';

const Klausimai = () => {
    const { questions } = useContext(QuestionsContext);
    const { loggedInUser } = useContext(UsersContext);
    return (
        <main>
            <h1>Visi klausimai</h1>
            <span><Link to='/klausimai/prideti' >Prideti klausima</Link></span>
            <div>
                {
                    questions.map(question=>{
                        return <Vienoklausimokortele 
                        key={question.id}
                        data={question}
                        />
                    })
                }
            </div>
        </main>
      );
}

 
export default Klausimai;