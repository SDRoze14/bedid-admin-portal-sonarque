const Express = require("express");
const router = Express.Router();

const JWT = require("jsonwebtoken");
const Token = require("../middleware/token");

const Config = require("../config");
// const UserModel = require("../model/user");
const UserTokenModel = require("../model/userToken");

// const request = require("request");

// const rp = require("request-promise");

const Syslog = require("../syslog");

const ClientOAuth2 = require("client-oauth2");
const pkiAuth = new ClientOAuth2({
  clientId: Config.oauth2.clientId,
  clientSecret: Config.oauth2.clientSecret,
  accessTokenUri: Config.oauth2.accessTokenUri,
  authorizationUri: Config.oauth2.authorizationUri,
  redirectUri: Config.oauth2.redirectUri,
  scopes: ["pid"], //["openid", "profile"],
  state: "signin",
  prompt: "none",
});

router.get("/", function (req, res) {
  var uri = pkiAuth.code.getUri();
  res.redirect(uri);

  // var simple = {
  //       access_token: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk4MzY1NzcsImlhdCI6MTYyOTgwMDU3NywiaXNzIjoiaWRwIiwic3ViIjoiZGMzYzU1ZDYtZWI1Mi00Mjg4LWI2ZjEtZGYwMWM2YTNjZGYyIiwicGVybWlzc2lvbiI6MCwiaWQiOiI2MTI0Yzg4MTMwYjZiZWNkZjc1ODBjNTQifQ.N72RYML0TgRAkgqtBw-KBde7bg2fKYc_8K3ua6NAwcMqAuAsVeF_4aIIu5MOJNG9CmklAS7FigjhTwWWusn7mQ",
  //       refresh_token: "776c47c2-c89e-45f3-8d78-050e408a9461",
  //       token_type: "Bearer",
  //       expire_in: 1629804177,
  //       scope: "openid pid th_fullname en_fullname dob address th_fname th_mname th_lname en_fname en_mname en_lname sex",
  //       id_token: "eyJhbGciOiJFUzI1NiIsImtpZCI6InI1UlZHamJQZ01QTTU2YUdzdGJyYWx6M0RrWGE2cXdQIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL3Byb3h5LmJlaWQudGVjaCIsInNjb3BlIjoib3BlbmlkIiwiYXVkIjoib3BlbmlkX3Rlc3QiLCJleHAiOjE2Mjg3Nzk1MjgsImlhdCI6MTYyODc3ODYyOCwic3ViIjoiYzU2ZTcwMjMtYmM4MS00N2I0LWI2NzktMmQ5NGM5Yjg1YzQwIiwibmFtZSI6IiIsImVtYWlsIjoiIiwicGljdHVyZSI6IiIsImlhbCI6Mi4zLCJpZHAiOiJib3JhLmRvcGEuZ28udGgiLCJwaWQiOiIzMjQ5OTAwMTIxNTE0IiwidGhfZnVsbG5hbWUiOiLguIrguLTguKnguJPguLjguJ7guIfguKjguYwiLCJlbl9mdWxsbmFtZSI6IkNoaXRzYW51cG9uZyBQcmFpc3Jpc2F3YXQiLCJkb2IiOiIyNTI1MTEwNCIsImFkZHJlc3MiOiIyNyDguJbguJnguJnguKHguKPguLjguJ7guIfguKnguYwg4LiV4Liz4Lia4Lil4Lir4LiZ4LmJ4Liy4LmA4Lih4Li34Lit4LiHIOC4reC4s-C5gOC4oOC4reC5gOC4oeC4t-C4reC4h-C4ieC4sOC5gOC4iuC4tOC4h-C5gOC4l-C4o-C4siDguIjguLHguIfguKvguKfguLHguJTguInguLDguYDguIrguLTguIfguYDguJfguKPguLIiLCJ0aF9mbmFtZSI6IuC4iuC4tOC4qeC4k-C4uOC4nuC4h-C4qOC5jCIsInRoX21uYW1lIjoiICIsInRoX2xuYW1lIjoi4LmE4Lie4Lij4Lio4Lij4Li14Liq4Lin4Lix4Liq4LiU4Li04LmMIiwiZW5fZm5hbWUiOiJDaGl0c2FudXBvbmciLCJlbl9tbmFtZSI6IiAiLCJlbl9sbmFtZSI6IlByYWlzcmlzYXdhdCIsInNleCI6Im0iLCJ1c2VyX2lkIjoiIn0.ArSEHxIvjdVoC8wg2RVyH457Xmb1Ywwv310-ELyYM-KkvGp86OCh4fvV4kRcRq7w56s9xzGi1mrbwBiCoaxTcg"
  //     }

  //     var token = {
  //       token: {
  //         access_token: simple.access_token,
  //         refresh_token: simple.refresh_token,
  //       },
  //       user: JWT.decode(simple.id_token)
  //     }

  //     console.log(token);

  //     const preload = Buffer.from(
  //       JSON.stringify(token),
  //       "utf8"
  //     ).toString("base64");

  //     return res.redirect(`/login?preload=${preload}`);
});

