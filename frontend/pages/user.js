import Main from "../src/Main";
import Centered from "../src/components/Centered";
import React from "react";
import api from "../src/api";
import PropTypes from "prop-types";



export default class extends React.Component {
  static async getInitialProps({ query }) {
    let data;
    try {
      data = await api.getUserPage(query.userID);
    } catch (err) {
      console.error(
        "Can't connect to the backend :( Are we sure it's running?",
        err
      );

      return { articles: [] }; // No response from backend :(
    }
    
    return { articles: data.data, author: (data.data && data.data.length > 0) ? data.data[0].author : null }
  }

  static propTypes = {
    articles: PropTypes.array
  };

  

  render() {
    return (
      <Centered>
        <Main author={this.props.author} articles={this.props.articles} />
      </Centered>
    );
  }
}
