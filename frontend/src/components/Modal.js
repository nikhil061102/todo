import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Checkbox, FormControlLabel, Switch } from "@mui/material";
import { TextField } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import dayjs from "dayjs";
import { useModal } from '../context/ModalContext';
import { useListTasks } from "../context/ListTasksContext";
import { useConfirm } from "../context/ConfirmContext";
import Confirm from "./Confirm";

export default function Modal() {
  const { openModal, setOpenModal, data, setData } = useModal();
  const { openConfirmSave, setOpenConfirmSave }  = useConfirm();
  const { tasks, setTasks } = useListTasks();

  const handleTitleChange = (event) => {
    setData({ ...data, title: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setData({ ...data, desc: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setData({
      ...data,
      isDateTimePickerEnabled: event.target.checked,
      deadline: event.target.checked ? dayjs(data.deadline) : undefined,
    });
  };

  const handleDeadlineChange = (date) => {
    setData({ ...data, deadline: dayjs(date) });
  };

  const toggleStarClick = () => {
    setData({ ...data, isStarred: !data.isStarred });
  };

  const saveApiCall = async (data)=>{
    if (!data._id) {
      if(openConfirmSave){
        setTasks([...tasks, data]);
        try {
          const response = await fetch(`/todo/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          console.log('There was a problem with the post operation:', error);
        }
      }
      } else {
        if(openConfirmSave){
          const index = tasks.findIndex((task) => task._id === data._id);
          tasks[index] = data;
          setTasks([...tasks]);
          try {
            const response = await fetch(`/todo/${data._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          } catch (error) {
            console.error('There was a problem with the put operation:', error);
          }
        }
      }
  }

  const handleSaveChanges = async (_id) => {
    setOpenModal(false);  
    if (!(data.title.trim() === "")) {
      setOpenConfirmSave(true);
    }
  };

  return (
    <>
      <Dialog open={openModal}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {!data._id ? "Add Task" :"Edit Task"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenModal(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TextField
            required
            label="Title"
            value={data.title}
            onChange={handleTitleChange}
            sx={{ width: "100%", marginBottom: "15px" }}
          />
          <TextField
            label="Description"
            value={data.desc}
            onChange={handleDescriptionChange}
            sx={{ width: "100%", marginBottom: "15px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={data.isDateTimePickerEnabled}
                  onChange={handleCheckboxChange}
                />
              }
              label="Set a Deadline"
            />

            {data.isDateTimePickerEnabled && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={dayjs(data.deadline) || dayjs().add(2, 'hour')} 
                  onChange={handleDeadlineChange}
                />
              </LocalizationProvider>
            )}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                onChange={toggleStarClick}
                icon={<StarIcon />}
                checkedIcon={<StarIcon />}
                checked={data.isStarred}
              />
            }
            label="Star it if important"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{handleSaveChanges(data._id)}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {openConfirmSave && <Confirm func={saveApiCall} funcData={data} />}
      </>
  );
}