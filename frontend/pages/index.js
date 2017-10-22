import Main from "../src/Main";
import Centered from "../src/components/Centered";
import React from "react";
import api from "../src/api";
import PropTypes from "prop-types";

export default class extends React.Component {
  static async getInitialProps() {
    let data;
    try {
      data = await api.getPageList(10, 0);
    } catch (err) {
      console.error(
        "Can't connect to the backend :( Are we sure it's running?",
        err
      );
    }
    return { articles: data.data.pages };
  }

  static propTypes = {
    articles: PropTypes.array
  };

  render() {
    return (
      <Centered>
        <Main articles={this.props.articles} />
      </Centered>
    );
  }
}
