import React from "react";
import Cookies from "../lib/Cookies";
import Link from "next/link";

class RedirectToLoginLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (Cookies.isLoggedIn()) {
      return <Link {...this.props} />;
    }

    // Browser
    if (typeof location !== "undefined") {
      return (
        <Link
          href={{ pathname: "/login", query: { back: location.pathname } }}
        >{this.props.children}</Link>
      );
    }

    // Server side rendered
    return <Link href={{ pathname: "/login" }}>{this.props.children}</Link>;
  }
}

export default RedirectToLoginLink;
