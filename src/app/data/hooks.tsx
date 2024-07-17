'use client';

import useSWR from 'swr';
import { Book } from './models';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

const useAuthenticatedFetcher = () => {
    const { user } = useAuthContext();

    const getBookById = async (id: string): Promise<Book> => {
        if (!user) {
            // BUG: on page refresh, user is null, until Firebase changes auth state. Need to await user
            throw new Error('User not authenticated');
        }

        const token = await user.getIdToken();
        const response = await fetch(`${API_HOST}/books/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const book: Book = await response.json();
        return book;
    };

    return getBookById;
};

export function useBook(id: string) {
    const apiFetcher = useAuthenticatedFetcher();
    const { data, error, isLoading, mutate } = useSWR<Book>(id, apiFetcher);

    return {
        book: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
