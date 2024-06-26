// // pages/stories.js (or .tsx if using TypeScript)
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import Header from '@/components/Header'; // Correct import for Header component

// function Stories() {
//   const [storyTitles, setStoryTitles] = useState([]);

//   useEffect(() => {
//     async function fetchStoryTitles() {
//       try {
//         const response = await fetch('/api/stories');
//         if (response.ok) {
//           const titles = await response.json();
//           setStoryTitles(titles);
//         } else {
//           console.error('Failed to fetch story titles');
//         }
//       } catch (error) {
//         console.error('Error fetching story titles:', error);
//       }
//     }

//     fetchStoryTitles();
//   }, []);

//   return (
//     <div className="flex flex-col items-center space-y-5">
//       <Header /> {/* Render the Header component */}
//       <h1 className="text-4xl font-bold mt-8">Story Library</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
//         {storyTitles.map((title, index) => (
//           <Link key={index} href={`/stories/${encodeURIComponent(title.title)}`} className="bg-gray-200 p-4 rounded-md cursor-pointer text-xl font-medium">
//             {title.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Stories;
