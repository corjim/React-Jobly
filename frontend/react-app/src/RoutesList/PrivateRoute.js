import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

function PrivateRoute() {
    const { user, loading } = useContext(AuthContext);

    console.log("I AM THE USER", user)
    if (loading) return <h1>Loading ....</h1>
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
