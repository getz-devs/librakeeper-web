import { Text, Button, Stack, Card, Group, Image } from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRef } from 'react';
import classes from './VerticalListForm.module.css';

interface Item {
    id: string;
    image: string;
    title: string;
    text: string;
}

interface ListProps {
    items: Item[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BookCard({ id, image, title, text }: Item) {
    return (
        <Card shadow="sm" padding={0} radius="md" withBorder style={{ width: '60%' }}>
            <Group wrap="nowrap" gap={0}>
                <Image src={image} style={{ width: '40%' }} />
                <Stack px="md" h="100%" style={{ width: '100%' }}>
                    <Group justify="space-between" mb="xs">
                        <Text fw={500}>{title}</Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                        {text}
                    </Text>

                    <Stack align="end">
                        <Button color="blue" fullWidth mt="md" radius="md" style={{ width: '40%' }}>
                            Choose this
                        </Button>
                    </Stack>
                </Stack>
            </Group>
        </Card>
    );
}

const ListOfCards: React.FC<ListProps> = ({ items }) => {
    const viewport = useRef<HTMLDivElement>(null);
    return (
        <div ref={viewport} className={classes.list}>
            {items.map((item) => (
                <BookCard key={item.id} {...item} />
            ))}
        </div>
    );
};

export default ListOfCards;
