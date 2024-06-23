'use client';

import { Button } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useAuthContext } from '@/src/firebase/context';

function LoginButton() {
    const { loading, user, signIn, signOut } = useAuthContext();

    return (
        <Button
            onClick={user ? signOut : signIn}
            variant="subtle"
            color="gray"
            size="md"
            loading={loading}
            loaderProps={{ type: 'dots' }}
            rightSection={<IconChevronRight size="1rem" />}
        >
            {user ? 'Sign out' : 'Sign in with Google'}
        </Button>
    );
}

export default LoginButton;
