const settings = require("./settings");
const moment   = require("moment");

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const query = knex.select('*').from('famous_people')
.where('first_name', '=', `${process.argv[2]}`)
.orWhere('last_name', '=', `${process.argv[2]}`)


//console.log(query.toString())

query.asCallback(function(err, rows) {
  if (err) return console.error(err);
  console.log(`Found ${rows.length} person(s) by the name '${process.argv[2]}':`);
  makePretty(rows);
  knex.destroy();
});



function makePretty(result){
  let listNum = 0;
  for (let i in result){
    listNum++;
    let current    = result[i];
    let dateString = current.birthdate;
    dateString     = new Date(dateString).toUTCString();
    dateString     = dateString.split(' ').slice(0, 4).join(' ');
    console.log(`- ${listNum}: ${current.first_name} ${current.last_name}, born ${dateString}` )
  }
}