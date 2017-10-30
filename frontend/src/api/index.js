import axios from "axios";
import {
  BASE_URL,
  USER_ROUTE,
  REGISTER_ROUTE,
  PAGE_ROUTE,
  PAGE_LIST_ROUTE,
  LOGIN_ROUTE,
  UPLOAD_ROUTE,
  USER_PAGE_ROUTE
} from "./constants";
import querystring from "querystring";
axios.defaults.withCredentials = true;
import Cookies from "../lib/Cookies";

function getPage(userID, pageID) {
  return axios.get(
    BASE_URL + USER_ROUTE + `/${userID}` + PAGE_ROUTE + `/${pageID}`
  );
}

function getUserPage(userID){
  return axios.get(BASE_URL + USER_PAGE_ROUTE + `/${userID}`);
}

function getPageList(count, offset) {
  return axios.get(BASE_URL + PAGE_LIST_ROUTE + `/${count}` + `/${offset}`);
}

function postRegister(accessCode, email, password, username) {
  const urlEncodedData = querystring.stringify({
    accessCode,
    email,
    password,
    username
  });

  return axios.post(BASE_URL + REGISTER_ROUTE, urlEncodedData);
}

function postLogin(key, password) {
  const urlEncodedData = querystring.stringify({
    key,
    password
  });

  return axios.post(BASE_URL + LOGIN_ROUTE, urlEncodedData);
}

/*Upload does not accept author.*/
function postUpload(title, body) {
  if (!Cookies.isLoggedIn()) {
    throw new Error("User is not logged in!");
  }

  console.log(Cookies.getLoginDetails());

  const urlEncodedData = querystring.stringify({
    title,
    body
  });

  return axios(BASE_URL + UPLOAD_ROUTE, {
    method: "POST",
    data: urlEncodedData,
    withCredentials: true
  });
}

export default { getPage, getPageList, postRegister, postLogin, postUpload, getUserPage };
