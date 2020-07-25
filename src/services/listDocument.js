var document = require("../models/document");
var messages = require("../utils/developer_messages");

const listDocumentService = (req, res) => {
  messages.log("/document HIT");
  document.getDocuments((documents) => {
    let docJson = JSON.stringify(documents);
    res.send(docJson);
  });
};

module.exports = {
  listDocumentService,
};
