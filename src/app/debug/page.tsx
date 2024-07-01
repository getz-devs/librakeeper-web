import { Container } from '@mantine/core';
import GetTokenCard from '@/src/components/Debug/GetTokenCard';

export default function HomePage() {
    return (
        <Container size="xl" px={0}>
            <GetTokenCard />
        </Container>
    );
}
