import { ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
// import { Carousel } from '@mantine/carousel';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import {
    ScrollArea,
    Box,
    Text,
    Button,
    Paper,
    Title,
    // useMantineTheme,
} from '@mantine/core';

// import { useMediaQuery } from '@mantine/hooks';
import classes from './InfiniteList.module.css';

interface Item {
    image: string;
    title: string;
    text: string;
}

interface InfiniteScrollAreaProps {
    items: Item[];
    fetchMoreData: () => Promise<void>;
    loader: ReactNode;
}

function Card({ image, title, text }: Item) {
    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url(${image})`,
            }}
            className={classes.card}
        >
            <div>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
                <Text className={classes.category} size="xs">
                    {text}
                </Text>
            </div>
            <Button variant="white" color="dark">
                Read
            </Button>
        </Paper>
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

    // const theme = useMantineTheme();
    // const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const slides = items.map((item) => (
        <Box key={item.title} className={classes.slide} style={{ margin: '0 10px' }}>
            <Card {...item} />
        </Box>
        // <Carousel.Slide key={item.title} style={{ margin: '0 10px' }}>
        //     <Card {...item} />
        // </Carousel.Slide>
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
                    {/* {loading && (
                        <Box style={{ display: 'flex', justifyContent: 'center', align: 'center', padding: '4px' }}>
                            {loader}
                        </Box>
                    )} */}
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

    // return (
    //     <Carousel
    //         slideSize={{ base: '100%', sm: '50%' }}
    //         slideGap={{ base: 'xl', sm: 2 }}
    //         align="start"
    //         slidesToScroll={mobile ? 1 : 2}
    //     >
    //         <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>{slides}</div>
    //         {loading && (
    //             <Box style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
    //                 {loader}
    //             </Box>
    //         )}
    //     </Carousel>
    // );
};

export default InfiniteScrollArea;
