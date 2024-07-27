'use client';

import React, { useEffect, useState } from 'react';
import ListOfCards from './VerticalListForm';
import { Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';
import { Loading } from '@/src/components/Loading/Loading';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

interface VerticalListProps {
    bookshelfId: string;
}

export default function BooksByBookshelfPage(params: VerticalListProps) {
    const { bookshelfId } = params;

    const { user } = useAuthContext();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = await user?.getIdToken();
                const res = await fetch(`${API_HOST}/books?bookshelf_id=${bookshelfId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data: Book[] = await res.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [user, bookshelfId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div> {bookshelfId} </div>
            <ListOfCards items={books} />
        </div>
    );
}
