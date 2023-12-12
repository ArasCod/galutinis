import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../context/vartotojaicontext";


const Prisijungti = () => {
    const navigate = useNavigate();
    const { users, setLoggedInUser } = useContext(UsersContext);
    const [failedToLogin, setFailedToLogin] = useState(false);
const formvalues = {
        email: '',
        slaptazodis: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string()
          .email('irasykite savo email')
          .required('Privalomas laukas')
          .trim(),
          slaptazodis: Yup.string()
          .required('Privalomas laukas')
          .trim()
      });
      const formik = useFormik({
        initialValues: formvalues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const loggedInUser = users.find(user => user.email === values.email && values.slaptazodis); 

            if(loggedInUser === undefined){
                setFailedToLogin(true);
            } else {
                setLoggedInUser(loggedInUser);
                navigate('/');
            }
        }
      });

    return ( 
        <main>
            <h1>Prisijungti</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                  <div>
                    <label for="email">Email</label>
                    <input 
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Iveskite savo email"
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
                    <label for="slaptazodis">Slaptazodis</label>
                    <input 
                    type="password"
                    name="slaptazodis"
                    id="slaptazodis"
                    value={formik.values.slaptazodis}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Iveskite savo slaptazodi"
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
                <button type="submit">Prisijungti</button>
            </form>

        </main>
     );
}

 
export default Prisijungti;