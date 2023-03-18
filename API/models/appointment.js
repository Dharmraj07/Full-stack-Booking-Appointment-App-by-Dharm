const Sequelize = require("sequelize");

const sequelize = new Sequelize("tree", "root", "#@Dharm007", {
  host: "localhost",
  dialect: "mysql",
});

const Appointment = sequelize.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Define a function to handle errors
function handleError(error) {
  console.error("Error: ", error);
}
sequelize.sync();

module.exports = Appointment;
