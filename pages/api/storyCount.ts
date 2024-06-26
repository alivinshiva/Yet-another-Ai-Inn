// pages/api/storyCount.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const storiesDirectory = path.join(process.cwd(), 'public', 'stories');
        const filenames = await fs.readdir(storiesDirectory);
        const storyCount = filenames.length;

        res.status(200).json({ count: storyCount });
    } catch (error) {
        console.error('Error reading stories directory:', error);
        res.status(500).json({ error: 'Failed to read stories directory' });
    }
}
