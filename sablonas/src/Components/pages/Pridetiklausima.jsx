import { useFormik } from "formik";
import  * as Yup from "yup";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import QuestionsContext from "../../context/klausimaicontext";
import UsersContext from "../../context/vartotojaicontext";
import { useNavigate } from "react-router-dom";

const Pridetiklausima = () => {
    const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);

    const { loggedInUser } = useContext(UsersContext);

    const navigate = useNavigate();

    const values = {
        pavadinimas: '',
        klausimas: '',
    }; 
    const validationScema = Yup.object({
        pavadinimas: Yup.string()
            .max(60, "Maximum 60 simboliu klausimo pavadinimui")
            .required("Privalomas laukas")
            .trim(),
        klasuimas: Yup.string()
            .max(600, "Klausimas negali buti ilgesnis nei 600 simboliu")
            .required("Privalomas laukas")
            .trim()
    });
    const formik = useFormik({
        initialValues: values,
        validationSchema: validationScema,
        onSubmit: (values) => {
            const finalValues = {
                id: uuid(),
                vartotojoId: loggedInUser.id,
                ...values,
                sukurta: new Date().toISOString().slice(0,10),
                redaguota: false,
                redagavimodata: ''
            }
            setQuestions({
                type: QuestionsActionTypes.add,
                data: finalValues
            });
            navigate('/klausimai/visiKlausimai');
        }
    })
    return ( 
        <main>
            <h1>Pridekite klausima</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>

                    <div>
                    <div>
                    <label for="pavadinimas">Klausimo pavadinimas</label>
                                    <input
                                    type="text"
                                        name="pavadinimas"
                                        id="pavadinimas"
                                        value={formik.values.pavadinimas}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Pridekite klausimo pavadinima"
                                    />
                    </div>
                    <div>
                    {
                            formik.touched.pavadinimas && formik.errors.pavadinimas && 
                            <div>
                                <p style={{ color: "red"}}>{formik.errors.pavadinimas}</p>
                            </div>
                        }
                    </div>
                    </div>
                    <div>
                    <div>
                    <label for="klausimas">Klausimas</label>
                                    <input
                                    type="text"
                                        name="klausimas"
                                        id="klausimas"
                                        value={formik.values.klausimas}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Pridekite klausima"
                                    />
                    </div>
                    <div>
                    {
                            formik.touched.klausimas && formik.errors.klausimas && 
                            <div>
                                <p style={{ color: "red"}}>{formik.errors.klausimas}</p>
                            </div>
                        }
                    </div>
                    </div>

                    <div>
                        {
                            formik.touched.question && formik.errors.question && 
                            <div>
                                <p style={{ color: "red"}}>{formik.errors.question}</p>
                            </div>
                        }
                    </div>
                </div>
                <button type="submit">Prideti klausima</button>
            </form>
        </main>
     );
}
 
export default Pridetiklausima;