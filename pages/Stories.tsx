import React, { useEffect, useState } from 'react';
import cleanTitle from "@/lib/cleanTitle";
import Link from 'next/link';
import { BookOpenText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Story {
  title: string;
  story: string;
  language: string;
}

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [storyCount, setStoryCount] = useState<number>(0);


  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch('/api/getStories');
        if (response.ok) {
          const data = await response.json();
          setStories(data);
        } else {
          console.error('Failed to fetch stories');
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    }

    fetchStories();
  }, []);

  useEffect(() => {
    fetch('/api/storyCount')
      .then((response) => response.json())
      .then((data) => {
        setStoryCount(data.count);
      })
      .catch((error) => {
        console.error('Error fetching story count:', error);
      });
  }, []);

  return (
    <main className="flex-1 flex flex-col p-8">
      <div className="flex justify-between items-center relative">
        <h1 className="text-3xl font-bold mb-8">Story Library</h1>
        <p className="absolute flex items-center top-0 right-0 bg-purple-500 text-white font-bold p-3 rounded-lg m-2 text-1xl">
          <BookOpenText className='w-8 h-8 mr-1' />
          {storyCount === 1 ? `${storyCount} Story` : `${storyCount} Stories`}
        </p>
      </div>
      {stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 11l3.293 3.293a1 1 0 1 1-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 11 5.293 7.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
          </svg>
          <p className="text-lg text-gray-600 mb-2">No stories found.</p>
          <p className="text-sm text-gray-500 mb-4">Start by generating a story using the writer tool.</p>
          <Button asChild className="px-4 py-2 bg-purple-700 text-white rounded-md shadow-md hover:bg-purple-400">
            <Link href='/'> Generate Story </Link>
          </Button>
        </div>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {stories.length === 0 ? null : (
          stories.map((story, index) => {
            const contentStartIndex = story.story.indexOf(story.title) + story.title.length;
            const storyContent = story.story.slice(contentStartIndex, contentStartIndex + 150);
            return (
              <div key={index} className="bg-white p-4 shadow-md rounded-md relative">
                <div className="absolute flex items-center top-0 right-0 bg-purple-500 text-white font-bold p-1 m-2 rounded-lg text-1xl">{story.language}</div>
                <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                <p className="text-gray-700">{cleanTitle(storyContent)}...</p>
                <Link href={`/story/${cleanTitle(story.title)}`} key={index}>
                  <Button variant="secondary" className="flex items-center mt-3  bg-purple-300 font-bold">
                    <BookOpenText className="mr-2" />
                    Read More
                  </Button>
                </Link>
              </div>
            );
          }))}
      </div>
    </main >
  );
};

export default Stories;


