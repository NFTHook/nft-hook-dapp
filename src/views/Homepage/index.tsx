import styled from 'styled-components';
import { Button } from "@/components/ui/button";

export default function Homepage() {
    return (
        <Wrapper>
            <Button variant="outline">Homepage</Button>
            <Button>Homepage</Button>
            <Button variant="ghost">Homepage</Button>
            <Button variant="destructive">Homepage</Button>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
`
