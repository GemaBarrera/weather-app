import styled from "styled-components";
import theme from "../../../styles/theme";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  background: #0d2242;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Day = styled.div`
  text-align: center;
  margin-top: 10px;

  h3 {
    color: ${theme.colors.lightBlue};
    font-size: 18px;
    margin-bottom: 5px;
  }

  p {
    color: ${theme.colors.lightGrey};
    font-size: 16px;
    margin: 0 10px 0;
  }

  #min {
    opacity: 0.6;
  }
`;

export const DayDetails = styled.div`
  display: flex;
`;

export const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
`;
