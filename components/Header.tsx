import { BookOpen, FilePen, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { FlipWords } from "@/components/ui/flip-words";


function Header() {
    const words = ["To life!", "To live!"];

    return (
        <header className='relative p-16 text-center'>
            <Link href='/'>
                <h1 className='text-6xl font-black'>Script Gen AI</h1>
                <div className='flex justify-center whitespace-nowrap space-x-5 text-3xl lg:text-5xl'>
                    <h2>Bringing your imagination</h2>
                    <div className='relative'>
                        <div className='absolute bg-purple-500 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-2' />
                        <div className='relative text-white'>
                            {/* To life! */}
                            <FlipWords words={words} className='text-white' /> <br />
                        </div>
                    </div>
                </div>
            </Link>
            <p className="text-xl text-gray-500 mt-2">This site is in development. Please pardon our dust!</p>
            <div className='absolute -top-5 right-5 flex space-x-2'>
                <Link href='/'>
                    <FilePen
                        className='w-8 h-8 lg:w-10 mx-auto text-purple-500 mt-10 border border-purple-500 p-2 rounded-md hover:opacity-50 cursor-pointer'
                    />
                </Link>

                <Link href='/Stories'>
                    <BookOpen
                        className='w-8 h-8 lg:w-10 mx-auto text-purple-500 mt-10 border border-purple-500 p-2 rounded-md hover:opacity-50 cursor-pointer'
                    />
                </Link>
                <div className='relative'>
                    <User
                        className='w-8 h-8 lg:w-10 mx-auto text-purple-500 mt-10 border border-purple-500 p-2 rounded-md hover:opacity-50 cursor-pointer'
                    />
                    <div className='absolute top-5 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100'>
                        <UserButton />

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
