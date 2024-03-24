import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Checkbox, Chip, IconButton, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import StarIcon from "@mui/icons-material/Star";
import dayjs from "dayjs";
import { useModal } from "../context/ModalContext";
import { useListTasks } from "../context/ListTasksContext";
import { useConfirm } from "../context/ConfirmContext";
import Confirm from "./Confirm";

export default function Task(props) {
  const { openConfirmDelete, setOpenConfirmDelete } = useConfirm();
  const { setOpenModal, setData } = useModal();
  const { tasks, setTasks } = useListTasks();
  const [completed, setCompleted] = useState(props.isCompleted);
  const [stared, setStared] = useState(props.isStarred);

  const handleEditClick = async (_id) => { 
    setData({
      title: props.title,
      desc: props.desc,
      isCompleted: props.isCompleted,
      isDateTimePickerEnabled: props.isDateTimePickerEnabled,
      deadline: dayjs(props.deadline),
      isStarred: props.isStarred,
      _id: _id,
    });
    setOpenModal(true);
  }

  const deleteApiCall = async (_id) => {
    setTasks([...tasks.filter((task) => task._id !== _id)]);
    try {
      const response = await fetch(`/todo/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  const handleDeleteClick = () => {
    setOpenConfirmDelete(true);
  }
    
  const handleStarToggle = async (_id) => {
    try {
      const response = await fetch(`/todo/star/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setTasks([...tasks.map((task) => {
        if (task._id === _id) {
          task.isStarred = !task.isStarred;
        }
        return task;
      })
    ]);
    setStared(prevStared => !prevStared);
    
    } catch (error) {
      console.error('There was a problem with the star operation:', error);
    }
  };

  const handleCompleteToggle = async (_id) => {
    try {
      const response = await fetch(`/todo/comp/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setTasks([...tasks.map((task) => {
          if (task._id === _id) {
            task.isCompleted = !task.isCompleted;
          }
          return task;
        })
      ]);
      setCompleted(prevCompleted => !prevCompleted);
      console.log('Task star status updated successfully');
    } catch (error) {
      console.error('There was a problem with the star operation:', error);
    }
  };

  return (
    <>
    <Paper
      elevation={4}
      sx={{
        padding: "10px",
        width: "300px",
        height: "300px",
        border: "2px dashed grey",
        borderRadius: "15px",
        overflow: "hidden",
        '&:hover': {
          color: 'orange',
          boxShadow: '10px 10px 10px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
        }
      }}
    >
      <div
        style={{
          height: "23%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
          <b>{props.title}</b>
        </Typography>
      </div>
      <div
        style={{
          height: "55%",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 6,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          }}
        >
          <b>Description : </b> {props.desc}
        </Typography>
      </div>

      <Typography variant="subtitle2">
        <b>Deadline:</b> {props.deadline===undefined?"Not-defined":new Date(props.deadline).toLocaleString()}
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {completed === true ? (
          <Chip
            label="Complete"
            sx={{
              backgroundColor: "#26ab26",
              color: "white",
              cursor: "pointer",
            }}
          />
        ) : (
          <Chip
            label="Incomplete"
            sx={{
              backgroundColor: "#f2674b",
              color: "white",
              cursor: "pointer",
            }}
          />
        )}
        <span>
        <Checkbox icon={<StarIcon />} checkedIcon={<StarIcon sx={{ color: "#ffd700" }} />} onChange={()=>handleStarToggle(props._id)} checked={stared} />
        <Checkbox icon={<DoneAllIcon />} checkedIcon={<DoneAllIcon sx={{ color: "lightgreen" }} />} onChange={()=>handleCompleteToggle(props._id)} checked={completed} />
          <IconButton
            onClick={() => {
              handleEditClick(props._id);
            }}
            sx={{ "&:hover": { color: "#d45e0b" } }}
          >
            <EditNoteIcon />
          </IconButton>
          <IconButton
            onClick={()=>{
              handleDeleteClick();
            }}
            sx={{ "&:hover": { color: "red" } }}
          >
            <DeleteIcon />
          </IconButton>
        </span>
      </div>
    </Paper>
    {openConfirmDelete && <Confirm func={deleteApiCall} id={props._id} />}
    </>
  );
}
