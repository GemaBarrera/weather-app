import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background-color: ${theme.colors.darkBlue};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TemperatureWrapper = styled.div`
  width: 50%;
  text-align: left;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-end;
`;

export const Day = styled.h3`
  color: ${theme.colors.lightGrey};
  font-weight: lighter;
`;

export const City = styled.h2`
  color: ${theme.colors.lightBlue};
`;

export const Temperature = styled.h1`
  font-size: 64px;
  color: ${theme.colors.lightGrey};
  margin: 0;
`;

export const WeatherDetails = styled.div`
  display: flex;
  margin-top: 10px;
  color: ${theme.colors.lightGrey};

  p {
    margin: 6px 10px 6px 0;
  }

  #min {
    opacity: 0.6;
  }

  #humidity {
    color: ${theme.colors.lightBlue};
  }
`;

export const WeatherIcon = styled.img`
  width: 160px;
`;
