import queryParams from "../util/queryParams";
import HomeButton from "./HomeButton";
import changeByName from "../util/changeByName";
import api from "../api";
import Cookies from "../lib/Cookies";
import Router from "next/router";
import Flash from "./Flash";
import Link from "next/link";
import styled from "styled-components";
import Title from "./Title";

const AppWrapper = styled.div`width: 100%;`;
const TitleWithMargin = Title.extend`margin-bottom: 25px;`;

/**
 * Show this if we think the user has already been logged in
 */
const AlreadyLoggedIn = ({ onLogOut }) => (
  <div>
    <p> {"It looks like you're already logged in!"} </p>
    <button onClick={onLogOut}> Logout </button>
    <HomeButton>Back</HomeButton>
  </div>
);

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: "",
      email: "",
      password: "",
      errorMsg: "",
      flashVisible: false
    };

    this.onLogOut = this.onLogOut.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    changeByName(this, event);
  }

  onSubmit(e) {
    e.preventDefault();

    api.postLogin(this.state.email, this.state.password).then(({ data }) => {
      if (!data.valid) {
        this.setState({
          errorMsg: "Email and Password does not match!!!",
          flashVisible: true
        });
        return;
      }

      // Login Success
      Cookies.storeLoginDetails({username: this.state.email, session : data.session });

      // If we're coming from somewhere, go back there
      if (queryParams().back) {
        Router.replace(queryParams().back);
      } else {
        Router.replace("/"); // Otherwise just go home
      }
    });
  }

  onLogOut() {
    this.setState({
      session: undefined
    });
    Cookies.removeLoginDetails();
  }

  render() {
    if (Cookies.isLoggedIn()) {
      return <AlreadyLoggedIn onLogOut={this.onLogOut} />;
    }

    const NeedToBeLoggedInMessage = () => {
      return queryParams().back ? <TitleWithMargin>You need to be logged in to do that!</TitleWithMargin> : null; 
    } 

    return (
      <AppWrapper>
        <NeedToBeLoggedInMessage />

        <form onSubmit={this.onSubmit}>
          {this.state.flashVisible ? (
            <Flash message={this.state.errorMsg} />
          ) : null}
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            placeholder="george@gmail.com"
            id="email"
            name="email"
            onChange={this.onChange}
            required
          />

          <label htmlFor="password"> Password </label>
          <input
            type="password"
            placeholder="********"
            id="password"
            name="password"
            onChange={this.onChange}
            required
          />

          <input type="submit" value="Login" />
          <HomeButton>Back</HomeButton>
        </form>
        <Link href="/register">or register</Link>
      </AppWrapper>
    );
  }
}

export default Login;
