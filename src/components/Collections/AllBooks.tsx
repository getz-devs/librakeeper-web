/* eslint-disable no-async-promise-executor */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState, useEffect } from 'react';

import { Card, Stack, Image, Group, Text, Badge, Button, Loader, Title } from '@mantine/core';
import Link from 'next/link';
import { Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';
import CarouselCards from '../CarouselCards/CarouselCards';
import InfiniteScrollArea from '../CarouselCards/InfiniteList';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function AllBookshelvesPage() {
    const { user, loading: userloading } = useAuthContext();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async (limit: number) => {
            if (userloading) {
                return;
            }

            if (!user) {
                setLoading(false);
                return;
            }

            if (!hasMore) {
                return;
            }
            try {
                const token = await user?.getIdToken();
                const res = await fetch(`${API_HOST}/books/?page=${page}&limit=${limit}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let data: Book[] = await res.json();
                if (data === null) {
                    setHasMore(false);
                    data = [];
                }
                setPage(page + 1);
                setBooks(data);
            } catch (error) {
                console.error('Error fetching bookshelves:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks(10);
    }, [user]);

    const fetchMoreData = () =>
        new Promise<void>(async (resolve) => {
            if (!hasMore) {
                resolve();
                return;
            }
            try {
                const token = await user?.getIdToken();
                const res = await fetch(`${API_HOST}/books/?page=${page}&limit=10`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let data: Book[] = await res.json();
                if (data === null || data.length === 0) {
                    setHasMore(false);
                    data = [];
                    resolve();
                    return;
                }

                setBooks((prevItems) => [
                    ...prevItems,
                    ...data,
                ]);

                setPage(page + 1);
            } catch (error) {
                console.error('Error fetching more books:', error);
            }
            resolve();
        });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (books === undefined) {
        return <div>No bookshelves found</div>;
    }

    return (
        <div style={{ marginBottom: '3rem', marginTop: '2rem' }}>
            <Title order={2} ms={10} mb="xs" fw="bold">
                All my books
            </Title>
            {loading ? (
                <Loader size="md" />
            ) : books ? (
                <InfiniteScrollArea
                    items={books}
                    fetchMoreData={fetchMoreData}
                    loader={<Loader size="md" />}
                />
            ) : (
                <div>No books found</div>
            )}
        </div>
    );
}
