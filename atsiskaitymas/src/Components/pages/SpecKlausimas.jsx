import {useEffect, useState, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import QuestionsContext from "../../context/klausimaicontext";
import UsersContext from "../../context/vartotojaicontext";
import AwnsersContext from "../../context/Atsakymucontext";
import styled from "styled-components";
import {useFormik} from "formik";
import * as Yup from "yup";
import {v4 as uuid} from "uuid";
import Atsakymokortele from "../UI/Atsakymukortele";

const SpecKlausimas = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
    const { awnsers, setAwnsers, AwnsersActionTypes } = useContext(AwnsersContext);
    const { users, loggedInUser } = useContext(UsersContext);
    
    useEffect(() => {
        fetch(`http://localhost:8080/Klausimai/${id}`)
            .then(res => res.json())
            .then(data => {
                if(data.name){
                    navigate('/');
                }
                setQuestion(data)
            })
    }, []);

    const atsakymuValues = {
        atsakymas: ''
    };
    const AtsakymoValidationSchema = Yup.object({
        atsakymas: Yup.string()
            .max(600, "Maximum 600 simboliu atsakymui")
            .required("Privalomas laukas")
            .trim()
    });
    const formik = useFormik({
        initialValues: atsakymuValues,
        validationSchema: AtsakymoValidationSchema,
        onSubmit: (values) => {
            const finalValues = {
                id: uuid(),
                vartotojoId: loggedInUser.id,
                klausimoId: question.id,
                vartotojoVardas: loggedInUser.vartotojoVardas,
                sukurta: new Date().toISOString().slice(0,10),
                ...values,
                redaguota: false,
                redagavimodata: ''
            }
            setAwnsers({
                type: AwnsersActionTypes.add,
                data: finalValues
            });
            formik.resetForm();  
        }
    });
    return ( 
        <main>
            <div>
                <span>Sukūrta: {question.sukurta}</span>
                {
                    question.redaguota ? <span>Redaguota: {question.redagavimodata}</span> : ''
                }
            </div>
            <div>
                <h1>{question.pavadinimas}</h1>
                <p>{question.klausimas}</p>
                <div>
                    <span>{question.vartotojoVardas}</span>
                </div>
            </div>
            {
                loggedInUser && question.vartotojoId === loggedInUser.id ? 
                <div>
                    <button
                        onClick={() => navigate(`/klausimai/redaguoti/${id}`)}
                    >Edit</button>
                    <button
                        onClick={() => {
                            setQuestions({ type: QuestionsActionTypes.delete,
                            id: id});
                            navigate('/klausimai/visiKlausimai')
                        }}    
                    >Delete</button>
                </div>
                :
                ''
            }
            <div className="pridetiAtsakyma">
                {
                    loggedInUser ? 
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <textarea
                                name="atsakymas"
                                id="atsakymas"
                                value={formik.values.atsakymas}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Rasykite savo atsakkyma cia"
                            ></textarea>
                            {
                                formik.touched.atsakymas && formik.errors.atsakymas &&
                                <p style={{color: "red"}}>{formik.errors.atsakymas}</p>
                            }
                        </div>
                        <button type="submit"
                            onClick={() => navigate(`/klausimai/${id}`)}
                        >Prideti atsakyma</button>
                    </form>
                    :
                    <p>Prisijunkite arba prisiregistruokite, jei norite palikti atsakyma</p>
                }
            </div>
            <div className="atsakymai">
                {
                    awnsers.filter(awnser => awnser.klausimoId === question.id).map(awnser => {
                        return <Atsakymokortele
                            key={awnser.id}
                            data={awnser}
                            />
                    })
                }
            </div>
        </main>
     );
}
 
export default SpecKlausimas;