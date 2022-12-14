import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { db, auth } from '../firebase_config';
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { logOut, setAlert, setUser, setUserReviews } from '../slices/mySlice';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import CopyToClipboard from 'react-copy-to-clipboard';
import user from "../icons/user.png"

export default function Main() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state.myState)
    useEffect(() => {
        const user = auth.currentUser;
        if (user !== null) {
            user.providerData.forEach((profile) => {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                updateProfile(auth.currentUser, {
                    displayName: state.user.displayName
                }).then(() => {
                    dispatch(setUser({
                        email: profile.email,
                        displayName: profile.displayName,
                    }))
                    //get all user reviews

                    getReviews(profile.displayName);


                }).catch((error) => {
                    console.log(`Could not update user displayName${error}`)
                });
            })
        } else {
            dispatch(logOut())
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])

    let getReviews = async (displayName) => {
        const docRef = doc(db, "users", displayName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            dispatch(setUserReviews(docSnap.data().reviews))
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    let deleteReview = async (review) => {
        const docRef = doc(db, "users", state.user.displayName);
        await (updateDoc(docRef, {
            reviews: arrayRemove(review)
        }))
        getReviews(state.user.displayName);
    }


    console.log(state)
    return (
        <div className={'main-container ' + state.theme}>
            <div className="main">
                <div className="profile">
                    <img src={user} alt="" className="user" />
                    <h4>{state.user.displayName}</h4>
                    <h4>{state.user.email}</h4>
                    <h5>Your feedback link</h5>
                    <Link to={`/${state.user.displayName}`} target="_blank">
                        <div> {`https://bejewelled-malasada-a4a4bc.netlify.app/${state.user.displayName}`}

                            <CopyToClipboard ressult={console.log(`copied`)} text={`https://bejewelled-malasada-a4a4bc.netlify.app/${state.user.displayName}`}>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    //show alert
                                    dispatch(setAlert(["Copied to Clipboard", true, "alert"]))
                                    setTimeout(() => {
                                        dispatch(setAlert(["Copied to Clipboard", false, "alert"]))
                                    }, 4000)
                                }}>Copy to clipboard</button>
                            </CopyToClipboard>

                        </div>

                    </Link>

                </div>

                <br />

                <h3>Here's what people are saying about you... </h3>
                <div className="reviews-container">
                    {state.userReviews.map(string => {
                        let date = string.split("_")[1];
                        let review = string.split("_")[0];
                        return (
                            <div key={string} className="review">
                                <p className='review-title'>"{review}"</p>
                                <p className='review-date'>{date}</p>
                                <button onClick={() => {
                                    deleteReview(string);
                                }} className="delete-button">X</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}
