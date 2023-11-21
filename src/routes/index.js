const express = require('express');
const genreRouter = require('./genre.routes.js');
const actorRouter = require('./actor.routes.js');
const directorRouter = require('./director.routes.js');
const movieRouter = require('./movie.routes.js');
const router = express.Router();

// colocar las rutas aquí
router.use("/genres", genreRouter);
router.use("/actors", actorRouter);
router.use("/directors", directorRouter);
router.use("/movies", movieRouter);

module.exports = router;