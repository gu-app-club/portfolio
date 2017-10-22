import Article from "./Article";
import PropTypes from "prop-types";
import Link from "next/link";

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
            <Link href="/new"> click here to add one one. </Link>
          </p>
        </div>
      );
    }

    const articles = this.props.articles.map(props => (
      <Article key={props.pageID} {...props} />
    ));

    return <div>{articles}</div>;
  }
}

export default ArticleList;
