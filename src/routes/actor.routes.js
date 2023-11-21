const express = require('express');
const { getAll, create, getOne, remove, update } = require('../controllers/actor.controllers.js');
const actorRouter = express.Router();

actorRouter.route("/")
  .get(getAll)
  .post(create);

actorRouter.route("/:id")
  .get(getOne)
  .delete(remove)
  .put(update);  

module.exports = actorRouter;