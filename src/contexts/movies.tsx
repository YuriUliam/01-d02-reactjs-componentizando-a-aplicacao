import { FC, createContext, useContext, useEffect, useState, useCallback } from 'react';

import { api } from '../services/api';

export interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesContextData {
  changeSelectedGenre: (id: number) => void
  genres: Array<Genre>;
  movies: Array<Movie>;
  selectedGenre: Genre
  selectedGenreId: number;
}

const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData);

export const MoviesProvider: FC = (props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const changeSelectedGenre = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, [setSelectedGenreId])

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <MoviesContext.Provider value={{
      changeSelectedGenre,
      genres,
      movies,
      selectedGenre,
      selectedGenreId,
    }}>
      {props.children}
    </MoviesContext.Provider>
  )
}

export function useMoviesContext() {
  const moviesContextData = useContext(MoviesContext)

  if (!moviesContextData) throw new Error('This component should be inside the MoviesProvider')

  return moviesContextData
}