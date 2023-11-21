const catchError = require('../utils/catchError.js');
const Movie = require('../models/Movie.js');
const Genre = require('../models/Genre.js');
const Director = require('../models/Director.js');
const Actor = require('../models/Actor.js');

const getAll = catchError(async(req, res) => {
  const movie = await Movie.findAll({ include: [Genre, Director, Actor] });
  return res.status(200).json(movie)
});

const create = catchError(async(req, res) => {
  const movie = await Movie.create(req.body);
  return res.status(201).json(movie);
});

const getOne = catchError(async(req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  return res.status(200).json(movie);
});

const remove = catchError(async(req, res) => {
  const { id } = req.params;
  const movie = await Movie.destroy({ where: { id } });
  return res.status(204).json(movie);
});

const update = catchError(async(req, res) => {
  const { id } = req.params;
  const movie = await Movie.update(
    req.body,
    { where: { id }, returning: true }
  );
  if(movie[0] === 0) return res.sendStatus(404);
  return res.status(200).json(movie[1][0]);
});

const setMovieGenres = catchError(async(req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if(!movie) return res.sendStatus(404);
  await movie.setGenres(req.body);
  const genre = await movie.getGenres();
  return res.status(200).json(genre);
});

const setMovieActors = catchError(async(req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if(!movie) return res.sendStatus(404);
  await movie.setActors(req.body);
  const actor = await movie.getActors();
  return res.status(200).json(actor);
});

const setMovieDirectors = catchError(async(req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if(!movie) return res.sendStatus(404);
  await movie.setDirectors(req.body);
  const director = await movie.getDirectors();
  return res.status(200).json(director);
});


module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieGenres,
  setMovieActors,
  setMovieDirectors
}