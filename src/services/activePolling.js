var user = require("../models/user");
var messages = require("../utils/developer_messages");

const activePollingService = (req, res) => {
  user.isActive(req.body, (status) => {
    if (status) {
      let body = {
        message: "success",
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
  activePollingService,
};
