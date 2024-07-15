const { Datatype, DataTypes  } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("user", {
  username: {
    type: Datatype.STRING,
    allowNull: false,
  },
  email: {
    type: Datatype.STRING,
    allowNull: false,
  },
  password: {
    type: Datatype.STRING,
    allowNull: false,
  },
});

module.exports = User;
