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

// Ninjify Endpoint
exports.findAll = (req, res) => {
    var querybuzzwords = req.query.x;  //Requested Buzzword for the query
    var wordArray = querybuzzwords.split(","); //Split querybuzzwords string into an Array

    getNinjaWords(wordArray, function(ninjaString) {
      if (ninjaString != null  && ninjaString != ""){  //If The value submitted aren't null or empty, the response is sent in the callback message.
        res.status(200).send({
          message: ninjaString
        });
      }
      else{
        res.status(404).send({            //Otherwise, the "No Match Found" message is sent.
          message: "No Match Found."
        });
      }
    });
  };

  function getByBuzzFunc(providedBuzz, callback) {
     sql.query(`SELECT ninja FROM techno WHERE buzz in (${providedBuzz})`, function (err, result) { // Select the correspondant Ninja word in the database for each Buzzword in the query.
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
