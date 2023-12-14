import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {v4 as uuid} from "uuid";
import UsersContext from "../../context/vartotojaicontext";
import styled from "styled-components";

const Registruotis = () => {
    const navigate = useNavigate();
    const { users, setUsers, UsersActionTypes, setLoggedInUser } = useContext(UsersContext);
    const [failedToRegister, setFailedToRegister] = useState({
        email: '',
        vartotojoVardas: ''
    });
    const formValues = {
        vartotojoVardas: '',
        email: '',
        slaptazodis: '',
        slaptazodzioKartojimas: '',
        nuotrauka: ''
      };
      const validationScema = Yup.object({
        vartotojoVardas: Yup.string()
            .min(5, "Vartotojo vardas privalo buti sudarytas bent is 5 simboliu")
            .max(20, "Vartotojo vardas negali būti ilgesnis nei 20 simboliu")
            .required("Sitas laukas privalo buti uzpildytas")
            .trim(),
        email: Yup.string()
            .email("Pateikite reikiamo formato email")
            .required("Sitas laukas privalo buti uzpildytas")
            .trim(),
        slaptazodis: Yup.string()
            .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
          "Slaptazodis turi susidaryti is 5-20 simboliu, Privalo buti bent viena didzioji raide bei bent viena mazoji raide, privalo tureti bent viena skaiciu ir viena specialu simboli")
            .required("Sitas laukas privalo buti uzpildytas")
            .trim(),
        slaptazodzioKartojimas: Yup.string()
            .oneOf([Yup.ref('slaptazodis')], "Slaptazodziai privalo sutapti")
            .required("Sitas laukas privalo buti uzpildytas")
            .trim(),
        nuotrauka: Yup.string()
            .url("Pateikite tinkamą nuotraukos URL")
            .required("Sitas laukas privalo buti uzpildytas")
            .trim()
      });

      const formik = useFormik({
        initialValues: formValues,
        validationSchema: validationScema,
        onSubmit: (values) => {
            console.log(values);
            if(users.find(user => user.vartotojoVardas === values.vartotojoVardas)){
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        vartotojoVardas: 'Vartotojas su tokiu vardu jau egzistuoja'
                    }
                });
            } else {
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        vartotojoVardas: ''
                    }
                });
            }
            if(users.find(user => user.email === values.email)){
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        email: 'Vartotojas su tokiu email jau egzistuoja'
                    }
                });
            } else {
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        email: ''
                    }
                });
            }

            if(!users.find(user => user.vartotojoVardas === values.vartotojoVardas) && !users.find(user => user.email === values.email)){
                const workingUser = {
                    id: uuid(),
                    vartotojoVardas: values.vartotojoVardas,
                    email: values.email,
                    slaptazodis: values.slaptazodis,
                    nuotrauka: values.nuotrauka
                };
                setUsers({
                    type: UsersActionTypes.add,
                    data: workingUser
                });
                setLoggedInUser(workingUser);
                navigate('/');
            }
        }
    });
    return ( 
        <main>
            <h1>Registruotis</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="vartotojoVardas">Vartotojo vardas</label>
                        <input 
                        type="text"
                        name="vartotojoVardas"
                        id="vartotojoVardas"
                        value={formik.values.vartotojoVardas}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Susigalvokite savo vartotojo varda"
                        />
                    </div>
                    <div>
                        {
                            formik.touched.vartotojoVardas && formik.errors.vartotojoVardas &&
                                <div>
                                    <p style={{ color:"red" }}>{formik.errors.vartotojoVardas}</p>
                                </div>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Irasykite savo email"
                        />
                    </div>
                    <div>
                        {
                            formik.touched.email && formik.errors.email &&
                                <div>
                                    <p style={{ color:"red" }}>{formik.errors.email}</p>
                                </div>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="slaptazodis">Slaptazodis</label>
                        <input 
                            type="password"
                            name="slaptazodis"
                            id="slaptazodis"
                            value={formik.values.slaptazodis}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Susigalvokite slaptazodi"
                        />
                    </div>
                    <div>
                        {
                            formik.touched.slaptazodis && formik.errors.slaptazodis &&
                                <div>
                                    <p style={{ color:"red" }}>{formik.errors.slaptazodis}</p>
                                </div>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label          htmlFor="slaptazodzioKartojimas">Pakartokite slaptazodi</label>
                        <input 
                            type="password"
                            name="slaptazodzioKartojimas"
                            id="slaptazodzioKartojimas"
                            value={formik.values.slaptazodzioKartojimas}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Pakartokite slaptazodi"
                        />
                    </div>
                    <div>
                        {
                            formik.touched.slaptazodzioKartojimas && formik.errors.slaptazodzioKartojimas &&
                                <div>
                                    <p style={{ color:"red" }}>{formik.errors.slaptazodzioKartojimas}</p>
                                </div>
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <label          htmlFor="nuotrauka">Nuotrauka</label>
                        <input 
                            type="url"
                            name="nuotrauka"
                            id="nuotrauka"
                            value={formik.values.nuotrauka}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Pridekite nuotraukos url"
                        />
                    </div>
                    <div>
                        {
                            formik.touched.nuotrauka && formik.errors.nuotrauka &&
                                <div>
                                    <p style={{ color:"red" }}>{formik.errors.nuotrauka}</p>
                                </div>
                        }
                    </div>
                </div>
                <button type="submit">Registruotis</button>
            </form>
        </main>
     );
}
 
export default Registruotis;