const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/appointments", appointmentRoutes);

app.listen(port, () => {
  console.log(`Appointment booking API listening at http://localhost:${port}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const Sequelize = require('sequelize');
// const cors = require('cors');

// // Create a Sequelize instance
// const sequelize = new Sequelize('book18am', 'root', '#@Dharm007', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// // Define the Appointment model
// const Appointment = sequelize.define('appointment', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   phone: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// // Sync the model with the database
// sequelize.sync();

// const app = express();
// const port = 3000;

// // Use body-parser middleware to parse request bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Enable CORS for all origins
// app.use(cors());

// // Add a new appointment to the database
// app.post('/appointments', (req, res) => {
//   const { name, email, phone } = req.body;

//   Appointment.create({ name, email, phone }).then(() => {
//     res.status(201).send('Appointment added successfully!');
//   }).catch(error => {
//     res.status(400).send(`Error: ${error.message}`);
//   });
// });

// // Show all appointments in the database
// app.get('/appointments', (req, res) => {
//   Appointment.findAll().then(appointments => {
//     res.send(appointments);
//   });
// });

// // Get an appointment by ID
// app.get('/appointments/:id', (req, res) => {
//   const { id } = req.params;

//   Appointment.findOne({ where: { id } }).then(appointment => {
//     if (appointment) {
//       res.send(appointment);
//     } else {
//       res.status(404).send(`Appointment with ID ${id} not found.`);
//     }
//   }).catch(error => {
//     res.status(400).send(`Error: ${error.message}`);
//   });
// });

// // Update an appointment in the database
// app.put('/appointments/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, email, phone } = req.body;

//   Appointment.update({ name, email, phone }, { where: { id } }).then(() => {
//     res.status(200).send('Appointment updated successfully!');
//   }).catch(error => {
//     res.status(400).send(`Error: ${error.message}`);
//   });
// });

// // Delete an appointment from the database
// app.delete('/appointments/:id', (req, res) => {
//   const { id } = req.params;

//   Appointment.destroy({ where: { id } }).then(() => {
//     res.status(204).send('Appointment deleted successfully!');
//   }).catch(error => {
//     res.status(400).send(`Error: ${error.message}`);
//   });
// });

// app.listen(port, () => {
//   console.log(`Appointment booking API listening at http://localhost:${port}`);
// });
