// // /api/updateUserCredits.ts

// import { connectToDatabase } from '@/lib/mongodb';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { userId, credits } = req.body;

//   try {
//     const db = await connectToDatabase();
//     const usersCollection = db.collection('users');

//     const result = await usersCollection.updateOne(
//       { userId },
//       { $set: { credits } },
//       { upsert: true }
//     );

//     res.status(200).json({ message: 'Credits updated successfully' });
//   } catch (error) {
//     console.error('Failed to update user credits:', error);
//     res.status(500).json({ error: 'Failed to update user credits' });
//   }
// }


// razor pay update 
import { connectToDatabase } from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, credits } = req.body;

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { userId },
      { $set: { credits } },
      { upsert: true }
    );

    res.status(200).json({ message: 'Credits updated successfully' });
  } catch (error) {
    console.error('Failed to update user credits:', error);
    res.status(500).json({ error: 'Failed to update user credits' });
  }
}
