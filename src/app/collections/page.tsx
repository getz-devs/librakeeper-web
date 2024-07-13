'use client';

import { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, Stack, Image, Group, Text, Badge, Button } from '@mantine/core';
import { Bookshelf } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function AllBookshelvesPage() {
    const { user } = useAuthContext();
    const [bookshelves, setBookshelves] = useState<Bookshelf[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBookshelves = async () => {
            try {
                const token = await user?.getIdToken();
                const res = await fetch(`${API_HOST}/bookshelves`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data: Bookshelf[] = await res.json();
                setBookshelves(data);
            } catch (error) {
                console.error('Error fetching bookshelves:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookshelves();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {bookshelves.map((shelf) => (
                <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '60%' }}>
                    <Group justify="space-between" mt="" mb="xs">
                        <Text fw={500}>{shelf.name}</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                        Last update: {shelf.updated_at}
                    </Text>

                    <Button color="blue" fullWidth mt="md" radius="md">
                        View all books
                    </Button>
                </Card>
            ))}
        </div>
    );
}
