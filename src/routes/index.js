const { loginService } = require("../services/login");
const { registerService } = require("../services/register");
const { createDocumentService } = require("../services/createDocument");
const { listDocumentService } = require("../services/listDocument");
const { fileUseService } = require("../services/fileUse");
const { getFileUserService } = require("../services/getFileUsers");
const { setUserInactiveService } = require("../services/setUserInactive");
const { activePollingService } = require("../services/activePolling");
const { cleanUpService } = require("../services/cleanup");

module.exports = (app) => {
  app.post("/login", loginService);
  app.post("/register", registerService);
  app.get("/document", listDocumentService);
  app.post("/document/create", createDocumentService);
  app.post("/document/open", fileUseService);
  app.post("/document/users", getFileUserService);
  app.post("/user/offline", setUserInactiveService);
  app.post("/user/isalive", activePollingService);
  app.get("/user/cleanup", cleanUpService);
};
