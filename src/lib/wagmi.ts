import React from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { zoraSepolia } from 'wagmi/chains';
import { QueryClient } from '@tanstack/react-query';

// 0. Setup queryClient
export const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'f489110b339b21e1a621222a6e5b2da2'

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [zoraSepolia] as const
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
})

// 3. Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    themeVariables: {
        '--w3m-accent': '#a8ff78',
        '--w3m-font-size-master': '8px',
    }
})