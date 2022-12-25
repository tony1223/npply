var knex = require("../model/db.js");

(async function(){

  try {

    // Create a table
    await knex.schema
      .alterTable('bills', table => {
        table.string('rawDocContent');
        table.string('jsonDocContent');
      });

      knex.destroy();

    // Finally, add a catch statement
  } catch(e) {
    console.error(e);
  };

})()