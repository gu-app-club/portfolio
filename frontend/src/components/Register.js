import Link from "next/link";
import Title from "./Title";
import api from "../api";
import styled from "styled-components";

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
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  onSubmit() {
    api
      .postRegister(
        this.state.access_code,
        this.state.email,
        this.state.password,
        this.state.name
      )
      .then(console.log);
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
        <Link href="/" prefetch>
          <button className="button button-clear"> Cancel </button>
        </Link>
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
