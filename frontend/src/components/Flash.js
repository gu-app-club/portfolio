import Markdown from "./Markdown.js";


class Flash extends React.Component {
  constructor(props){
    super(props)
    
  }
  render() {
    return (
      <div class="alert alert-danger">
        {this.props.message}
      </div>
    );
  }
}

export default Flash;
