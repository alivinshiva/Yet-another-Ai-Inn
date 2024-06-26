import React, { useEffect, useState } from 'react';
import cleanTitle from "@/lib/cleanTitle";
import { title } from 'process';
import Link from 'next/link';

interface Story {
  title: string;
  content: string;
}

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetch('/api/stories')
      .then((response) => response.json())
      .then((data: Story[]) => {
        const cleanedData = data.map((story) => ({
          ...story,
          title: cleanTitle(story.title),
          content: cleanTitle(story.content),
        }));
        console.log('Fetched stories:', cleanedData); // Debug log
        setStories(cleanedData);
      })
      .catch((error) => {
        console.error('Error fetching stories:', error); // Error log
      });
  }, []);

  return (
    <main className="flex-1 flex flex-col p-8">
      <h1 className="text-3xl font-bold mb-8">Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.length === 0 ? (
          <p>No stories found.</p>
        ) : (
          stories.map((story, index) => {
            const contentStartIndex = story.content.indexOf(story.title) + story.title.length;
            const storyContent = story.content.slice(contentStartIndex, contentStartIndex + 100);

            return (
              <Link href={`/story/${cleanTitle(story.title)}`} key={index}>
              <div key={index} className="border rounded-lg p-4 cursor-pointer shadow-md">
                <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                <p className="text-gray-700">{storyContent}...</p>
              </div>
              </Link>
            );
          })
        )}
      </div>
    </main>
  );
};

export default Stories;
