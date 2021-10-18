var syslog = require("syslog");
var logger = undefined;
const title = "PKI-Admin";

function createClient(port, host) {
  console.log(`Connect syslog ${host}:${port}`);
  logger = syslog.createClient(port, host);
  console.log(`Connected syslog.`);
}

function logInfo(msg) {
  if (logger) logger.info(`${title}: ${msg}`);
}

function logWarning(msg) {
  if (logger) logger.warning(`${title}: ${msg}`);
}

function logError(msg) {
  if (logger) logger.error(`${title}: ${msg}`);
}

module.exports = {
  createClient,
  logInfo,
  logWarning,
  logError,
};
