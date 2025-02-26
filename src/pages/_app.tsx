import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import ParallaxBackground from '../components/ParallaxBackground';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ParallaxBackground />
      <Component {...pageProps} />
    </ThemeProvider>
  );
} 