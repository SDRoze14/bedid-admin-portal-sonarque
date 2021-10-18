const port = process.env.PORT ? process.env.PORT : 3000;

const oauth2 = {
  clientId: process.env.OAUTH2_CLIENT_ID
    ? process.env.OAUTH2_CLIENT_ID
    : "gsoft_localhost_edoc",
  clientSecret: process.env.OAUTH2_CLIENT_SECRET
    ? process.env.OAUTH2_CLIENT_SECRET
    : "1vEtTqgjDg",
  accessTokenUri: process.env.OAUTH2_ACCESS_TOKEN_URI
    ? process.env.OAUTH2_ACCESS_TOKEN_URI
    : "https://proxy.beid.tech/api/v1/token", //proxy.beid.tech
  authorizationUri: process.env.OAUTH2_AUTHORIZATION_URI
    ? process.env.OAUTH2_AUTHORIZATION_URI
    : "https://proxy.beid.tech/api/v1/authorize", //proxy.beid.tech
  redirectUri: process.env.OAUTH2_REDIRECT_URI
    ? process.env.OAUTH2_REDIRECT_URI
    : "http://localhost:" + port + "/api/v1/oauth2/callback",
};


const syslogHost = process.env.SYSLOG_HOST ? process.env.SYSLOG_HOST : "";
const syslogPort = process.env.SYSLOG_PORT ? process.env.SYSLOG_PORT : "514";

module.exports = {
  port,
  oauth2,
  syslogHost,
  syslogPort,
};
