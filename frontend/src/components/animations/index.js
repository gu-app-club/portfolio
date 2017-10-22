import styled, { keyframes } from "styled-components";
import BaseAnimation from "./BaseAnimation";

const FadeInDownAnimation = keyframes`
from {
 opacity: 0.5;
 transform: translate3d(0, 10px, 0);
}
to {
 opacity: 1;
 transform: none;
}
`;

const FadeInDown = styled(BaseAnimation)`
  animation-name: ${FadeInDownAnimation};
`;

export { FadeInDown };
