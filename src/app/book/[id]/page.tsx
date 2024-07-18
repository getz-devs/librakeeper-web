'use client';

import { useParams } from 'next/navigation';
import { Card, Container, Grid, Image, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/src/firebase/context';
import { Book, Bookshelf } from '@/src/types/api';

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
    // console.log(bookshelves);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (book === null) {
        return <div>Book not foung</div>;
    }

    return (
        <Container size="md">
            <Grid>
                <Grid.Col span={6}>
                    <Card shadow="sm" padding={0} radius="md">
                        <Image src={book?.cover_image} alt="Book Cover" />
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
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
                                <Text>{book?.description}</Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text fw={700} size="lg">
                                    Добавлено
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text>{book?.created_at}</Text>
                            </Grid.Col>

                            {/* {bookshelf && ( */}
                            {/* <> */}
                            <Grid.Col span={1}>
                                <Text fw={700} size="lg">
                                    Полка
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <Text>{bookshelf?.name || 'Книга не на полке'}</Text>
                            </Grid.Col>
                            {/* </> */}
                            {/* )} */}
                        </Grid>
                    </Card>
                </Grid.Col>
            </Grid>
        </Container>
    );
}
