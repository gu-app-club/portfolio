import Markdown from "./Markdown.js";
import Link from "next/link";

const Article = props => {
  return (
    <Link prefetch 
      as={ "/p/" + props.pageID + "/" + props.userID} 
      href={{ 
        pathname: "/page",
        query:{ 
          pageID: props.pageID, 
          userID: props.userID 
        } 
      }}>
      <div className="article-wrapper">
      <div className="header-wrapper">
        <h1 style={{marginBottom: "0"}}>{props.name}</h1>
        <p>By <Link prefetch 
          as={ "/u/" + props.userID} 
          href={{ 
            pathname: "/user",
            query:{ 
              userID: props.userID 
          } 
        }}>{props.author}</Link></p>
      </div>
      <div className="markdown-wrapper">
        <Markdown src={props.body} key={`${props.pageID}-mark`} />
      </div>
      <div className="readmore"></div>
      </div>
    </Link>
  );
};

export default Article;
