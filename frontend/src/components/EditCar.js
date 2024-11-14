import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCar = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/cars/${id}`);
      setCar(response.data.payload);
    } catch (err) {
      console.error("Error fetching car details:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", car.title);
      formData.append("description", car.description);
      formData.append("tags", car.tags);
      images.forEach((image) => formData.append("images", image));

      await axios.put(`http://localhost:3002/api/cars/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/car/${id}`); 
    } catch (err) {
      console.error("Error updating car:", err);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Car
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Car Title"
          value={car.title}
          onChange={(e) => setCar({ ...car, title: e.target.value })}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Description"
          value={car.description}
          onChange={(e) => setCar({ ...car, description: e.target.value })}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />

        <TextField
          label="Tags"
          value={car.tags}
          onChange={(e) => setCar({ ...car, tags: e.target.value })}
          fullWidth
          margin="normal"
        />

        <Box marginTop={2}>
          <Typography variant="h6">Update Images</Typography>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            style={{ marginTop: "10px" }}
          />
          {images.length > 0 && (
            <Typography variant="body2" color="textSecondary" marginTop={1}>
              {images.length} images selected
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditCar;
