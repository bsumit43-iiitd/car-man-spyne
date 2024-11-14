import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, TextField, Box, InputAdornment } from '@mui/material';
import axios from 'axios';
import CarItem from './CarItem';
import AddCarForm from './AddCarForm';
import SearchIcon from '@mui/icons-material/Search';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/cars');
      setCars(response.data.payload);
      setFilteredCars(response.data.payload); 
    } catch (err) {
      console.error('Error fetching cars:', err);
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
