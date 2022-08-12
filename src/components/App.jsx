import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Signup from "./Signup";
import UserReview from "./UserReview";

function App(props) {



    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<Main />} />
                <Route path="/:displayName" element={<UserReview />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;