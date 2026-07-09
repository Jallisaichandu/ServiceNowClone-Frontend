import React, { useEffect, useState } from "react";
import API from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {

  
  const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
    greeting = "Good Morning";
} else if (hour < 18) {
    greeting = "Good Afternoon";
}
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const name = localStorage.getItem("name");
  const [myTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [report, setReport] = useState({
    totalTickets: 0,
    openTickets: 0,
    closedTickets: 0,
    highPriorityTickets: 0,
    totalUsers: 0
});

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role === "ADMIN") {

        API.get("/users")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));

    }

    API.get("/tickets")
        .then(res => setTickets(res.data))
        .catch(err => console.log(err));
    API.get("/notifications")
      .then(res => setNotifications(res.data))
      .catch(err => console.log(err));
      API.get("/reports")
    .then(res => setReport(res.data))
    .catch(err => console.log(err));

       // API.get("/tickets/my")
    //.then(res => setMyTickets(res.data));

}, []);

  const openTickets =
    tickets.filter(t => t.status === "OPEN").length;

  const closedTickets =
    tickets.filter(t => t.status === "CLOSED").length;

  const chartData = {
    labels: ["Open", "Closed"],
    datasets: [
      {
        data: [openTickets, closedTickets],
        backgroundColor: [
          "#f39c12",
          "#2ecc71"
        ]
      }
    ]
  };
  
    const exportExcel = async () => {

        try {

            const response = await API.get("/reports/excel", {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "tickets.xlsx";

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.log(error);

            alert("Export Failed");

        }

    };

    
    

  

  return (

    <div>
      

      

    <div style={{ marginBottom: "20px" }}>

    <h2>{greeting}, {name} 👋</h2>

    <p>{new Date().toLocaleDateString()}</p>

    <button
        onClick={exportExcel}
        style={{
            marginTop: "15px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer"
        }}
    >
        📊 Export Excel
    </button>

</div>



      <div className="dashboard-card">

       {localStorage.getItem("role") === "ADMIN" && (
<div className="dashboard-card users-card">
    <h3>Total Users</h3>
    <h2>{report.totalUsers}</h2>
</div>
)}





        <div className="dashboard-card tickets-card">
          <h3>Total Tickets</h3>
          <h2>{report.totalTickets}</h2>
        </div>

        <div className="dashboard-card open-card">
          <h3>Open Tickets</h3>
          <h2>{report.openTickets}</h2>
        </div>

        <div className="dashboard-card closed-card">
          <h3>Closed Tickets</h3>
          <h2>{report.closedTickets}</h2>
        </div>
        <div className="dashboard-card my-card">
    <h3>
      My Assigned Tickets</h3>
    <h2>{myTickets.length}</h2>
</div>
<div className="dashboard-card high-card">
    <h3>High Priority</h3>
    <h2>{report.highPriorityTickets}</h2>
</div>

      </div>
     <div className="dashboard-content">

    <div className="chart-card">

        <h3>Ticket Status Overview</h3>

        <div className="chart-container">

            <Doughnut
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />

        </div>

    </div>
    <div className="page-card">

    <h2>Notifications</h2>

    {
        notifications.length === 0 ?

            <p>No Notifications</p>

            :

            notifications.map(notification => (

                <div key={notification.id} className="comment">

                    <p>{notification.message}</p>

                    <small>
                        {notification.createdDate}
                    </small>

                </div>

            ))
    }

</div>

    <div className="stats-card">

        <h3>Quick Statistics</h3>

        <p><strong>Total Users:</strong> {users.length}</p>

        <p><strong>Total Tickets:</strong> {tickets.length}</p>

        <p><strong>Open Tickets:</strong> {openTickets}</p>

        <p><strong>Closed Tickets:</strong> {closedTickets}</p>

    </div>

</div>

    </div>

  );
}

export default Dashboard;