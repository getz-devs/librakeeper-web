'use client';

import { Title, Text, Paper } from '@mantine/core';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import classes from './Book.module.css';
import { Loading } from '../Loading/Loading';

export default function Book() {
    return (
        <Suspense fallback={<Loading />}>
            <Card />
        </Suspense>
    );
}

function Card() {
    const searchParams = useSearchParams();
    const book_id = searchParams.get('q');

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{
                backgroundImage:
                    'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url(https://itvdn.blob.core.windows.net/catalog-images/cplspls-essential-img.jpg)',
            }}
            className={classes.card}
        >
            <div>
                <Title order={3} className={classes.title}>
                    {book_id}
                </Title>
                <Text className={classes.category} size="xs">
                    Откройте для себя c++ по новому
                </Text>
            </div>
        </Paper>
    );
}
