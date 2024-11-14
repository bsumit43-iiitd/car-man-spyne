import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const CarDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/cars/${id}`);
      setCar(response.data.payload);
    } catch (err) {
      console.error("Error fetching car details:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/cars/${id}`);
      navigate("/"); 
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-car/${id}`); 
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <Container>
<br/>
      <Card
        variant="outlined"
        style={{
          marginBottom: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom style={{ fontWeight: "bold" }}>
            {car.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {car.description}
          </Typography>

          <Box marginBottom={2}>
            {(Array.isArray(car.tags) ? car.tags : car.tags?.split(",")).map(
              (tag, index) => (
                <Chip
                  key={index}
                  label={tag.trim()}
                  style={{
                    marginRight: "5px",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                />
              )
            )}
          </Box>
        </CardContent>
      </Card>

      <Box marginBottom={3}>
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          autoPlay
          dynamicHeight={false}
          emulateTouch
          useKeyboardArrows
          stopOnHover
          swipeable
          transitionTime={500}
        >
          {car.images.map((image, index) => (
            <div key={index}>
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt={`Car Image ${index + 1}`}
                style={{
                  width: "100%",
                  maxHeight: "400px", 
                  objectFit: "contain", 
                  borderRadius: "10px", 
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          ))}
        </Carousel>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleDelete}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        Delete Car
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleEdit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          marginLeft: "10px",
        }}
      >
        Edit Car
      </Button>
      <br/>
      <br/>
      <br/>
    </Container>
  );
};

export default CarDetail;
