import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { story, title } = req.body;

        // Ensure the public/stories directory exists
        const storiesPath = path.join(process.cwd(), 'public', 'stories');
        if (!fs.existsSync(storiesPath)) {
            fs.mkdirSync(storiesPath, { recursive: true });
        }

        // Create the file path
        const filePath = path.join(storiesPath, `${title.replace(/\s+/g, '-')}.txt`);

        // Write the story to the file
        fs.writeFile(filePath, story, (err) => {
            if (err) {
                res.status(500).json({ message: 'Failed to save story' });
            } else {
                res.status(200).json({ message: 'Story saved successfully', filePath });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
