import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Story {
  title: string;
  content: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Story[]>
) {
  const storiesDirectory = path.join(process.cwd(), 'public', 'stories');
  const filenames = fs.readdirSync(storiesDirectory);
  const stories = filenames.map((filename) => {
    const filePath = path.join(storiesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const title = filename.replace('.txt', '');
    return { title, content: fileContents };
  });
  res.status(200).json(stories);
}
