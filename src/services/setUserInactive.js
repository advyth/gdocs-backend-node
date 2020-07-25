var messages = require("../utils/developer_messages");
var user = require("../models/user");

const setUserInactiveService = (req, res) => {
  user.setInactive(req.body, (status) => {
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
  setUserInactiveService,
};
