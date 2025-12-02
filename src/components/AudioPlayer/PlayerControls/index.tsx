import { Button } from '../../ui/button';

import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

type AudioPlayerControlsProps = {
  handleChangeTrackCallback: (isNextTrack?: boolean) => void;
  togglePlayCallback: () => void;
  isPlaying: boolean;
};

const AudioPlayerControls = ({ isPlaying, handleChangeTrackCallback, togglePlayCallback }: AudioPlayerControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon-sm"
        className="rounded-full cursor-pointer"
        onClick={() => handleChangeTrackCallback(false)}
      >
        <SkipBack className="size-4" />
      </Button>

      <Button
        variant="default"
        size="icon-lg"
        className="rounded-full bg-muted text-foreground hover:bg-muted/80 cursor-pointer"
        onClick={togglePlayCallback}
      >
        {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        className="rounded-full cursor-pointer"
        onClick={() => handleChangeTrackCallback()}
      >
        <SkipForward className="size-4" />
      </Button>
    </div>
  );
};

export default AudioPlayerControls;
