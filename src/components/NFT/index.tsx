import styled from 'styled-components';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { NFTv0 } from '@/views/Homepage/type';
import { getChainById } from '@/utils/chain';
import { Button } from "@/components/ui/button"
import CountUp from 'react-countup';
import Image from '@/components/Image/index';

export default function NFT({ options }: { options: NFTv0 }) {
    return (
        <NFTWrapper>
            <AspectRatio ratio={9 / 9} className="bg-muted overflow-hidden relative">
                <Image className='image rounded-none object-cover' src={options.img} />
                <Cover><Button variant="outline" className='barlow-medium text-white'>{options.name}</Button></Cover>
            </AspectRatio>
            <h3 className='text-sm pt-3 flex items-center gap-1'><Image className='w-4 h-4' src={ getChainById(options.chain_id as string).img } /><span>{options.chain_name}</span></h3>
            <h2 className='text-sm barlow-medium-italic pt-1 pb-3'>Holders: <CountUp end={options?.holder_num ?? 0} /></h2>
        </NFTWrapper>
    )
}

const Cover = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

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