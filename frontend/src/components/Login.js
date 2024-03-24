import React, { useState } from "react";
import { TextField, Button, InputAdornment, IconButton, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.err) {
        setError(`Error! ${data.err}`);
      }
      if (data.errors) {
        setError(data.errors[0].msg);
      }
      if (data.email) {
        setSuccess(`Logged In! Welcome back, ${data.name}`);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("email", data.email);
        setTimeout(() => {
          window.location.assign("/all");
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit} style={{ width: "45vh" }}>
        <TextField
          label="Email"
          type="email"
          variant="standard"
          fullWidth
          required
          margin="dense"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="standard"
          fullWidth
          required
          margin="dense"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<LoginIcon />}
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </>
  );
}
