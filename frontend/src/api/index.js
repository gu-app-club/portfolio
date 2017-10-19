import axios from "axios";
import {
  BASE_URL,
  USER_ROUTE,
  REGISTER_ROUTE,
  PAGE_ROUTE,
  PAGE_LIST_ROUTE
} from "./constants";

function getPage(userID, pageID) {
  return axios.get(
    BASE_URL + USER_ROUTE + `/${userID}` + PAGE_ROUTE + `/${pageID}`
  );
}

function getPageList(count, offset) {
  return axios.get(BASE_URL + PAGE_LIST_ROUTE + `/${count}` + `/${offset}`);
}

function postRegister(access_code, email, password, username) {
  return axios.post(BASE_URL + REGISTER_ROUTE, {
    access_code,
    email,
    password,
    username
  });
}

// function postPageList(name, body) {
//   Cookies.set("session", "", { expires: 365 });

//   return axios.post(
//     `${BASE_URL}${PAGE_ROUTE}/new`,
//     {
//       name,
//       body
//     },
//     {
//       withCredentials: true
//     }
//   );
// }

export default { getPage, getPageList, postRegister };
