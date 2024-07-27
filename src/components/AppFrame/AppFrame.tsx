'use client';

import Link from 'next/link';
import { AppShell, Group, Button, Container, Modal, Input } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ColorSchemeToggle } from '@/src/components/ColorSchemeToggle/ColorSchemeToggle';

import classes from './AppFrame.module.css';
import GoogleAuthButton from '@/src/components/GoogleAuthButton/GoogleAuthButton';
import { useAuthContext } from '@/src/firebase/context';
import { Bookshelf } from '@/src/types/api';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api';

interface AppFrameProps {
    children: React.ReactNode;
}

async function FetchBookshelf(user: any, shelfName: string) {
    if (!user) {
        return;
    }

    const bookshelf: Bookshelf = {} as Bookshelf;
    bookshelf.name = shelfName;
    bookshelf.user_id = user.uid;

    console.log('Добавление коллекции:', bookshelf);

    try {
        const token = await user?.getIdToken();

        const res = await fetch(`${API_HOST}/bookshelves/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bookshelf),
        });

        if (!res.ok) {
            throw new Error('Ошибка при добавлении коллекции');
        }

        const addedBook = await res.json();
        console.log('Коллекция успешно добавлена:', addedBook);
    } catch (error) {
        console.error('Ошибка при добавлении коллекции:', error);
    }
}

export function AppFrame({ children }: AppFrameProps) {
    const demoProps = {
        h: 50,
        mt: 'md',
    };
    const [inputValue, setInputValue] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const { user, loading: userLoading } = useAuthContext();

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleAddBookshelf = async () => {
        if (!userLoading) {
            await FetchBookshelf(user, inputValue);
        }
        close();
    };

    return (
        <div>
            <Modal opened={opened} onClose={close} title="New Collection">
                <Input placeholder="Name" value={inputValue} onChange={handleInputChange} />

                <Button size="28" onClick={handleAddBookshelf} fz="16" mt={10}>
                    Add
                </Button>
            </Modal>

            <AppShell header={{ height: 60 }} padding="">
                <AppShell.Header>
                    <Container px="0.3rem" size="76rem">
                        <Group h="100%" px="" style={{ justifyContent: 'space-between' }}>
                            <Button
                                variant="transparent"
                                component={Link}
                                href="/"
                                className={classes.customLabel}
                            >
                                Libra Keeper
                            </Button>

                            <div style={{ marginLeft: 'auto', display: 'flex', gap: '2rem' }}>
                                <Button onClick={open} className={classes.customButtton}>
                                    +Bookshelf
                                </Button>
                                <GoogleAuthButton />
                                <ColorSchemeToggle />
                            </div>
                        </Group>
                    </Container>
                </AppShell.Header>

                <AppShell.Main>
                    <Container size="76rem" {...demoProps}>
                        {children}
                    </Container>
                </AppShell.Main>
            </AppShell>
        </div>
    );
}
