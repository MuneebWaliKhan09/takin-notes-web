import React from 'react'
import axios from 'axios'
// import { Formik } from 'formik'
import { Form, Field, Formik } from 'formik'
import { useNavigate, Link } from 'react-router-dom';
import '../Login/login.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const navigate = useNavigate();


    const styleReg = {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }







    return (
        <div className='container' style={{ width: '50%' }}>
            <h2>Register User</h2>
            <Formik initialValues={{
                UserName: "",
                Email: "",
                Password: "",
            }}


                onSubmit={(values) => {
                    const { UserName, Email, Password } = values;

                    axios({
                        method: "post",
                        url: '/register',
                        data: {
                            UserName,
                            Email,
                            Password
                        }
                    })
                        .then((res) => {
                            if (res.status === 201) {
                                toast.success(res.data.message, styleReg)
                                navigate("/loginUser")
                            }
                        })
                        .catch((error) => {
                            toast.error(error.response.data.error, styleReg);
                        });
                }}>


                <Form className=''>


                    {/* <h1>Sign Up</h1> */}
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <label htmlFor="UserName"><b>UserName</b></label>
                    <Field type="text" placeholder="Enter UserName" name="UserName" required />

                    <label htmlFor="Email"><b>Email</b></label>
                    <Field type="text" placeholder="Enter Email" name="Email" required />

                    <label htmlFor="Password"><b>Password</b></label>
                    <Field type="password" placeholder="Enter Password" name="Password" required />

                    <p>   <Link to='/loginUser'>Already have an account ? / Login</Link>.</p>


                    <div className="clearfix">
                        <button className="signinbtn w-100">Sign Up</button>
                    </div>




                </Form>

            </Formik>

        </div>
    )
}

export default Register