router.get("/callback", async function (req, res) {
  await pkiAuth.code
    .getToken(req.originalUrl)
    .then(async (u) => {
      // var decoded = JWT.decode(u.data.id_token);

      // var simple = {
      //   access_token: "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzI0MDI5ODIsImlhdCI6MTYzMjM4MTM4MiwiaXNzIjoiaWRwIiwic3ViIjoiODFmNzA4MDctZjZhMC00OGMzLWE4ZGQtNDg5MjdkNGI0MGI0IiwicGVybWlzc2lvbiI6MTAwMCwiaWQiOiI2MTRjMjljNmIxYmI2NmI4NDMwZDA5MTkifQ.ftcF58pDzfVmeHd1L-Z1e1JtqT6wUF2P9a7UlFwynJwL3CYBQUS72UOD8l9KuA19ZU4qY6P2sdySSRp3uew5iA",
      //   refresh_token: "50c3c996-f288-443d-b8f9-17b12ba70969",
      //   token_type: "Bearer",
      //   expire_in: 1631075710,
      //   scope: "openid pid th_fullname en_fullname dob address th_fname th_mname th_lname en_fname en_mname en_lname sex",
      //   id_token: "eyJhbGciOiJFUzI1NiIsImtpZCI6InI1UlZHamJQZ01QTTU2YUdzdGJyYWx6M0RrWGE2cXdQIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL3Byb3h5LmJlaWQudGVjaCIsInNjb3BlIjoicGlkIiwiYXVkIjoiZ3NvZnRfbG9jYWxob3N0X2Vkb2MiLCJleHAiOjE2MzIzODQ5ODIsImlhdCI6MTYzMjM4MTM4Miwic3ViIjoiODFmNzA4MDctZjZhMC00OGMzLWE4ZGQtNDg5MjdkNGI0MGI0IiwiaWFsIjoyLjMsImlkcCI6ImJvcmEuZG9wYS5nby50aCIsInBpZCI6IjMyNDk5MDAxMjE1MTQiLCJ0aF9mdWxsbmFtZSI6IiDguIrguLTguKnguJPguLjguJ7guIfguKjguYwg4LmE4Lie4Lij4Lio4Lij4Li14Liq4Lin4Lix4Liq4LiU4Li04LmMIiwiZW5fZnVsbG5hbWUiOiIgQ2hpdHNhbnVwb25nIFByYWlzcmlzYXdhdCIsImRvYiI6IjE5ODItMTEtMDQiLCJhZGRyZXNzIjoiMjcg4LiW4LiZ4LiZ4Lih4Lij4Li44Lie4LiH4Lip4LmMIOC4leC4s-C4muC4peC4q-C4meC5ieC4suC5gOC4oeC4t-C4reC4hyDguK3guLPguYDguKDguK3guYDguKHguLfguK3guIfguInguLDguYDguIrguLTguIfguYDguJfguKPguLIg4LiI4Lix4LiH4Lir4Lin4Lix4LiU4LiJ4Liw4LmA4LiK4Li04LiH4LmA4LiX4Lij4LiyIiwic2V4IjoibSIsInVzZXJfaWQiOiI4MWY3MDgwNy1mNmEwLTQ4YzMtYThkZC00ODkyN2Q0YjQwYjQifQ.pAFoOm10NGqkpIEzb9mvoJJYPCf8vrNSvyipch_22jK4zMqQ5CqYLpJ2lNc4NF1_iWbfxS5jRYUe1nqJRmRXVg"
      // }

      var token = {
        token: {
          access_token: u.data.access_token,
          refresh_token: u.data.refresh_token,
        },
        user: JWT.decode(u.data.id_token)
      }

      console.log(token);

      const preload = Buffer.from(
        JSON.stringify(token),
        "utf8"
      ).toString("base64");

      return res.redirect(`/login?preload=${preload}`);
    })
    .catch((error) => {
      console.log(error);
      Syslog.logInfo(`callback, error:<${error}>`);
      return res.redirect(`/index?error=${error}`);
    });
});

