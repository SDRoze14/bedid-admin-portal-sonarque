let basePathProxy = "/bedid-api/v1";
let basePathMobile = "/mobile-api/v1";

let headerAuthJson = {
  Authorization: true,
  "Content-Type": "application/json",
};

let username = "admin";
let password = "WuDGwL9hIhX8wCHpoy2yQtMs3nAOpy6i";

let auth = {
  username: "admin",
  password: "WuDGwL9hIhX8wCHpoy2yQtMs3nAOpy6i",
};

export default ({ app }, inject) => {
  inject("api", {
    // Users
    getListUsers: () => {
      return app.$axios.get(`${basePathProxy}/users`, {
        headers: headerAuthJson,
      });
    },
    // User ID
    getListUser: (user_id) => {
      return app.$axios.get(`${basePathProxy}/users/${user_id}`, {
        headers: headerAuthJson,
      });
    },

    // Auth
    getListAuth: (params) => {
      return app.$axios.get(`${basePathMobile}/admin/auths`, {
        auth: auth,
        params: params,
      });
    },

    
  });
};
