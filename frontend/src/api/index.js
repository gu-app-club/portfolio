import axios from "axios";
import { BASE_URL, USER_ROUTE, PAGE_ROUTE, PAGE_LIST_ROUTE } from "./constants";

function getPage(userID, pageID) {
  return axios.get(
    BASE_URL + USER_ROUTE + `/${userID}` + PAGE_ROUTE + `/${pageID}`
  );
}

function getPageList(count, offset) {
  return axios.get(BASE_URL + PAGE_LIST_ROUTE + `/${count}` + `/${offset}`);
}

export default { getPage, getPageList };
