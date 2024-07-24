import React, { useState, useEffect } from "react";
import { fetchData } from "../../axios/axios";
import styled from "styled-components";
import EpisodeCard from "../../components/card-episodes";
import { Pagination } from "antd";
import { IEpisode } from "../../types/episode";

const Episodes: React.FC = () => {
  const endpoint: string = `episode`;
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEpisodes = async (page: number) => {
      const data = await fetchData(endpoint, page);
      if (data) {
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      }
    };
    fetchEpisodes(currentPage);
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
      <Header>Episódios</Header>
      <Wrapper>
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} {...episode} />
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

export default Episodes;
