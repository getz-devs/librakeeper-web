'use client';

import { useState, useEffect } from 'react';

import { Center, Loader, Title } from '@mantine/core';
import { Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';
import InfiniteScrollArea from '@/src/components/CarouselCards/InfiniteList';
import { ErrorCard } from '@/src/components/ErrorCard/ErrorCard';
import { Loading } from '@/src/components/Loading/Loading';

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

    const fetchMoreData = (): Promise<void> => {
        // If there are no more items to fetch, return a resolved promise
        if (!hasMore) {
            return Promise.resolve();
        }

        // If the user is not defined, return a resolved promise
        if (!user) {
            return Promise.resolve();
        }

        // Fetch user token and make an API call
        return user.getIdToken().then((token) =>
            fetch(`${API_HOST}/books/?page=${page}&limit=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    // Handle response and parse it as JSON
                    if (!res.ok) {
                        throw new Error('Failed to fetch books');
                    }
                    return res.json();
                })
                .then((data: Book[]) => {
                    // If no data is returned, set hasMore to false
                    if (!data || data.length === 0) {
                        setHasMore(false);
                        return;
                    }

                    // Update the state with new books
                    setBooks((prevItems) => [...prevItems, ...data]);

                    // Increment the page number for the next request
                    setPage((prevPage) => prevPage + 1);
                })
                .catch((error) => {
                    console.error('Error fetching more books:', error);
                })
        );
    };

    if (!userloading && !user) {
        return <ErrorCard error="User not authorized" desc="Please log in to view your data" />;
    }

    if (loading) {
        return <Loading />;
    }

    if (books === undefined) {
        return <ErrorCard error="No books found" desc="No books found for this user" />;
    }

    return (
        <div style={{ marginBottom: '3rem', marginTop: '2rem' }}>
            <Center>
                <Title order={2} ms={10} mb="xs" fw="bold">
                    All my books
                </Title>
            </Center>
            {loading ? (
                <Loader size="md" />
            ) : books ? (
                <InfiniteScrollArea
                    items={books}
                    fetchMoreData={fetchMoreData}
                    loader={<Loader size="md" />}
                />
            ) : (
                <ErrorCard error="No books found" desc="No books found for this user" />
            )}
        </div>
    );
}
