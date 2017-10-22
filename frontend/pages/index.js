import Main from "../src/Main";
import Centered from "../src/components/Centered";
import React from "react";
import api from "../src/api";
import PropTypes from "prop-types";

export default class extends React.Component {
  static async getInitialProps() {
    const { data } = await api.getPageList(10, 0);
    return { articles: data.pages };
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
