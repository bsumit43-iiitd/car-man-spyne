import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, TextField, Box, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../config";
import CarItem from './CarItem';
import AddCarForm from './AddCarForm';
import SearchIcon from '@mui/icons-material/Search';

const CarList = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCars = async () => {
     // Initialize navigate function
  
    try {
      // Retrieve the token from localStorage (or wherever it's stored)
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate('/login'); // Redirect to the login page
        return;
      }
  
      // Make the GET request with the Authorization header
      const response = await axios.get(`${BASE_URL}/api/cars`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
  
      setCars(response.data.payload);
      setFilteredCars(response.data.payload); 
    } catch (err) {
      console.error('Error fetching cars:', err);
      // If the error is related to authentication, redirect to login
      if (err.response && err.response.status === 401) {
        console.error("Unauthorized. Redirecting to login.");
        navigate('/login');
      }
    }
  };
  

  const handleCarAdded = (newCar) => {
    setCars([...cars, newCar]);
    setFilteredCars([...cars, newCar]); 
    setShowAddCarForm(false);
  };

  const toggleAddCarForm = () => {
    setShowAddCarForm(!showAddCarForm);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      if(car)
      return (
        car.title?.toLowerCase().includes(searchQuery) ||
        car.description?.toLowerCase().includes(searchQuery) 
      );
    });
    setFilteredCars(filtered);
  }, [searchQuery, cars]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Car List
      </Typography>

      <TextField
        label="Search Cars"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        sx={{ marginBottom: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={toggleAddCarForm} sx={{ marginBottom: 2 }}>
          {showAddCarForm ? 'Cancel' : 'Add New Car'}
        </Button>
      </Box>

      {showAddCarForm && <AddCarForm onCarAdded={handleCarAdded} />}

      <Grid container spacing={3}>
        {filteredCars.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: '100%', marginTop: 2 }}>
            No cars found
          </Typography>
        ) : (
          filteredCars.map((car) => (
            <CarItem key={car._id} car={car} />
          ))
        )}
      </Grid>
    </Container>
  );
};

export default CarList;
