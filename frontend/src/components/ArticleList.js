import React from "react";
import Article from "./Article";
import PropTypes from "prop-types";
import Link from "next/link";
import RedirectToLogin from "./RedirectToLogin";
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
            {"We can't find any posts! 😭 If you're a gonzaga student, "}
            <RedirectToLogin href="/new">
              click here to add one.
            </RedirectToLogin>
          </p>
        </div>
      );
    }

    const articles = this.props.articles.map(props => (
      <FadeInDown duration="0.5s" key={`${props.pageID}-anime`}>
        <Article key={props.pageID} {...props} />
      </FadeInDown>
    ));

    return( 
      <div>
        <style jsx global>
        {`
        .article-wrapper { 
          cursor: pointer;
          background-color: #fff;
          border-radius: 5px;
          padding: 24px;
          margin-bottom: 25px;
          height: 400px;
          border: 1px solid #d4dadd;
          transition: -webkit-transform 0.3s, box-shadow 0.3s;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .article-wrapper:hover{
          box-shadow: 0 1px 15px rgba(27,31,35,0.15);
          -webkit-transform: scale(1.025);
          transform: scale(1.025);        
        }

        .markdown-wrapper{
          overflow: hidden;
          max-height: 75%;
        }

        .header-wrapper{
          max-height: 20%;
        }

        .readmore{
          position: relative;
          bottom: 34%;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=0 );
          height: 34%;
        }

      `}
        </style>
        {articles}
      </div>
    );
  }
}

export default ArticleList;
