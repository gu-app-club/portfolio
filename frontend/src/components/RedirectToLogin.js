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
    if (location) {
      return (
        <Link
          href={{ pathname: "/login", query: { back: location.pathname } }}
        />
      );
    }

    // Server side rendered
    return <Link href={{ pathname: "/login" }} />;
  }
}

export default RedirectToLoginLink;
