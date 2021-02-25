const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const mysql = require('mysql');

// // Get the Host from Environment or use default
// const host = process.env.DB_HOST
// // Get the Port from Environment or use default
// const port = process.env.PORT
// // Get the User for DB from Environment or use default
// const user = process.env.DB_USER
// // Get the Password for DB from Environment or use default
// const password = process.env.DB_PASS
// // Get the Database from Environment or use default
// const database = process.env.DB_DATABASE
// // Create the connection with required details
// const con = mysql.createConnection({
//   host, user, password, database,
// });

// const query = "SELECT * FROM techno";
// // make to connection to the database.
// con.connect(function(err) {
//   if (err) throw err;

//   // if connection is successful
//   con.query(query, (err, result, fields) => {
//     // if any error while executing above query, throw error
//     if (err) throw err;

//     // if there is no error, you have the result
//     console.log(result);
//  });
// });

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Coding-Challenge application." });
});

require("./app/routes/techno.routes.js")(app);

const PORT = process.env.PORT || 3000;
// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});