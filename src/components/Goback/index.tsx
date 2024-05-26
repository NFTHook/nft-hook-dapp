import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Goback() {
    let history = useNavigate();

    const goBack = () => {
        history(-1);
    }

    return (
        <Bar className='md:max-w-screen-lg mx-auto py-4'>
            <Title className='flex items-center gap-1 cursor-pointer'>
                <ChevronLeft className='arrow h-4 w-4 transform translate-y-[4px]' />
                <h1 onClick={() => goBack()} className='text-xl barlow-medium-italic'>return</h1>
            </Title>
        </Bar>
    )
}
const Bar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px dashed #efefef;
    
`
const Title = styled.div`
    .arrow {
        transition: all .3s;
    }
    &:hover {
        .arrow {
            transform: translate(-6px, 4px);
        }
    }
`