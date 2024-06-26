import { ReactNode, useEffect, useRef, useState } from 'react';
import { ScrollArea, Box, Text, Badge, Card, Group } from '@mantine/core';

interface InfiniteScrollAreaProps {
    items: string[]; // Adjust the type based on the actual item structure
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
                        <Text fw={500}>{item}</Text>
                        <Badge color="pink">Test</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                        With Fjord Tours you can explore more of the magical fjord landscapes with
                        tours and activities on and around the fjords of Norway
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
