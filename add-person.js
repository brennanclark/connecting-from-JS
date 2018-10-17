const settings = require("./settings");


const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port
    //ssl      : settings.ssl
  }
});

knex("famous_people")
  .insert({
    first_name: `${process.argv[2]}`,
    last_name:  `${process.argv[3]}`,
    birthdate:  `${process.argv[4]}`
  })
  .returning('id')
  .then((id)=>{
    console.log("Record insertion was successful", id);

  });
