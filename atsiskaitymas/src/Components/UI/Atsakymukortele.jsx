import { useContext, useState, useEffect } from "react";
import UsersContext from "../../context/vartotojaicontext";
import AwnsersContext from "../../context/Atsakymucontext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const Atsakymokortele = ({data}) => {
    const { loggedInUser } = useContext(UsersContext);
    const { awnsers, setAwnsers, AwnsersActionTypes } = useContext(AwnsersContext);
    const [ awnser, setAwnser] = useState('');
    const navigate = useNavigate();
    const [ editClick, setEditClick ] = useState(false);
    const [ formValues, setFormValues ] = useState({
        atsakymas: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8080/atsakymai/${data.id}`)
            .then(res => res.json())
            .then(data => {
                if(!data.atsakymas){
                    navigate('/');
                }
                setAwnser(data);
                setFormValues({
                    ...data
                });
            })
    }, []);

    const validationSchema = Yup.object({
        atsakymas: Yup.string()
            .max(600, "Maksimum 600 simboliu")
            .required("Privalomas laukas")
            .trim()
    });

    return ( 
        <div>
            <p>{data.atsakymas}</p>
            <div>
                <span>Sukurtas:{data.sukurta}</span>
                <span>{data.vartotojoVardas}</span>
                {
                    data.redaguota ? <div>
                    <span>Redaguota:{data.redagavimodata}</span>
                </div>
                :
                ''
                }
            </div>
            {
                loggedInUser.id === data.vartotojoId &&
                    <div>
                        <button
                            onClick={() => 
                                setEditClick(true)
                                }
                        >Redaguoti</button>
                        <button
                            onClick={() => {
                                setAwnsers({ type: AwnsersActionTypes.delete, 
                                id: data.id});
                                navigate(`/klausimai/${data.klausimoId}`)
                                }}
                        >Trinti</button>
                    </div>
            }
            {
                editClick && 
                <div className="atsakymoRedagavimas">
                    {
                        formValues.atsakymas && <Formik
                        initialValues={formValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            const finalValues = {
                                ...values,
                                redaguota: true,
                                redagavimodata: new Date().toISOString().slice(0,10)
                            };
                            setAwnsers({
                                type: AwnsersActionTypes.edit,
                                id: data.id,
                                data: finalValues
                            });
                            setEditClick(false);
                        }}
                        >
                            {(props) => (
                                <form onSubmit={props.handleSubmit}>
                                    <div>
                                        <textarea
                                            name="atsakymas"
                                            id="atsakymas"
                                            value={props.values.atsakymas}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            placeholder="Redaguokite savo atsakkyma cia"
                                        ></textarea>
                                            {
                                                props.touched.atsakymas && props.errors.atsakymas &&
                                                    <p style={{color: "red"}}>{props.errors.atsakymas}</p>
                                            }
                                        </div>
                                        <button type="submit">Redaguoti atsakyma</button>
                                </form>
                            )}
                        </Formik>
                    }                    
                </div>

            }
        </div>
     );
}
 
export default Atsakymokortele;