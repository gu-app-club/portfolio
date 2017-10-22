import Title from "./Title";
import api from "../api";
import styled from "styled-components";
import HomeButton from "./HomeButton";
import changeByName from "../util/changeByName";

const AppWrapper = styled.div`width: 100%;`;
const TitleWithMargin = Title.extend`margin-bottom: 25px;`;

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      access_code: ""
    };

    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    changeByName(this, event);
  }

  onSubmit() {
    api
      .postRegister(
        this.state.access_code,
        this.state.email,
        this.state.password,
        this.state.name
      )
      .then(({data}) => {
        if (!data.valid) {
          console.error("Bad register:", data);
          // TODO Tell the user something went wrong
          if (!data.username.valid) {
            alert(data.username.message);
          } else if (!data.email.valid) {
            alert(data.email.message);
          } else if (!data.password.valid) {
            alert(data.password.message);
          } else if (!data.accessCode.valid) {
            alert(data.accessCode.message);
          }
          return
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

  render() {
    return (
      <AppWrapper>
        <label htmlFor="name"> Name </label>
        <input type="text" id="name" name="name" onChange={this.onChange} />

        <label htmlFor="email"> Email </label>
        <input type="email" id="email" name="email" onChange={this.onChange} />

        <label htmlFor="password"> Password </label>
        <input type="password" name="password" onChange={this.onChange} />

        <label htmlFor="acess"> Access Code </label>
        <input type="text" name="access_code" onChange={this.onChange} />

        <button onClick={this.onSubmit}> Submit </button>
        <HomeButton> Cancel </HomeButton>
      </AppWrapper>
    );
  }
}

const RegisterForm = () => (
  <AppWrapper>
    <TitleWithMargin>Register</TitleWithMargin>
    <p>Sign up for an account and you can upload your postys</p>
    <Register />
  </AppWrapper>
);

export default RegisterForm;
