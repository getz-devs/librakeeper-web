'use client';

import { Button, Card, Group, Input, Textarea, Select } from '@mantine/core';
import { useState } from 'react';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function BookCard() {
    const { user } = useAuthContext();
    const [bookID, setBookID] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setISBN] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [bookshelfID, setBookshelfID] = useState('');
    const [response, setResponse] = useState('');

    const handleCreateBook = async () => {
        try {
            const res = await fetch(`${API_HOST}/books/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await user?.getIdToken()}`,
                },
                body: JSON.stringify({
                    title,
                    author,
                    isbn,
                    description,
                    cover_image: coverImage,
                    bookshelf_id: bookshelfID,
                }),
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error}`);
        }
    };

    const handleGetBook = async () => {
        try {
            const res = await fetch(`${API_HOST}/books/${bookID}`, {
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

    const handleUpdateBook = async () => {
        try {
            const res = await fetch(`${API_HOST}/books/${bookID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await user?.getIdToken()}`,
                },
                body: JSON.stringify({
                    title,
                    author,
                    isbn,
                    description,
                    cover_image: coverImage,
                }),
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error}`);
        }
    };

    const handleDeleteBook = async () => {
        try {
            const res = await fetch(`${API_HOST}/books/${bookID}`, {
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

    const handleGetBooksByUser = async () => {
        try {
            const res = await fetch(`${API_HOST}/books/user?page=1&limit=10`, {
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

    const handleGetBooksByBookshelf = async () => {
        try {
            const res = await fetch(`${API_HOST}/books/bookshelf/${bookshelfID}?page=1&limit=10`, {
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
                placeholder="Book ID"
                value={bookID}
                onChange={(event) => setBookID(event.currentTarget.value)}
                mb="xs"
            />
            <Input
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
                mb="xs"
            />
            <Input
                placeholder="Author"
                value={author}
                onChange={(event) => setAuthor(event.currentTarget.value)}
                mb="xs"
            />
            <Input
                placeholder="ISBN"
                value={isbn}
                onChange={(event) => setISBN(event.currentTarget.value)}
                mb="xs"
            />
            <Input
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
                mb="xs"
            />
            <Input
                placeholder="Cover Image URL"
                value={coverImage}
                onChange={(event) => setCoverImage(event.currentTarget.value)}
                mb="xs"
            />
            <Select
                label="Bookshelf"
                placeholder="Select a bookshelf"
                data={[{ value: '', label: 'None' }]} // Replace with actual bookshelf data
                value={bookshelfID}
                onChange={(value) => setBookshelfID(value ?? '')} // Fix: Handle null with ?? operator
                mb="xs"
            />
            <Group justify="left" mt="md">
                <Button onClick={handleCreateBook} disabled={!user}>
                    Create Book
                </Button>
                <Button onClick={handleGetBook} disabled={!user}>
                    Get Book
                </Button>
                <Button onClick={handleUpdateBook} disabled={!user}>
                    Update Book
                </Button>
                <Button onClick={handleDeleteBook} disabled={!user}>
                    Delete Book
                </Button>
                <Button onClick={handleGetBooksByUser} disabled={!user}>
                    Get Books By User
                </Button>
                <Button onClick={handleGetBooksByBookshelf} disabled={!user}>
                    Get Books By Bookshelf
                </Button>
            </Group>
            <Textarea rows={5} value={response} label="API Response" readOnly mt="md" />
        </Card>
    );
}
