import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Admin() {
  const data = {
    labels: ["Pets", "Users", "New Users"],
    datasets: [
      {
        label: "Count",
        data: [10, 20, 5],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dashboard Statistics",
      },
    },
  };

  const pieData = {
    labels: [
      "Pets",
      "Users",
      "New Users",
      "Pets",
      "Users",
      "New Users",
      "Pets",
      "Users",
      "New Users",
    ],
    datasets: [
      {
        label: "Count",
        data: [10, 500, 5, 10, 20, 5, 10, 20, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(199, 199, 199, 0.2)",
          "rgba(83, 102, 255, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(83, 102, 255, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Pie Chart Example",
      },
    },
  };

  return (
    <div>
      <div className="cards">
        <div className="custom-card">
          <div className="custom-card-header">
            <PetsIcon className="custom-card-header-icon" />
            <h2>Total Pets</h2>
          </div>
          <div className="custom-card-content">10</div>
        </div>

        <div className="custom-card">
          <div className="custom-card-header">
            <PersonIcon className="custom-card-header-icon" />
            <h2>Total Users</h2>
          </div>
          <div className="custom-card-content">20</div>
        </div>

        <div className="custom-card">
          <div className="custom-card-header">
            <PersonAddIcon className="custom-card-header-icon" />
            <h2>New Users</h2>
          </div>
          <div className="custom-card-content">5</div>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
        <div className="chart-container">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
