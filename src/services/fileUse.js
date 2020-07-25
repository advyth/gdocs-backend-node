var user = require("../models/user");
var messages = require("../utils/developer_messages");

const fileUseService = (req, res) => {
  messages.log("/document/open HIT");
  user.useFile(req.body, (status) => {
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
  fileUseService,
};
