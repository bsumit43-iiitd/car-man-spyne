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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill out both fields.");
      return;
    }

    try {
      
      if (email === "user@example.com" && password === "password123") {
        navigate("/dashboard"); 
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "100px" }}>
      <Typography variant="h5" gutterBottom>
        Login to Your Account
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleLogin}>
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

        <Box marginTop={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Login
          </Button>
        </Box>

        <Grid container justifyContent="flex-end" style={{ marginTop: "10px" }}>
          <Grid item>
            <Button
              onClick={() => navigate("/signup")}
              variant="text"
              color="primary"
            >
              Don't have an account? Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
