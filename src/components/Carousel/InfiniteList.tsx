// import { ReactNode, useEffect, useRef, useState } from 'react';
// import { Carousel } from '@mantine/carousel';
// import {
//     ScrollArea,
//     Box,
//     Text,
//     Badge,
//     Group,
//     Button,
//     Paper,
//     Title,
//     useMantineTheme,
// } from '@mantine/core';

// import { useMediaQuery } from '@mantine/hooks';
// import classes from './InfiniteList.module.css';

// interface Item {
//     image: string;
//     title: string;
//     text: string;
// }

// interface InfiniteScrollAreaProps {
//     items: Item[];
//     fetchMoreData: () => Promise<void>;
//     loader: ReactNode;
// }

// function Card({ image, title, text }: Item) {
//     return (
//         <Paper
//             shadow="md"
//             p="xl"
//             radius="md"
//             style={{ backgroundImage: `url(${image})` }}
//             className={classes.card}
//         >
//             <div>
//                 <Text className={classes.category} size="xs">
//                     {text}
//                 </Text>
//                 <Title order={3} className={classes.title}>
//                     {title}
//                 </Title>
//             </div>
//             <Button variant="white" color="dark">
//                 Read
//             </Button>
//         </Paper>
//     );
// }

// function InfiniteList(items: Item[]) {
//     const theme = useMantineTheme();
//     const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
//     const slides = items.map((item, i) => (
//         <Carousel.Slide key={item.title}>
//             <Card {...item} />
//         </Carousel.Slide>
//     ));

//     return (
//         <Carousel
//             slideSize={{ base: '100%', sm: '50%' }}
//             slideGap={{ base: 'xl', sm: 2 }}
//             align="start"
//             slidesToScroll={mobile ? 1 : 2}
//         >
//             {slides}
//         </Carousel>
//     );
// }

// const InfiniteScrollArea: React.FC<InfiniteScrollAreaProps> = ({
//     items,
//     fetchMoreData,
//     loader,
// }) => {
//     const [loading, setLoading] = useState(false);
//     const viewport = useRef<HTMLDivElement>(null);

//     // const handleScroll = () => {
//     //     if (viewport.current) {
//     //         const { scrollTop, scrollHeight, clientHeight } = viewport.current;
//     //         if (scrollTop + clientHeight >= scrollHeight - 20) {
//     //             if (!loading) {
//     //                 setLoading(true);
//     //                 fetchMoreData().finally(() => setLoading(false));
//     //             }
//     //         }
//     //     }
//     // };

//     const handleScroll = () => {
//         if (viewport.current) {
//             const { scrollLeft, scrollWidth, clientWidth } = viewport.current;
//             if (scrollLeft + clientWidth >= scrollWidth - 20) {
//                 if (!loading) {
//                     setLoading(true);
//                     fetchMoreData().finally(() => setLoading(false));
//                 }
//             }
//         }
//     };

//     useEffect(() => {
//         const currentViewport = viewport.current;
//         if (currentViewport) {
//             currentViewport.addEventListener('scroll', handleScroll);
//         }
//         return () => {
//             if (currentViewport) {
//                 currentViewport.removeEventListener('scroll', handleScroll);
//             }
//         };
//     }, [loading]);

//     const theme = useMantineTheme();
//     const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
//     const slides = items.map((item, i) => (
//         <Carousel.Slide key={item.title}>
//             <Card {...item} />
//         </Carousel.Slide>
//     ));

//     return (
//         <Carousel
//             slideSize={{ base: '100%', sm: '50%' }}
//             slideGap={{ base: 'xl', sm: 2 }}
//             align="start"
//             slidesToScroll={mobile ? 1 : 2}
//         >
//             {slides}
//             {loading && (
//                 <Box style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
//                     {loader}
//                 </Box>
//             )}
//         </Carousel>
//     );

//     // return (
//     //     <ScrollArea style={{ height: '200px', whiteSpace: 'nowrap' }} viewportRef={viewport}>
//     //         {items.map((item, i) => (
//     //             <Card
//     //                 key={i}
//     //                 shadow="sm"
//     //                 padding="md"
//     //                 radius="md"
//     //                 mb="md"
//     //                 style={{
//     //                     display: 'inline-block',
//     //                     marginRight: '16px',
//     //                     width: '300px',
//     //                     whiteSpace: 'normal',
//     //                 }}
//     //                 withBorder
//     //             >
//     //                 <Group justify="space-between" mb="xs">
//     //                     <Text fw={500}>{item.title}</Text>
//     //                     <Badge color="pink">Test</Badge>
//     //                 </Group>

//     //                 <Text size="sm" c="dimmed">
//     //                     {item.text}
//     //                 </Text>
//     //             </Card>
//     //         ))}
//     //         {loading && (
//     //             <Box style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
//     //                 {loader}
//     //             </Box>
//     //         )}
//     //     </ScrollArea>
//     // );
// };

// // export default InfiniteList;
// export default InfiniteScrollArea;

import { ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import {
    ScrollArea,
    Box,
    Text,
    Badge,
    Group,
    Button,
    Paper,
    Title,
    useMantineTheme,
} from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';
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
            style={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {text}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
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

    const handleMouseDown = (e: { clientX: SetStateAction<number>; }) => {
        if (viewport.current) {
            setIsDragging(true);
            setStartPosition(e.clientX);
            setScrollLeft(viewport.current.scrollLeft);
        }
    };

    const handleMouseMove = (e: { clientX: number; }) => {
        if (viewport.current) {
            if (!isDragging) return;
            const walk = (e.clientX - startPosition) * 1.5;
            viewport.current.scrollLeft = scrollingLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
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
            viewport.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollToRight = () => {
        if (viewport.current) {
            viewport.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
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
                    left: 0,
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
                        <Box style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
                            {loader}
                        </Box>
                    )}
                </div>
            </ScrollArea>
            <Button
                variant="outline"
                color="dark"
                onClick={scrollToRight}
                style={{
                    position: 'absolute',
                    right: 0,
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
