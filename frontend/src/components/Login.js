import queryParams from "../util/queryParams";
import HomeButton from "./HomeButton";
import changeByName from "../util/changeByName";
import api from "../api";
import Cookies from "js-cookie";
import Router from 'next/router';
import Flash from "./Flash";
import Link from "next/link";
import styled from "styled-components";



const AppWrapper = styled.div`width: 100%;`;
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
      session: Cookies.get("session"),
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
    e.preventDefault()
    this.state.errorMsg = "";

    Cookies.set("username", this.state.email)

    api.postLogin(this.state.email, this.state.password).then(({data}) => {
      if (!data.valid) {
        this.setState({
          errorMsg: "Email and Password does not match!!!",
          flashVisible: true
        });
        return;
      }

      // Login Success
      Cookies.set("session", data.session);

      // If we're coming from somewhere, go back there
      if (queryParams().back) {
        Router.replace(queryParams().back);
      } else {
        Router.replace("/") // Otherwise just go home
      }
    });
  }

  onLogOut() {
    this.setState({
      session: undefined
    });
    Cookies.remove("session");
  }

  render() {
    if (this.state.session) {
      return <AlreadyLoggedIn onLogOut={this.onLogOut} />;
    }

    return (

    <AppWrapper>
      <form onSubmit={this.onSubmit}>
        {
          this.state.flashVisible
            ? <Flash message={this.state.errorMsg}/>
            : null
        }
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
      <Link href="/register">
          or register
      </Link>

    </AppWrapper>
    );
  }
}

export default Login;
