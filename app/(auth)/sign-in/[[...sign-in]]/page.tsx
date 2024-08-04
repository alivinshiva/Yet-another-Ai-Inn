import { SignIn } from '@clerk/nextjs';
import React from 'react';
import { FlipWords } from "@/components/ui/flip-words";

function SignInPage() {
  const words = ["Welcome!", "Bienvenue!", "Willkommen!", "benvenuto!"];
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Welcome Message Section */}
      <div className="w-full md:w-1/1 bg-purple-700 text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4">
          <FlipWords words={words} className='text-white' /> <br />
        </h1>
        <p className="text-lg">Sign in to access your account and continue your journey with us.</p>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
