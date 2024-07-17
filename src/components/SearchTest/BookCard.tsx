'use client';

import { Card, Image, Text, Badge, Button, Group, AspectRatio, Skeleton } from '@mantine/core';
import { useBook } from '@/src/app/data/hooks';

interface BookCardProps {
    id: string;
}

export function BookCard({ id }: BookCardProps) {
    const { book, isLoading, isError, mutate } = useBook(id);

    // if (isLoading) {
    //     return <Skeleton height={400} />;
    // }

    if (isError) {
        return <Text>Error loading book information</Text>;
    }

    return (
        <Card w={200} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Skeleton visible={isLoading}>
                    <AspectRatio ratio={4 / 5} mx="auto">
                        <Image src={book?.cover_image} alt="Cover" />
                    </AspectRatio>
                </Skeleton>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{book?.title}</Text>
                <Badge color="pink">{book?.shop_name}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {book?.shop_name}
            </Text>

            <Button
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={async () => {
                    mutate();
                }}
            >
                View on {book?.shop_name}
            </Button>
        </Card>
    );
}
