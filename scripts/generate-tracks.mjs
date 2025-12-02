import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseFile } from 'music-metadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTracks() {
  const publicDir = path.resolve(__dirname, '../public');

  const entries = await fs.readdir(publicDir, { withFileTypes: true });

  const audioFiles = entries
    .filter((entry) => entry.isFile())
    .filter((entry) => entry.name.toLowerCase().endsWith('.mp3'));

  const tracks = await Promise.all(
    audioFiles.map(async (entry, index) => {
      const fileName = entry.name;
      const withoutExt = fileName.replace(/\.[^/.]+$/, '');

      // artist - title: берем всё до первого "-" как артиста, остальное как название
      const [rawArtist, ...rest] = withoutExt.split('-');
      const artist = (rawArtist ?? '').trim();
      const titleFromPattern = rest.join('-').trim();
      const title = titleFromPattern || withoutExt.trim();

      // Читаем длительность из метаданных файла
      let durationSeconds = null;
      try {
        const filePath = path.join(publicDir, fileName);
        const metadata = await parseFile(filePath);
        durationSeconds = metadata.format.duration || null;
      } catch (err) {
        console.warn(`Не удалось прочитать длительность для ${fileName}:`, err.message);
      }

      return {
        id: index + 1,
        title,
        artist: artist || 'Unknown Artist',
        src: `/${fileName}`,
        durationSeconds,
      };
    }),
  );

  const outPath = path.join(publicDir, 'tracks.json');

  await fs.writeFile(outPath, JSON.stringify({ tracks }, null, 2), 'utf8');

  console.log(`Generated ${tracks.length} tracks to ${outPath}`);
}

generateTracks().catch((err) => {
  console.error(err);
  process.exit(1);
});


