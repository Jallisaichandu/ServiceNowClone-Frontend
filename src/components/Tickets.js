import React, { useEffect, useState } from "react";
import API from "../services/api";

function Tickets() {

    // -------------------------------
    // Ticket List
    // -------------------------------

    const [tickets, setTickets] = useState([]);

    // -------------------------------
    // Users
    // -------------------------------

    const [users, setUsers] = useState([]);

    // -------------------------------
    // Ticket Form
    // -------------------------------

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");
    const [assignedUserId, setAssignedUserId] = useState("");

    // -------------------------------
    // Search
    // -------------------------------

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [priorityFilter, setPriorityFilter] = useState("");

    const [userFilter, setUserFilter] = useState("");

    // -------------------------------
    // Comments
    // -------------------------------

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const role = localStorage.getItem("role");

    const [history, setHistory] = useState([]);

const [selectedHistoryTicket, setSelectedHistoryTicket] = useState(null);

const [selectedFile, setSelectedFile] = useState(null);
const [attachments, setAttachments] = useState([]);


    // -------------------------------
    // Load Data
    // -------------------------------

    useEffect(() => {

        loadTickets();
        loadUsers();

    }, []);

    // -------------------------------
    // Load Tickets
    // -------------------------------

    const loadTickets = () => {

        API.get("/tickets")

            .then((response) => {

                setTickets(response.data);

            })

            .catch((error) => {

                console.error(error);

            });

    };

    // -------------------------------
    // Load Users
    // -------------------------------

    const loadUsers = () => {

        API.get("/users")

            .then((response) => {

                setUsers(response.data);

            })

            .catch((error) => {

                console.error(error);

            });

    };

    // -------------------------------
    // Create Ticket
    // -------------------------------

    const createTicket = () => {

        const ticket = {

            title,
            description,
            priority,
            status: "OPEN",
            assignedUserId

        };

        API.post("/tickets", ticket)

            .then(() => {

                alert("Ticket Created Successfully");

                setTitle("");
                setDescription("");
                setPriority("LOW");
                setAssignedUserId("");

                loadTickets();

            })

            .catch((error) => {

                console.error(error);

            });

    };

    // -------------------------------
    // Delete Ticket
    // -------------------------------

    const deleteTicket = (id) => {

        if (!window.confirm("Delete Ticket?")) return;

        API.delete(`/tickets/${id}`)

            .then(() => {

                loadTickets();

            })

            .catch((error) => {

                console.error(error);

            });

    };

    // -------------------------------
    // Close Ticket
    // -------------------------------

const closeTicket = (ticket) => {

    const updatedTicket = {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: "CLOSED"
    };

    API.put(`/tickets/${ticket.id}`, updatedTicket)
        .then(() => {
            loadTickets();
        })
        .catch((error) => {
            console.error(error);
        });

};

    // -------------------------------
    // Open Comments
    // -------------------------------

    
const openComments = (ticket) => {

    setSelectedTicket(ticket);

    loadAttachments(ticket.id);

    API.get(`/comments/ticket/${ticket.id}`)
        .then((response) => {

            setComments(response.data);

            setTimeout(() => {

                document
                    .getElementById("commentsSection")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }, 100);

        });

}; 

    // -------------------------------
    // Add Comment
    // -------------------------------

    const addComment = () => {

        if (newComment.trim() === "") {

            alert("Enter Comment");

            return;

        }

        API.post(`/comments/${selectedTicket.id}`, {

            message: newComment

        })

            .then(() => {

               alert("Comment Added Successfully");

                setNewComment("");

                openComments(selectedTicket);

            })

            .catch((error) => {

                console.error(error);

            });

    };  
    const viewHistory = (ticket) => {

    setSelectedHistoryTicket(ticket);

    API.get(`/history/${ticket.id}`)
        .then((response) => {

            setHistory(response.data);

        })
        .catch((error) => {

            console.error(error);

        });

};
const loadAttachments = (ticketId) => {

    API.get(`/attachments/ticket/${ticketId}`)
        .then(res => setAttachments(res.data))
        .catch(console.error);

};
const uploadAttachment = () => {

    if (!selectedFile || !selectedTicket) {
        alert("Please select a file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    API.post(`/attachments/${selectedTicket.id}`, formData)
        .then(() => {

            alert("File uploaded successfully");

            loadAttachments(selectedTicket.id);

            setSelectedFile(null);

        })
        .catch((err) => {

            console.error(err);

            alert("Upload failed: " + err.response?.status);

        });

};
const downloadAttachment = (id, fileName) => {

    API.get(`/attachments/download/${id}`, {
        responseType: "blob"
    })
    .then((response) => {

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    })
    .catch((err) => {

        console.error(err);

        alert("Download failed");

    });

};
const deleteAttachment = (id) => {

    API.delete(`/attachments/${id}`)
        .then(() => loadAttachments(selectedTicket.id));

};

      return (

        <div style={{ padding: "20px" }}>

            <h2>Ticket Management</h2>

            <h3>Create Ticket</h3>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>

            <br /><br />

            <select
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
            >
                <option value="">Select User</option>

                {users.map((user) => (

                    <option
                        key={user.id}
                        value={user.id}
                    >
                        {user.name}
                    </option>

                ))}

            </select>

            <br /><br />

            <button onClick={createTicket}>
                Create Ticket
            </button>

            <hr />

            <h3>Search Tickets</h3>

            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            /> 
            <br /><br />

<select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
>
    <option value="">All Status</option>
    <option value="OPEN">OPEN</option>
    <option value="CLOSED">CLOSED</option>
</select>

{" "}

<select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
>
    <option value="">All Priority</option>
    <option value="LOW">LOW</option>
    <option value="MEDIUM">MEDIUM</option>
    <option value="HIGH">HIGH</option>
</select>

{" "}

<select
    value={userFilter}
    onChange={(e) => setUserFilter(e.target.value)}
>
    <option value="">All Users</option>

    {users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    ))}

</select>

<br /><br />

            <br /><br />

            <table border="1" cellPadding="10">

                <thead>

                <tr>

                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned User</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    tickets

                        .filter(ticket =>

    ((ticket.title || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

    (ticket.description || "")
        .toLowerCase()
        .includes(search.toLowerCase()))

    &&

    (statusFilter === "" ||
        ticket.status === statusFilter)

    &&

    (priorityFilter === "" ||
        ticket.priority === priorityFilter)

    &&

    (userFilter === "" ||
        String(ticket.assignedUser?.id) === userFilter)

)

                        .map(ticket => (

                            <tr key={ticket.id}>

                                <td>{ticket.id}</td>

                                <td>{ticket.title}</td>

                                <td>{ticket.description}</td>

                                <td>

<span
className={
ticket.priority === "HIGH"
? "priority-high"
: ticket.priority === "MEDIUM"
? "priority-medium"
: "priority-low"
}
>

{ticket.priority}

</span>

</td>

                                <td>

<span
className={
ticket.status === "OPEN"
? "status-open"
: "status-closed"
}
>

{ticket.status}

</span>

</td>

                                <td>

                                    {

                                        ticket.assignedUser

                                            ? ticket.assignedUser.name

                                            : "Not Assigned"

                                    }

                                </td>

                                <td>

                                    {

                                        ticket.status !== "CLOSED"

                                        &&

                                        <button
                                            onClick={() => closeTicket(ticket)}
                                        >
                                            Close
                                        </button>

                                    }
                                    <button
    onClick={() => viewHistory(ticket)}
>
    History
</button>

                                    {" "}

                                   {role === "ADMIN" && (
    <button
        onClick={() => deleteTicket(ticket.id)}
    >
        Delete
    </button>
)}

                                    {" "}

                                    
<button
  onClick={() => {
    alert("Comments button clicked");
    console.log("Comments button clicked");
    openComments(ticket);
  }}
>
  Comments
</button>
                                </td>

                            </tr>

                        ))

                }

                </tbody>

            </table>

            {

                selectedTicket &&

                <div

                    style={{

                        marginTop: "40px",
                        border: "1px solid gray",
                        padding: "20px",
                        borderRadius: "10px"

                    }}

                >

                   <div
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px"
    }}
>

    <h3>
        Comments - {selectedTicket.title}
    </h3>

    <button
        onClick={() => {

            setSelectedTicket(null);
            setComments([]);
            setNewComment("");

        }}
    >
        Close Comments
    </button>

</div>
    
                   
                        {
                        comments.length === 0

                        ?

                        <p>No Comments Yet</p>

                        :

                        comments.map(comment => (

                            <div
    key={comment.id}
    style={{
        borderBottom: "1px solid #ddd",
        marginBottom: "10px",
        paddingBottom: "10px"
    }}
>

    <strong>
        {comment.userName}
    </strong>

    <br />

    <p>
        {comment.message}
    </p>

    <small>
        {new Date(comment.createdDate).toLocaleString()}
    </small>

</div>

                        ))

                    }

                    <br />

                    <textarea

                        placeholder="Write Comment..."

                        value={newComment}

                        onChange={(e) =>
                            setNewComment(e.target.value)
                        }

                    />

                    <br /><br />

                    <button 
     onClick={addComment}
    disabled={!newComment.trim()} 
                  >
                    Add Comment 
</button>

    


    {/* ================= ATTACHMENTS ================= */}

    <hr />

    <h3>Attachments</h3>

    <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
    />

    <button onClick={uploadAttachment}>
        Upload
    </button>

    <br /><br />

    <table>

        <thead>

        <tr>
            <th>File Name</th>
            <th>Download</th>
            

            {localStorage.getItem("role") === "ADMIN" &&
                <th>Delete</th>}

        </tr>

        </thead>

        <tbody>

        {attachments.map(file => (

            <tr key={file.id}>

                <td>{file.fileName}</td>

                <td>
    <button
        onClick={() => downloadAttachment(file.id, file.fileName)}
    >
        Download
    </button>
</td>

                {localStorage.getItem("role") === "ADMIN" &&

                    <td>

                        <button
                            onClick={() => deleteAttachment(file.id)}
                        >
                            Delete
                        </button>

                    </td>

                }

            </tr>

        ))}

        </tbody>

    </table>

</div>


                

            }
            {
selectedHistoryTicket && (

<div
    style={{
        marginTop: "30px",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px"
    }}
>

<h3>
History - {selectedHistoryTicket.title}
</h3>

{
history.length === 0 ?

<p>No History Found</p>

:

history.map(item => (

<div
    key={item.id}
    style={{
        borderBottom: "1px solid #ddd",
        padding: "10px"
    }}
>

<strong>{item.action}</strong>

<br />

By :
{item.userName}

<br />

<small>
{item.actionDate}
</small>

</div>

))
}

</div>


)

}
        </div>
        

    );
    
  }

export default  Tickets;