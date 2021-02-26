const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

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


const app = require("./server");
    app.listen(5000, () => {
      console.log("Server has started!");
    });