import { useRef } from 'react';
import AudioPlayerControls from './PlayerControls';
import PlaylistTable from './PlaylistTable';
import TrackDurationProgress from './TrackDurationProgress';
import VolumeControl from './VolumeControl';
import { useAudioPlayer } from '@/shared/hooks/useAudioPlayer';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    currentTrack,
    currentTime,
    volume,
    isMuted,
    isPlaying,
    tracks,
    currentTrackId,
    handleChangeTrack,
    handleSelectTrack,
    handleTogglePlay,
    handleToggleMute,
    handleTrackProgressChange,
    handleChangeVolume,
  } = useAudioPlayer({ audioRef });

  return (
    <div className="min-h-screen bg-gray-100 text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-xl border bg-card shadow-sm px-4 py-3 space-y-4">
        <div className="text-xs space-y-1">
          <p className="uppercase tracking-wide text-muted-foreground">Сейчас играет</p>

          <p className="text-sm font-medium">{currentTrack?.title || '-'}</p>

          <p className="text-muted-foreground">{currentTrack?.artist || '-'}</p>
        </div>

        <TrackDurationProgress
          currentTime={currentTime}
          currentTrack={currentTrack}
          handleProgressChangeCallback={handleTrackProgressChange}
        />

        <AudioPlayerControls
          isPlaying={isPlaying}
          handleChangeTrackCallback={handleChangeTrack}
          togglePlayCallback={handleTogglePlay}
        />

        <VolumeControl
          isMuted={isMuted}
          volume={volume}
          toggleMuteCallback={handleToggleMute}
          onChangeVolumeCallback={handleChangeVolume}
        />

        <PlaylistTable tracks={tracks} currentTrackId={currentTrackId!} onSelectTrackCallback={handleSelectTrack} />
      </div>
    </div>
  );
};

export default AudioPlayer;
