import ZORA from '@/assets/logo/zora.png';
import BASE from '@/assets/logo/base.png';
import ETH from '@/assets/logo/eth.png';
import OP from '@/assets/logo/op.png';

interface Chain {
    img: string
    name: string
    explore: string
}
interface ChainsMap {
    [key: string]: Chain
}

export const Chains: ChainsMap = {
    '7777777': {
        img: ZORA,
        name: 'Zora',
        explore: 'https://explorer.zora.energy',
    },
    '1': {
        img: ETH,
        name: 'Ethereum',
        explore: 'https://etherscan.io',
    },
    '10': {
        img: OP,
        name: 'OP Mainnet',
        explore: 'https://optimistic.etherscan.io'
    },
    '8453': {
        img: BASE,
        name: 'Base',
        explore: 'https://basescan.org',
    }
}

const defaultChain: Chain = {
    img: ETH,
    name: 'Ethereum',
    explore: 'https://etherscan.io/',
  };

export function getChainById(id: string): Chain {
    if (id in Chains) {
        return Chains[id]
    }
    return defaultChain
}