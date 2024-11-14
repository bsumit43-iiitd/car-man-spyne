import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';

const AddCarForm = ({ onCarAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);

    images.forEach((image) => formData.append('images', image));

    try {
      const response = await axios.post('http://localhost:3002/api/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onCarAdded(response.data.payload);
      setTitle('');
      setDescription('');
      setTags('');
      setImages([]);
    } catch (err) {
      console.error('Error adding car:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Add New Car
      </Typography>

      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Car Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                label="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6} container justifyContent="center" alignItems="center">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  style={{
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                />
                {images.length > 0 && (
                  <Typography variant="body2" color="textSecondary">
                    {images.length} file(s) selected
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box marginTop={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" type="submit">
              Add Car
            </Button>
          </Box>
        </form>
      </Paper>

      <Box sx={{ paddingBottom: '50px' }} />
    </Container>
  );
};

export default AddCarForm;
