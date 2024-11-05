import React, { memo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const CustomDialog = ({ open, onClose, pet }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adopt {pet.name}</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to adopt {pet.name}?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            /* Handle adoption logic here */
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(CustomDialog);
