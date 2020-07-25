const warn = (message) => {
  console.log(`\x1b[40m\x1b[33m WARN \x1b[0m ${message}`);
};

const danger = (message) => {
  console.log(`\x1b[40m\x1b[31m DANGER \x1b[0m ${message}`);
};

const info = (message) => {
  console.log(`\x1b[40m\x1b[35m INFO \x1b[0m ${message}`);
};
const log = (message) => {
  console.log(`\x1b[47m\x1b[30m LOG \x1b[0m ${message}`);
};

module.exports = {
  warn,
  danger,
  info,
  log,
};
