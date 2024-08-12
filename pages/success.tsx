// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';

// const SuccessPage: React.FC = () => {
//   const router = useRouter();
//   const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = router.query;

//   useEffect(() => {
//     const verifyPayment = async () => {
//       if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
//         try {
//           const response = await axios.post('/api/verifyPayment', {
//             razorpay_payment_id,
//             razorpay_order_id,
//             razorpay_signature,
//           });

//           if (response.data.success) {
//             // Payment is verified, update user credits
//             await axios.post('/api/updateUserCredits', {
//               userId: 'USER_ID', // replace with actual user ID from context or auth
//               credits: 300, // Update credits for Gold Plan
//             });

//             // Optionally, redirect to another page
//             router.push('/dashboard');
//           } else {
//             // Handle verification failure
//             console.error('Payment verification failed');
//           }
//         } catch (error) {
//           console.error('Error verifying payment:', error);
//         }
//       }
//     };

//     verifyPayment();
//   }, [razorpay_payment_id, razorpay_order_id, razorpay_signature]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-8">Processing Payment...</h1>
//       <p className="text-lg">Please wait while we verify your payment.</p>
//     </div>
//   );
// };

// export default SuccessPage;



// dynamically update user credits by clerk
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs'; // Import Clerk's useAuth hook

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = router.query;
  const { userId } = useAuth(); // Get the user ID from Clerk

  useEffect(() => {
    const verifyPayment = async () => {
      if (razorpay_payment_id && razorpay_order_id && razorpay_signature && userId) {
        try {
          const response = await axios.post('/api/verifyPayment', {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          });

          if (response.data.success) {
            // Payment is verified, update user credits
            await axios.post('/api/updateUserCredits', {
              userId, // Pass the Clerk user ID dynamically
              credits: 300, // Update credits for Gold Plan
            });

            // Optionally, redirect to another page
            router.push('/');
          } else {
            // Handle verification failure
            console.error('Payment verification failed');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      }
    };

    verifyPayment();
  }, [razorpay_payment_id, razorpay_order_id, razorpay_signature, userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Processing Payment...</h1>
      <p className="text-lg">Please wait while we verify your payment.</p>
    </div>
  );
};

export default SuccessPage;
