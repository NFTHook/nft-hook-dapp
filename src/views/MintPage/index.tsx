import styled from 'styled-components';
import Ping from "@/components/ui/ping";
import { useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Terminal } from "lucide-react";

export default function Mint() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Detail className='px-2 md:px-0 md:max-w-screen-lg flex-col md:flex-row mx-auto mt-10'>
                <Image src={'https://images.blur.io/_blur-prod/0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949/7837-b909f461a085ef8e?w=512'}></Image>
                <Info>
                    <div>
                        <Badge><Ping /><span className='ml-1'>Minting now</span></Badge>
                        <Badge>Finished</Badge>
                    </div>
                    <div className='flex items-center mt-4'>
                        <Terminal className="h-8 w-8" />
                        <h1 className='barlow-medium-italic text-3xl'>RacCOOL</h1>
                    </div>
                    <div className='tracking-widest mt-8 flex flex-col gap-4'>
                        <Button variant="outline" className='block w-full border-black'>Mint 1 for <span className='barlow-medium-italic'>0.0025</span> ETH</Button>
                        <Button variant="outline" className='block w-full border-black'>Mint 1 for <span className='barlow-medium-italic'>0.0025</span> ETH</Button>
                        <Button variant="outline" className='block w-full border-black'>Mint 1 for <span className='barlow-medium-italic'>0.0025</span> ETH</Button>
                        <Button variant="outline" className='block w-full border-black'>Mint 1 for <span className='barlow-medium-italic'>0.0025</span> ETH</Button>
                        <Button variant="outline" className='block w-full border-black'>Mint 1 for <span className='barlow-medium-italic'>0.0025</span> ETH</Button>
                    </div>
                </Info>
            </Detail>
        </>
    );
}

const Detail = styled.div`
    min-height: 80vh;
    display: flex;
    align-items: flex-start;
    gap: 32px;
`

const Image = styled.img`
    flex: 0 0 400px;
`

const Info = styled.div`
    flex: 1;
`
