import styled from "styled-components";

type Props = {
  error: unknown;
};

const ErrorMessage = ({ error }: Props) => {
  const message =
    error instanceof Error ? error.message : "Something went wrong";

  return <Text>{message}</Text>;
};

const Text = styled.div`
  padding: 3rem 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
`;

export default ErrorMessage;
