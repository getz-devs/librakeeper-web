'use client';

import { useParams } from 'next/navigation';
import { Button, Card, Container, Grid, Image, SimpleGrid, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/src/firebase/context';
import { Book, Bookshelf } from '@/src/types/api';
import { Loading } from '@/src/components/Loading/Loading';
import { ErrorCard } from '@/src/components/ErrorCard/ErrorCard';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function SearchBar() {
    const { id } = useParams<{ id: string }>();

    const { user, loading: userloading } = useAuthContext();
    const [book, setBooks] = useState<Book | null>(null);
    const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookshelves = async () => {
            if (userloading) {
                return;
            }

            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const token = await user?.getIdToken();
                const res = await fetch(`${API_HOST}/books/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data: Book = await res.json();
                setBooks(data);

                // получаем инфо о полке
                // проверка что айди полки не пустай строка

                if (!data.bookshelf_id) {
                    setLoading(false);
                    return;
                }

                const resBookshelf = await fetch(`${API_HOST}/bookshelves/${data.bookshelf_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const dataBookshelf: Bookshelf = await resBookshelf.json();
                setBookshelf(dataBookshelf);

                console.log(dataBookshelf);
            } catch (error) {
                console.error('Error fetching bookshelves:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookshelves();
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    if (book === null) {
        return <ErrorCard error="Book not found" desc="Book not found for this id" />;
    }

    return (
        <Container size="md">
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Card shadow="sm" padding={0} radius="md">
                    <Image src={book?.cover_image} alt="Book Cover" />
                </Card>
                <Stack gap="md">
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Grid columns={2}>
                            <Grid.Col span={1}>
                                <Text fw={700} size="lg">
                                    Название
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text>{book?.title}</Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text fw={700} size="lg">
                                    Автор
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text>{book?.author}</Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text fw={700} size="lg">
                                    Описание
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text>{book?.description || 'Описание отсутствует'}</Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text fw={700} size="lg">
                                    Добавлено
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text>{book?.created_at}</Text>
                            </Grid.Col>

                            <Grid.Col span={1}>
                                <Text fw={700} size="lg">
                                    Полка
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text>{bookshelf?.name || 'Книга не на полке'}</Text>
                            </Grid.Col>
                        </Grid>
                    </Card>
                    <Button
                        component={Link}
                        href={`/book/${id}/edit`}
                        color="blue"
                        fullWidth
                        radius="md"
                    >
                        Edit Book
                    </Button>
                </Stack>
            </SimpleGrid>
        </Container>
    );
}
