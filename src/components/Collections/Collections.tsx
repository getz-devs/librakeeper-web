'use client';

import { useState, useEffect } from 'react';

import { Loader } from '@mantine/core';
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

    if (!userloading && !user) {
        return <></>;
    }

    if (loading) {
        return <div>Loading Bookshelves...</div>;
    }

    if (bookshelves === undefined) {
        return <div>No bookshelves found</div>;
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
                <div>No collection found</div>
            )}
        </div>
    );
}
