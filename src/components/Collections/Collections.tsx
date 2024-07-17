/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState, useEffect } from 'react';

import { Card, Stack, Image, Group, Text, Badge, Button } from '@mantine/core';
import Link from 'next/link';
import { Bookshelf } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';
import CarouselCards from '../CarouselCards/CarouselCards';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function AllBookshelvesPage() {
    const { user, loading: userloading } = useAuthContext();
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
                const res = await fetch(`${API_HOST}/bookshelves/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data: Bookshelf[] = await res.json();
                setBookshelves(data);
                console.log(bookshelves);
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

    if (bookshelves === undefined) {
        return <div>No bookshelves found</div>;
    }

    return (
        // <div>
        //     <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '60%' }}>
        //         <Group justify="space-between" mt="" mb="xs">
        //             <Text fw={500}>Collection Name</Text>
        //         </Group>

        //         <Text size="sm" c="dimmed">
        //             Last update: 14.01.2023
        //         </Text>

        //         <Button
        //             color="blue"
        //             fullWidth
        //             mt="md"
        //             radius="md"
        //             component={Link}
        //             // href={{ pathname: '/collections', query: { q: 1 } }}
        //             // eslint-disable-next-line react/jsx-curly-brace-presence, @typescript-eslint/quotes
        //             href={`/collections/1`}
        //         >
        //             View all books
        //         </Button>
        //     </Card>
        // </div>

        // <div>
        //     {bookshelves.map((shelf) => (
        //         <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '60%' }}>
        //             <Group justify="space-between" mt="" mb="xs">
        //                 <Text fw={500}>{shelf.name}</Text>
        //             </Group>

        //             <Text size="sm" c="dimmed">
        //                 Last update: {shelf.updated_at}
        //             </Text>

        //             <Button color="blue" fullWidth mt="md" radius="md" component={Link} href={`/collections/${shelf.id}`}>
        //                 View all books
        //             </Button>
        //         </Card>
        //     ))}
        // </div>

        <div>
            {bookshelves.map((shelf) => (
                <CarouselCards key={shelf.id} bookshelf={shelf}></CarouselCards>
            ))}
        </div>
    );
}
