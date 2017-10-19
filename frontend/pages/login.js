import Centered from "../src/components/Centered";
import Login from "../src/components/Login";
import HomeButton from "../src/components/HomeButton";
import Head from "../src/components/Head";

export default () => (
  <Centered>
    <Head />
    <Login />
    <HomeButton>Back</HomeButton>
  </Centered>
);
