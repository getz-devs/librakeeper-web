'use client';

import React, { useState, useEffect } from 'react';
import { Center, Loader, Title } from '@mantine/core';
import InfiniteScrollArea from './InfiniteList';
import { Bookshelf, Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';
import { ErrorCard } from '../ErrorCard/ErrorCard';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

interface CarouselProps {
    bookshelf: Bookshelf;
}

function CarouselCards({ bookshelf }: CarouselProps) {
    const { user, loading: userloading } = useAuthContext();
    const [items, setItems] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            if (userloading) {
                return;
            }

            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const token = await user?.getIdToken();
                const res = await fetch(`${API_HOST}/books/bookshelf/${bookshelf.id}`, {
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

    const fetchMoreData = (): Promise<void> => {
        if (!hasMore) {
            return Promise.resolve(); // Always return a Promise
        }

        if (!user) {
            return Promise.resolve(); // Handle cases where user is undefined
        }

        return user.getIdToken().then((token) =>
            fetch(`${API_HOST}/books/bookshelf/${bookshelf.id}?page=${page}&limit=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data: Book[]) => {
                    if (!data || data.length === 0) {
                        setHasMore(false);
                        return;
                    }

                    // Update the state with new books
                    setItems((prevItems) => [...prevItems, ...data]);

                    // Increment the page number for the next request
                    setPage((prevPage) => prevPage + 1);
                })
                .catch((error) => {
                    console.error('Error fetching more books:', error);
                })
        );
    };

    return (
        <div style={{ marginBottom: '3rem' }}>
            <Center>
                <Title order={2} ms={10} mb="xs" fw="bold">
                    {bookshelf.name} collection
                </Title>
            </Center>
            {loading ? (
                <Loader size="md" />
            ) : items ? (
                <InfiniteScrollArea
                    items={items}
                    fetchMoreData={fetchMoreData}
                    loader={<Loader size="md" />}
                />
            ) : (
                <ErrorCard error="No books found" desc="No books found in this bookshelf" />
            )}
        </div>
    );
}

export default CarouselCards;
