import React, { useEffect, useState } from "react";
import API from "../services/api";


function Profile() {

    const [profile, setProfile] = useState({});
    const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");

    useEffect(() => {

        API.get("/profile")
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);
    const changePassword = () => {

    API.post("/users/change-password", {

        currentPassword,

        newPassword

    })

    .then(() => {

        alert("Password Changed Successfully");

        setCurrentPassword("");
        setNewPassword("");

    })

    .catch((error) => {

        console.error(error);

        alert("Current Password is Incorrect");

    });

};

    return (

        <div style={{ padding: "20px" }}>

            <h2>My Profile</h2>

            <hr />

            <h3>Name</h3>
            <p>{profile.name}</p>

            <h3>Email</h3>
            <p>{profile.email}</p>

            <h3>Role</h3>
            <p>{profile.role}</p>
            <hr />

<h3>Change Password</h3>

<input
    type="password"
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
/>

<br /><br />

<input
    type="password"
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
/>

<br /><br />

<button onClick={changePassword}>
    Change Password
</button>

        </div>

    );

}

export default Profile;