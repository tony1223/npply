var knex = require("../model/db.js");

(async function(){

  try {

    // Create a table
    await knex.schema.dropTableIfExists("votes");
    await knex.schema
      .createTable('votes', table => {
      table.increments('id');
      table.string('voteid');
      table.unique('voteid');
      table.string('term');
      table.string('meet_id');
      table.string('date');
      table.string('line_no');
      table.string('yeslist');
      table.string('nolist');
      table.string('giveuplist');
      table.string('votedetail');
      //extra
      table.string('docUrl');
      table.string('title')
      table.string('meet_term');
      table.string('sessionPeriod');
      table.string('meet_date');
    });

      knex.destroy();

    // Finally, add a catch statement
  } catch(e) {
    console.error(e);
  };

})()