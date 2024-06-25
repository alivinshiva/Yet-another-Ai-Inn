import React from 'react';
import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type StoryProps = {
    storyContent: string;
    storyTitle: string | null;
};

const Story: React.FC<StoryProps> = ({ storyContent, storyTitle }) => {
    return (
        <div>
            <h1>{storyTitle}</h1>
            <p>{storyContent}</p>
        </div>
    );
};

export default Story;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { storyFile } = context.params!;
    const storiesPath = 'public/stories';
    const storyPath = path.join(storiesPath, `${storyFile}.txt`);

    let storyContent = '';
    try {
        storyContent = fs.readFileSync(storyPath, 'utf8');
    } catch (error) {
        console.error(`Failed to read story file: ${storyPath}`, error);
    }

    const extractTitle = (text: string): string | null => {
        const titlePattern = /^##\s*(.*?)\s*$/m;
        const match = text.match(titlePattern);
        return match ? match[1] : null;
    };
    
    const storyTitle = extractTitle(storyContent);

    return {
        props: {
            storyContent,
            storyTitle,
        },
    };
};
