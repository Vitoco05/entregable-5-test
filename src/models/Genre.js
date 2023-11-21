const sequelize = require('../utils/connection.js');
const { DataTypes } = require('sequelize');

const Genre = sequelize.define('genre', {

  name: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
});

module.exports = Genre;