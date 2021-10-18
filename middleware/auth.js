export default function(context) {
  let token = context.store.state.user ? context.store.state.user.token : {};

  let isAuth = token.access_token;
  if (!isAuth) {
    // context.redirect("/login");
  }
}
