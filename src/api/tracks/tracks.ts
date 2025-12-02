import { Track } from '@/types/types';

export const getTracks = async (): Promise<{ tracks: Track[] }> => {
  const response = await fetch('/tracks.json');

  if (!response.ok) {
    throw new Error('Failed to fetch tracks');
  }

  return await response.json();
};
