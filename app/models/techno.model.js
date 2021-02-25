const sql = require("./db.js");

// constructor
const Techno = function(techno) {
    this.id = techno.id;
    this.buzz = techno.buzz;
    this.ninja = techno.ninja;
    this.active = techno.active;
};

Techno.getAll = result => {
    sql.query("SELECT * FROM techno", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("technos: ", res);
      result(null, res);
    });
  };

Techno.findById = (technoId, result) => {
  sql.query(`SELECT * FROM techno WHERE id = "${technoId}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found techno: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Techno with the id
    result({ kind: "not_found" }, null);
  });
};

Techno.getByBuzz = (providedBuzz, result) => {
  sql.query(`SELECT ninja FROM techno WHERE buzz = "${providedBuzz}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found techno: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Techno with the id
    result({ kind: "not_found" }, null);
  });
}


module.exports = Techno;