import { Container } from '@mantine/core';
import { Welcome } from '@/src/components/Welcome/Welcome';

export default function HomePage() {
    return (
        <Container size="xl" px={0}>
            <Welcome />
        </Container>
    );
}
