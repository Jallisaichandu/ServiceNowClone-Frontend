import React, { useState } from "react";
import API from "../services/api";

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
        .catch(() => {
            alert("Registration Failed");
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