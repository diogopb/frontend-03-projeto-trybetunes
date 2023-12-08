import { SongType } from '../types';

type Props = {
  infosMusic: SongType;
};

export default function MusicCard({ infosMusic }: Props) {
  const { trackName, previewUrl } = infosMusic;

  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
    </div>
  );
}
