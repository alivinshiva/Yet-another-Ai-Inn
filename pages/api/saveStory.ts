// pages/api/saveStory.ts
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const storiesPath = 'public/stories';


interface Story {
  story: string;
  title: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { story, title }: Story = req.body;

  const filePath = path.join(storiesPath, `${title}.txt`);
  fs.writeFileSync(filePath, story);

  res.status(201).json({ message: 'Story saved successfully' });
}