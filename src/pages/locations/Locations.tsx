import React, { useState, useEffect } from "react";
import { fetchData } from "../../axios/axios";
import styled from "styled-components";
import LocationCard from "../../components/card-locations";
import { Pagination } from "antd";
import { ILocation } from "../../types/location";

const Locations: React.FC = () => {
  const endpoint: string = `location`;
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchLocations = async (page: number) => {
      const data = await fetchData(endpoint, page);
      if (data) {
        setLocations(data.results);
        setTotalPages(data.info.pages);
      }
    };
    fetchLocations(currentPage);
  }, [endpoint, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const Container = styled.main`
    background-color: #f0f2f5;
  `;

  const Header = styled.h1`
    width: 91%;
    margin: 0 auto;
    padding-top: 3rem;
  `;

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
    flex-wrap: wrap;
    width: 100%;
    background-color: #f0f2f5;
  `;

  const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  `;

  return (
    <Container>
      <Header>Localizações</Header>
      <Wrapper>
        {locations.map((location) => (
          <LocationCard key={location.id} {...location} />
        ))}
      </Wrapper>
      <PaginationWrapper>
        <Pagination
          current={currentPage}
          total={totalPages * 10} // Assume 10 items per page
          onChange={handlePageChange}
          showSizeChanger={false}
          itemRender={(page, type, originalElement) => {
            if (type === 'page') {
              return <span>{page}</span>;
            }
            return originalElement;
          }}
          locale={{ items_per_page: 'página', jump_to: 'Vá até', jump_to_confirm: 'confirme', page: 'página', prev_page: 'Página Anterior', next_page: 'Próxima Página', prev_5: 'Voltar 5 Páginas', next_5: 'Avançar 5 Páginas', prev_3: 'Voltar 3 Páginas', next_3: 'Avançar 3 Páginas' }}
        />
      </PaginationWrapper>
    </Container>
  );
};

export default Locations;
