var knex = require("../model/db.js");

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
        table.string('rawDocContent');
        table.string('jsonDocContent');
        table.string('selectTerm');
      });

      await knex.schema
        .createTable('questions', table => {
        table.increments('id');
        table.string('questionid');
        table.unique('questionid');
        table.string('term');
        table.string('sessionPeriod');
        table.string('meetingDate');
        table.string('meetingTime');
        table.string('meetingTypeName');
        table.string('meetingName');
        table.string('meetingContent');
        table.string('legislatorName');
        table.string('areaName');
        table.string('transcript')
        table.string('speechStartTime');
        table.string('speechEndTime');
        table.string('speechRecordUrl');
        table.string('videoLength');
        table.string('videoUrl');
        table.string('selectTerm');
      });

      knex.destroy();

    // Finally, add a catch statement
  } catch(e) {
    console.error(e);
  };

})()