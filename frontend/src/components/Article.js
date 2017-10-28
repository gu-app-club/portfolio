import Markdown from "./Markdown.js";

const Article = props => {
  return (
    <div>
      <Markdown src={props.body} key={`${props.pageID}-mark`} />
      <p>
        By <b>{props.author} </b>
      </p>
      <hr key={`${props.pageID}-hr`} />
    </div>
  );
};

export default Article;
