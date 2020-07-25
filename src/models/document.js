var { connectionPool } = require("../utils/database_config");
var messages = require("../utils/developer_messages");
var uniqid = require("uniqid");

addDocument = ({ filename, author }, status_callback) => {
  var documentId = uniqid();
  var addDocumentQuery = `INSERT INTO documents VALUES('${filename}', '${author}', '${documentId}')`;
  connectionPool.getConnection((error, connection) => {
    if (error) {
      messages.danger(error);
      return status_callback(false);
    }
    connection.query(addDocumentQuery, (err, result) => {
      if (err) {
        messages.danger(error);
        connection.release();
        return status_callback(false);
      }
      messages.warn("Document added");
      connection.release();
      return status_callback(true);
    });
  });
};
getDocuments = (list_callback) => {
  var getDocuments = "SELECT * FROM documents";
  var documentArray = [];
  connectionPool.getConnection((error, connection) => {
    if (error) {
      messages.danger(error);
      return list_callback(null);
    }
    connection.query(getDocuments, (err, results) => {
      if (err) {
        messages.danger(error);
        connection.release();
        return list_callback(null);
      }
      results.forEach((document) => {
        let documentBody = {
          filename: document.filename,
          author: document.author,
          id : document.id
        };
        documentArray = documentArray.concat(documentBody);
      });
      connection.release();
      return list_callback(documentArray);
    });
  });
};

module.exports = {
  addDocument,
  getDocuments,
};
