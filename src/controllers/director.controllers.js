const catchError = require('../utils/catchError.js');
const Director = require('../models/Director.js');

const getAll = catchError(async(req, res) => {
  const director = await Director.findAll();
  return res.status(200).json(director);
});

const create = catchError(async(req, res) => {
  const director = await Director.create(req.body);
  return res.status(201).json(director);
});

const getOne = catchError(async(req, res) => {
  const { id } = req.params;
  const director = await Director.findByPk(id);
  return res.status(200).json(director);
});

const remove = catchError(async(req, res) => {
  const { id } = req.params;
  const director = await Director.destroy({ where: { id } });
  return res.status(204).json(director);
});

const update = catchError(async(req, res) => {
  const { id } = req.params;
  const director = await Director.update(
    req.body,
    { where: {id}, returning: true }
  );
  if(director[0] === 0) return res.sendStatus(404);
  return res.status(200).json(director[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}