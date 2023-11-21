const sequelize = require('../utils/connection.js');
const { DataTypes } = require('sequelize');

const Movie = sequelize.define('movie', {

  name: {
    type:  DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

});

module.exports = Movie;