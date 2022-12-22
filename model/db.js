import knexDB from 'knex'
const knex = knexDB({
    client: 'sqlite3',
    connection: {
      filename: './data.db',
    },
  });


  export  default knex ;