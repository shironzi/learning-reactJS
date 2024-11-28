import React, { memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import { useDispatch } from "react-redux";

import { logout } from "../apis/auth";
import { logout as logoutAction } from "../reducers/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem("token") || false;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleProfile = useCallback(() => {
    navigate("/profile");
    handleClose();
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    const response = await logout();
    if (response.ok) {
      dispatch(logoutAction());
      handleClose();
      navigate("/auth/login");
    } else {
      console.log("Failed to logout", response.message);
    }
  }, [dispatch, navigate]);

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
      <div>
        {isAuthenticated ? (
          <div className="header-button-container">
            <Link className="header-favorites" to="/adoption-request">
              <h4>Adoption Request</h4>
            </Link>
            <Link className="header-favorites" to="/favorites">
              <h4>Favorites</h4>
            </Link>
            <Fab
              className="floating-button"
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              size="small"
            >
              <Avatar sx={{ width: 40, height: 40 }} />
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
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
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
      </div>
    </header>
  );
};

export default memo(Header);
