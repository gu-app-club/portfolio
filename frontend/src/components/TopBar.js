import UploadSVG from "../../assets/upload.svg";
import styled from "styled-components";
import Link from "next/link";
import Title from "./Title";
import RedirectToLogin from "./RedirectToLogin";
const Constants = require('../api/constants');

const Icon = styled.div`
  padding: 5px;
  cursor: pointer;
  :hover {
    svg {
      stroke: ${props => props.theme.colors.primary};
    }
  }
  display: inline-block;
`;
const TopBarWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 25px;
`;

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TopBarWrapper>
        <DirectoryTitle userID={this.props.userID} article={this.props.article} author={this.props.author}/>
        {/* Add new post */}
        <RedirectToLogin href="/new" prefetch>
          <Icon>
            <UploadSVG />
          </Icon>
        </RedirectToLogin>
      </TopBarWrapper>
    );
  }
}

function DirectoryTitle(props){
  const author = props.author;
  const article = props.article;
  const userID = props.userID;
  if(article != null){
    return (
      <Title>
        <style jsx global>{`
        .breadcrumb { 
          cursor:pointer;
          -webkit-transition: color 0.25s, font-size 0.25s;
          -moz-transition: color 0.25s, font-size 0.25s;
          -o-transition: color 0.25s, font-size 0.25s;
          transition: color 0.25s, font-size 0.25s;
          color: #282828;
        }
        
        .breadcrumb:hover{
          font-size:26px;
          color: #3498db;
        }`}</style>

        <code>
          {"$ cat ~/"}
          <a href={Constants.ASSET_URL}><span className="breadcrumb">{"gonzaga"}</span></a>
          {"/"}
          <Link prefetch
            as={ "/u/" + userID}
            href={{ 
              pathname: "/user",
              query:{ 
                userID: userID 
              } 
             }}><span className="breadcrumb">{author}</span></Link>
          {"/"}
         {article}
        </code>
      </Title>
    );
  }else if(author != null){
    return (
      <Title>
        <style jsx global>{`
        .breadcrumb { 
          cursor:pointer;
          -webkit-transition: color 0.25s, font-size 0.25s;
          -moz-transition: color 0.25s, font-size 0.25s;
          -o-transition: color 0.25s, font-size 0.25s;
          transition: color 0.25s, font-size 0.25s;
          color: #282828;
        }
        
        .breadcrumb:hover{
          font-size:26px;
          color: #3498db;
        }`}</style>
        <code>
          {"$ cd ~/"}
          <a href={Constants.ASSET_URL}><span className="breadcrumb">{"gonzaga"}</span></a>
          {"/" + author + " && pwd "}</code>
      </Title>
    );
  }else{
    return (
      <Title>
        <code>{"$ cd ~/gonzaga && pwd "}</code>
      </Title>
    );
  }
}
export default TopBar;
