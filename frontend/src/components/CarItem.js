import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const CarItem = ({ car }) => {
  const navigate = useNavigate(); 
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/cars/${car._id}`);
      window.location.reload(); 
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  const handleEdit = () => {
     navigate(`/edit-car/${car._id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={`data:image/jpeg;base64,${car.images?.[0]}`} 
          alt={car.title}
        />
        <CardContent>
          <Typography variant="h6">{car.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {car.description}
          </Typography>
        </CardContent>
        <Box display="flex" justifyContent="space-between" padding={1}>
          <Link to={`/car/${car._id}`}>
            <Button variant="outlined" color="primary">View Details</Button>
          </Link>
          <Button variant="outlined" color="secondary" onClick={handleEdit}>Edit</Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default CarItem;
