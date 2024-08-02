import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string ;
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await client.connect();
    const database = client.db('your-database-name');
    const stories = database.collection('stories');

    const storyList = await stories.find({}).toArray();

    res.status(200).json(storyList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  } finally {
    await client.close();
  }
}