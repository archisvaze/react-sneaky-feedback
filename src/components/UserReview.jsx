import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import React from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase_config';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert, setReview } from '../slices/mySlice';

export default function UserReview() {
    const state = useSelector(state => state.myState)
    const dispatch = useDispatch();

    let { displayName } = useParams();
    console.log(displayName)

    let check = async (displayName) => {
        const docRef = doc(db, 'users', displayName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("User data:", docSnap.data());
            console.log(`username: ${displayName} already exists!`)

            //add review
            addReview(docRef);
            dispatch(setReview(""))
            //show alert
            dispatch(setAlert(["Review Posted!!", true, "alert"]))
            setTimeout(() => {
                dispatch(setAlert(["Review Posted!!", false, "alert"]))
            }, 4000)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such User!");
            //show alert
            dispatch(setAlert([`User : ${displayName} does not exist!`, true, "error"]))
            setTimeout(() => {
                dispatch(setAlert([`User : ${displayName} does not exist!`, false, "error"]))
            }, 4000)
        }
    }


    let addReview = async (docRef) => {
        const d = new Date();
        let day = d.getDay();
        let month = d.getMonth();
        let year = d.getFullYear();
        let date = `_${day}-${month}-${year}`
        let review = state.review + date;
        await (updateDoc(docRef, {
            reviews: arrayUnion(review)
        }))
    }


    return (
        <div className={"userreview-container " + state.theme}>
            <h3>Post a review about {state.user.displayName}</h3>
            <textarea onChange={(e) => {
                dispatch(setReview(e.target.value))
            }} className='review-input' type="text" placeholder='Write here' value={state.review} />
            <button onClick={() => {
                check(displayName);
            }} className="review-button">Submit</button>
        </div>
    )
}
