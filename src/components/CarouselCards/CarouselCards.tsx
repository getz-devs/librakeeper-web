/* eslint-disable no-async-promise-executor */

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

    // const fetchMoreData = () =>
    //     new Promise<void>((resolve) => {
    //         setTimeout(() => {
    //             setItems((prevItems) => [
    //                 ...prevItems,
    //                 ...Array.from({ length: 20 }, (_, i) => ({
    //                     ...prevItems[i % prevItems.length],
    //                     id: `${prevItems.length + i + 1}`,
    //                 })),
    //             ]);
    //             resolve();
    //         }, 1500);
    //     });

    const fetchMoreData = () =>
        new Promise<void>(async (resolve) => {
            if (!hasMore) {
                resolve();
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
                let data: Book[] = await res.json();
                if (data === null || data.length === 0) {
                    setHasMore(false);
                    data = [];
                    resolve();
                    return;
                }

                setItems((prevItems) => [...prevItems, ...data]);

                setPage(page + 1);
            } catch (error) {
                console.error('Error fetching more books:', error);
            }
            resolve();
        });

    // if (items === undefined || items === null) {
    //     return <div>No books found</div>;
    // }

    return (
        <div>
            <Title order={2} ms={10} mb="xs" fw="bold">
                {bookshelf.name}
            </Title>
            {loading ? (
                <Loader size="md" />
            ) : items ? (
                <InfiniteScrollArea
                    items={items}
                    fetchMoreData={fetchMoreData}
                    loader={<Loader size="md" />}
                />
            ) : (
                <div>No books found</div>
            )}
        </div>
    );
}

export default CarouselCards;
