import React from 'react';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import Header from '../components/Header'; // Import the Header component


interface Story {
  filename: string;
  title: string;
  contentPreview: string;
}

const Stories: React.FC<{ stories: Story[] }> = ({ stories }) => {
  return (
    <div>
      <Header /> // Render the Header component

      <h1>Stories</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.filename}>
            <Link href={`/story/${story.filename}`}>
              <div className="bg-purple-500 p-4 mb-4 border border-gray-300 rounded shadow-sm">
                <h2 className="mt-0">{story.title}</h2>
                <p className="text-base text-gray-600">{story.contentPreview}...</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const storiesPath = path.join(process.cwd(), 'public', 'stories');
  const filenames = fs.readdirSync(storiesPath);

  const stories = filenames.map((filename) => {
    const filePath = path.join(storiesPath, filename);
    const content = fs.readFileSync(filePath, 'utf8');

    function extractTitle(text: string): string | null {
      const titlePattern = /^##\s*(.*?)\s*$/m;
      const match = text.match(titlePattern);
      return match ? match[1] : null;
    }

    const title = extractTitle(content);
    const contentPreview = content.substring(0, 100);

    return {
      filename: filename.replace('.txt', ''),
      title: title || 'Untitled',
      contentPreview,
    };
  });

  return {
    props: {
      stories,
    },
  };
}

export default Stories;