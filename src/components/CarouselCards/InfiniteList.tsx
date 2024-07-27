import { ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { Image, ScrollArea, Box, Text, Button, Card, Group, AspectRatio } from '@mantine/core';
import Link from 'next/link';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Book } from '@/src/types/api';

import classes from './InfiniteList.module.css';

interface InfiniteScrollAreaProps {
    items: Book[];
    fetchMoreData: () => Promise<void>;
    loader: ReactNode;
}

function CardBook({ id, cover_image, title, description }: Book) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={200}>
            <Card.Section style={{ userSelect: 'none', pointerEvents: 'none' }}>
                <AspectRatio ratio={4 / 5} maw={300} mx="auto">
                    <Image src={cover_image} />
                </AspectRatio>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text
                    fw={500}
                    truncate="end"
                    component={Link}
                    href={{ pathname: `/book/${id}` }}
                    span
                    c="blue"
                    inherit
                >
                    {title}
                </Text>
            </Group>

            <Text size="sm" c="dimmed" truncate="end">
                {description}
            </Text>
        </Card>
    );
}

const InfiniteScrollArea: React.FC<InfiniteScrollAreaProps> = ({
    items,
    fetchMoreData,
    loader,
}) => {
    const [loading, setLoading] = useState(false);
    const viewport = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [scrollingLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: { clientX: SetStateAction<number> }) => {
        if (viewport.current) {
            setIsDragging(true);
            setStartPosition(e.clientX);
            setScrollLeft(viewport.current.scrollLeft);
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'grabbing';
        }
    };

    const handleMouseMove = (e: { clientX: number }) => {
        if (viewport.current) {
            if (!isDragging) return;
            const walk = (e.clientX - startPosition) * 1.5;
            viewport.current.scrollLeft = scrollingLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
    };

    const handleScroll = () => {
        if (viewport.current) {
            const { scrollLeft, scrollWidth, clientWidth } = viewport.current;
            if (scrollLeft + clientWidth >= scrollWidth - 20) {
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

    const scrollToLeft = () => {
        if (viewport.current) {
            viewport.current.scrollBy({ left: -504, behavior: 'smooth' });
        }
    };

    const scrollToRight = () => {
        if (viewport.current) {
            viewport.current.scrollBy({ left: 504, behavior: 'smooth' });
        }
    };

    const slides = items.map((item) => (
        <Box key={item.id} className={classes.slide} style={{ margin: '0 10px' }}>
            <CardBook {...item} />
        </Box>
    ));

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <Button
                variant="outline"
                color="dark"
                onClick={scrollToLeft}
                style={{
                    position: 'absolute',
                    left: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                }}
            >
                <IconChevronLeft size={24} />
            </Button>
            <ScrollArea
                viewportRef={viewport}
                style={{ width: '100%', whiteSpace: 'nowrap' }}
                type="never"
                scrollbars="x"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div style={{ display: 'flex' }}>
                    {slides}
                    {loading && (
                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                align: 'center',
                                padding: '4px',
                            }}
                        >
                            {loader}
                        </Box>
                    )}
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            align: 'center',
                            padding: '4px',
                        }}
                    >
                        {/* {loader} */}
                    </Box>
                </div>
            </ScrollArea>
            <Button
                variant="outline"
                color="dark"
                onClick={scrollToRight}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                }}
            >
                <IconChevronRight size={24} />
            </Button>
        </div>
    );
};

export default InfiniteScrollArea;
