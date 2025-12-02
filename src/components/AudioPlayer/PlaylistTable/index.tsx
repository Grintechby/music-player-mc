import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PLAYLIST_TABLE_CELLS } from './config';
import { formatSecondsToDurationTime } from '@/shared/helpers/formatters';
import { Track } from '@/types/types';

type PlaylistTableProps = {
  tracks: Track[];
  currentTrackId: number;
  onSelectTrackCallback: (id: number) => void;
};

const PlaylistTable = ({ tracks, currentTrackId, onSelectTrackCallback }: PlaylistTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {PLAYLIST_TABLE_CELLS.map(({ name, className }) => (
            <TableHead key={name} className={className}>
              {name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {tracks?.map((track) => (
          <TableRow
            key={track.id}
            className="cursor-pointer hover:bg-muted/60"
            data-state={track.id === currentTrackId ? 'selected' : ''}
            onClick={() => onSelectTrackCallback(track.id)}
          >
            <TableCell className="text-center text-xs text-muted-foreground">{track.id}</TableCell>

            <TableCell className="font-medium">{track.title}</TableCell>

            <TableCell className="text-muted-foreground">{track.artist}</TableCell>

            <TableCell className="text-right text-muted-foreground">
              {formatSecondsToDurationTime(track.durationSeconds!)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlaylistTable;
