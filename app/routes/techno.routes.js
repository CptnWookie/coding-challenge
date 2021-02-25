module.exports = app => {
    const techno = require("../controllers/techno.controller.js");
  
    // Retrieve a single Techno with technoId
    app.get("/ninjify/:technoId", techno.findOne);

    // Retrieve all Technos
    app.get("/ninjify", techno.findAll);

    
      
  };