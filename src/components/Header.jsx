import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import sun from "../icons/sun.svg"
import moon from "../icons/moon.svg"
import { toggleTheme } from "../slices/mySlice"
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase_config';

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state.myState)

    function logout() {
        auth.signOut();
        navigate("/")
    }
    return (
        <div className={'header-container ' + state.theme}>
            <div style={{ top: state.alert[1] === true ? "90px" : "-10vh", backgroundColor: state.alert[2] === "error" ? "rgb(224, 75, 75)" : "rgb(0, 119, 255)" }} className="alert">{state.alert[0]}</div>

            <div className="header">

                <div className="left">
                    <h2>Anonym Feedback</h2>
                </div>

                <div className="right">

                    <button style={{ display: state.isLoggedIn === true ? "flex" : 'none' }} onClick={() => {
                        logout();
                    }} className="logout-button">Logout</button>

                    <img style={{ cursor: "Pointer" }} onClick={() => dispatch(toggleTheme())} src={state.theme === "light" ? sun : moon} alt="" />


                </div>

            </div>
        </div>
    )
}
