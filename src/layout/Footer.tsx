import styled from 'styled-components';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <div className='border-t border-gray-200 py-8'>
            <div className='md:max-w-screen-xl mx-auto grid md:grid-cols-2'>
                <LinkBox>
                    <H2 className='ml-4 barlow-medium'>Quick links</H2>
                    <Button className='mt-4' variant="link" asChild>
                        <Link to="/">Home</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link to="/about">About</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link to="/faqs">Faq's</Link>
                    </Button>
                </LinkBox>
                <div className='px-4 md:px-0 mt-4 md:mt-0'>
                    <H2 className='barlow-medium'>Contact</H2>
                    <p className='mt-4'>Have questions or just want to say hi? Drop us a line at <a className="underline text-black" href="mailto:baiqi.bj@gmail.com" title="mailto:baiqi.bj@gmail.com">[baiqi.bj@gmail.com]</a>, and let's make something amazing together!</p>
                </div>
            </div>
            <div className='md:max-w-screen-xl mx-auto pr-8 flex items-center mt-6 md:mt-0 justify-center md:justify-end'>
                <a href="https://twitter.com/NFTHOOK_XYZ" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-twitter"> <path d="M8,2H3L16.7,22h5.1L8,2z"/> <line x1="2.3" y1="22.1" x2="10.2" y2="12.8"/> <line x1="19.8" y1="2" x2="13.3" y2="9.6"/> </svg>
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
