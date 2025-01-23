import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Input = styled.input`
  all: unset;
  flex: 1;
  padding: 10px;
  color: #0d2242;
  font-size: 16px;
  border-bottom: 1px solid #0d2242;
  padding: 6px;
  outline: none;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #0d2242;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #56647c;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const SuggestionsList = styled.ul`
  list-style: none;
  background-color: #f0f0f0;
  margin: 40px 0 0;
  padding: 0;
  width: 100%;
  overflow-y: auto;
  position: absolute;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
`;

export const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #56647c;
    color: #f0f0f0;
  }
`;
