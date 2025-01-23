"use client";

import styled from "styled-components";
import Link from "next/link";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #50a4ad;
  color: white;
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

export const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;
