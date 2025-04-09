import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ value, onChange }: Props) => {
  const [input, setInput] = useState(value);
  const debounced = useDebounce(input);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  const handleClear = () => {
    setInput("");
    onChange("");
  };

  return (
    <Wrapper>
      <StyledInput
        type="text"
        placeholder="Type to search photos..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {input && <ClearButton onClick={handleClear}>×</ClearButton>}
    </Wrapper>
  );
};
export default SearchInput;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto 2rem auto;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  font-size: 1rem;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  background-color: #fff;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
