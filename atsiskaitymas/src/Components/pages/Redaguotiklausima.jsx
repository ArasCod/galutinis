import {Formik} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useContext,useEffect, useState } from "react";
import QuestionsContext from "../../context/klausimaicontext";
import { useNavigate, useParams } from "react-router-dom";

const RedaguotiKlausima = () => {

    const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [ formValues, setFormValues ] = useState({
        pavadinimas: '',
        klausimas: ''
    });
    useEffect(() => {
        fetch(`http://localhost:8080/Klausimai/${id}`)
            .then(res => res.json())
            .then(data => {
                if(!data.pavadinimas){
                    navigate('/');
                }
                setFormValues({
                    ...data
                });
            })
    }, []);
    const validationShcema = Yup.object({
        pavadinimas: Yup.string()
            .max(60, "Daugiausiai gali būti 60 simbolių")
            .required("Privaloma uzpildyti si lauka")
            .trim(),
        klausimas: Yup.string()
            .max(600, "Klausimas negali buti ilgesnis nei 600 simboliu")
            .required("Privaloma uzpildyti si lauka")
            .trim()
    });

    return ( 
        <main>
            <h1>Redaguokite savo klausimą</h1>
            {
                formValues.pavadinimas && <Formik
                    initialValues={formValues}
                    validationSchema={validationShcema}
                    onSubmit= {(values) => {
                        const finalValues = {
                        ...values,
                        redaguota: true,
                        redagavimodata: new Date().toISOString().slice(0,10)
                    };
                    setQuestions({
                        type: QuestionsActionTypes.edit,
                        id: id,
                        data: finalValues
                    });
                    navigate(`/klausimai/${id}`);
                }}
                >
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <div>
                                <div>
                                    <div>
                                        <label htmlFor="pavadinimas">Klausimo pavadinimas</label>
                                        <input
                                            type="text"
                                            name="pavadinimas"
                                            id="pavadinimas"
                                            value={props.values.pavadinimas}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            placeholder="Redaguokita klausimo pavadinima"
                                        />
                                    </div>
                                <div>
                                    {
                                        props.touched.pavadinimas && props.errors.pavadinimas && 
                                            <div>
                                                <p style={{ color: "red"}}>{props.errors.pavadinimas}</p>
                                            </div>
                                    }
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="klausimas">Klausimas</label>
                                    <input
                                        type="text"
                                        name="klausimas"
                                        id="klausimas"
                                        value={props.values.klausimas}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        placeholder="Redaguokite klausima"
                                    />
                                </div>
                                <div>
                                    {
                                        props.touched.klausimas && props.errors.klausimas && 
                                            <div>
                                                <p style={{ color: "red"}}>{props.errors.klausimas}</p>
                                            </div>
                                    }
                                </div>
                            </div>
                            </div>
                            <button type="submit">Redaguoti klausima</button>
                        </form>
                    )}
                </Formik>
            }
        </main>
     );
}
 
export default RedaguotiKlausima;