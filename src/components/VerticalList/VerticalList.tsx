'use client';

/* eslint-disable arrow-body-style */

import React, { useEffect, useState } from 'react';
import ListOfCards from './VerticalListForm';
import { Book } from '@/src/types/api';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function BooksByBookshelfPage() {
    const bookshelfId = '1';
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
        return <div>Loading...</div>;
    }

    return <ListOfCards items={books} />;
}

// const MyComponent: React.FC = () => {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const [items, setItems] = useState<Item[]>(generateItems(10));

//     return <ListOfCards items={items} />;
// };

// interface Item {
//     id: string;
//     image: string;
//     title: string;
//     text: string;
// }

// const generateItems = (count: number): Item[] => {
//     return Array.from({ length: count }, (_, i) => ({
//         id: `${i + 1}`,
//         image: 'https://sun9-16.userapi.com/impf/c637718/v637718963/51fd9/nACCl1pDqvM.jpg?size=222x314&quality=96&sign=e71b016beb5daa4c8f7a968c83636cf2&type=album',
//         title: `SuperJet ${i + 100}`,
//         text: `This is the text for item ${i + 1}`,
//     }));
// };

// const MyComponent: React.FC = () => {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const [items, setItems] = useState<Item[]>(generateItems(10));

//     return (
//         <ListOfCards items={items} />
//     );
// };

// export default MyComponent;
