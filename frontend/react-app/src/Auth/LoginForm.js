import React, { useState, useContext } from "react";

import { useNavigate } from 'react-router-dom';
import JoblyApi from "../api/Api";
import { AuthContext } from "../AuthContext/AuthContext";
import "./Auth.css"

function LoginForm() {
    const INITIAL_STATE = { username: "", password: "" }
    const [formData, setFormData] = useState(INITIAL_STATE);

    // Access login function and loading state from AuthContext
    const { login, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const token = await JoblyApi.authenticateUser(formData.username, formData.password);

            console.log(this.token)

            // log the user in using the login function from context
            login(token);

            navigate("/");

        } catch (err) {
            console.error("Login Failed AFFFF", err)
        }
    };

    // If loading is true, display a loading message
    if (loading) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="FormDiv">
            <form onSubmit={handleSubmit} className="AuthxForm">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input name="username" id="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input name="password" id="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>

                <button>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
