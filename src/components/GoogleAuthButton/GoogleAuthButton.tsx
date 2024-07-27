'use client';

import { Button } from '@mantine/core';
import { useAuthContext } from '@/src/firebase/context';

function LoginButton() {
    const { loading, user, signIn, signOut } = useAuthContext();

    return (
        <Button
            onClick={user ? signOut : signIn}
            variant="subtle"
            color="gray"
            loading={loading}
            loaderProps={{ type: 'dots' }}
        >
            {user ? 'Log Out' : 'Log In'}
        </Button>
    );
}

export default LoginButton;
