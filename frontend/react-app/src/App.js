

import React from "react";
//import ReactDOM from "react-dom";
// import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext/AuthContext";
import NavBar from "./Navbar/NavBar";
import RoutesList from "./RoutesList/RoutesList"

const App = () => {
  return (
    <AuthProvider>
      {/* <NavBar /> */}
      <RoutesList />
    </AuthProvider>
  );
}

export default App;