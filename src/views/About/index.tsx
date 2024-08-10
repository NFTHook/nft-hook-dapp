import styled from 'styled-components';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from '@/components/Image/index';
import AVATAR01 from '@/assets/images/team/bayc.jpg';
import AVATAR02 from '@/assets/images/team/azuki.jpg';
import AVATAR03 from '@/assets/images/team/beans.jpg';
import AVATAR04 from '@/assets/images/team/harper.jpg';

export default function About() {

    return (
        <>
            <AboutWrapper className='px-2 md:px-0 md:max-w-screen-md mx-auto py-12 barlow-light'>
                <h1 className='text-4xl'>Welcome To</h1>
                <p className='barlow-light-italic mt-8'>Our team, a dedicated group of Web3 enthusiasts, embarked on our journey into the NFT space driven by our passion for the technology. However, the high cost of early NFTs was a significant barrier to widespread adoption. Discovering Optimistic Layer 2 (OP L2) was a game-changer for us. It enabled us to issue affordable NFTs at a fraction of the cost, opening the door for a broader audience.</p>
                <p className='barlow-light-italic mt-4'>This strategic pivot to L2 was met with remarkable success. We have issued millions of NFTs, democratizing access to digital assets. Our most popular NFT boasts over 100,000 holders, a testament to our approach of making NFTs accessible and valuable across multiple blockchains.</p>
                <p className='barlow-light-italic mt-4'>Our vision is to continue this trajectory, enhancing the utility and engagement of our NFTs. We are committed to innovating and expanding the functionalities of our NFTs, ensuring they offer more than just ownership—creating new ways for holders to interact with and benefit from their digital assets.</p>
                <h1 className='text-4xl mt-12'>About Our Team</h1>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8 px-24 md:px-2 mt-10'>
                    <AvatarBox>
                        <AspectRatio ratio={9 / 9} className="bg-muted overflow-hidden relative">
                            <Image className='image rounded-none object-cover' src={AVATAR01} />
                        </AspectRatio>
                        <h1>JC.LEE</h1>
                        <h2>DEV</h2>
                    </AvatarBox>
                    <AvatarBox>
                        <AspectRatio ratio={9 / 9} className="bg-muted overflow-hidden relative">
                            <Image className='image rounded-none object-cover' src={AVATAR02} />
                        </AspectRatio>
                        <h1>BAIQI</h1>
                        <h2>ARTIST&DEV</h2>
                    </AvatarBox>
                    <AvatarBox>
                        <AspectRatio ratio={9 / 9} className="bg-muted overflow-hidden relative">
                            <Image className='image rounded-none object-cover' src={AVATAR03} />
                        </AspectRatio>
                        <h1>ZZZZZZZOOU</h1>
                        <h2>DEV</h2>
                    </AvatarBox>
                    <AvatarBox>
                        <AspectRatio ratio={9 / 9} className="bg-muted overflow-hidden relative">
                            <Image className='image rounded-none object-cover' src={AVATAR04} />
                        </AspectRatio>
                        <h1>HARPER</h1>
                        <h2>MARKET</h2>
                    </AvatarBox>
                </div>
                <p className='barlow-light-italic mt-8'>We are a diverse team with backgrounds in technology, art, and business, united by our passion for NFTs and blockchain technology. Our expertise spans smart contract development, digital art creation, and community building. Together, we strive to push the boundaries of what's possible with NFTs, always putting our users first and focusing on innovation and inclusivity.</p>
            </AboutWrapper>
        </>
    );
}

const AboutWrapper = styled.div`
    min-height: 100vh;
`

const AvatarBox = styled.div`
    padding: 10px;
    border: 1px solid black;
    background: black;
    h1 {
        color: white;
        font-size: 24px;
        text-align: center;
        margin-top: 10px;
    }
    h2 {
        text-align: center;
        color: white;
    }
`
