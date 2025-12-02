import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { DEFAULT_SLIDER_STEP, MAX_PERCENT_VALUE } from '@/shared/constants/globals';

import { Volume2, VolumeX } from 'lucide-react';

type VolumeControlProps = {
  isMuted: boolean;
  volume: number;
  toggleMuteCallback: () => void;
  onChangeVolumeCallback: (value: number[]) => void;
};

const VolumeControl = ({ isMuted, volume, toggleMuteCallback, onChangeVolumeCallback }: VolumeControlProps) => {
  const volumeProgress = isMuted ? 0 : volume * MAX_PERCENT_VALUE;

  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon-sm" className="rounded-full" onClick={toggleMuteCallback}>
        {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </Button>

      <Slider
        className="cursor-pointer w-22"
        value={[volumeProgress]}
        max={MAX_PERCENT_VALUE}
        step={DEFAULT_SLIDER_STEP}
        onValueChange={onChangeVolumeCallback}
      />
    </div>
  );
};

export default VolumeControl;
