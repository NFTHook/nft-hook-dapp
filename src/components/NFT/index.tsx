import styled from 'styled-components';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { NFTv0 } from '@/views/Homepage/type';
import { Chains } from '@/utils/chain';
import Image from '@/components/Image/index';

export default function NFT({ options }: { options: NFTv0 }) {
    return (
        <NFTWrapper>
            <AspectRatio ratio={9 / 9} className="bg-muted overflow-hidden">
                <Image className='image rounded-none object-cover' src={options.img} />
            </AspectRatio>
            <h3 className='text-sm py-2 flex items-center gap-1'><Image className='w-4 h-4' src={ Chains[options.chain_id as string].img } /><span>{options.chain_name}</span></h3>
            <h1 className='barlow-medium pb-3'>{options.name}</h1>
        </NFTWrapper>
    )
}

const NFTWrapper = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: all .3s;
    .image {
        transition: all .3s;
    }
    &:hover {
        .image {
            transform: scale(1.05);
        }
        h3 {
            text-decoration: underline;
        }
    }
`