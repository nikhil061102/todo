import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StarIcon from "@mui/icons-material/Star";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Sort from "./Sort";
import { useModal } from "../context/ModalContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, useNavigate } from "react-router-dom";
import Allsetoftasks from "./Allsetoftasks";
const drawerWidth = 240;

const options = ["Title A to Z", "Created At", "Deadline"];
const pages = ["All Tasks", "Stared", "Urgent", "Complete", "Incomplete"];

function ResponsiveDrawer(props) {
  const { setOpenModal, setData } = useModal();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(0);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

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

  const drawer = (
    <div style={{ height: "100%" }}>
      <Toolbar>
        <Typography variant="h5">
          <b>Timely</b>
        </Typography>
      </Toolbar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "90%",
        }}
      >
        <List>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Avatar>{sessionStorage.getItem('name')[0]}</Avatar>
              </ListItemIcon>
              <ListItemText primary={sessionStorage.getItem('name')} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
        <List>
          <Divider />
          {[
            { title: "All Tasks", icon: <ChecklistIcon />, link: "/all"},
            { title: "Stared", icon: <StarIcon />, link: "/stared"},
            { title: "Urgent", icon: <PriorityHighIcon />, link: "/urgent"},
            { title: "Complete", icon: <DoneOutlineIcon />, link: "/complete"},
            { title: "Incomplete", icon: <AssignmentIcon />, link: "/incomplete"},
          ].map((item, index) => (
            <Link key={index} to={item.link} onClick={() => setPage(index)} style={{ textDecoration: 'none', color: 'gray' }}>
              <ListItem key={index}>
                <ListItemButton sx={{ '&:hover': { color: '#0096FF', textDecoration: 'underline' }, '&:active': { borderRight: "7.5px solid #0096FF" } }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <Divider />
        </List>
        <List>
          <Divider />
          <Link to='/logout' 
                    style={{ textDecoration: 'none', color: 'gray' }} 
                    onClick={async () => {
                      try {
                        const response = await fetch("/logout", {
                          method: "GET",
                          headers: { "Content-Type": "application/json" }
                        });
                        if (!response.ok) {
                          console.log(`{severity:'error', summary: 'Error !', detail:"Logout failed", life: 1000}`);
                        }
                        navigate("/");
                      } catch (error) {
                        console.error("Logout error:", error.message);
                      }
                    }}
              >
          <ListItem>
                <ListItemButton sx={{ '&:hover': { color: 'black' }, '&:active': { borderRight: "7.5px solid #0096FF" } }}>
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                  <ListItemText primary="LOG OUT" />
                </ListItemButton>
              </ListItem>
            </Link>
          <Divider />
        </List>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{display: "flex", alignItems: "center"}}>
            <IconButton
              color="inherit"
              aria-label="openModal drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {pages[page]}
            </Typography>
          </div>
          <span style={{display: "flex", alignItems: "baseline"}}>
            <span>
              <IconButton onClick={addNewTask}>
                <AddCircleIcon />
              </IconButton>
            </span>
            <Sort
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              options={options}
            />
            <Typography variant="subtitle2" gutterBottom>
              {options[selectedIndex]}
            </Typography>
          </span>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Allsetoftasks path={props.path} sort={selectedIndex} />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
