'use client';

import { Text, Button, Stack, Card, Image, AspectRatio, SimpleGrid, Title } from '@mantine/core';
import { Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

const delay = (ms: number | undefined) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

async function onClickHandler(book: Book, user: any, isAdv?: boolean, index?: number) {
    if (isAdv) {
        try {
            const token = await user?.getIdToken();
            book.user_id = user.uid;
            const res = await fetch(
                `${API_HOST}/books/add/advanced?isbn=${book.isbn}&index=${index}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(book),
                }
            );

            if (!res.ok) {
                throw new Error('Ошибка при добавлении книги');
            }

            const addedBook = await res.json();
            console.log('Книга успешно добавлена:', addedBook);
        } catch (error) {
            console.error('Ошибка при добавлении книги:', error);
        }
    }

    try {
        const token = await user?.getIdToken();
        book.user_id = user.uid;
        const res = await fetch(`${API_HOST}/books/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(book),
        });

        if (!res.ok) {
            throw new Error('Ошибка при добавлении книги');
        }

        const addedBook = await res.json();
        console.log('Книга успешно добавлена:', addedBook);
    } catch (error) {
        console.error('Ошибка при добавлении книги:', error);
    }

    await delay(500);
    window.location.href = '/';
}

interface BookCardProps {
    book: Book;
    isAdv?: boolean;
    index: number;
}

function BookCard({ book, isAdv, index }: BookCardProps) {
    const { user } = useAuthContext();

    return (
        <Card shadow="sm" padding={0} radius="md" withBorder>
            <AspectRatio ratio={4 / 5}>
                <Image
                    src={book.cover_image}
                    fallbackSrc="https://placehold.co/400x500?text=No%20cover"
                />
            </AspectRatio>
            <Stack gap="sm" p="md">
                <Title order={3}>{book.title}</Title>
                <Text size="sm" c="dimmed">
                    {book.author}
                </Text>

                <Button
                    color="blue"
                    fullWidth
                    mt="sm"
                    radius="md"
                    onClick={() => onClickHandler(book, user, isAdv, index)}
                >
                    Choose this
                </Button>
            </Stack>
        </Card>
    );
}

interface ListProps {
    items: Book[];
    isAdv?: boolean;
}

const ListOfCards: React.FC<ListProps> = ({ items, isAdv }) => {
    const cards = items.map((item, i) => (
        <BookCard key={`${item.id}-${i}`} book={item} isAdv={isAdv} index={i} />
    ));

    return <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }}>{cards}</SimpleGrid>;
};

export default ListOfCards;
