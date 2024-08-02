import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string ;
const client = new MongoClient(uri);

interface Story {
  story: string;
  title: string;
  language: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { story, title, language }: Story = req.body;

  try {
    await client.connect();
    const database = client.db('your-database-name');
    const stories = database.collection('stories');

    const result = await stories.insertOne({ title, story, language, createdAt: new Date() });

    res.status(201).json({ message: 'Story saved successfully', storyId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save story' });
  } finally {
    await client.close();
  }
}
