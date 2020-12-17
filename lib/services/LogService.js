const Log = require('../models/recipe.js');


module.exports = class LogService {
  static async start({ dateOfEvent, notes, rating, recipeId }) {
    const log = await Log.insert({
      dateOfEvent,
      notes,
      rating,
      recipeId
    });

    return log;
  }
  static async findAllLogs() {
    const logs = await Log.find();

    return logs;
  }

};
