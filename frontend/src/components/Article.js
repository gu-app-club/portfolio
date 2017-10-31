import Markdown from "./Markdown.js";
import Link from "next/link";


const Article = props => {
  return (
    <div>
      <Markdown src={props.body} key={`${props.pageID}-mark`} />
      <p>
        By <Link href={{ pathname: "/u/" + props.userID }}>{props.author}</Link>
      </p>
      <hr key={`${props.pageID}-hr`} />
    </div>
  );
};

export default Article;
