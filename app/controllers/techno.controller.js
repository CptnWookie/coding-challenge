const Techno = require("../models/techno.model.js");
const sql = require("../models/db.js");

// Find a single Techno with a technoId
exports.findOne = (req, res) => {
    Techno.findById(req.params.technoId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Techno with id ${req.params.technoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Techno with id " + req.params.technoId
          });
        }
      } else res.send(data);
    });
  };

// Retrieve all Technos from the database.
exports.findAll = (req, res) => {
    // Techno.getAll((err, data) => {
    //   if (err)
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving technos."
    //     });
    //   else res.send(data);
    // });

    var querybuzzwords = req.query.x;
    var wordArray = querybuzzwords.split(",");
    var ninjaArray = new Array();

    for (i=0; i<wordArray.length; i++){
     // QUERY DB POUR CHAQUE VALEUR wordArray[i]
     var result = getByBuzzFunc(wordArray[i]);
     //console.log(result);

    }

    res.status(200).send({
              message: "Value: " + querybuzzwords
            });
  };
  function getByBuzzFunc(providedBuzz) {
     var test = sql.query(`SELECT ninja FROM techno WHERE buzz = "${providedBuzz}"`, function (err, result, fields) {
      if (err) throw err;
      console.log(result[0].ninja);
      return result[0].ninja
    });
    console.log(test)

  }
