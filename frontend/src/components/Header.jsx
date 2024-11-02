import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Fab, Avatar, Menu, MenuItem } from "@material-ui/core";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="header">
      <Link to={"/"}>
        <img src={"/logo.png"} className="App-logo" alt="logo" />
      </Link>

      <Tooltip title="Profile" placement="start">
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
      </Tooltip>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Profile View</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
