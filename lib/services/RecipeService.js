const Recipe = require('../models/recipe.js');


module.exports = class RecipeService {
  static async start({ name, directions }) {
    const recipe = await Recipe.insert({
      name, 
      directions
    });

    return recipe;
  }
  static async findAllRecipes() {
    const recipes = await Recipe.find()

    return recipes;
  }

};
