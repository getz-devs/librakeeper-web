/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { Text, Button, Stack, Card, Group, Image, AspectRatio } from '@mantine/core';
import { useRef } from 'react';
import Link from 'next/link';
import classes from './VerticalListForm.module.css';
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
        <Card shadow="sm" padding={0} radius="md" withBorder style={{ width: '60%' }}>
            <Group wrap="nowrap" gap={0}>
                <AspectRatio ratio={4 / 5} maw={300} mx="auto">
                    <Image src={book.cover_image} />
                </AspectRatio>
                {/* <Image src={book.cover_image} style={{ width: '40%' }} /> */}
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
                            // component={Link}
                            // href={{ pathname: '/' }}
                            style={{ width: '40%' }}
                            onClick={() => onClickHandler(book, user, isAdv, index)}
                        >
                            Choose this
                        </Button>
                    </Stack>
                </Stack>
            </Group>
        </Card>
    );
}

interface ListProps {
    items: Book[];
    isAdv?: boolean;
}

const ListOfCards: React.FC<ListProps> = ({ items, isAdv }) => {
    const viewport = useRef<HTMLDivElement>(null);
    return (
        <div ref={viewport} className={classes.list}>
            {items.map((item, i) => (
                <BookCard key={`${item.id}-${i}`} book={item} isAdv={isAdv} index={i} />
            ))}
        </div>
    );
};

export default ListOfCards;
