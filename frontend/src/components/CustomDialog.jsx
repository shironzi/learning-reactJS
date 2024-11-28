import React, { memo, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { requestAdoptPet } from "../apis/pets";

const CustomDialog = ({ open, onClose, pet, warningAlert }) => {
  const handleRequestAdoptPet = useCallback(async () => {
    try {
      await requestAdoptPet(pet._id);
      onClose();
    } catch (error) {
      warningAlert(true);
      onClose();
    }
  }, [onClose, pet._id, warningAlert]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adopt {pet.name}</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to adopt {pet.name}?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleRequestAdoptPet}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(CustomDialog);
