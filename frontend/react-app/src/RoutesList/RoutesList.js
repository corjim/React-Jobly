import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthContext } from "../AuthContext/AuthContext";
//import { AuthProvider } from "../AuthContext/AuthContext";
// Components
import NavBar from "../Navbar/NavBar";
import HomePage from "../Homepage/HomePage";
import CompanyList from "../Company/CompanyList";
import CompanyDetail from "../Company/CompanyDetail";
import JobList from "../Job/JobList";
import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignupForm";
import ProfileForm from "../Auth/ProfileForm";
// import PrivateRoute from "./PrivateRoute"; // Import the fixed PrivateRoute

function RoutesList() {
    const { user, loading } = useContext(AuthContext);

    // if loading is true show ...loading
    if (loading) {
        return (
            <h1>Loading....</h1>
        )
    }
    return (
        <Router>
            <NavBar />
            <Routes>

                <Route exact path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
                <Route exact path="/login" element={user ? <Navigate to="/" /> : <LoginForm />} />
                <Route exact path="/signup" element={user ? <Navigate to="/" /> : <SignupForm />} />

                <Route exact path="/profile" element={user ? <ProfileForm /> : <Navigate to="/login" />} />
                <Route exact path="/companies" element={user ? <CompanyList /> : <Navigate to="/login" />} />
                <Route path="/companies/:handle" element={user ? <CompanyDetail /> : <Navigate to="/login" />} />
                <Route exact path="/jobs" element={user ? <JobList /> : <Navigate to="/login" />} />


                {/* Protect these routes with PrivateRoute */}
                {/* {user && (<Route element={<PrivateRoute />}>
                    <Route exact path="/profile" element={<ProfileForm />} />
                    <Route exact path="/companies" element={<CompanyList />} />
                    <Route path="/companies/:handle" element={<CompanyDetail />} />
                    <Route exact path="/jobs" element={<JobList />} />
                </Route>)} */}

            </Routes>
        </Router>
    );
}

export default RoutesList;
