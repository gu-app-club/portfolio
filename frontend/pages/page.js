import Centered from "../src/components/Centered";
import React from "react";
import api from "../src/api";
import PropTypes from "prop-types";
import ArticlePage from "../src/components/ArticlePage";

export default class extends React.Component {
  static async getInitialProps({ query }) {
    let data;
    try {
      data = await api.getPage(query.pageID, query.userID)
    } catch (err) {
      console.error(
        "Can't connect to the backend :( Are we sure it's running?",
        err
      );

      return { article: null }; // No response from backend :(
    }
    
    return { article: data.data }
  }

  static propTypes = {
    article: PropTypes.array
  };


  render() {
    return (
        <Centered>
            <ArticlePage article={this.props.article}/>
        </Centered>
    );
  }
}
