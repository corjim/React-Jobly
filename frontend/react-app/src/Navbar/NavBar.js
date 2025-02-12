
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import "./NavBar.css"

function NavBar() {
    const auth = useContext(AuthContext)

    if (!auth) {
        console.error("AuthContext is not available!");
        return null;
    };

    const { user, logout } = auth;

    return (
        <nav className="NavBar">
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>

            <div className="NavBarRight">
                {user ? (
                    <>
                        <span>Welcome, {user.username}!</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Signup</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
