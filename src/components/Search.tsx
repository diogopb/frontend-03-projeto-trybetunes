import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';

export default function Search() {
  const [artist, setArtist] = useState('');
  const [artistResult, setArtistResult] = useState<AlbumType[]>([]);
  const [artistFound, setArtistFound] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleLengthArtist = () => artist.length <= 1;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.artistResult) {
        setArtistResult(location.state.artistResult);
      }
    };
    fetchData();
  }, [location.state]);

  const handleFetch = async () => {
    setLoading(true);
    const response = await searchAlbumsAPI(artist);
    setLoading(false);
    setArtistResult(response);
    setArtistFound(artist);

    if (!response) {
      setArtistResult([]);
    }
    setArtist('');
    return response;
  };

  if (loading) return <Loading />;
  return (
    <div>
      <form onSubmit={ handleFetch }>

        <div>
          <label htmlFor="artist">
            Nome do artista ou banda
            <input
              type="text"
              value={ artist }
              data-testid="search-artist-input"
              onChange={ handleInputChange }
              required
            />
          </label>
        </div>

        <div>
          <button
            data-testid="search-artist-button"
            disabled={ (handleLengthArtist()) }
          >
            Pesquisar
          </button>
        </div>

      </form>
      {(artistResult.length > 0)
        ? (
          <div>
            <h3>{`Resultado de álbuns de: ${artistFound}`}</h3>
            {artistResult.map((album) => (
              <div key={ album.collectionId }>
                <p>{`Artista: ${album.artistName}`}</p>
                <p>Nome do álbum:</p>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  { album.collectionName }
                </Link>
                <img src={ album.artworkUrl100 } alt="Capa do album" />
              </div>
            ))}
          </div>)
        : <p>Nenhum álbum foi encontrado</p>}
    </div>
  );
}
