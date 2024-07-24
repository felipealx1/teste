import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { IEpisode } from "../../types/episode";

interface EpisodeCardProps extends IEpisode {}

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

const EpisodeCard: React.FC<EpisodeCardProps> = ({ id, name, air_date, episode }) => {
  return (
    <StyledLink to={`/episode/${id}`}>
      <CardWrapper key={id} title={name} bordered={false} style={{ width: 300 }}>
        <div>Data de Exibição: {air_date}</div>
        <div>Episódio: {episode}</div>
      </CardWrapper>
    </StyledLink>
  );
};

export default EpisodeCard;
