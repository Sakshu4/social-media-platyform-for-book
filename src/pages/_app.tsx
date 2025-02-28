import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LoadingProvider } from '../contexts/LoadingContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </ThemeProvider>
  );
} 