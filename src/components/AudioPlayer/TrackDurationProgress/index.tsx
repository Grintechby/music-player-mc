import { Slider } from '../../ui/slider';
import { DEFAULT_SLIDER_STEP, MAX_PERCENT_VALUE } from '@/shared/constants/globals';
import { formatSecondsToDurationTime } from '@/shared/helpers/formatters';
import { Track } from '@/types/types';

type TrackDurationProgressProps = {
  currentTime: number;
  currentTrack: Track;
  handleProgressChangeCallback: (value: number[]) => void;
};

const TrackDurationProgress = ({ currentTime, currentTrack, handleProgressChangeCallback }: TrackDurationProgressProps) => {
  const trackDurationProgress = currentTrack?.durationSeconds
    ? (currentTime / currentTrack.durationSeconds) * MAX_PERCENT_VALUE
    : 0;

  const formattedCurrentTime = formatSecondsToDurationTime(currentTime);
  const formattedTrackDuration = formatSecondsToDurationTime(currentTrack.durationSeconds!);

  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="text-muted-foreground min-w-9">{formattedCurrentTime}</span>

      <Slider
        className="cursor-pointer"
        value={[trackDurationProgress]}
        max={MAX_PERCENT_VALUE}
        step={DEFAULT_SLIDER_STEP}
        onValueChange={handleProgressChangeCallback}
      />

      <span className="text-muted-foreground min-w-9 text-right">{formattedTrackDuration}</span>
    </div>
  );
};

export default TrackDurationProgress;
