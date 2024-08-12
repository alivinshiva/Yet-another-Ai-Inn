// /api/getUserCredits.ts

import { connectToDatabase } from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ userId });

    if (user) {
      res.status(200).json({ credits: user.credits });
    } else {
      res.status(200).json({ credits: 5 }); // Default credits for new users
    }
  } catch (error) {
    console.error('Failed to fetch user credits:', error);
    res.status(500).json({ error: 'Failed to fetch user credits' });
  }
}
