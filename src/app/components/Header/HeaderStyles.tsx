"use client";

import Link from "next/link";
import styled from "styled-components";
import theme from "../../../styles/theme";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${theme.colors.lightBlue};
  color: ${theme.colors.lightGrey};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
`;

export const HeaderContentWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 1500px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled(Link)<{ $isSelected: boolean }>`
  text-decoration: none;
  color: ${theme.colors.lightGrey};
  font-size: 18px;
  opacity: ${(props) => (props.$isSelected ? 1 : 0.6)};
  transition: opacity 0.3s ease;

  &:hover {
    text-decoration: underline;
    opacity: 1;
  }
`;
