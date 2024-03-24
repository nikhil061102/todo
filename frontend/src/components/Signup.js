import React, { useState } from "react";
import { TextField, Button, InputAdornment, IconButton, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Password and confirm password must match!");
    } else {
      try {
        const res = await fetch("/user/signup", {
          method: "POST",
          body: JSON.stringify({ name, email, password, confirmPassword }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.err) {
          setError(data.err);
        }
        if (data.errors) {
          setError(data.errors[0].msg);
        }
        if (data.email) {
          setSuccess(`Signed In! Welcome here, ${data.name}`);
          setTimeout(() => {
            window.location.assign("/all");
          }, 500);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit} style={{width: '45vh'}}>
        <TextField
          label="Name"
          variant="standard"
          fullWidth
          required
          margin="dense"
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          variant="standard"
          fullWidth
          required
          margin="dense"
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          Signup
        </Button>
      </form>
    </>
  );
}
