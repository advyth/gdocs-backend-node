var document = require("../models/document");
var messages = require("../utils/developer_messages");


const createDocumentService = (req, res) => {
  messages.log("/document/create HIT");

  document.addDocument(req.body, (status) => {
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
  createDocumentService,
};
