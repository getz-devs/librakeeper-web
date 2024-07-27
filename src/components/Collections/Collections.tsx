'use client';

import { useState, useEffect } from 'react';

import { Loader } from '@mantine/core';
import { Bookshelf } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';
import CarouselCards from '../CarouselCards/CarouselCards';
import { ErrorCard } from '../ErrorCard/ErrorCard';

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
                let data: Bookshelf[] = await res.json();
                if (data === null) {
                    data = [];
                }
                setBookshelves(data);
            } catch (error) {
                console.error('Error fetching bookshelves:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookshelves();
    }, [user]);

    if (loading || (!userloading && !user)) {
        return <></>;
    }

    if (bookshelves === undefined) {
        return (
            <ErrorCard
                error="No bookshelves found"
                desc="No bookshelves found for the current user"
            />
        );
    }

    return (
        <div>
            {loading ? (
                <Loader size="md" />
            ) : bookshelves ? (
                bookshelves.map((shelf) => (
                    <CarouselCards key={shelf.id} bookshelf={shelf}></CarouselCards>
                ))
            ) : (
                <ErrorCard
                    error="No bookshelves found"
                    desc="No bookshelves found for the current user"
                />
            )}
        </div>
    );
}
