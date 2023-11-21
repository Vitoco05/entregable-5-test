const catchError = require('../utils/catchError.js');
const Actor = require('../models/Actor.js');

const getAll = catchError(async(req, res) => {
  const actor = await Actor.findAll();
  return res.status(200).json(actor);
});

const create = catchError(async(req, res) => {
  const actor = await Actor.create(req.body);
  return res.status(201).json(actor);
});

const getOne = catchError(async(req, res) => {
  const { id } = req.params;
  const actor = await Actor.findByPk(id);
  return res.status(200).json(actor);
});

const remove = catchError(async(req, res) => {
  const { id } = req.params;
  const actor = await Actor.destroy({ where: { id } });
  return res.status(204).json(actor);
});

const update = catchError(async(req, res) => {
  const { id } = req.params;
  const actor = await Actor.update(
    req.body,
    { where: {id}, returning: true }
  );
  if(actor[0] === 0) return res.sendStatus(404);
  return res.status(200).json(actor[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}