const express = require("express");
const { catchErrors } = require("../utils/custom-helpers");
const multer = require("multer");

const Router = express.Router({ caseSensitive: true });
const Car = require("../controller/carController");
const car = new Car();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add Swagger Documentation for the POST route
/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Add a new car
 *     description: Add a new car along with images to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: title
 *         in: formData
 *         description: Title of the car
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         description: Description of the car
 *         required: true
 *         type: string
 *       - name: tags
 *         in: formData
 *         description: Tags associated with the car (Array of strings)
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *       - name: images
 *         in: formData
 *         description: Images of the car (Array of files)
 *         required: true
 *         type: array
 *         items:
 *           type: file
 *     responses:
 *       200:
 *         description: Car added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "true"
 *                 message:
 *                   type: string
 *                   example: "Car Details Added Successfully."
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The car's unique identifier
 *                     title:
 *                       type: string
 *                       description: The car's title
 */
Router.post(
  "/",
  upload.array("images", 10),
  catchErrors(async (req, res) => {
    const { title, description, tags } = req.body;
    const images = req.files.map(file => file.buffer); 

    const result = await car.addCar({ title, description, tags, images });
    res.status(200).send({
      success: "true",
      message: "Car Details Added Successfully.",
      payload: result,
    });
  })
);


// Add Swagger Documentation for the GET route (All Cars)
/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get a list of cars
 *     description: Retrieve a list of all cars in the system.
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The car's unique identifier
 *                   name:
 *                     type: string
 *                     description: The name of the car
 *                   model:
 *                     type: string
 *                     description: The model of the car
 */
Router.get(
  "/",
  catchErrors(async (req, res) => {
    const result = await car.getCars();
    res.status(200).send({
      success: "true",
      message: "Cars Fetched Successfully.",
      payload: result,
    });
  })
);


// Add Swagger Documentation for the GET route (Single Car by ID)
/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     description: Retrieve a car's details by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the car to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The car object
 *       404:
 *         description: Car not found
 */
Router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const result = await car.getCarById(req.params.id);
    res.status(200).send({
      success: "true",
      message: "Car Details Fetched Successfully.",
      payload: result,
    });
  })
);



// Add Swagger Documentation for the PUT route (Update Car)
/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update car details by ID
 *     description: Update the details of a car by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the car to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: title
 *         in: formData
 *         description: Title of the car
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         description: Description of the car
 *         required: true
 *         type: string
 *       - name: tags
 *         in: formData
 *         description: Tags associated with the car (Array of strings)
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *       - name: images
 *         in: formData
 *         description: Updated images of the car (Array of files)
 *         type: array
 *         items:
 *           type: file
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "true"
 *                 message:
 *                   type: string
 *                   example: "Car Details Updated Successfully."
 *                 payload:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The car's unique identifier
 */
Router.put(
  "/:id",
  upload.array("images", 10),
  catchErrors(async (req, res) => {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map(file => file.buffer) : undefined;

    const result = await car.updateCarById(req.params.id, { title, description, tags, images });
    res.status(200).send({
      success: "true",
      message: "Car Details Updated Successfully.",
      payload: result,
    });
  })
);


// Add Swagger Documentation for the DELETE route (Delete Car)
/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     description: Delete a car's details by its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the car to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "true"
 *                 message:
 *                   type: string
 *                   example: "Car Deleted Successfully."
 */
Router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const result = await car.deleteCarById(req.params.id);
    res.status(200).send({
      success: "true",
      message: "Car Deleted Successfully.",
      payload: result,
    });
  })
);

module.exports = Router;
