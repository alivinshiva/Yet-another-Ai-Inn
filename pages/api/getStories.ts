import { connectToDatabase } from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection('stories');

    if (method === 'GET') {
      const { title, language, date } = query;

      // Build the query object
      let filter: any = { userId };

      if (title) {
        filter.title = decodeURIComponent(title as string);
      }

      if (language) {
        filter.language = decodeURIComponent(language as string);
      }

      if (date) {
        // Assuming date is provided in 'YYYY-MM-DD' format
        const dateFilter = decodeURIComponent(date as string);
        const [startDate, endDate] = dateFilter.split('|');

        if (startDate && endDate) {
          filter.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          };
        }
      }

      const stories = await collection.find(filter).toArray();
      res.status(200).json(stories);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
}
