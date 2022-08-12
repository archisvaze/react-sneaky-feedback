import { createSlice } from "@reduxjs/toolkit";
let initialState = {};
initialState = { theme: "light", user: { email: "", username: "" }, review: "", userReviews: [], isLoggedIn: false, alert: ["", false, "error"] };

const mySlice = createSlice({
    name: "mySlice",
    initialState: initialState,
    reducers: {
        toggleTheme: (state, action) => {
            if (state.theme === "light") {
                state.theme = "dark"
            } else state.theme = "light";
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        setReview: (state, action) => {
            state.review = action.payload
        },
        setUserReviews: (state, action) => {
            state.userReviews = action.payload
        },
        logOut: (state, action) => {
            state.user.email = "";
            state.username = '';
            state.review = '';
            state.userReviews = [];
            state.isLoggedIn = false;
            state.alert = ["", false, 'error']
        },
        setAlert: (state, action) => {
            state.alert = action.payload;
        }

    }

})


export const { toggleTheme, setUser, setReview, setUserReviews, setAlert } = mySlice.actions;
export default mySlice.reducer;