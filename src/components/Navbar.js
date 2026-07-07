import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <h2>ServiceNow Ticketing System</h2>

      <div className="navbar-right">
        <span>Welcome, Admin</span>

        <button
          onClick={() => {
            localStorage.removeItem("loggedIn");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;