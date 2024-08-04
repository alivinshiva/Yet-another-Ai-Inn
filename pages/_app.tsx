import "@/app/globals.css";
import Header from '@/components/Header';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </ClerkProvider>
  );
}

export default MyApp;
