import styled from "styled-components";
import Head from "./Head.js";
import TopBar from "./TopBar.js";
import Themed from "../Theme";
import Link from "next/link";
import Markdown from "./Markdown.js";


const AppWrapper = styled.div`width: 100%;`;
const Main = styled.main`width: 100%;`;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Themed>
        <AppWrapper>
          <Head title="Portfolio" />
          <TopBar userID={this.props.article.userID} article={this.props.article.name} author={this.props.article.author}/>
          <Main>
            <div>
                <div>
                    <h1 style={{marginBottom: "0"}}>{this.props.article.name}</h1>
                    <p>By <Link prefetch 
                        as={ "/u/" + this.props.article.userID} 
                        href={{ 
                          pathname: "/user",
                          query:{ 
                            userID: this.props.article.userID 
                          } 
                        }}>{this.props.article.author}</Link>
                  </p>
                </div>
                <Markdown src={this.props.article.body} key={`${this.props.article.pageID}-mark`} />
            </div>
          </Main>
        </AppWrapper>
      </Themed>
    );
  }
}

export default App;
