"use client";
import React, { useState } from "react";

const Footer: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);
  const [showCopyright, setShowCopyright] = useState(false);

  return (
    <footer className="bg-white text-black py-8 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button
            onClick={() => setShowTerms(true)}
            className="hover:underline"
          >
            Terms and Conditions
          </button>
          <button
            onClick={() => setShowRefundPolicy(true)}
            className="hover:underline"
          >
            Refund Policy
          </button>
          <button
            onClick={() => setShowCopyright(true)}
            className="hover:underline"
          >
            Copyright
          </button>
        </div>

        <div className="text-center mb-4 md:mb-0">
          <p className="text-purple-500">
            <strong>Social Connect</strong>
          </p>
          <div className="flex space-x-4 mt-4 justify-center">
            <a href="https://github.com/alivinshiva">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                fill="rgb(126 34 206)"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/alivinshiva/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="7.025 7.025 497.951 497.95"
              >
                <path
                  fill="rgb(126 34 206)"
                  d="M256 7.025C118.494 7.025 7.025 118.494 7.025 256S118.494 504.975 256 504.975 504.976 393.506 504.976 256C504.975 118.494 393.504 7.025 256 7.025zm-66.427 369.343h-54.665V199.761h54.665v176.607zM161.98 176.633c-17.853 0-32.326-14.591-32.326-32.587 0-17.998 14.475-32.588 32.326-32.588s32.324 14.59 32.324 32.588c.001 17.997-14.472 32.587-32.324 32.587zm232.45 199.735h-54.4v-92.704c0-25.426-9.658-39.619-29.763-39.619-21.881 0-33.312 14.782-33.312 39.619v92.704h-52.43V199.761h52.43v23.786s15.771-29.173 53.219-29.173c37.449 0 64.257 22.866 64.257 70.169l-.001 111.825z"
                ></path>
              </svg>
            </a>
            <a href="https://x.com/alivinshiva">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="12" fill="rgb(126, 34, 206)" />
                <path
                  fill="#ffffff"
                  d="M19.633 7.593a6.542 6.542 0 0 1-1.885.516 3.296 3.296 0 0 0 1.443-1.817 6.575 6.575 0 0 1-2.084.797 3.282 3.282 0 0 0-5.593 2.993 9.313 9.313 0 0 1-6.766-3.431 3.282 3.282 0 0 0 1.016 4.38 3.27 3.27 0 0 1-1.486-.41v.041a3.281 3.281 0 0 0 2.632 3.218 3.293 3.293 0 0 1-.862.115c-.21 0-.417-.02-.618-.059a3.284 3.284 0 0 0 3.065 2.278 6.58 6.58 0 0 1-4.075 1.404c-.264 0-.526-.015-.785-.045a9.293 9.293 0 0 0 5.034 1.476c6.038 0 9.341-5 9.341-9.342 0-.143-.004-.286-.01-.428a6.667 6.667 0 0 0 1.638-1.698z"
                />
              </svg>

            </a>
            <a href="mailto:alivin612003@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="12" fill="rgb(126 34 206)" />
                <path
                  fill="#ffffff"
                  d="M12 13.6l7-4.375V16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9.225L12 13.6zM12 12L5 8V7.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5V8l-7 4z"
                />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-sm text-center md:text-right">
          © {new Date().getFullYear()} Script Gen AI. All rights reserved.
        </p>
      </div>

      {/* Privacy Policy Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
            <div className="mb-4 h-64 overflow-y-scroll">  {/* Set a fixed height and enable scrolling */}
              <p>
                1. Acceptance of Terms<br />
                By accessing and using Script Gen AI, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. These terms apply to all visitors, users, and others who access or use our service.<br /><br />

                2. Services Provided<br />
                Script Gen AI allows users to generate stories using artificial intelligence. The content generated is based on user inputs and may vary in quality and accuracy. We do not guarantee that the generated content will meet your specific requirements.<br /><br />

                3. User Accounts<br />
                To access certain features of the website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.<br /><br />

                4. User Conduct<br />
                You agree not to use Script Gen AI for any unlawful purpose or in any way that might harm, disrupt, or interfere with the functioning of the website or services. You are prohibited from uploading or sharing any content that is offensive, harmful, or infringes on the rights of others.<br /><br />

                5. Intellectual Property<br />
                All content, including text, graphics, logos, images, and software, available on Script Gen AI is the property of Script Gen AI or its content suppliers and is protected by intellectual property laws. You may not copy, reproduce, distribute, or create derivative works of any content without our explicit written permission.<br /><br />

                6. User-Generated Content<br />
                By using our service to generate stories, you grant Script Gen AI a non-exclusive, royalty-free, perpetual, and irrevocable license to use, reproduce, modify, and distribute the generated content. You retain ownership of any content you create, but you grant us the right to use it for our business purposes.<br /><br />

                7. Privacy<br />
                We are committed to protecting your privacy. No user data is collected until a story is created, and we do not share user data with any third party.<br /><br />

                8. Refunds<br />
                Refunds are only provided if no purchased credits have been used. Once credits are utilized, no refund will be issued. For more details, please refer to our Refund Policy.<br /><br />

                9. Changes to Terms<br />
                We reserve the right to update or modify these terms at any time. Any changes will be effective immediately upon posting. Your continued use of Script Gen AI after the changes have been posted constitutes your acceptance of the new terms.<br /><br />

                10. Contact Us<br />
                If you have any questions or concerns about these Terms and Conditions, please contact us at <br />
                <hr />
                Mail: alivin612003@gmail.com <br />
                Phone: +91 7673032928<br />
                Address: 80/3 Patia, Bhubaneswar, Odisha 751024. <br />
                Thank You,<br />
                Team Scrript Gen AI.
              </p>
            </div>
            <button
              onClick={() => setShowTerms(false)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}


      {/* Refund Policy Modal */}
      {showRefundPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Refund Policy</h2>
            <p className="mb-4">
              Refunds are only provided if no purchased credits have been used.
            </p>
            <button
              onClick={() => setShowRefundPolicy(false)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Copyright Modal */}
      {showCopyright && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Copyright Information</h2>
            <p className="mb-4">
              Script Gen AI is a product of Alivin Shiva. All content generated
              through this platform is protected by copyright.
            </p>
            <button
              onClick={() => setShowCopyright(false)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
