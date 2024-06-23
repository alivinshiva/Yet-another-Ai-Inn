"use client"
import React, { use, useState } from 'react'
import { Textarea } from './ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'
import path from 'path'
import { error, log } from 'console'
import { comma } from 'postcss/lib/list'
import { Frame } from '@gptscript-ai/gptscript'


const storiesPath = 'public/stories';


function Writer() {
    const [story, setStory] = useState<string>("");
    const [pages, setPages] = useState<number>();
    const [progress, setProgress] = useState("");
    const [runStarted, setRunStarted] = useState<boolean>(false);
    const [runFinished, setRunFinished] = useState<boolean | null>(null);
    const [currentTool, setCurrentTool] = useState("")
    const [events, setEvents] = useState<Frame[]>([])


    async function runScript() {
        setRunStarted(true)
        setRunFinished(false)

        const response = await fetch('/api/run-script', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ story, pages, path: storiesPath })
        });

        if (response.ok && response.body) {
            // handle stream from api
            // ...
            console.log("streaming started");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            handleStream(reader, decoder)


        } else {
            setRunFinished(true);
            setRunStarted(false);
            console.error("Failed to start streaming")

        }
    }
    async function handleStream(reader: ReadableStreamDefaultReader<Uint8Array>, decoder: TextDecoder) {
        // manage the stream
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            // it decode Unit8 into string 
            const chunk = decoder.decode(value, { stream: true });

            // manage chunk
            const eventData = chunk
                .split("\n\n")
                .filter((line) => line.startsWith("event:"))
                .map((line) => line.replace(/^event: /, ""))

            eventData.forEach(data => {
                try {
                    const parsedData = JSON.parse(data)
                    if (parsedData.type === "callProgress") {
                        setProgress(
                            parsedData.output[parsedData.output.length - 1].Content
                        )
                        setCurrentTool(parsedData.tool?.descriptions || "")
                    } else if (parsedData.type === "callStart") {
                        setCurrentTool(parsedData.tool?.descriptions || "")

                    } else if (parsedData.type === "runFinish") {
                        setRunFinished(true);
                        setRunStarted(false);
                    } else {
                        setEvents((prevEvents) => [...prevEvents, parsedData])
                    }
                } catch (error) {
                    console.error("failed to parse JSON", error)

                }
            })


        }
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
                        <SelectValue placeholder="Number of page" />
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

                <div className='flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto'>
                    <div>
                        {runFinished === null && (
                            <>
                                <p className='animate-pulse mr-5'>Im waiting... </p>
                                <br />
                            </>
                        )}

                        <span className='mr-5'>{'>>>'}</span>
                        {progress}
                    </div>
                    {/* tools */}
                    {currentTool && (
                        <div className='py-10'>
                            <span className='mr-5'>{"--- [Current Tool]---"}</span>

                            {currentTool}
                        </div>
                    )}
                    {runStarted && (
                        <div>
                            <span className='mr-5 animate-in'>{"--- [AI Storyteller Has Started]---"}</span>



                        </div>
                    )}
                </div>

            </section>


        </div>
    )
}

export default Writer