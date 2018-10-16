
const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name = '${process.argv[2]}' OR last_name = '${process.argv[2]}' `, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    console.log(`Found ${result.rows.length} person(s) by the name '${process.argv[2]}':`); //output: 1
    makePretty(result.rows)
    client.end();
  });
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