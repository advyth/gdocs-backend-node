var user = require("../models/user");
var messages = require("../utils/developer_messages");

const registerService = (req, res) => {
  messages.log("/register HIT");
  user.addUser(req.body, (status) => {
    if (status) {
      let body = {
        message: "registered",
      };
      res.send(JSON.stringify(body));
    } else {
      let body = {
        message: "failed",
      };
      res.send(JSON.stringify(body));
    }
  });
};

module.exports = {
  registerService,
};
