module.exports = app => {
    const techno = require("../controllers/techno.controller.js");
    
    // Retrieve all Technos
    app.get("/ninjify", techno.findAll);
    
    // Retrieve a single Techno with technoId
    app.get("/ninjify/:technoId", techno.findOne);
          
};