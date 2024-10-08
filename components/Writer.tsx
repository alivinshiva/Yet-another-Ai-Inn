"use client"
import React, { useEffect, useState } from 'react';
import { Textarea } from './ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from './ui/button';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

const languages = ['Hindi', 'English', 'Spanish', 'French', 'German', 'Italian'];

function Writer() {
    const [story, setStory] = useState<string>("");
    const [pages, setPages] = useState<number>();
    const [language, setLanguage] = useState<string>("");
    const [progress, setProgress] = useState("");
    const [runStarted, setRunStarted] = useState<boolean>(false);
    const [runFinished, setRunFinished] = useState<boolean | null>(null);
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const { isSignedIn, userId } = useAuth();
    const [credits, setCredits] = useState<number>(5);

    useEffect(() => {
        if (!isSignedIn) {
            router.push('/sign-in');
            return;
        }

        //user credits
        async function fetchUserCredits() {
            try {
                const response = await fetch(`/api/getUserCredits?userId=${userId}`);
                const data = await response.json();
                setCredits(data.credits);
            } catch (error) {
                console.error('Failed to fetch user credits:', error);
            }
        }

        fetchUserCredits();
    }, [isSignedIn, userId]);

    async function runScript() {
        if (!isSignedIn) {
            toast.error("You must be logged in to generate a story.");
            return;
        }
        if (credits <= 0) {
            toast.error("You have no credits left. Please buy more credits.");
            router.push('/Billing');
            return;
        }

        setRunStarted(true);
        setRunFinished(false);
        setProgress("Shaping your story...");
        const apiKey = process.env.NEXT_PUBLIC_API as string;
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash-001',
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: 'text/plain',
        };

        try {
            const chatSession = model.startChat({
                generationConfig,
                history: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: `Description: Writes a children's book based on a ${story} and ${language} or a complete story, use easy and simple language that can easily be understood by children. Steps:1. Come up with an appropriate title for the story based on the story. 2. If the story is a prompt and not a complete children's story, generate a story based on the prompt. You are an accomplished children's story writer. You like to write with a style that is appropriate for children but is still interesting to read. With your style, write a story based on ${story} and write it in ${language} that has ${pages} pages. Along with the story, write an extensive description of each character's physical appearance and do not mark page numbers in between.`,
                            },
                        ],
                    },
                ],
            });

            const result = await chatSession.sendMessage('Generate response');
            const generatedResponse = await result.response.text();
            setResponse(generatedResponse);
            setRunFinished(true);
            setProgress("Story generation completed.");

            setCredits(prevCredits => prevCredits - 1);

            await fetch('/api/updateUserCredits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, credits: credits - 1 }),
            });
        } catch (err) {
            setError('Error generating response. Please try again.');
            console.error('Error generating response:', err);
            setRunFinished(false);
        }
    }

    function extractTitle(text: string): string | null {
        const titlePattern = /^##\s*(.*?)\s*$/m;
        const match = text.match(titlePattern);
        return match ? match[1] : null;
    }

    const storyTitle = extractTitle(response);

    async function saveStory(story: string, title: string) {
        try {
            const response = await fetch('/api/saveStory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ story, title, language, userId }),
            });

            if (response.ok) {
                console.log('Story saved successfully');
            } else {
                console.error('Failed to save story');
            }
        } catch (error) {
            console.error('Error saving story:', error);
        }
    }

    async function saveStoryButton() {
        if (!isSignedIn) {
            toast.error("You must be logged in to save a story.");
            return;
        }

        if (response) {
            const title = `${storyTitle}`;
            await saveStory(response, title);
            setProgress("Story saved successfully!");
            toast.success("Story generated successfully", {
                action: (
                    <Button onClick={() => router.push("/Stories")} className='bg-purple-500 ml-auto'>
                        View Stories
                    </Button>
                )
            });
        } else {
            setProgress("No story to save.");
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(response).then(() => {
            console.log('Story copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy story:', err);
        });
    }

    return (
        <div className='flex flex-col container'>
            <section className='flex-1 flex flex-col border border-purple-300 rounded-md p-10 space-y-2'>
                <Textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    className='flex-1 text-black'
                    placeholder='Write a story of human and robot who become friends...' />

                <Select onValueChange={value => setPages(parseInt(value))}>
                    <SelectTrigger>
                        <SelectValue placeholder="Number of pages" />
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                        {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem key={i} value={String(i + 1)}>
                                {i + 1}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={value => setLanguage(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                        {languages.map((language, index) => (
                            <SelectItem key={index} value={language}>
                                {language}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    disabled={credits > 0 && (!pages || !story || !language || runStarted)}
                    className='w-full'
                    size='lg'
                    onClick={() => {
                        if (credits > 0) {
                            runScript();
                        } else {
                            router.push('/Billing'); //TODO
                        }
                    }}
                >
                    {credits > 0 ? 'Generate Story' : 'Buy Credits'}
                </Button>

                <div className='text-center mt-4'>
                    <strong className='text-xl text-purple-500'>
                        {credits} Credit Left
                    </strong>
                </div>

            </section>

            <section className='flex-1 pb-5 mt-5'>
                <div className='flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto'>
                    <div>
                        {runFinished === null && (
                            <>
                                <p className='animate-pulse mr-5'>I&apos;m waiting... 😒 </p>
                                <br />
                            </>
                        )}
                        <span className='mr-5'>{'>>>'}</span>
                        {progress}
                    </div>

                    {response && (
                        <div className='py-10'>
                            <span className='mr-5'>{`--- [Generated Story] ---`}</span>
                            <div>{response}</div>
                            <div className='flex space-x-2 mt-4'>
                                <Button className='w-full' size='lg' onClick={copyToClipboard}>Copy to Clipboard</Button>
                                <Button className='w-full' size='lg' onClick={saveStoryButton}>Save Story</Button>
                                <Button disabled={!pages || !story} className='w-full' size='lg' onClick={runScript}>
                                    Re-Generate Story
                                </Button>
                            </div>
                        </div>
                    )}

                    {runStarted && (
                        <div>
                            <span className='mr-5 animate-in'>{`--- [Please wait] ---`}</span>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Writer;
