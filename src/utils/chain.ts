import ZORA from '@/assets/logo/zora.png';
import BASE from '@/assets/logo/base.png';
import ETH from '@/assets/logo/eth.png';
import OP from '@/assets/logo/op.png';

interface ChainsMap {
    [key: string]: {
        img: string
        name: string
    }
}

export const Chains: ChainsMap = {
    '7777777': {
        img: ZORA,
        name: 'Zora'
    },
    '1': {
        img: ETH,
        name: 'Ethereum'
    },
    '10': {
        img: OP,
        name: 'OP Mainnet'
    },
    '8453': {
        img: BASE,
        name: 'Base'
    }
}