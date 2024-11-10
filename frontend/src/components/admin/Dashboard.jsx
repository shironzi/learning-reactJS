import React, { useCallback } from "react";
import { Bar, Pie } from "react-chartjs-2";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
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

import { getData } from "../../apis/admin";

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
        text: "Pets Adoption Statistics",
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
        position: "bottom",
      },
      title: {
        display: true,
        text: "Pets categories",
      },
    },
  };

  const [usersCount, setUsersCount] = React.useState(0);
  const [petsCount, setPetsCount] = React.useState(0);

  const fetchData = useCallback(async () => {
    try {
      const data = await getData();
      setUsersCount(data.users);
      setPetsCount(data.pets);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="admin-dashboard">
      <div className="cards">
        <div className="custom-card">
          <div className="custom-card-header">
            <PetsIcon className="custom-card-header-icon" />
            <h3>Total Users</h3>
          </div>
          <div className="custom-card-content">{usersCount}</div>
        </div>

        <div className="custom-card">
          <div className="custom-card-header">
            <PersonIcon className="custom-card-header-icon" />
            <h3>New Users</h3>
          </div>
          <div className="custom-card-content">20</div>
        </div>

        <div className="custom-card">
          <div className="custom-card-header">
            <PersonAddIcon className="custom-card-header-icon" />
            <h3>Active Users</h3>
          </div>
          <div className="custom-card-content">5</div>
        </div>

        <div className="custom-card">
          <div className="custom-card-header">
            <PetsIcon className="custom-card-header-icon" />
            <h3>Total Pets</h3>
          </div>
          <div className="custom-card-content">{petsCount}</div>
        </div>
      </div>

      <div className="charts">
        {/* Adoption rate over time */}
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
        {/* Pets categories */}
        <div className="chart-container">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      <div className="cards">
        <div className="custom-card">
          <div className="custom-card-header">
            <PersonIcon className="custom-card-header-icon" />
            <h3>Pending Applications</h3>
          </div>
          <div className="custom-card-content">20</div>
        </div>

        <div className="custom-card">
          <div className="custom-card-header">
            <PersonAddIcon className="custom-card-header-icon" />
            <h3>Adoption Success Rate</h3>
          </div>
          <div className="custom-card-content">5</div>
        </div>

        {/* Display metrics like average session duration and pages per session. */}
        <div className="custom-card">
          <div className="custom-card-header">
            <TrendingUpIcon className="custom-card-header-icon" />
            <h3>User Engagement</h3>
          </div>
          <div className="custom-card-content">10</div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
