import styled from 'styled-components';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='border-t border-gray-200 py-24'>
            <div className='md:max-w-screen-xl mx-auto grid md:grid-cols-2'>
                <LinkBox>
                    <H2 className='ml-4 barlow-medium'>Quick links</H2>
                    <Button className='mt-4' variant="link" asChild>
                        <Link to="/">Home</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link to="/about">About</Link>
                    </Button>
                </LinkBox>
                <div className='px-4 md:px-0 mt-4 md:mt-0'>
                    <H2 className='barlow-medium'>Contact</H2>
                    <p className='mt-4'>Have questions or just want to say hi? Drop us a line at <a className="underline text-black" href="mailto:baiqi.bj@gmail.com" title="mailto:baiqi.bj@gmail.com">[baiqi.bj@gmail.com]</a>, and let's make something amazing together!</p>
                </div>
            </div>
            <div className='md:max-w-screen-xl mx-auto pr-8 flex items-center mt-6 md:mt-0 justify-center md:justify-end'>
                <a href="https://github.com/xiaobaiwenlian/nft-hook-contract" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
                </a>
            </div>
        </div>
    )
}

const LinkBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const H2 = styled.h2`
    font-size: 18px;
`
