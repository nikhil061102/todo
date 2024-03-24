import React, { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useConfirm } from "../context/ConfirmContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirm(props) {
  const { openConfirmSave, setOpenConfirmSave, openConfirmDelete, setOpenConfirmDelete }  = useConfirm();

  return (
    <Dialog
      open={props.id?openConfirmDelete:openConfirmSave}
      TransitionComponent={Transition}
      keepMounted
      onClose={!(props.id)?(() => setOpenConfirmSave(false)):(() => setOpenConfirmDelete(false))}
    >
      <DialogTitle>{"Proceed further ?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to proceed further ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={!(props.id)?(() => setOpenConfirmSave(false)):(() => setOpenConfirmDelete(false))}>Disagree</Button>
        <Button onClick={() => {
          if (props.id) {
            props.func(props.id);
            setOpenConfirmDelete(false);
          } else if (props.funcData) {
            props.func(props.funcData);
            setOpenConfirmSave(false);
          }
        }}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}
