'use client';

import React, { useState, useEffect } from 'react';
import { Loader, Title } from '@mantine/core';
import InfiniteScrollArea from './InfiniteList';
import { Bookshelf, Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

interface CarouselProps {
    bookshelf: Bookshelf;
}

function CarouselCards({ bookshelf }: CarouselProps) {
    const { user } = useAuthContext();
    const [items, setItems] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = await user?.getIdToken();
                const res = await fetch(`${API_HOST}/books?bookshelf_id=${bookshelf.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data: Book[] = await res.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [user, bookshelf.id]);

    const fetchMoreData = () =>
        new Promise<void>((resolve) => {
            setTimeout(() => {
                setItems((prevItems) => [
                    ...prevItems,
                    ...Array.from({ length: 20 }, (_, i) => ({
                        ...prevItems[i % prevItems.length],
                        id: `${prevItems.length + i + 1}`,
                    })),
                ]);
                resolve();
            }, 1500);
        });

    return (
        <div>
            <Title order={2} ms={10} mb="xs" fw="bold">
                {bookshelf.name}
            </Title>
            {loading ? (
                <Loader size="md" />
            ) : (
                <InfiniteScrollArea
                    items={items}
                    fetchMoreData={fetchMoreData}
                    loader={<Loader size="md" />}
                />
            )}
        </div>
    );
}

export default CarouselCards;
