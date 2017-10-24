import React from "react";
import Article from "./Article";
import PropTypes from "prop-types";
import Link from "next/link";
import { FadeInDown } from "./animations";

class ArticleList extends React.Component {
  static propTypes = {
    articles: PropTypes.array
  };

  render() {
    if (!this.props.articles || this.props.articles.length === 0) {
      return (
        <div>
          <p>
            {"We can't find any posts! 😭 If you're a gonzaga student,"}
            <Link href="/new"> <a> click here to add one one. </a> </Link>
          </p>
        </div>
      );
    }

    const articles = this.props.articles.map(props => (
      <FadeInDown duration="0.5s" key={`${props.pageID}-anime`}>
        <Article key={props.pageID} {...props} />
      </FadeInDown>
    ));

    return <div>{articles}</div>;
  }
}

export default ArticleList;
