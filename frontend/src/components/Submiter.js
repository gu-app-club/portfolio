import Head from "./Head";
import Themed from "../Theme";
import styled from "styled-components";
import Title from "./Title";
import Link from "next/link";
import readBlob from "read-blob";
import api from "../api";
import Cookies from "../lib/Cookies";

const AppWrapper = styled.div`width: 100%;`;
const TitleWithMargin = Title.extend`margin-bottom: 25px;`;

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      reason: "",
      uploadedText: "",
      title: "",
      author: ""
    };

    this.onUserUpload = this.onUserUpload.bind(this);
    this.onUserSubmit = this.onUserSubmit.bind(this);
    this.updateAuthorValue = this.updateAuthorValue.bind(this);
    this.updateTitleValue = this.updateTitleValue.bind(this);

  }

  onUserSubmit() {
    api.postUpload(this.state.title, this.state.uploadedText).then(({data}) => {
      if(data.valid){
        Cookies.updateSession(data.session)
      }else{
        //TODO error handling.
      }
    });
  }

  onUserUpload(event) {
    const file = event.target.files[0];

    // For the moment, only let the user upload markdown files
    if (!file.name.endsWith("md")) {
      this.setState({
        disabled: true,
        reason:
          "This filetype is not allowed 😭 Please upload a markdown file instead."
      });
      return;
    }

    // Read the file and send it off to the API
    readBlob(file, "text").then(text => {
      this.setState({ uploadedText: text, disabled: false });
    });
  }

  updateTitleValue(evt){
    this.setState({title: evt.target.value});
  }
  updateAuthorValue(evt){
    this.setState({author: evt.target.value});
  }

  render() {
    return (
      <div>
        <label htmlFor="title"> Title </label>
        <input type="text" onChange={evt => this.updateTitleValue(evt)} placeholder="Super Cool iOS App" id="title" />

        <label htmlFor="author"> Author </label>
        <input type="text" onChange={evt => this.updateAuthorValue(evt)} placeholder="George" id="author" />

        <label htmlFor="file"> Markdown File </label>
        <input type="file" onChange={this.onUserUpload} />

        <button onClick={this.onUserSubmit} disabled={this.state.disabled}> Submit </button>
        <Link href="/" prefetch>
          <button className="button button-clear"> Cancel </button>
        </Link>

        {this.state.disabled && <div> {this.state.reason} </div>}
      </div>
    );
  }
}

export default () => (
  <Themed>
    <AppWrapper>
      <Head title="Submit" />
      <TitleWithMargin> Add a new post </TitleWithMargin>
      <p>
        {`You can submit a Markdown file (like on a Github README) as a post and
        we'll make it pretty! Anything you can do on Github, you can do here.`}
      </p>

      <SubmitForm />
    </AppWrapper>
  </Themed>
);
