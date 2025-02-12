import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext/Context";
import JoblyApi from "../api/Api";

function ProfileForm() {
    const { user, setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: ""
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const updatedUser = await JoblyApi.updateUser(user.username, formData);
            setUser(updatedUser);
        } catch (err) {
            console.error("Profile update failed", err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="AuthxForm">
            <input name="firstName" value={formData.firstName} onChange={handleChange} />
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
            <input name="email" value={formData.email} onChange={handleChange} />
            <input name="password" type="password" placeholder="New Password" onChange={handleChange} />
            <button>Update Profile</button>
        </form>
    );
}

export default ProfileForm;
