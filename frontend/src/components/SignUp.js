import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
} from "@mui/material";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      if (email === "user@example.com") {
        setError("Email already exists.");
      } else {
        navigate("/login"); 
    }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "100px" }}>
      <Typography variant="h5" gutterBottom>
        Create an Account
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSignup}>
        <TextField
          label="Full Name"
          fullWidth
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Box marginTop={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Sign Up
          </Button>
        </Box>

        <Grid container justifyContent="flex-end" style={{ marginTop: "10px" }}>
          <Grid item>
            <Button
              onClick={() => navigate("/login")}
              variant="text"
              color="primary"
            >
              Already have an account? Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Signup;
