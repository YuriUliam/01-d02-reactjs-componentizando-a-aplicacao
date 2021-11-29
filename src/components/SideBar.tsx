import { Button } from './Button';

import { useMoviesContext } from '../contexts/movies';

export function SideBar() {
  const { changeSelectedGenre, genres, selectedGenreId } = useMoviesContext()

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => changeSelectedGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}