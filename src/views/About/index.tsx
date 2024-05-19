import styled from 'styled-components';

export default function About() {

    return (
        <>
            <AboutWrapper className='px-2 md:px-0 md:max-w-screen-md mx-auto py-12'>
                <h1 className='text-4xl barlow-semibold'>Welcome To</h1>
                <p className='barlow-medium text-gray-400 mt-8'>My name is Wes Henry and I created every piece you see in this shop. I have teamed up with a wonderful high quality printer who has proven to me over and over to provide amazing quality in printing, matting, and framing. Though my style is all across the board, most pieces are meant to bring a sense of stillness into whatever space they are placed.Thank you for your time and support of my art.</p>
            </AboutWrapper>
        </>
    );
}

const AboutWrapper = styled.div`
    min-height: 100vh;
`
