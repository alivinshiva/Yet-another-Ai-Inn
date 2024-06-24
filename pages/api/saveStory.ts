import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, story } = req.body as { title: string; story: string };

        if (!title || !story) {
            res.status(400).json({ message: 'Title and story are required' });
            return;
        }

        // Create a directory if it doesn't exist
        const dirPath = path.join(process.cwd(), 'public', 'stories', title.replace(/\s+/g, '-'));
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Write the story to a file
        const filePath = path.join(dirPath, 'story.txt');
        fs.writeFileSync(filePath, story, 'utf8');

        res.status(200).json({ message: 'Story saved successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
