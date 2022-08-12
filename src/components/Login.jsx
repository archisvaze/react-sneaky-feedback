import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth } from '../firebase_config';
import { useNavigate } from "react-router-dom";
import { setAlert, setUser } from '../slices/mySlice';
import { useDispatch, useSelector } from 'react-redux';



export default function Login() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const state = useSelector(state => state.myState)

    function post(obj) {
        let email = obj['email'];
        let password = obj['password'];

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                dispatch(setUser({ email: user.email }))
                navigate("/main")

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                //show error
                dispatch(setAlert([errorMessage, true, "error"]))
                setTimeout(() => {
                    dispatch(setAlert([errorMessage, false, "error"]))
                }, 4000)

            });
    }


    return (
        <div className={"login-container " + state.theme}>



            <div className={"form-container"}>
                <div className="form-title">Login to check your Sneaky Feedbacks.</div>
                <Formik

                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {


                        setSubmitting(false);
                        post(values)

                        values.email = ""
                        values.password = ""


                    }}
                >
                    {({ isSubmitting }) => (

                        <Form className="form" action="">



                            <Field className="field" placeholder="Enter your email" name="email" />
                            <ErrorMessage className="error-msg" name="email" component="div" />


                            <Field className="field" placeholder="Enter your password" name="password" type="password" />
                            <ErrorMessage className="error-msg" name="password" component="div" />

                            <button id="submit-btn"
                                className='login-btn' type="submit" disabled={isSubmitting}>Login</button>

                            <p>Don't have an account?&nbsp;&nbsp;<span onClick={() => navigate("/signup")} style={{ textDecoration: "underline", cursor: "pointer" }}>
                                Sign Up</span> </p>
                        </Form>

                    )}


                </Formik>
            </div>
        </div>
    )
}
