'use client';

import { redirect, useParams } from 'next/navigation';
import {
    Button,
    Card,
    Container,
    Grid,
    Select,
    Space,
    Stack,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { useAuthContext } from '@/src/firebase/context';
import { Book, Bookshelf, BookUpdate } from '@/src/types/api';
import { Loading } from '@/src/components/Loading/Loading';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function SearchBar() {
    const { id } = useParams<{ id: string }>();

    const { user, loading: userloading } = useAuthContext();
    const [book, setBooks] = useState<Book | null>(null);
    const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);
    const [bookshelves, setBookshelves] = useState<Bookshelf[]>([]);

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

                // получаем инфо о всех полках

                const resBookshelves = await fetch(`${API_HOST}/bookshelves/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const dataBookshelves: Bookshelf[] | null = await resBookshelves.json();
                if (dataBookshelves != null) {
                    console.log('resBookshelves.json() != null');
                    console.log(resBookshelves.json());
                    setBookshelves(dataBookshelves);
                }

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

    // Initialize the form with useForm hook
    const form = useForm<BookUpdate>({
        initialValues: {
            title: '',
            author: '',
            description: '',
            cover_image: '',
            bookshelf_id: '',
        },
    });

    const handleSubmit = async (values: BookUpdate) => {
        // Filter out empty fields
        const nonEmptyFields = Object.fromEntries(
            Object.entries(values).filter(([, v]) => v !== '' && v !== undefined)
        );

        // If no non-empty fields, do not make the request
        if (Object.keys(nonEmptyFields).length === 0) {
            console.log('No non-empty fields to submit');
            return;
        }

        try {
            const token = await user?.getIdToken();

            // Make the request
            const response = await fetch(`${API_HOST}/books/${book?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(nonEmptyFields),
            });

            if (response.ok) {
                // Redirect to the homepage after successful submission
                redirect('/');
            } else {
                console.error('Failed to submit form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // console.log(bookshelves);
    if (loading) {
        return <Loading />;
    }

    if (book === null) {
        return <div>Book not foung</div>;
    }

    return (
        <Container size="sm">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={700} size="lg">
                    Текущие значения
                </Text>
                <Space h="md" />
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

            <Space h="md" />

            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={700} size="lg">
                    Введите значения для изменения
                </Text>
                <Space h="md" />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                        <TextInput
                            label="Title"
                            placeholder="Enter book title"
                            {...form.getInputProps('title')}
                        />
                        <TextInput
                            label="Author"
                            placeholder="Enter author name"
                            {...form.getInputProps('author')}
                        />
                        <Textarea
                            label="Description"
                            placeholder="Enter book description"
                            {...form.getInputProps('description')}
                        />
                        <TextInput
                            label="Cover Image URL"
                            placeholder="Enter cover image URL"
                            {...form.getInputProps('cover_image')}
                        />
                        <Select
                            label="Bookshelf"
                            placeholder="Pick a bookshelf"
                            data={bookshelves.map((shelf) => ({
                                value: shelf.id,
                                label: shelf.name,
                            }))}
                            {...form.getInputProps('bookshelf_id')}
                            clearable
                        />
                        <Button type="submit" mt="md">
                            Update Book
                        </Button>
                    </Stack>
                </form>
            </Card>
        </Container>
    );
}
