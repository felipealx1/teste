import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { ILocation } from "../../types/location";

interface LocationCardProps extends ILocation {}

const CardWrapper = styled(Card)`
  margin: 2rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const LocationCard: React.FC<LocationCardProps> = ({ id, name, type, dimension }) => {
  return (
    <StyledLink to={`/location/${id}`}>
      <CardWrapper key={id} title={name} bordered={false} style={{ width: 300 }}>
        <div>Tipo: {type}</div>
        <div>Dimensão: {dimension}</div>
      </CardWrapper>
    </StyledLink>
  );
};

export default LocationCard;
