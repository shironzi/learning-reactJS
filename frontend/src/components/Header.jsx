import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../services/userApiService";
import { logout as logoutAction } from "../reducers/userReducer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [anchorEl, setAnchorEl] = useState(null);

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
      dispatch(logoutAction());
      handleClose();
      navigate("/auth/login");
    } else {
      console.log("Failed to logout", response.message);
    }
  };

  return (
    <header className="header-container">
      <Link to={"/"}>
        <img
          src={"/logo.png"}
          className="header-logo"
          alt="logo"
          loading="lazy"
        />
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

export default memo(Header);
