import queryParams from "../util/queryParams";

/**
 * Show this if we think the user has already been logged in
 */
const AlreadyLoggedIn = ({ onLogOut }) => (
  <div>
    <p> It looks like you're already logged in! </p>
    <button onClick={onLogOut}> Logout </button>
  </div>
);

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: queryParams().code
    };

    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogOut() {
    this.setState({
      code: undefined
    });
  }

  render() {
    if (this.state.code) {
      return <AlreadyLoggedIn onLogOut={this.onLogOut} />;
    }

    return (
      <div>
        <label htmlFor="title"> Title </label>
        <input type="text" placeholder="Super Cool iOS App" id="title" />
      </div>
    );
  }
}

export default Login;
