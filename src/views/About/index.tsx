import styled from 'styled-components';

export default function About() {

    return (
        <>
            <AboutWrapper className='px-2 md:px-0 md:max-w-screen-md mx-auto py-12'>
                <h1 className='text-4xl barlow-semibold'>Welcome To</h1>
                <p className='barlow-medium text-gray-400 mt-8'>Our team, a dedicated group of Web3 enthusiasts, embarked on our journey into the NFT space driven by our passion for the technology. However, the high cost of early NFTs was a significant barrier to widespread adoption. Discovering Optimistic Layer 2 (OP L2) was a game-changer for us. It enabled us to issue affordable NFTs at a fraction of the cost, opening the door for a broader audience.</p>
                <p className='barlow-medium text-gray-400 mt-4'>This strategic pivot to L2 was met with remarkable success. We have issued millions of NFTs, democratizing access to digital assets. Our most popular NFT boasts over 100,000 holders, a testament to our approach of making NFTs accessible and valuable across multiple blockchains.</p>
                <p className='barlow-medium text-gray-400 mt-4'>Our vision is to continue this trajectory, enhancing the utility and engagement of our NFTs. We are committed to innovating and expanding the functionalities of our NFTs, ensuring they offer more than just ownership—creating new ways for holders to interact with and benefit from their digital assets.</p>
            </AboutWrapper>
        </>
    );
}

const AboutWrapper = styled.div`
    min-height: 100vh;
`
