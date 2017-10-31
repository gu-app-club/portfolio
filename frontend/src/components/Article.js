import Markdown from "./Markdown.js";
import Link from "next/link";



const articleStyle = {
  backgroundColor: "#fff",
  WebkitTransition: "-webkit-box-shadow .25s",
  transition: "box-shadow .25s, -webkit-box-shadow .25s",
  borderRadius: "2px",
  WebkitBoxShadow: "0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)",
  boxShadow: "0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)",
  padding: "24px",
  marginBottom: "25px",
  height: "400px",
};

const markdownStyle = {
  overflow: "hidden",
  maxHeight: "75%"
};

const headerStyle = {
  maxHeight: "20%"
};

const readmoreStyle = {
  position: "relative",
  bottom: "34%",
  background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)",
  filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=0 )",
  height: "34%"
};

const Article = props => {
  return (
   
    <div class="article-wrapper">
      <div class="header-wrapper">
        <h1 style={{marginBottom: "0"}}>{props.name}</h1>
        <p>By <Link href={{ pathname: "/u/" + props.userID }}>{props.author}</Link></p>
      </div>
      <div class="markdown-wrapper">
        <Markdown src={props.body} key={`${props.pageID}-mark`} />
      </div>
      <div class="readmore"></div>
    </div>
  );
};

export default Article;
