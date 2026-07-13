import React, { useState } from "react";

import "./App.css";
import {
    FaTachometerAlt,
    FaUsers,
    FaTicketAlt,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Tickets from "./components/Tickets";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Signup from "./components/Signup";



function App() {

  const [page, setPage] = useState("dashboard");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token"); 
   localStorage.removeItem("role");
    localStorage.removeItem("name");

    setLoggedIn(false);
  };
  const [showSignup, setShowSignup] = useState(false);
  console.log("showSignup =", showSignup);
  

  if (!loggedIn) {

    
    return (
        <Login
            onLogin={() => setLoggedIn(true)}
            goToSignup={() => setShowSignup(true)}
        />
    );
}
if(showSignup){
  console.log("Showing Signup Page");
        return (
            <Signup
                goToLogin={() => setShowSignup(false)}
            />
        );
    }

  return (
    <div className="container">

      <div className="sidebar">

        <div
    style={{
        textAlign: "center",
        marginBottom: "30px"
    }}
>

    <h2>ServiceNow</h2>

    <h3>{name}</h3>

    <p>{role}</p>

</div>
        <ul>
        <li onClick={() => setPage("dashboard")}>
    <FaTachometerAlt style={{ marginRight: "10px" }} />
    Dashboard
</li>

{role === "ADMIN" && (
    <li onClick={() => setPage("users")}>
        <FaUsers style={{ marginRight: "10px" }} />
        Users
    </li>
)}

<li onClick={() => setPage("tickets")}>
    <FaTicketAlt style={{ marginRight: "10px" }} />
    Tickets
</li>

<li onClick={() => setPage("profile")}>
    <FaUser style={{ marginRight: "10px" }} />
    Profile
</li>

<li onClick={logout}>
    <FaSignOutAlt style={{ marginRight: "10px" }} />
    Logout
</li>
</ul>

      </div>

      <div className="content">
          <div className="content">
    {page === "profile" && <h1>PROFILE TEST</h1>}
    
</div>

        <Navbar />


        {page === "dashboard" ? <Dashboard /> : null}

        {page === "users" && role === "ADMIN" ? <Users /> : null}

        {page === "tickets" ? <Tickets /> : null}

        {page === "profile" ? <Profile /> : null}
        
      </div>
     
    </div>
  );
}

export default App;