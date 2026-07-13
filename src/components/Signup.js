import React, { useState } from "react";
import API from "../services/api";
console.log("Signup Component Loaded");
function Signup({ goToLogin }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {

        API.post("/auth/register", {
            name,
            email,
            password
        })
        .then((response) => {

            alert(response.data);

            if(response.data === "Registration Successful"){
                goToLogin();
            }

        })
      .catch((error) => {
    console.log("ERROR:", error);

    if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        alert(JSON.stringify(error.response.data));
    } else {
        alert(error.message);
    }
});

    };

    return (
        <div>

            <h2>Sign Up</h2>

            <input
                placeholder="Name"
                onChange={(e)=>setName(e.target.value)}
            />

            <br/><br/>

            <input
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
            />

            <br/><br/>

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <br/><br/>

            <button onClick={register}>
                Register
            </button>

        </div>
    );
}

export default Signup;