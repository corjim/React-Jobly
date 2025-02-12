import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';
import JoblyApi from "../api/Api";
import "./Auth.css"

function LoginForm({ setToken }) {
    const INITIAL_STATE = { username: "", password: "" }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();


    console.log("THIS IS FORM PASSWORD", formData.password)
    console.log("THIS IS FORM USERNAME", formData.username)

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const token = await JoblyApi.login(formData.username, formData.password);


            setToken(token);
            navigate("/");
        } catch (err) {
            console.error("Login Failed AFFFF", err)
        }
    }

    return (
        <div className="FormDiv">
            <form onSubmit={handleSubmit} className="AuthxForm">
                <label name="username">Username:</label>
                <input name="username" id="username" value={formData.username} onChange={handleChange} required />
                <label name="password">Password:</label>
                <input name="password" id="password" type="password" value={formData.password} onChange={handleChange} required />

                <button>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
