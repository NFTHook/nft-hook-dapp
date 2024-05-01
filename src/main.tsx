import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import store from '@/store';
import { Provider } from 'react-redux';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query'
import { config, queryClient } from '@/lib/wagmi';
import '@/lib/wagmi';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <Provider store={ store }>
        <App />
      </Provider>
    </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
