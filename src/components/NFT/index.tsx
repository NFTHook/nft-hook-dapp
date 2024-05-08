import styled from 'styled-components';
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface Prop {
    src: string
}

export default function NFT({ src }: Prop) {
    return (
        <NFTWrapper>
            <AspectRatio ratio={9 / 9} className="bg-muted overflow-hidden">
                <img className='image rounded-none object-cover' src={src} alt="" />
            </AspectRatio>
            <h3 className='text-sm py-2'>Bonsai #32</h3>
            <h1 className='barlow-medium pb-3'>From ¥11,650 JPY</h1>
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