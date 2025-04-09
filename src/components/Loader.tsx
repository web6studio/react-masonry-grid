import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  height: 100vh;
`;

const Loader = () => (
  <Wrapper>
    <Spinner />
  </Wrapper>
);

export default Loader;
