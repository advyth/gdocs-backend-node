let unqid = require("uniqid");
var crypto = require("crypto");
var moment = require("moment");
var messages = require("../utils/developer_messages");
var FormData = require("form-data");
const { RAPID_API_SECRET } = require("../utils/env_vars");
var axios = require("axios");
var { connectionPool } = require("../utils/database_config");
const { stat } = require("fs");

generateHash = (password) => {
  var salt = crypto.randomBytes(128).toString("base64");
  var iterations = 1000;
  var hash = crypto
    .pbkdf2Sync(password, salt, iterations, 64, "sha512")
    .toString("base64");
  let hashFinal = {
    salt,
    iterations,
    hash,
  };

  return hashFinal;
};
generateHashWithSalt = (password, salt) => {
  var iterations = 1000;
  var hash = crypto
    .pbkdf2Sync(password, salt, iterations, 64, "sha512")
    .toString("base64");
  let hashFinal = {
    salt,
    iterations,
    hash,
  };
  return hashFinal;
};
addUser = ({ email, password }, status_callback) => {
  let id = unqid();
  const { salt, iterations, hash } = generateHash(password);

  let addQuery = `INSERT INTO users VALUES('${email}', '${hash}', '${id}', '${salt}', NULL, NULL, NULL)`;

  connectionPool.getConnection((error, connection) => {
    if (error) {
      return status_callback(false);
    }
    connection.query(addQuery, (err, results) => {
      if (err) {
        return status_callback(false);
      }
      console.log("Added in user");
      connection.release();
      return status_callback(true);
    });
  });
};

verifyUser = ({ email, password }, status_callback) => {
  let getQuery = `SELECT passwordhash, salt FROM users WHERE email = '${email}'`;
  connectionPool.getConnection((error, connection) => {
    if (error) {
      console.log(error);
      return status_callback(false);
    }
    connection.query(getQuery, (err, results) => {
      if (err) {
        console.log(err);
        connection.release();
        return status_callback(false);
      }
      if (results.length > 0) {
        let passwordHash = results[0].passwordhash;
        let salt = results[0].salt;
        let { hash } = generateHashWithSalt(password, salt);

        if (passwordHash === hash) {
          connection.release();
          return status_callback(true);
        } else {
          connection.release();
          return status_callback(false);
        }
      } else {
        connection.release();
        return status_callback(false);
      }
    });
  });
};

useFile = ({ email, fileid }, usecallback) => {
  let useQuery = `UPDATE users SET currentdoc='${fileid}' WHERE email='${email}'`;
  connectionPool.getConnection((error, connection) => {
    if (error) {
      messages.danger(error);
      return usecallback(false);
    }
    connection.query(useQuery, (err, results) => {
      if (err) {
        messages.danger(error);
        connection.release();
        return usecallback(false);
      }
      messages.log(fileid + " in use by " + email);
      connection.release();
      return usecallback(true);
    });
  });
};

getFileUsers = ({ fileid }, userlistcallback) => {
  console.log(fileid);
  let getQuery = `SELECT email,avatar_url FROM users WHERE currentdoc = '${fileid}'`;
  let userArray = [];
  connectionPool.getConnection((error, connection) => {
    if (error) {
      messages.danger(error);
      return userlistcallback([]);
    }
    connection.query(getQuery, (err, results) => {
      if (err) {
        messages.danger(err);
        connection.release();
        return userlistcallback([]);
      }
      results.forEach((element) => {
        userArray = userArray.concat(element);
      });
      connection.release();
      return userlistcallback(userArray);
    });
  });
};
setInactive = ({ email }, status) => {
  let inactiveQuery = `UPDATE users SET currentdoc = NULL WHERE email = '${email}'`;
  connectionPool.getConnection((error, connection) => {
    if (error) {
      messages.danger(error);
      return status(false);
    }
    connection.query(inactiveQuery, (err, results) => {
      if (err) {
        connection.release();
        messages.danger(err);
        return status(false);
      }
      connection.release();
      return status(true);
    });
  });
};

isActive = ({ email }, status) => {
  console.log(email);
  var currTime = moment().toISOString();
  let isActiveQuery = `UPDATE users SET lastpoll = '${currTime}' WHERE email = '${email}'`;
  connectionPool.getConnection((error, connection) => {
    if (error) {
      messages.danger(error);
      return status(false);
    }
    connection.query(isActiveQuery, (err, results) => {
      if (err) {
        connection.release();
        messages.danger(err);
        return status(false);
      }
      connection.release();
      return status(true);
    });
  });
};

cleanUsers = (status) => {
  let selectMoment = "SELECT lastpoll, email FROM users";
  connectionPool.getConnection((error, connection) => {
    if (error) {
      messages.danger(error);
      return status(false);
    }
    connection.query(selectMoment, (err, results) => {
      if (err) {
        connection.release();
        messages.danger(err);
        return status(false);
      }
      let userArray = results;
      let usersToBeRemoved = [];
      let currTime = moment();

      userArray.forEach((element) => {
        if (currTime.diff(element.lastpoll, 'seconds') > 8) {
          console.log("email " + element.email + "time since last pol" + currTime.diff(element.lastpoll));
          usersToBeRemoved = usersToBeRemoved.concat(element.email);
        }
      });
      if (usersToBeRemoved.length > 0) {
        let updateString = "UPDATE users SET currentdoc = NULL WHERE ";
        for (var i = 0; i < usersToBeRemoved.length; i++) {
          if (i == 0) {
            updateString = updateString.concat(
              `email = '${usersToBeRemoved[i]}'`
            );
          } else {
            updateString = updateString.concat(
              ` OR email = '${usersToBeRemoved[i]}'`
            );
          }
        }
        connection.query(updateString, (erro, results) => {
          if (erro) {
            messages.danger(erro);
            connection.release();
            return status(false);
          }
          connection.release();
          return status(true);
        });
        console.log(updateString);
      } else {
        connection.release();
      }
    });
  });
};

module.exports = {
  addUser,
  verifyUser,
  useFile,
  getFileUsers,
  setInactive,
  isActive,
  cleanUsers,
};
