import { ReactNode, useEffect, useRef, useState } from 'react';
import { ScrollArea, Box, Text, Badge, Card, Group } from '@mantine/core';

interface Item {
    title: string;
    text: string;
}

interface InfiniteScrollAreaProps {
    items: Item[];
    fetchMoreData: () => Promise<void>;
    loader: ReactNode;
}

const InfiniteScrollArea: React.FC<InfiniteScrollAreaProps> = ({
    items,
    fetchMoreData,
    loader,
}) => {
    const [loading, setLoading] = useState(false);
    const viewport = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (viewport.current) {
            const { scrollTop, scrollHeight, clientHeight } = viewport.current;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                if (!loading) {
                    setLoading(true);
                    fetchMoreData().finally(() => setLoading(false));
                }
            }
        }
    };

    useEffect(() => {
        const currentViewport = viewport.current;
        if (currentViewport) {
            currentViewport.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (currentViewport) {
                currentViewport.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading]);

    return (
        <ScrollArea style={{ height: '200px' }} viewportRef={viewport}>
            {items.map((item, i) => (
                <Card key={i} shadow="sm" padding="md" radius="md" mb="md" withBorder>
                    <Group justify="space-between" mb="xs">
                        <Text fw={500}>{item.title}</Text>
                        <Badge color="pink">Test</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                        {item.text}
                    </Text>
                </Card>
            ))}
            {loading && (
                <Box style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
                    {loader}
                </Box>
            )}
        </ScrollArea>
    );
};

export default InfiniteScrollArea;
