import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import { SongType, AlbumType } from '../types';
import MusicCard from '../components/MusicCard';

export default function Album() {
  const [loading, setLoading] = useState(true);
  const [musics, setMusics] = useState<SongType[]>();
  const [albums, setAlbums] = useState<AlbumType>();
  const { id } = useParams();

  useEffect(() => {
    const handleGetMusics = async () => {
      if (id) {
        const response = await getMusics(id);
        const [album, ...music] = response;
        setMusics(music);
        setAlbums(album);
        setLoading(false);
      }
    };
    handleGetMusics();
  }, [id]);

  if (loading) return <Loading />;
  return (
    <div>
      <h2 data-testid="artist-name">{albums?.artistName}</h2>
      <h3 data-testid="album-name">{albums?.collectionName}</h3>

      {musics && musics.map((song, index) => (
        <div key={ index }>
          <MusicCard
            infosMusic={ song }
          />
        </div>
      ))}
    </div>
  );
}
