const express = require("express");
const consola = require("consola");
const cors = require("cors");

const { Nuxt, Builder } = require("nuxt");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

// const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

const Config = require("./config");


// "/api",
//       {
//         target: process.env.API || `http://localhost:3000`,
//         pathRewrite: { "^/api": "/api" },
//         changeOrigin: true,
//       },

app.use(
  "/bedid-api",
  createProxyMiddleware({
    target: "https://proxy.beid.tech",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/bedid-api": "/api" },
  })
);

app.use(
  "/mobile-api",
  createProxyMiddleware({
    target: "https://mobile-auth-idp.beid.tech",
    secure: false,
    changeOrigin: true,
    pathRewrite: { "^/mobile-api": "/api" },
  })
);

const Oauth2 = require("./router/oauth2");

// syslog
const Syslog = require("./syslog");
if (Config.syslogHost)
  Syslog.createClient(Config.syslogPort, Config.syslogHost);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Mongoose.connect(dbRoute, { useNewUrlParser: true });
// const db = Mongoose.connection;
// db.once("open", () => {
//   console.log("connected to mongodb");
// });
// db.on("error", (err) => {
//   console.log(`Connect to mongodb error: ${err}`);
//   process.exit(1);
// });

// router
const api = "/api/v1";
app.use(`${api}/oauth2`, Oauth2);

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host } = nuxt.options.server;
  const port = Config.port;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
