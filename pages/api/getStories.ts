import { connectToDatabase } from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { userId } = getAuth(req);

  const db = await connectToDatabase();
  const collection = db.collection('stories');

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });

  }
  if (method === 'GET') {
    if (query.title) {
      const title = decodeURIComponent(query.title as string);
      const story = await collection.findOne({ title });
      if (story) {
        res.status(200).json(story);
      } else {
        res.status(404).json({ error: 'Story not found' });
      }
    } else {
      const stories = await collection.find({ userId }).toArray();
      res.status(200).json(stories);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
