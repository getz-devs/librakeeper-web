import { Container, SimpleGrid, Stack } from '@mantine/core';
import GetTokenCard from '@/src/components/Debug/GetTokenCard';
import BookCard from '@/src/components/Debug/BookCard';
import BookshelfCard from '@/src/components/Debug/BookshelfCard';
import UserCard from '@/src/components/Debug/UserCard';

export default function HomePage() {
    return (
        <Container size="xl" px={0}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" verticalSpacing="xl">
                <Stack gap="xl">
                    <GetTokenCard />
                    <UserCard />
                </Stack>
                <BookCard />
                <BookshelfCard />
            </SimpleGrid>
        </Container>
    );
}
