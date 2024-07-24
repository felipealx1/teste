import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchLocationById, fetchCharacterById } from "../../axios/axios";
import styled from "styled-components";
import { ILocation } from "../../types/location";
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

const ResidentsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResidentCard = styled.div`
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

const LocationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [location, setLocation] = useState<ILocation | null>(null);
  const [residents, setResidents] = useState<ICharacter[]>([]);

  useEffect(() => {
    const fetchLocation = async () => {
      const locationData = await fetchLocationById(id!);
      setLocation(locationData);

      const residentPromises = locationData.residents.map((url: string) => {
        const residentId = url.split('/').pop();
        return fetchCharacterById(residentId!);
      });

      const residentData = await Promise.all(residentPromises);
      setResidents(residentData);
    };

    fetchLocation();
  }, [id]);

  if (!location) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Header>{location.name}</Header>
      <Details>
        <p><strong>Tipo:</strong> {location.type}</p>
        <p><strong>Dimensão:</strong> {location.dimension}</p>
        <h2>Residentes</h2>
        <ResidentsList>
          {residents.map((resident) => (
            <ResidentCard key={resident.id}>
              <StyledLink to={`/character/${resident.id}`}>
                <img src={resident.image} alt={resident.name} />
                <p>{resident.name}</p>
              </StyledLink>
            </ResidentCard>
          ))}
        </ResidentsList>
        <BackButton type="primary" onClick={() => navigate("/locations")}>
          Voltar para Localizações
        </BackButton>
      </Details>
    </Container>
  );
};

export default LocationDetails;
