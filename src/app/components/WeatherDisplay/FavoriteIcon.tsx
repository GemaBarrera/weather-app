"use client";

import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const StarIcon = styled.div<{ $isFavorite: boolean }>`
  position: absolute;
  right: 10px;
  top: 10px;
  color: ${(props) => (props.$isFavorite ? "gold" : "gray")};
  cursor: pointer;
  font-size: 24px;

  &:hover {
    color: ${(props) => (props.$isFavorite ? "#ffd700" : "#666")};
  }
`;

interface FavoriteIconProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  isFavorite,
  onToggle,
}) => {
  return (
    <StarIcon $isFavorite={isFavorite} onClick={onToggle}>
      {isFavorite ? <AiFillStar /> : <AiOutlineStar />}
    </StarIcon>
  );
};

export default FavoriteIcon;
