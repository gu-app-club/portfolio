import styled from "styled-components";
import Head from "./components/Head.js";
import Footer from "./components/Footer.js"
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
          <TopBar author={this.props.author} />
          <Main>
            <ArticleList articles={this.props.articles} />
          </Main>
          <Footer/>
        </AppWrapper>
      </Themed>
    );
  }
}

export default App;
