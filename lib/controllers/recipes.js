

const { Router } = require('express');
const Recipe = require('../models/recipe');
const RecipeService = require('../services/RecipeService');

module.exports = Router()
  .post('/', (req, res, next) => {
    RecipeService
      .start(req.body)
      .then(recipe => res.send(recipe))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Recipe
      .findById(req.params.id)
      .then(recipe => res.send(recipe))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    RecipeService
      .findAllRecipes()
      .then(recipes => res.send(recipes))
      .catch(next);
  })
  

  
  .put('/:id', (req, res, next) => {
    Recipe
      .update(req.params.id, req.body)
      .then(recipe => res.send(recipe))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Recipe
      .delete(req.params.id)
      .then(recipe => res.send(recipe))
      .catch(next);
  });
  

