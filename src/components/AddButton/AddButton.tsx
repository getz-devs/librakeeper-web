import { Button } from '@mantine/core';
import Link from 'next/link';

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
                fontSize: '50px',
                fontWeight: 600,
                padding: 0,
                paddingBottom: '10px',
                borderRadius: '50%',
            }}
        >
            +
        </Button>
    );
}

export default AddButton;