router.get("/revoke", async function (req, res) {

});

// githubAuth.code.getToken(req.originalUrl)
//     .then(function (user) {
//       console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }

//       // Refresh the current users access token.
//       user.refresh().then(function (updatedUser) {
//         console.log(updatedUser !== user) //=> true
//         console.log(updatedUser.accessToken)
//       })

//       // Sign API requests on behalf of the current user.
//       user.sign({
//         method: 'get',
//         url: 'http://example.com'
//       })

//       // We should store the token into a database.
//       return res.send(user.accessToken)
//     })

// router.post("/token", async function(req, res) {
//   const postData = req.body;

//   JWT.verify(postData.refresh_token, Config.refreshTokenSecret, async function(
//     err,
//     decoded
//   ) {
//     if (err) {
//       return res.status(401).json({
//         status: 401,
//         message: "Unauthorized access.",
//       });
//     }
//     const userToken = await UserTokenModel.findOne()
//       .where("token.refresh_token")
//       .equals(postData.refresh_token)
//       .exec();
//     if (userToken) {
//       const user = {
//         user_id: userToken.user.user_id,
//       };
//       const expiresIn = new Date(
//         new Date().getTime() + Config.tokenLife * 1000
//       );
//       const token = JWT.sign(user, Config.secret, {
//         expiresIn: Config.tokenLife,
//       });
//       const response = {
//         token: {
//           token: token,
//           refresh_token: postData.refresh_token,
//           expires_in: expiresIn,
//         },
//         user: userToken.user,
//         agent: req.headers["user-agent"],
//       };

//       // update token
//       userToken.token.token = token;
//       userToken.token.expires_in = expiresIn;
//       userToken.user = userToken.user;
//       userToken.agent = req.headers["user-agent"];
//       userToken.save();

//       Syslog.logInfo(`refresh_success, username:<${userToken.user.user_id}>`);

//       return res.status(200).json(response);
//     } else {
//       return res.status(401).json({
//         status: 401,
//         message: "Not found refresh_token.",
//       });
//     }
//   });
// });

// router.delete("/logout", Token, async function(req, res) {
//   try {
//     const userToken = await UserTokenModel.findOne()
//       .where("token.token")
//       .equals(req.token.token)
//       .exec();
//     if (userToken) {
//       Syslog.logInfo(`logout_request, username:<${userToken.user.user_id}>`);

//       await userToken.remove();

//       Syslog.logInfo(`logout_success, username:<${userToken.user.user_id}>`);

//       return res.status(200).json({
//         status: 200,
//         message: "Success",
//       });
//     } else {
//       return res.status(401).json({
//         status: 401,
//         message: "Not found token.",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
