import React, { useContext } from 'react'
import axios from 'axios'
import * as yup from "yup"
import { useFormik, Form, Field, ErrorMessage, Formik } from 'formik'
import { useNavigate, Link } from 'react-router-dom';
import './login.css'
import { Cookies, useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const [cookie, setCokies, RemoveCokies] = useCookies();
    const navigate = useNavigate();

    const notify = {

        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",


    };


    return (
        <div className='container' style={{ width: '50%' }}>
            <h2>Login User</h2>
            <Formik initialValues={{
                Email: "",
                Password: "",
            }}


                onSubmit={(values) => {
                    axios
                        .post('/login', values)
                        .then((res) => {
                            console.log(res.data);
                            if (res.status === 201) {
                                localStorage.setItem("usersDataToken", res.data.result.genToken)
                                setCokies("UserCokie", res.data.result.genToken);
                                navigate("/home");
                                toast.success(res.data.message, notify)

                                sessionStorage.setItem("UserName", res.data.result.findUser.UserName)
                            }

                            if(!res.status){
                                toast.success("user not found", notify)

                            }


                        })
                        .catch((error) => {
                            toast.error(error.response.data.error, notify)
                        });
                }}
            >


                <Form className=''>


                    {/* <h1>Sign Up</h1> */}
                    <p>Please fill in this form to create an account.</p>
                    <hr />


                    <label htmlFor="Email"><b>Email</b></label>
                    <Field type="text" placeholder="Enter Email" name="Email" required />

                    <label htmlFor="Password"><b>Password</b></label>
                    <Field type="password" placeholder="Enter Password" name="Password" required />

                    <p>   <Link to='/registerUser'>New User / Register</Link>.</p>


                    <div className="clearfix">
                        <button className="signinbtn w-100">Sign in</button>
                    </div>




                </Form>

            </Formik>

        </div>
    )
}

export default Login