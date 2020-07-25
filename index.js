//import libs
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var messages = require("./src/utils/developer_messages");

//set up environment variables
const { PORT } = require("./src/utils/env_vars");

//Middleware hookups
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes setup
require("./src/routes/index")(app);

app.listen(PORT, () => {
  messages.info(`Services started running on port ${PORT}`);
});
