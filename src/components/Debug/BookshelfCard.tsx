'use client';

import { Button, Card, Group, Input, Textarea } from '@mantine/core';
import { useState } from 'react';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function BookshelfCard() {
    const { user } = useAuthContext();
    const [bookshelfID, setBookshelfID] = useState('');
    const [name, setName] = useState('');
    const [response, setResponse] = useState('');

    const handleCreateBookshelf = async () => {
        try {
            const res = await fetch(`${API_HOST}/bookshelves/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await user?.getIdToken()}`,
                },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error}`);
        }
    };

    const handleGetBookshelf = async () => {
        try {
            const res = await fetch(`${API_HOST}/bookshelves/${bookshelfID}`, {
                headers: {
                    Authorization: `Bearer ${await user?.getIdToken()}`,
                },
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error}`);
        }
    };

    const handleUpdateBookshelf = async () => {
        try {
            const res = await fetch(`${API_HOST}/bookshelves/${bookshelfID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await user?.getIdToken()}`,
                },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error}`);
        }
    };

    const handleDeleteBookshelf = async () => {
        try {
            const res = await fetch(`${API_HOST}/bookshelves/${bookshelfID}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${await user?.getIdToken()}`,
                },
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error}`);
        }
    };

    const handleGetBookshelvesByUser = async () => {
        try {
            const res = await fetch(`${API_HOST}/bookshelves/user?page=1&limit=10`, {
                headers: {
                    Authorization: `Bearer ${await user?.getIdToken()}`,
                },
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error}`);
        }
    };

    return (
        <Card shadow="sm" radius="md" withBorder style={{ maxWidth: 512 }}>
            <Input
                placeholder="Bookshelf ID"
                value={bookshelfID}
                onChange={(event) => setBookshelfID(event.currentTarget.value)}
                mb="xs"
            />
            <Input
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                mb="xs"
            />
            <Group justify="left" mt="md">
                <Button onClick={handleCreateBookshelf} disabled={!user}>
                    Create Bookshelf
                </Button>
                <Button onClick={handleGetBookshelf} disabled={!user}>
                    Get Bookshelf
                </Button>
                <Button onClick={handleUpdateBookshelf} disabled={!user}>
                    Update Bookshelf
                </Button>
                <Button onClick={handleDeleteBookshelf} disabled={!user}>
                    Delete Bookshelf
                </Button>
                <Button onClick={handleGetBookshelvesByUser} disabled={!user}>
                    Get Bookshelves By User
                </Button>
            </Group>
            <Textarea rows={5} value={response} label="API Response" readOnly mt="md" />
        </Card>
    );
}
