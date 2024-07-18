'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, Stack, Image, Group, Text, Badge, Button } from '@mantine/core';
import VerticalList from '@/src/components/VerticalList/VerticalList';

interface VerticalListProps {
    bookshelfId: string;
}

export default function Collection({ params }: { params: VerticalListProps }) {
    const { bookshelfId } = params;

    return <VerticalList bookshelfId={bookshelfId}></VerticalList>;
}
