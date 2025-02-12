// import React, { useState, useEffect } from "react";
// import JoblyApi from "../api/Api";
// import AuthContext from "./Context";


// // AuthProvider component that wraps the entire app.
// const AuthProvider = function ({ children }) {
//     const [user, setUser] = useState([]);
//     const [token, setToken] = useState(() => localStorage.getItem("token") || null);
//     const [loading, setLoading] = useState(true);

//     // When token changes, update localstorage and fetch user data
//     useEffect(() => {
//         async function fetchUser() {
//             if (token) {
//                 JoblyApi.token = token;
//                 try {
//                     const userData = await JoblyApi.getUserFromToken();
//                     setUser(userData);
//                     localStorage.setItem("token", token);
//                 } catch (error) {
//                     console.error("Not a valid token", error);
//                     logout();
//                 }
//             } else {
//                 localStorage.removeItem('token')
//                 setUser(null)
//             }
//         }
//         fetchUser()
//     }, [token])

//     // User Login function
//     async function login(username, password) {
//         try {
//             const newToken = await JoblyApi.login(username, password);
//             setToken(newToken);
//         } catch (err) {
//             console.error("Login failed", err);
//             throw err
//         }
//     }

//     // Signup function

//     async function signup(userData) {
//         try {
//             const newToken = await JoblyApi.signup(userData);
//             setToken(newToken);
//         } catch (err) {
//             console.error("singup failed", err);
//             throw (err)
//         }
//     };

//     // Logout function
//     function logout() {
//         setToken(null);
//         setUser(null);
//         localStorage.removeItem("token");
//     }
//     return (
//         <AuthContext.Provider value={{ user, token, login, signup, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );

// }

// export default AuthProvider;






import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Utility to decode JSON Web Tokens.
import JoblyApi from "../api/Api";


const AuthContext = createContext(null); // Ensure correct export

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // State to indicate whether authentication-related data is still loading.
    const [loading, setLoading] = useState(true);

    /**  - If `token` exists, save it to localStorage and set it for the API.
        - If`token` is null, remove it from localStorage and clear user data.
         */
    const handleTokenChange = () => {
        if (token) {
            localStorage.setItem('token', token);
            JoblyApi.token = token;
        } else {
            localStorage.removeItem("token");
            setUser(null);
        }
    };


    /**
     * Fetch the current user's data from the backend based on the token.
     * - Decodes token to extract the username.
     * - Fetches user data from the API and sets it in the state.
     * - If fetching fails, clears the current user.
     */
    const fetchUser = async () => {
        // stop loading if no token or user;
        if (!token) {
            setUser(null);
            setLoading(null);
            return;
        }

        try {
            setLoading(true); // start loading user.
            const decodedToken = jwtDecode(token) //Decode the JWT to get user's info.
            const user = await JoblyApi.getUser(decodedToken.username) // Fetch user data using the API.
            setUser(user);
            localStorage.setItem("token", token);

        } catch (err) {
            console.error("Error fetching current user", err);
            logout();
        } finally {
            setLoading(false) // Ensure loading is set to false.
        }
    };

    useEffect(() => {
        // async function fetchUser() {



        //     if (token) {
        //         JoblyApi.token = token;
        //         try {
        //             const userData = await JoblyApi.getUserFromToken();

        //             console.log("User successfully fetched:", userData);
        //             setUser(userData);
        //             localStorage.setItem("token", token);
        //         } catch (err) {
        //             console.error("Invalid token, logging out", err);
        //             logout();
        //         }
        //     } else {
        //         setUser(null);
        //     }
        // }
        // fetchUser();
        handleTokenChange();
        fetchUser();
    }, [token]);

    async function login(username, password) {
        try {
            const newToken = await JoblyApi.login(username, password);
            setToken(newToken);
            JoblyApi.token = newToken;
            localStorage.setItem("token", newToken);
            console.log("Login was successful", newToken)
        } catch (err) {
            console.error("login fAILED", err);
            throw err;
        }
    }

    async function signup(userData) {
        try {
            const newToken = await JoblyApi.signup(userData);
            setToken(newToken);
            JoblyApi.token = newToken;
            localStorage.setItem("token", newToken);
            console.log("Signup successful, token set:", newToken);
        } catch (err) {
            console.error("Signup failed", err);
            throw err;
        }
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
