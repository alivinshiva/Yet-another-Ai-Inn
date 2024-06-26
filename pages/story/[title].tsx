import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import cleanTitle from "@/lib/cleanTitle";

interface Story {
    title: string;
    content: string;
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
                    const story = data.find((story) => cleanTitle(story.title) === title);
                    if (story) {
                        setStory({
                            ...story,
                            title: cleanTitle(story.title),
                            content: cleanTitle(story.content),
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching stories:', error);
                });
        }
    }, [title]);

    if (!story) {
        return <p>Loading...</p>;
    }
    const contentStartIndex = story.content.indexOf(story.title) + story.title.length;
    const storyContent = story.content.slice(contentStartIndex);
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
            <article className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
                <h1 className="text-4xl font-bold mb-8">{story.title}</h1>

                <p className="text-gray-700 whitespace-pre-line">{storyContent}</p>
            </article>
        </main>
    );
};

export default StoryDetail;
