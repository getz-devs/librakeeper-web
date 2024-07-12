'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function Page() {
    const { user } = useAuthContext();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = await user?.getIdToken();
                const res = await fetch(`${API_HOST}/books/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ limit: 10, offset: 0 }),
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
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {books.map((book) => (
                <div key={book.id}>
                    <h1>{book.title}</h1>
                    <p>{book.author}</p>
                </div>
            ))}
        </div>
    );
}
