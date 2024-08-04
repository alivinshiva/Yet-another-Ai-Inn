import { SignUp } from '@clerk/nextjs';
import React from 'react';

function SignUpPage() {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <SignUp />
      </div>
      <div className="hidden md:flex w-1/2 bg-purple-700 text-white flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg">Sign in to access your account and continue your journey with us.</p>
      </div>
    </div>
  );
}

export default SignUpPage;
