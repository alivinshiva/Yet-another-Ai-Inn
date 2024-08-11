import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


const BillingPage: React.FC = () => {
 

    useEffect(() => {
        // This will run only on the client side
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
        script.setAttribute('data-payment_button_id', 'fgjkldshgkldshjg');
        script.async = true;
            //TODO
        const form = document.getElementById('razorpay-payment-form');
        if (form) {
            form.appendChild(script);
        }
    }, []);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12">
            <h1 className="text-3xl font-bold mb-8">Upgrade With Yearly Plan</h1>
            <div className="flex justify-center gap-8">
                {/* Free Plan */}
                <div className="w-80 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">Free</h2>
                    <p className="text-4xl font-extrabold text-gray-900 mb-2">0₹<span className="text-xl font-normal"></span></p>
                    <ul className="mt-4 mb-6 space-y-2 text-left">
                        <li className="text-sm">✔ 5 Credits</li>
                        {/* <li className="text-sm">✔ 50+ Content Templates</li> */}
                        <li className="text-sm">✔ Only English </li>
                        <li className="text-sm">❌ No Download</li>
                        <li className="text-sm">✔ 1 Month of History</li>
                    </ul>
                    <button className="w-full bg-purple-100 py-2 rounded-lg font-semibold">
                        Current Plan
                    </button>
                </div>
                {/* Monthly Plan */}
                <div className="w-80 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">Gold</h2>
                    <p className="text-4xl font-extrabold text-gray-900 mb-2">599₹<span className="text-xl font-normal"> /year</span></p>
                    <ul className="mt-4 mb-6 space-y-2 text-left">
                        <li className="text-sm">✔ 300 Credits</li>
                        <li className="text-sm">✔ 50+ Template Access</li>
                        <li className="text-sm">✔ All Language </li>
                        <li className="text-sm">✔ Unlimited Download</li>
                        <li className="text-sm">✔ 1 Year of History</li>
                    </ul>
                    <button className="relative w-full">
                        <div className="flex justify-center items-center w-full h-full">
                            <form
                                id="razorpay-payment-form"
                                className="absolute inset-0 flex justify-center items-center"
                            ></form>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default BillingPage;
