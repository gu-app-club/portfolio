import styled from "styled-components";
import Head from "./components/Head.js";
import ArticleList from "./components/ArticleList.js";
import TopBar from "./components/TopBar.js";
import Themed from "./Theme";

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
          <TopBar />
          <Main>
            <ArticleList articles={this.props.articles} />
          </Main>

          <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=7a32373e9098053826b5">
            Login
          </a>
        </AppWrapper>
      </Themed>
    );
  }
}

export default App;
