"use client"
import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import { GoogleGenerativeAI } from '@google/generative-ai'


function Writer() {
    const [story, setStory] = useState<string>("");
    const [pages, setPages] = useState<number>();
    const [progress, setProgress] = useState("");
    const [runStarted, setRunStarted] = useState<boolean>(false);
    const [runFinished, setRunFinished] = useState<boolean | null>(null);
    const [currentTool, setCurrentTool] = useState("")
    const [response, setResponse] = useState<string>(""); // New state for storing the response
    const [error, setError] = useState<string>(''); // New state for storing errors

    async function runScript() {
        setRunStarted(true)
        setRunFinished(false)
        setProgress("AI Storyteller has started...");
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
                                text: `Description: Writes a children's book based on a ${story} or a complete story. Steps:1. If the story is inappropriate for children, abort the process. 2. Come up with an appropriate title for the story based on the story. 3. If the story is a prompt and not a complete children's story, generate a story based on the prompt. You are an accomplished children's story writer. You like to write with a style that is appropriate for children butbis still interesting to read. With your style, write a story based on ${story} that has ${pages} pages. Along with the story, write an extensive description of each character's physical appearance. Be sure to include things like hairncolor, skin tone, hair style, species, and any other signiciant characteristics. Write an extensive description of what settings in the story look like as well. Finally, determine what should be tha title of story If the ${story} provides one, use that.`,
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
            await saveStory(generatedResponse, "Generated Story Title");
        } catch (err) {
            setError('Error generating response. Please try again.');
            console.error('Error generating response:', err);
            setRunFinished(false);
        }
    }

            // save story 

    async function saveStory(story: string, title: string) {
        try {
          const response = await fetch('/api/saveStory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ story, title }),
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
                    className='flex-1 text-black' placeholder='Write a story of human and robot who become friends...' />

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

                <Button disabled={!pages || !story || runStarted} className='w-full' size='lg' onClick={runScript}>
                    Generate Story
                </Button>
            </section>

            <section className='flex-1 pb-5 mt-5'>
                {/* Generated story section */}
                <div className='flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto'>
                    <div>
                        {runFinished === null && (
                            <>
                                <p className='animate-pulse mr-5'>I'm waiting... 😒 </p>
                                <br />
                            </>
                        )}
                        <span className='mr-5'>{'>>>'}</span>
                        {progress}
                    </div>

                    {/* Render generated response */}
                    {response && (
                        <div className='py-10'>
                            <span className='mr-5'>{"--- [Generated Story] ---"}</span>
                            <div>{response}</div>
                            <div className='flex space-x-2 mt-4'>
                                <Button className='w-full' size='lg' onClick={copyToClipboard}>Copy to Clipboard</Button>
                            </div>
                        </div>
                    )}

                    {/* Tools */}
                    {currentTool && (
                        <div className='py-10'>
                            <span className='mr-5'>{"--- [Current Tool] ---"}</span>
                            {currentTool}
                        </div>
                    )}

                    {/* Render events */}
                    <div className='space-y-5'>
                        {/* Add events rendering logic here if needed */}
                    </div>

                    {runStarted && (
                        <div>
                            <span className='mr-5 animate-in'>{"--- [Please wait] ---"}</span>
                        </div>
                    )}
                </div>

            </section>
        </div>
    )
}

export default Writer;
