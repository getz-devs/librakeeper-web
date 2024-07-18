'use client';

/* eslint-disable arrow-body-style */

import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
import ListOfCards from './VerticalListForm';
import { Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

const delay = (ms: number | undefined) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

// eslint-disable-next-line max-len
export default function VerticalListSearch({
    ISBN,
    isAdv,
}: {
    ISBN: string | null;
    isAdv?: boolean;
}) {
    // const searchParams = useSearchParams();
    // const bookshelfId = searchParams.get('q');
    // const { ISBN } = params;

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
                    const data = await res.json();
                    status = data.status;
                    if (status === 0) {
                        setBooks(data.books);
                    }
                } catch (error) {
                    console.error('Error fetching books:', error);
                    break; // Выход из цикла при ошибке
                } finally {
                    setLoading(false);
                }

                await delay(500);
            }
        };

        fetchBooks();
    }, [user, ISBN, API_HOST, searchType]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (books === undefined) {
        return <div>No books found</div>;
    }

    return (
        <div>
            <div> Search by ISBN: {ISBN} </div>
            <ListOfCards items={books} />
        </div>
    );
}
