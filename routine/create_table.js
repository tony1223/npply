import knex from "../model/db.js"


(async function(){

  try {

    // Create a table
    await knex.schema
      .createTable('bills', table => {
        table.increments('id');
        table.string('term');
        table.string('sessionPeriod');
        table.string('sessionTimes');
        table.string('meetingTimes');
        table.string('billNo');
        table.unique('billNo');
        table.string('billName');
        table.string('billOrg');
        table.string('billProposer');
        table.string('billCosignatory');
        table.string('billStatus');
        table.string('pdfUrl');
        table.string('docUrl');
        table.string('selectTerm');
      });

      knex.destroy();

    // Finally, add a catch statement
  } catch(e) {
    console.error(e);
  };

})()