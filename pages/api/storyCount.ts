import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {

        const db = await connectToDatabase();
        const collection = db.collection('stories');


        const storyCount = await collection.countDocuments({ userId });

        res.status(200).json({ count: storyCount });
    } catch (error) {
        console.error('Error fetching story count:', error);
        res.status(500).json({ error: 'Failed to fetch story count' });
    }
}
