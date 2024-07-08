'use client';

import { Button, Card, Group, Input, Textarea } from '@mantine/core';
import { useState } from 'react';
import { useAuthContext } from '@/src/firebase/context';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

export default function UserCard() {
    const { user } = useAuthContext();
    const [userID, setUserID] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [response, setResponse] = useState('');

    const handleCreateUser = async () => {
        try {
            if (!user) {
                setResponse('Please log in first.');
                return;
            }
            const res = await fetch(`${API_HOST}/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await user.getIdToken()}`,
                },
                body: JSON.stringify({ display_name: displayName }),
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error}`);
        }
    };

    const handleGetUser = async () => {
        try {
            const res = await fetch(`${API_HOST}/users/${userID}`, {
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

    const handleUpdateUser = async () => {
        try {
            const res = await fetch(`${API_HOST}/users/${userID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await user?.getIdToken()}`,
                },
                body: JSON.stringify({ display_name: displayName }),
            });
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            setResponse(`Error: ${error}`);
        }
    };

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`${API_HOST}/users/${userID}`, {
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

    return (
        <Card shadow="sm" radius="md" withBorder style={{ maxWidth: 512 }}>
            <Input
                placeholder="User ID"
                value={userID}
                onChange={(event) => setUserID(event.currentTarget.value)}
                mb="xs"
            />
            <Input
                placeholder="Display Name"
                value={displayName}
                onChange={(event) => setDisplayName(event.currentTarget.value)}
                mb="xs"
            />
            <Group justify="left" mt="md">
                <Button onClick={handleCreateUser} disabled={!user}>
                    Create User
                </Button>
                <Button onClick={handleGetUser} disabled={!user}>
                    Get User
                </Button>
                <Button onClick={handleUpdateUser} disabled={!user}>
                    Update User
                </Button>
                <Button onClick={handleDeleteUser} disabled={!user}>
                    Delete User
                </Button>
            </Group>
            <Textarea rows={5} value={response} label="API Response" readOnly mt="md" />
        </Card>
    );
}
