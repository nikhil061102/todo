import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FaceIcon from "@mui/icons-material/Face";
import LockIcon from "@mui/icons-material/Lock";
import Login from "../components/Login"; 
import Signup from "../components/Signup"; 

export default function AuthPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh"
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ color: 'primary.main' }}><b>Timely</b></Typography>
      <Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" icon={<LockIcon />} />
          <Tab label="SignUp" icon={<FaceIcon />} />
        </Tabs>
      </Box>
      {value === 0 && <Login />} 
      {value === 1 && <Signup />}
    </Box>
  );
}
