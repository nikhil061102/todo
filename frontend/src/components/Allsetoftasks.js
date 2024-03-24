import React, { useEffect, useState } from "react";
import Task from "./Task";
import { Box, Paper } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useModal } from "../context/ModalContext";
import IconButton from "@mui/material/IconButton";
import { useListTasks } from "../context/ListTasksContext";

const Allsetoftasks = (props) => {
  const { setOpenModal, setData } = useModal();
  const { tasks, setTasks } = useListTasks();
  const [filteredSortedTasks, setFilteredSortedTasks] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/todo/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'},
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTasks(data.todo);
        setFilteredSortedTasks(data.todo);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    return fetchData; 
  }, [setTasks]); 
  
  useEffect(() => {
    if (props.path === 'all') {
      setFilteredSortedTasks(tasks);
    } else if (props.path === 'star') {
      setFilteredSortedTasks(tasks.filter((task) => task.isStarred));
    } else if (props.path === 'urgent') {
      setFilteredSortedTasks(tasks.filter((task) => task.deadline !== undefined));
    } else if (props.path === 'complete') {
      setFilteredSortedTasks(tasks.filter((task) => task.isCompleted));
    } else if (props.path === 'incomplete') {
      setFilteredSortedTasks(tasks.filter((task) => !task.isCompleted));
    }

    if (props.sort === 0) {
      setFilteredSortedTasks(prevfilteredSortedTasks => prevfilteredSortedTasks.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())));
    } else if (props.sort === 1) {
      setFilteredSortedTasks(prevfilteredSortedTasks => prevfilteredSortedTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    } else if (props.sort === 2) {
      setFilteredSortedTasks(prevfilteredSortedTasks => prevfilteredSortedTasks.sort((a, b) => {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      }));
    }    
    return ;
  }, [props.path, props.sort, tasks]);

  const addNewTask = () => {
    setOpenModal(true);
    setData({
      title: "",
      desc: "",
      isCompleted: false,
      isDateTimePickerEnabled: false,
      deadline: undefined,
      isStarred: false,
    });
  };

  return (
    <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "10px",
          width: "300px",
          height: "300px",
          border: "2px dashed grey",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <IconButton onClick={addNewTask} sx={{ "&:hover": { color: "gray" } }}>
          <AddCircleOutlineIcon
            sx={{
              width: "260px",
              height: "260px",
            }}
          />
        </IconButton>
      </Paper>
      {filteredSortedTasks.map((task, index) => (
        <Task
          key={index}
          title={task.title}
          desc={task.desc}
          deadline={task.deadline}
          isDateTimePickerEnabled={task.isDateTimePickerEnabled}
          isCompleted={task.isCompleted}
          isStarred={task.isStarred}
          _id={task._id}
        />
      ))}
    </Box>
    </>
  );
};

export default Allsetoftasks;
