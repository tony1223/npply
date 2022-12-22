var knexDB = require('knex');

const knex = knexDB({
    client: 'sqlite3',
    connection: {
      filename: './data.db',
    },
  });


  module.exports = knex ;