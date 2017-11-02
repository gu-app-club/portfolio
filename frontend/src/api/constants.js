let BASE_URL = "http://localhost:8080";
let ASSET_URL = "http://localhost:3000"
const isProd = process.env.NODE_ENV === 'production'
if (isProd) {
  BASE_URL = "http://gupwd.com:8080";
  ASSET_URL = "http://gupwd.com"
  console.log("Running using production host!"); // eslint-disable-line no-console

}

const USER_ROUTE = "/users";
const REGISTER_ROUTE = "/register";
const PAGE_ROUTE = "/pages";
const PAGE_LIST_ROUTE = "/pages";
const LOGIN_ROUTE = "/login";
const UPLOAD_ROUTE = "/pages/new"
const USER_PAGE_ROUTE = "/users"
export {
  BASE_URL,
  ASSET_URL,
  USER_ROUTE,
  PAGE_ROUTE,
  REGISTER_ROUTE,
  PAGE_LIST_ROUTE,
  LOGIN_ROUTE,
  UPLOAD_ROUTE,
  USER_PAGE_ROUTE
};
