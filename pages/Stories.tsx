import React, { useEffect, useState } from 'react';
import cleanTitle from "@/lib/cleanTitle";
import Link from 'next/link';
import { BookOpenText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverEffect } from "@/components/ui/card-hover-effect";

interface Story {
  title: string;
  story: string;
  language: string;
  date: string;
}

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [storyCount, setStoryCount] = useState<number>(0);
  const [languageFilter, setLanguageFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await fetch(`/api/getStories?language=${languageFilter}&date=${dateFilter}`);
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
  }, [languageFilter, dateFilter]);

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
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Story Library</h1>
        <div className="flex space-x-4 mb-6">
          <Filter
            label="Filter by Language"
            value={languageFilter}
            onChange={setLanguageFilter}
            options={['English', 'Hindi', 'Spanish', 'French', 'German', 'Italian']} 
          />
          <Filter
            label="Filter by Date"
            value={dateFilter}
            onChange={setDateFilter}
            options={['Last 7 Days', 'Last 30 Days', 'All Time']} 
          />
        </div>
        <p className="flex items-center bg-purple-500 text-white font-bold p-3 rounded-lg text-xl">
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
      ) : (
        <HoverEffect items={stories.map(story => ({
          title: story.title,
          language: story.language,
          description: `${cleanTitle(story.story.slice(story.story.indexOf(story.title) + story.title.length, 150))}...`,
          link: `/story/${cleanTitle(story.title)}`,
        }))} />
      )}
    </main>
  );
};

const Filter = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-lg font-medium">{label}</label>
      <select
        className="border border-gray-300 rounded-lg p-2 bg-white dark:bg-slate-700 dark:border-gray-600"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Stories;
