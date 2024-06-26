// // pages/api/stories/index.js (or .ts)
// import fs from 'fs';
// import path from 'path';

// export default async function handler(req, res) {
//   try {
//     const storiesPath = path.join(process.cwd(), 'public', 'stories');
//     const files = await fs.promises.readdir(storiesPath);

//     const titles = files.map(file => ({
//       title: path.parse(file).name,
//     }));

//     res.status(200).json(titles);
//   } catch (error) {
//     console.error('Error fetching story titles:', error);
//     res.status(500).json({ error: 'Error fetching story titles' });
//   }
// }
