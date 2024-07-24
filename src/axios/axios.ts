import axios from "axios";

export const fetchData = async (endpoint: string, page: number) => {
  try {
    const { data } = await axios.get(`https://rickandmortyapi.com/api/${endpoint}?page=${page}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchCharacterById = async (id: string) => {
  try {
    const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchLocationById = async (id: string) => {
  try {
    const { data } = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchEpisodeById = async (id: string) => {
  try {
    const { data } = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
