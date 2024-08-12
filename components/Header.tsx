"use client";
import { BookOpen, FilePen, PartyPopper, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { FlipWords } from "@/components/ui/flip-words";
import { useAuth } from '@clerk/nextjs';

function Header() {
    const words = ["To life!", "To live!"];
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <header className='relative px-4 py-8 md:py-24 text-center md:px-16'>
            <Link href='/'>
                <h1 className='text-4xl md:text-6xl font-black'>Script Gen AI</h1>
                <div className='flex flex-col items-center justify-center whitespace-nowrap space-y-2 md:space-y-0 md:flex-row md:space-x-5 text-2xl md:text-3xl lg:text-5xl'>
                    <h2>Bringing your imagination</h2>
                    <div className='relative'>
                        <div className='absolute bg-purple-500 -left-1 -top-1 -bottom-1 -right-1 md:-left-2 md:-top-2 md:-bottom-2 md:-right-2 -rotate-2' />
                        <div className='relative text-white'>
                            <FlipWords words={words} className='text-white' /> <br />
                        </div>
                    </div>
                </div>
            </Link>
            <p className="text-sm md:text-xl text-gray-500 mt-2">This site is in development. Please pardon our dust!</p>

            {/* Hamburger Menu for Mobile */}
            <div className='absolute top-4 right-4 md:hidden'>
                <Menu
                    className='w-8 h-8 text-purple-500 cursor-pointer'
                    onClick={toggleSidebar}
                />
            </div>

            {/* Sidebar for Mobile */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
            >
                <div className='flex justify-between items-center p-4'>
                    <h2 className='text-xl font-black'>Menu</h2>
                    <X
                        className='w-6 h-6 text-purple-500 cursor-pointer'
                        onClick={toggleSidebar}
                    />
                </div>
                <nav className='flex flex-col space-y-4 p-4'>
                    <Link href='/' onClick={toggleSidebar} className='flex items-center space-x-2'>
                        <FilePen className='w-6 h-6 text-purple-500' />
                        <span className='text-purple-500 font-bold text-lg'>Home</span>
                    </Link>
                    <Link href='/Stories' onClick={toggleSidebar} className='flex items-center space-x-2'>
                        <BookOpen className='w-6 h-6 text-purple-500' />
                        <span className='text-purple-500 font-bold text-lg'>Stories</span>
                    </Link>
                    <Link href='/Billing' onClick={toggleSidebar} className='flex items-center space-x-2'>
                        <PartyPopper className='w-6 h-6 text-purple-500' />
                        <span className='text-purple-500 font-bold text-lg'>Billing</span>
                    </Link>
                    {isSignedIn && (
                        user ? (
                            <div className='flex items-center space-x-2 text-center' onClick={toggleSidebar} >
                                {/* <User className='w-6 h-6 text-purple-500' /> */}
                                <UserButton />
                                <span className='font-bold text-purple-500'>{user.fullName || 'User'}</span>
                            </div>
                        ) : (
                            <div className='flex items-center space-x-2 text-center' onClick={toggleSidebar}>
                                <User className='w-6 h-6 text-purple-500' />
                                <span className='font-bold text-purple-500'>Guest</span>
                            </div>
                        )
                    )}
                </nav>

            </div >

            {/* Icons for larger screens */}
            < div className='hidden md:flex absolute top-20 right-4 md:top-10 md:right-10 space-x-2 z-10' >
                {
                    isSignedIn ? (
                        <>
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

                            <Link href='/Billing'>
                                <PartyPopper
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
                        </>
                    ) : (
                        <p className="text-xs md:text-sm text-gray-500 mt-4 md:mt-10">Sign in to access more features</p>
                    )
                }
            </div >
        </header >
    );
}

export default Header;
