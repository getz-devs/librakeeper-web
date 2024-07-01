import { Button } from '@mantine/core';
import Link from 'next/link';
import {
    IconPlus,
} from '@tabler/icons-react';

function AddButton() {
    return (
        <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 300 }}
            component={Link}
            href="/camera"
            size="xl"
            radius="xl"
            style={{
                position: 'fixed',
                bottom: '44px',
                right: '44px',
                zIndex: 1000,
                width: '80px',
                height: '80px',
                padding: 0,
                borderRadius: '50%',
            }}
        >
            <IconPlus size={36} />
        </Button>
    );
}

export default AddButton;
