import parse from "url-parse";
import queryString from "query-string";

/**
 * Gets the query params from the current url
 * 
 * @example
 * // url: localhost:3000/login/code=doggos
 * queryParams(); // { code: "doggos" }
 */
function queryParams() {
  // Note the explicit typeof is required here due to server-side rendering
  // that occasionally runs this code on Node and not in the browser
  if (typeof location === "undefined") return {};
  return queryString.parse(parse(location.href).query);
}

export default queryParams;
