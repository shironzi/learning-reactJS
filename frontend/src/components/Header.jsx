import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";

import { logout } from "../services/userApiService";

const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.ok) {
      navigate("/auth/login");
      setIsAuthenticated(false);
    } else {
      console.log("Failed to logout", response.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <header className="header-container">
      <Link to={"/"}>
        <img src={"/logo.png"} className="header-logo" alt="logo" />
      </Link>
      {isAuthenticated ? (
        <>
          <Fab
            className="floating-button"
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            size="small"
          >
            <Avatar sx={{ width: 42, height: 42 }} />
          </Fab>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <div className="auth-Link-Container">
            <Link to={"/auth/login"} className="auth-Link">
              Login
            </Link>
            <Link to={"/auth/register"} className="auth-Link">
              Register
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
