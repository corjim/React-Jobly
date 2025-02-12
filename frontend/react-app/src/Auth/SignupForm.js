import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api/Api";
import { AuthContext } from "../AuthContext/AuthContext";

import "./Auth.css"

function SignupForm() {
    const { signup } = useContext(AuthContext); // Use signup function from context
    const navigate = useNavigate(); // useNavigate instead of useHistory for React Router v6

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await JoblyApi.signup(formData); // Call signup from context (this sets token inside AuthProvider)
            navigate("/"); // Redirect after successful signup
        } catch (err) {
            console.error("Signup failed:", err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="AuthxForm">
            <label name="username">Username:</label>
            <input name="username" id="username" value={formData.username} onChange={handleChange} required />
            <label name="password">Password:</label>
            <input name="password" id="password" type="password" value={formData.password} onChange={handleChange} required />

            <label name="firstName">First Name:</label>
            <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
            <label name="lastName">Last Name:</label>
            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
            <label name="email">Email:</label>
            <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <button>Sign Up</button>
        </form>
    );
}

export default SignupForm;
