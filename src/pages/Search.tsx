import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Loading from '../components/Loading';
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
      <div
        className="bg-black text-white"
      >
        <form
          onSubmit={ handleFetch }
          className="bg-indigo-950 px-10 py-10 rounded-xl
        gap-4 w-96 text-center justify-center align-center"
        >

          <div>
            <label htmlFor="artist">
              Artist or band name:
            </label>
            <input
              type="text"
              value={ artist }
              data-testid="search-artist-input"
              onChange={ handleInputChange }
              required
              className="text-black rounded-2xl w-80 h-6 text-center bg-slate-300"
            />

          </div>

          <div>
            <button
              data-testid="search-artist-button"
              disabled={ (handleLengthArtist()) }
              className="bg-pink text-white flex items-center justify-center"
            >
              Search
            </button>
          </div>

        </form>
        {(artistResult.length > 0)
          ? (
            <div className="grid grid-cols-5 relative top-20 items-center">
              {artistResult.map((album) => (
                <div key={ album.collectionId }>
                  <img src={ album.artworkUrl100 } alt="Capa do album" />
                  {/* <p className="m-1">{`${album.artistName}`}</p> */}
                  <div className="grid-cols-2 flex gap-2 m-1">
                    <p>Album:</p>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      { album.collectionName }
                    </Link>
                  </div>
                </div>
              ))}
            </div>)
          : <p className="display-block">No albums were found</p>}
      </div>
    </div>
  );
}
