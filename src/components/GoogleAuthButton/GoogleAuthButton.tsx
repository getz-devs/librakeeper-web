'use client';

import { Button } from '@mantine/core';
// import { IconChevronRight } from '@tabler/icons-react';
import { useAuthContext } from '@/src/firebase/context';
import classes from './GoogleAuthButton.module.css';

function LoginButton() {
    const { loading, user, signIn, signOut } = useAuthContext();

    return (
        <Button
            className={classes.customButton}
            onClick={user ? signOut : signIn}
            variant="subtle"
            color="gray"
            // size="md"
            loading={loading}
            loaderProps={{ type: 'dots' }}
            // rightSection={<IconChevronRight size="1rem" />}
        >
            {user ? 'LogOut' : 'LogIn'}
        </Button>
    );
}

export default LoginButton;
