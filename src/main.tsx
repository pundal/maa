import React, { Component, ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './i18n/LanguageContext';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  props: ErrorBoundaryProps;
  state: ErrorBoundaryState = {
    hasError: false,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1a0505] text-[#ffd700] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-[#2a0808] p-8 rounded-3xl border border-[#d4af37]/40 shadow-2xl space-y-4">
            <h1 className="text-2xl font-serif-cinzel font-bold">Pundal Durga Puja Mandap</h1>
            <p className="text-sm text-[#f5f2ed]/80">
              Welcome to Pundal Durga Mandap. If the page did not load immediately, please refresh.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#ffd700] to-[#ffb700] text-[#1a0505] font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-transform cursor-pointer"
            >
              Refresh Portal
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
);
