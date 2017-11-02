import Title from "./Title";
import api from "../api";
import styled from "styled-components";
import HomeButton from "./HomeButton";
import changeByName from "../util/changeByName";
import Cookies from "../lib/Cookies";
import Router from "next/router";
import Flash from "./Flash";
import Link from "next/link";
import queryParams from "../util/queryParams"

const AppWrapper = styled.div`width: 100%;`;
const TitleWithMargin = Title.extend`margin-bottom: 25px;`;

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      access_code: "",
      errorMsg: "",
      flashVisible: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    changeByName(this, event);
  }

  onSubmit(e) {
    e.preventDefault()
    this.state.errorMsg = "";

    api
      .postRegister(
        this.state.access_code,
        this.state.email,
        this.state.password,
        this.state.name
      )
      .then(({data}) => {
        if (!data.valid) {
          if (!data.username.valid) {
            this.setState({
              errorMsg: this.state.errorMsg + " " + data.username.message + " "
            });
          }
          if (!data.email.valid) {
            this.setState({
              errorMsg: this.state.errorMsg + " " + data.email.message + " "
            });
          }
          if (!data.password.valid) {
            this.setState({
              errorMsg: this.state.errorMsg + " " + data.password.message + " "
            });
          }
          if (!data.accessCode.valid) {
            this.setState({
              errorMsg: this.state.errorMsg + " " + data.accessCode.message + " "
            });
          }
          this.setState({
            flashVisible: true
          })
          return;
        }

        // Login Success
        Cookies.storeLoginDetails({ username: this.state.name, session: data.session })
        // If we're coming from somewhere, go back there
        if (queryParams().back) {
          Router.replace(queryParams().back);
        } else {
          Router.replace("/") // Otherwise just go home
        }
      });
  }

  render() {
    return (
      <AppWrapper>
        {this.state.flashVisible ? (
            <Flash>{this.state.errorMsg}</Flash>
          ) : null}
        <form onSubmit= {this.onSubmit}>
          <label htmlFor="name"> Name </label>
          <input type="text" id="name" name="name" onChange={this.onChange} required/>

          <label htmlFor="email"> Email </label>
          <input type="email" id="email" name="email" onChange={this.onChange} required/>

          <label htmlFor="password"> Password </label>
          <input type="password" name="password" onChange={this.onChange} required/>

          <label htmlFor="acess"> Access Code </label>
          <input type="text" name="access_code" onChange={this.onChange} required/>

          <input type="submit"  value="Register" />
          <HomeButton> Cancel </HomeButton>
        </form>
        <Link href="/login">
            or login
        </Link>
      </AppWrapper>
    );
  }
}

const RegisterForm = () => (
  <AppWrapper>
    <TitleWithMargin>Register</TitleWithMargin>
    <p>Sign up for an account and you can upload your posts.</p>
    <Register />
  </AppWrapper>
);

export default RegisterForm;
