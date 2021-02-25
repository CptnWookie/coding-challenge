const Validator = require('fastest-validator');
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
    var querybuzzwords = req.query.x;
    var wordArray = querybuzzwords.split(",");

    getNinjaWords(wordArray, function(ninjaString) {
      if (ninjaString != null  && ninjaString != ""){
        res.status(200).send({
          message: ninjaString
        });
      }
      else{
        res.status(404).send({
          message: "No match found."
        });
      }
   
    });

  };

  function getByBuzzFunc(providedBuzz, callback) {
     sql.query(`SELECT ninja FROM techno WHERE buzz in (${providedBuzz})`, function (err, result) {
      if (err) result = new Array();

      callback(result);
    });
  }

  function getNinjaWords(providedWordArray, callback) {
    var sqlConditionString = "";

    if (providedWordArray.length == 1){
      sqlConditionString = providedWordArray[0];
    }
    else{
      for (i=0; i<providedWordArray.length; i++){
        if (i < providedWordArray.length - 1){
          sqlConditionString = sqlConditionString + "'" + providedWordArray[i] + "'" + ",";
        }
        else {
          sqlConditionString = sqlConditionString + "'" + providedWordArray[i] + "'";
        }
      }
    }

    getByBuzzFunc(sqlConditionString, function(returnedNinjaArray) {
      var responseString = "";

      if (returnedNinjaArray.length == 1){
        responseString = returnedNinjaArray[0];
      }
      else{
        for (i=0; i<returnedNinjaArray.length; i++){
          if (i < returnedNinjaArray.length - 1){
            responseString = responseString + returnedNinjaArray[i].ninja + " ";
          }
          else{
            responseString = responseString + returnedNinjaArray[i].ninja;
          }
        }
      }
        callback(responseString);
   
    });
  }
