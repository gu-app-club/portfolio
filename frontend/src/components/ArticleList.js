import Article from "./Article";

class ArticleList extends React.Component {
  render() {
    if (!this.props.articles) {
      return <div>We can't find any posts :(</div>;
    }

    const articles = this.props.articles.map(props => <Article {...props} />);

    return <div>{articles}</div>;
  }
}

export default ArticleList;
