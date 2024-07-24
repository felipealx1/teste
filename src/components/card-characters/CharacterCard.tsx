import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { ICharacter } from "../../types/character";

interface CharacterCardProps extends ICharacter {}

const CardWrapper = styled(Card)`
  margin: 2rem;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

const CharacterCard: React.FC<CharacterCardProps> = ({ id, name, status, species, image, location }) => {
  return (
    <StyledLink to={`/character/${id}`}>
      <CardWrapper key={id} title={name} bordered={false} style={{ width: 300 }}>
        <ImageContainer>
          <img src={image} alt={`Imagem de ${name}`} width={200} />
        </ImageContainer>
        <div><strong>Status:</strong> {status}</div>
        <div><strong>Espécie:</strong> {species}</div>
        <div><strong>Localização:</strong> {location.name}</div>
      </CardWrapper>
    </StyledLink>
  );
};

export default CharacterCard;
