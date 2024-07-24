import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchEpisodeById, fetchCharacterById } from "../../axios/axios";
import styled from "styled-components";
import { IEpisode } from "../../types/episode";
import { ICharacter } from "../../types/character";
import { Button } from "antd";

const Container = styled.main`
  background-color: #f0f2f5;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const CharactersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CharacterCard = styled.div`
  width: 200px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
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

const BackButton = styled(Button)`
  margin-top: 1rem;
`;

const EpisodeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<IEpisode | null>(null);
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  useEffect(() => {
    const fetchEpisode = async () => {
      const episodeData = await fetchEpisodeById(id!);
      setEpisode(episodeData);

      const characterPromises = episodeData.characters.map((url: string) => {
        const characterId = url.split('/').pop();
        return fetchCharacterById(characterId!);
      });

      const characterData = await Promise.all(characterPromises);
      setCharacters(characterData);
    };

    fetchEpisode();
  }, [id]);

  if (!episode) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Header>{episode.name}</Header>
      <Details>
        <p><strong>Data de estreia:</strong> {episode.air_date}</p>
        <h2>Personagens</h2>
        <CharactersList>
          {characters.map((character) => (
            <CharacterCard key={character.id}>
              <StyledLink to={`/character/${character.id}`}>
                <img src={character.image} alt={character.name} />
                <p>{character.name}</p>
              </StyledLink>
            </CharacterCard>
          ))}
        </CharactersList>
        <BackButton type="primary" onClick={() => navigate("/episodes")}>
          Voltar para Episódios
        </BackButton>
      </Details>
    </Container>
  );
};

export default EpisodeDetails;
