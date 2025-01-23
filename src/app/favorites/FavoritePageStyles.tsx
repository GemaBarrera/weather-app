import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const CityList = styled.ul`
  display: flex;
  width: 80vw;
  line-height: 1.5;
  list-style: none;
  padding: 0 10px;
  flex-wrap: wrap;
`;

export const CityItem = styled.li<{ $isSelected: boolean }>`
  width: 100px;
  height: 40px;
  color: ${(props) => (props.$isSelected ? "#50A4AD" : "#56647c")};
  font-size: ${(props) => props.$isSelected && "18px"};
  cursor: pointer;
  border-radius: 5px;
  align-self: center;

  &::after {
    content: "|";
    color: #ccc;
    margin-left: 10px;
  }

  &:last-child::after {
    content: "";
  }
`;

export const CardWrapper = styled.div`
  height: 60vh;
  justify-content: center;
  display: flex;
  align-items: center;
`;
