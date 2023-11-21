const catchError = require('../utils/catchError.js');
const Genre = require('../models/Genre.js');

const getAll = catchError(async(req, res) => {
  const genre = await Genre.findAll();
  return res.status(200).json(genre);
});

const create = catchError(async(req, res) => {
  const genre = await Genre.create(req.body);
  return res.status(201).json(genre);
});

const getOne = catchError(async(req, res) => {
  const { id } = req.params;
  const genre = await Genre.findByPk(id);
  return res.status(200).json(genre);
});

const remove = catchError(async(req, res) => {
  const { id } = req.params;
  const genre = await Genre.destroy({ where: { id } });
  return res.status(204).json(genre);
});

const update = catchError(async(req, res) => {
  const { id } = req.params;
  const genre = await Genre.update(
    req.body,
    { where: { id }, returning: true }
  );
  if(genre[0] === 0) return res.sendStatus(404);
  return res.status(200).json(genre[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}