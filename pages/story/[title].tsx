import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import cleanTitle from "@/lib/cleanTitle";
import formatStoryContent from "@/lib/formatStoryContent";
import './StoryDetail.css';

interface Story {
    title: string;
    story: string;
    language: string;
}

const StoryDetail: React.FC = () => {
    const router = useRouter();
    const { title } = router.query;
    const [story, setStory] = useState<Story | null>(null);

    useEffect(() => {
        if (title) {
            fetch('/api/stories')
                .then((response) => response.json())
                .then((data: Story[]) => {
                    const cleanedTitle = cleanTitle(title as string);
                    const foundStory = data.find((story) => cleanTitle(story.title) === cleanedTitle);
                    if (foundStory) {
                        setStory({
                            ...foundStory,
                            title: cleanTitle(foundStory.title),
                            story: cleanTitle(foundStory.story),
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching stories:', error);
                });
        }
    }, [title]);

    if (!story) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    const contentStartIndex = story.story.indexOf(story.title) + story.title.length;
    const storyContent = story.story.slice(contentStartIndex);
    const finalStory = formatStoryContent(storyContent);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <article className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <h1 className="text-4xl font-bold mb-8">{story.title}</h1>
                <p className="text-gray-700 whitespace-pre-wrap font-mono font-semibold text-xl" dangerouslySetInnerHTML={{ __html: finalStory }}></p>
            </article>
        </main>
    );
};

export default StoryDetail;