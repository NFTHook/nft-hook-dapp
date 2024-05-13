import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAppSelector, RootState } from '@/store';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { nftList } from '@/api';
import { NFTv0 } from './type';
import { ResultEnum } from '@/enums/httpEnum';
import { useToast } from "@/components/ui/use-toast";
import NFT from '@/components/NFT';

export default function Homepage() {
    const storeDevice = useAppSelector((s: RootState) => s.global.device)
    const { toast } = useToast()
    const [list, setList] = useState<NFTv0[] | null>(null)

    useEffect(() => {
        if (list) return;
        nftList().then(res => {
            if (res.code === ResultEnum.SUCCESS) {
                setList(res.data.list)
            } else {
                toast({
                    variant: "destructive",
                    title: res.message,
                })
            }
        })
    }, [])

    return (
        <>
            <Banner>
                <AspectRatio ratio={storeDevice === 'mobile' ? 15 / 12 : 15 / 7} className="overflow-hidden">
                    <Image />
                    <Cover>
                        <h1 className='barlow-light text-4xl md:text-6xl text-white'>Original Artwork</h1>
                        <Button variant="outline" className='text-white mt-8 px-8 text-base'>Show All</Button>
                    </Cover>
                </AspectRatio>
            </Banner>
            <Wrapper className='w-full mx-auto px-2 lg:px-4 max-w-screen-xl mt-4'>
                {
                    list?.map((v, i) => {
                        return <Link to={`/mint/${v.contract_addr}`} key={i}><NFT options={v} /></Link>
                    })
                }
            </Wrapper>
            <div className='text-center py-8'>
                <Button className='px-8'>View All</Button>
            </div>
        </>
    );
}

let BG = 'https://shopweshenry.com/cdn/shop/files/Web_Header_new1_2000x.jpg?v=1705403279'
const Banner = styled.div`

`
const Cover = styled.div`
    position: absolute;
    z-index: 1;
    inset: 0;
    background: rgba(0,0,0,.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Image = styled.div`
    background: url(${BG}) no-repeat center center / cover;
    position: absolute;
    z-index: 0;
    inset: 0;
`
const Wrapper = styled.div`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 8px;
    @media (max-width: 640px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
`
