import React, { useEffect, useState } from "react";
import API from "../services/api";

function Users() {

  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    API.get("/users")
        .then((response) => {
            console.log("USERS =", response.data);
            setUsers(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

  const createUser = () => {

    const user = {
      name,
      email,
      password,
      role: "USER"
    };

    API.post("/users", user)
      .then(() => {

        alert("User Created");

        setName("");
        setEmail("");
        setPassword("");

        loadUsers();
      });
  };

  const deleteUser = (id) => {

    API.delete(`/users/${id}`)
      .then(() => {
        loadUsers();
      });
  };
  const editUser = (user) => {
  setEditing(true);
  setEditingId(user.id);

  setName(user.name);
  setEmail(user.email);
  setPassword(user.password);
};
const updateUser = () => {

  const user = {
    id: editingId,
    name,
    email,
    password,
    role: "USER"
  };

  API.put(`/users/${editingId}`, user)
    .then(() => {

      alert("User Updated Successfully");

      setEditing(false);
      setEditingId(null);

      setName("");
      setEmail("");
      setPassword("");

      loadUsers();
    });

};  

  return (

    <div>

      <h2>User Management</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      {editing ? (

  <button onClick={updateUser}>
    Update User
  </button>

) : (

  <button onClick={createUser}>
    Create User
  </button>

)}
      <hr />
      <input
  type="text"
  placeholder="Search Users..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-box"
/>

<br /><br />

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users
  .filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )
  .map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                  <button
                  onClick={() => editUser(user)}
                  >
                   Edit
                   
           </button>
            <button
            onClick={() => deleteUser(user.id)}
             >
               Delete
               </button>
                        </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Users;