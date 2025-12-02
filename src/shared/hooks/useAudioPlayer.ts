import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { getTracks } from '@/api/tracks/tracks';
import { DEFAULT_VOLUME, MAX_PERCENT_VALUE } from '@/shared/constants/globals';
import { Track } from '@/types/types';

type UseAudioPlayerInputProps = {
  audioRef: RefObject<HTMLAudioElement | null>;
};

export const useAudioPlayer = ({ audioRef }: UseAudioPlayerInputProps) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackId, setCurrentTrackId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const currentTrack = useMemo(
    () => tracks.find((track) => track.id === currentTrackId) || ({} as Track),
    [tracks, currentTrackId],
  );

  const currentTrackFullPath = window.location.origin + currentTrack?.src;
  const isTrackChanged = audioRef.current?.src !== currentTrackFullPath;

  const loadTracks = useCallback(async () => {
    try {
      const { tracks: tracksData } = await getTracks();

      setTracks(tracksData);

      if (tracksData.length) {
        setCurrentTrackId(tracksData[0]!.id);
      }
    } catch (error) {
      console.error('Error loading tracks:', error);
    }
  }, []);

  const handleChangeTrack = useCallback(
    (isNextTrack: boolean = true) => {
      if (!tracks?.length) {
        return;
      }

      const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrackId);
      const nextTrackIndex = currentTrackIndex === tracks.length - 1 ? 0 : currentTrackIndex + 1;
      const prevTrackIndex = currentTrackIndex <= 0 ? tracks.length - 1 : currentTrackIndex - 1;

      const trackIndex = isNextTrack ? nextTrackIndex : prevTrackIndex;

      setCurrentTrackId(tracks[trackIndex]!.id);
      setIsPlaying(true);
    },
    [tracks, currentTrackId],
  );

  const handleSelectTrack = (id: number) => {
    if (id === currentTrackId) {
      return;
    }

    setCurrentTrackId(id);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((prev) => !prev);
  };

  const handleTrackProgressChange = (value: number[]) => {
    if (!audioRef.current || !currentTrack?.durationSeconds) {
      return;
    }

    const [progressPercent] = value;
    const newTime = (progressPercent / MAX_PERCENT_VALUE) * currentTrack.durationSeconds;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleChangeVolume = (value: number[]) => {
    const [volumePercent] = value;
    const volumeValue = volumePercent / MAX_PERCENT_VALUE;

    setVolume(volumeValue);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = volumeValue;
    }
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => {
      if (!audioRef.current) {
        return prev;
      }

      audioRef.current.muted = !prev;

      return !prev;
    });
  };

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

  useEffect(() => {
    if (!currentTrack) {
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.src);
    }

    if (isTrackChanged) {
      audioRef.current.src = currentTrack.src;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrack, isTrackChanged, audioRef]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current?.addEventListener('ended', () => handleChangeTrack());

    return () => {
      audioRef.current?.removeEventListener('ended', () => handleChangeTrack());
    };
  }, [handleChangeTrack, audioRef]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack, audioRef]);

  return {
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
  };
};
