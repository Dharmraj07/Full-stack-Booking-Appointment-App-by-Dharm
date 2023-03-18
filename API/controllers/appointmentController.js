const Appointment = require("../models/appointment");

exports.createAppointment = (req, res) => {
  const { name, email, phone } = req.body;

  Appointment.create({ name, email, phone })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
};

exports.getAllAppointments = (req, res) => {
  Appointment.findAll().then((appointments) => {
    res.send(appointments);
  });
};

exports.getAppointmentById = (req, res) => {
  const { id } = req.params;

  Appointment.findOne({ where: { id } })
    .then((appointment) => {
      if (appointment) {
        res.send(appointment);
      } else {
        res.status(404).send(`Appointment with ID ${id} not found.`);
      }
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
};

exports.updateAppointment = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  Appointment.update({ name, email, phone }, { where: { id } })
    .then(() => {
      res.status(200).send("Appointment updated successfully!");
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
};

exports.deleteAppointment = (req, res) => {
  const { id } = req.params;

  Appointment.destroy({ where: { id } })
    .then((data) => {
      res.send("Appointment deleted successfully!");
    })
    .catch((error) => {
      res.status(400).send(`Error: ${error.message}`);
    });
};
