const Movie = require('./Movie.js');
const Actor = require('./Actor.js');
const Director = require('./Director.js');
const Genre = require('./Genre.js');

Movie.belongsToMany(Actor, { through: "MovieActors" });
Actor.belongsToMany(Movie, { through: "MovieActors" });

Movie.belongsToMany(Director, { through: "DirectorsMovie" });
Director.belongsToMany(Movie, { through: "DirectorsMovie" });

Movie.belongsToMany(Genre, { through: "GenresMovie" });
Genre.belongsToMany(Movie, { through: "GenresMovie" });