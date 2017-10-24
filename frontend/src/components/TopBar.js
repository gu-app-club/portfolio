import UploadSVG from "../../assets/upload.svg";
import styled from "styled-components";
import Link from "next/link";
import Title from "./Title";
import RedirectToLogin from "./RedirectToLogin";

const Icon = styled.div`
  padding: 5px;
  cursor: pointer;
  :hover {
    svg {
      stroke: ${props => props.theme.colors.primary};
    }
  }
  display: inline-block;
`;
const TopBarWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 25px;
`;

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TopBarWrapper>
        <Title>
        <code>{"$ cd ~/gonzaga && pwd "}</code>
        </Title>

        {/* Add new post */}
        <RedirectToLogin href="/new" prefetch>
          <Icon>
            <UploadSVG />
          </Icon>
        </RedirectToLogin>
      </TopBarWrapper>
    );
  }
}

export default TopBar;
