import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase_config';
import { setAlert, setUser } from '../slices/mySlice';
import { doc, getDoc, setDoc } from "firebase/firestore";


export default function Signup() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let state = useSelector(state => state.myState);

    function post(obj) {
        let email = obj.email;
        let username = obj.username;
        let password = obj.password
        console.log(email, username, password);
        check(username, email, password);
    }

    let check = async (username, email, password) => {
        const docRef = doc(db, 'users', username);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("User data:", docSnap.data());
            console.log(`username: ${username} already exists!`)
            //show error
            dispatch(setAlert([`username: ${username} already exists!`, true, "error"]))
            setTimeout(() => {
                dispatch(setAlert([`username: ${username} already exists!`, false, "error"]))
            }, 4000)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such User!");
            console.log('creating new user...')
            // create new user
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    // eslint-disable-next-line
                    const user = userCredential.user;
                    dispatch(setUser({ email: email, displayName: username }))
                    //adding userdata to firestore
                    addUser(username, email);
                    navigate("/main")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    //show error
                    dispatch(setAlert([errorCode + errorMessage, true, "error"]))
                    setTimeout(() => {
                        dispatch(setAlert([errorCode + errorMessage, false, "error"]))
                    }, 4000)
                });
        }
    }
    let addUser = async (username, email) => {
        let user = { displayName: username, reviews: [], email: email }
        const docRef = await setDoc(doc(db, "users", username), user);
        console.log(`User Added! ${docRef}`)
    }
    return (
        <div className={'signup-container ' + state.theme}>
            <div className="form-container">
                <div className="form-title">Signup to create a Sneaky Feedback Link</div>
                <Formik

                    initialValues={{ username: '', email: '', password: '', passwordCheck: '' }}
                    validate={values => {
                        const errors = {};
                        if (values.username.length < 3) {
                            errors.username = 'Username should have at least 3 characters';
                        }
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
                        if (values.password !== values.passwordCheck) {
                            errors.passwordCheck = 'Passwords should match!'
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {


                        setSubmitting(false);
                        post(values)

                        values.username = ""
                        values.email = ""
                        values.password = ""
                        values.passwordCheck = ""


                    }}
                >
                    {({ isSubmitting }) => (

                        <Form className="form" action="">
                            <Field className="field" placeholder="Enter a unique username" name="username" />
                            <ErrorMessage className="error-msg" name="username" component="div" />

                            <Field className="field" placeholder="Enter your email" name="email" />
                            <ErrorMessage className="error-msg" name="email" component="div" />

                            <Field className="field" placeholder="Enter a password" name="password" type="password" />
                            <ErrorMessage className="error-msg" name="password" component="div" />

                            <Field className="field"
                                placeholder="Confirm password" name="passwordCheck" type="password" />
                            <ErrorMessage className="error-msg" name="passwordCheck" component="div" />

                            <button id="submit-btn" className='signup-btn' type="submit" disabled={isSubmitting}>Sign Up</button>

                            <p>Already have an account?&nbsp;&nbsp;<span onClick={() => navigate("/")} style={{ textDecoration: "underline", cursor: "pointer" }}>
                                Login</span> </p>
                        </Form>

                    )}


                </Formik>
            </div>

        </div>
    )
}
