import styled from 'styled-components';
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function NFT() {
    return (
        <NFTWrapper>
            <AspectRatio ratio={9 / 9} className="bg-muted overflow-hidden">
                <img className='image rounded-none object-cover' src="https://images.blur.io/_blur-prod/0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949/7837-b909f461a085ef8e?w=512" alt="" />
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