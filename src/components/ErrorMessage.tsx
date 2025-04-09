import styled from "styled-components";

type Props = {
  error: unknown;
};

const ErrorMessage = ({ error }: Props) => {
  const message =
    error instanceof Error ? error.message : "Something went wrong";

  return <Wrapper>{message}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
`;

export default ErrorMessage;
