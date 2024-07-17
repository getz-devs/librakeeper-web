/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { Text, Button, Stack, Card, Group, Image } from '@mantine/core';
import { useRef } from 'react';
import Link from 'next/link';
import classes from './VerticalListForm.module.css';
import { Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

interface ListProps {
    items: Book[];
}

async function onClickHandler(book: Book, user: any) {
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
}

interface BookCardProps {
    book: Book;
}

function BookCard({ book }: BookCardProps) {
    const { user } = useAuthContext();

    return (
        <Card shadow="sm" padding={0} radius="md" withBorder style={{ width: '60%' }}>
            <Group wrap="nowrap" gap={0}>
                <Image src={book.cover_image} style={{ width: '40%' }} />
                <Stack px="md" h="100%" style={{ width: '100%' }}>
                    <Group justify="space-between" mb="xs">
                        <Text fw={500}>{book.title}</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                        {book.description}
                    </Text>

                    <Stack align="end">
                        <Button
                            color="blue"
                            fullWidth
                            mt="md"
                            radius="md"
                            component={Link}
                            href={{ pathname: '/' }}
                            style={{ width: '40%' }}
                            onClick={() => onClickHandler(book, user)}
                        >
                            Choose this
                        </Button>
                    </Stack>
                </Stack>
            </Group>
        </Card>
    );
}

const ListOfCards: React.FC<ListProps> = ({ items }) => {
    const viewport = useRef<HTMLDivElement>(null);
    return (
        <div ref={viewport} className={classes.list}>
            {items.map((item) => (
                <BookCard key={item.id} book={item} />
            ))}
        </div>
    );
};

export default ListOfCards;
