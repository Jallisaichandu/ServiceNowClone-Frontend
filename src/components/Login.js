import React, { useState } from "react";
import API from "../services/api";

function Login({ onLogin, goToSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    const loginData = {
      email: email,
      password: password
    };

    API.post("/auth/login", loginData)
      .then((response) => {

        console.log("LOGIN RESPONSE:", response.data);

        // Save login details
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("name", response.data.name);

        // Notify App that login succeeded
         console.log("TOKEN:", localStorage.getItem("token"));
    console.log("ROLE:", localStorage.getItem("role"));
    console.log("NAME:", localStorage.getItem("name"));
        onLogin();

      })
      .catch((error) => {
        console.error(error);
        alert("Invalid Email or Password");
      });
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "100px auto",
        padding: "20px",
        background: "white",
        borderRadius: "10px"
      }}
    >
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
      <br /><br />

<p>
    Don't have an account?
</p>

<button onClick={() => goToSignup()}>
    Sign Up
</button>

    </div>
    
  );
}

export default Login;