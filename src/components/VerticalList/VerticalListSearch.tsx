'use client';

import React, { useEffect, useState } from 'react';
import { Badge, Center, Loader, Space, Title } from '@mantine/core';
import ListOfCards from './VerticalListForm';
import { Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';
import { ErrorCard } from '@/src/components/ErrorCard/ErrorCard';
import { Loading } from '@/src/components/Loading/Loading';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

const delay = (ms: number | undefined) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

export default function VerticalListSearch({
    ISBN,
    isAdv,
}: {
    ISBN: string | null;
    isAdv?: boolean;
}) {
    const { user } = useAuthContext();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    let searchType = 'simple';
    if (!ISBN) {
        return <div>Invalid ISBN</div>;
    }
    if (isAdv) {
        searchType = 'advanced';
    }

    useEffect(() => {
        const fetchBooks = async () => {
            let status = null;
            while (status !== 0) {
                try {
                    const token = await user?.getIdToken();
                    const res = await fetch(`${API_HOST}/search/${searchType}?isbn=${ISBN}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    let data = await res.json();
                    if (data.error) {
                        console.error('Error fetching books:', data.error);
                        data = [];
                        setBooks(data.books);
                        break;
                    }
                    status = data.status;
                    console.log('status:', data);
                    if (status === 0) {
                        if (data === null) {
                            data = [];
                        }
                        setBooks(data.books);
                    }
                } catch (error) {
                    console.error('Error fetching books:', error);
                    break;
                } finally {
                    setLoading(false);
                }

                await delay(500);
            }
        };

        fetchBooks();
    }, [user, ISBN, API_HOST, searchType]);

    if (loading) {
        return <Loading />;
    }

    if (books === undefined) {
        return <ErrorCard error="No books found" desc="No books found for this query" />;
    }

    return (
        <div>
            <Center>
                <Title order={2}>
                    Search by ISBN:{' '}
                    <Badge variant="light" color="gray" size="xl">
                        {ISBN}
                    </Badge>
                </Title>
            </Center>

            <Space h="lg" />

            {loading ? (
                <Loader size="md" />
            ) : books ? (
                <ListOfCards isAdv={isAdv} items={books} />
            ) : (
                <ErrorCard error="No books found" desc="No books found for this query" />
            )}
        </div>
    );
}
