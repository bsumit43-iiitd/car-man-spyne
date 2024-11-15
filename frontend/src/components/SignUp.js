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
import axios from "axios";
import { BASE_URL } from "../config"; // Make sure BASE_URL is defined correctly
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

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

    setLoading(true); // Set loading to true when the request starts

    try {
      // Making the POST request to your backend API to create a new user
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });

      // Assuming the response contains success status or user info
      if (response.data.success) {
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        setError(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the request completes
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
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
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
