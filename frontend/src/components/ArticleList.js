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
          -webkit-transition: -webkit-box-shadow .25s;
          transition: box-shadow .25s, -webkit-box-shadow .25s;
          border-radius: 2px;
          -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
          box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
          padding: 24px;
          margin-bottom: 25px;
          height: 400px;
        }

        .article-wrapper:hover{
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 20px 20px rgba(0, 0, 0, 0.22);
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
