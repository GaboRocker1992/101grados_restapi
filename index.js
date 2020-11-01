const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const app = express();

app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json({limit: '10mb', extended: true}));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({   
  parameterLimit: 100000,
  limit: '50mb', 
  extended: true
}));



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rest Api developed by Gabriel Borbor" });
});

require("./routes/routes.js")(app);


// set port, listen for requests
app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});