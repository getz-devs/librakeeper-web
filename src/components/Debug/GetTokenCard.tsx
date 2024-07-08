'use client';

import { Button, Card, CopyButton, Group, Textarea } from '@mantine/core';
import { useState } from 'react';
import { useAuthContext } from '@/src/firebase/context';

export default function GetTokenCard() {
    const [token, setToken] = useState('');
    const { user } = useAuthContext();

    function getToken() {
        if (!user) return;

        user.getIdToken()
            .then((idToken) => setToken(idToken))
            .catch(() => {});
    }

    return (
        <Card shadow="sm" radius="md" style={{ maxWidth: 512 }} withBorder>
            <Textarea rows={3} value={token} label="Your JWT - debug" />
            <Group justify="left" mt="md">
                <Button onClick={getToken}>Get Token</Button>
                <CopyButton value={token}>
                    {({ copied, copy }) => (
                        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                            {copied ? 'Copied!' : 'Copy Token'}
                        </Button>
                    )}
                </CopyButton>
            </Group>
        </Card>
    );
}
