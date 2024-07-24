import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCharacterById } from "../../axios/axios";
import styled from "styled-components";
import { ICharacter } from "../../types/character";
import { Button } from "antd";

const Container = styled.main`
  background-color: #f0f2f5;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin: 0 auto;
`;

const Header = styled.h1`
  margin-bottom: 1rem;
`;

const Details = styled.div`
  width: 80%;
  max-width: 600px;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const EpisodesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BackButton = styled(Button)`
  margin-top: 1rem;
`;

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const data = await fetchCharacterById(id!);
      setCharacter(data);
    };
    fetchCharacter();
  }, [id]);

  if (!character) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Header>{character.name}</Header>
      <ImageContainer>
        <img src={character.image} alt={character.name} width={200} />
      </ImageContainer>
      <Details>
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Espécie:</strong> {character.species}</p>
        <p><strong>Origem:</strong> {character.origin.name}</p>
        <p><strong>Localização:</strong> {character.location.name}</p><hr></hr>
        <h3>Episódios</h3>
        <EpisodesList>
          {character.episode.map((episodeUrl: string, index: number) => {
            const episodeId = episodeUrl.split('/').pop();
            return (
              <span key={index}>
                {index > 0 && ", "}
                Episódio {episodeId}
              </span>
            );
          })}
        </EpisodesList>
        <BackButton type="primary" onClick={() => navigate("/characters")}>
          Voltar para Personagens
        </BackButton>
      </Details>
    </Container>
  );
};

export default CharacterDetails;
