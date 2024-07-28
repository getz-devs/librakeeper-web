'use client';

import VerticalList from '@/src/components/VerticalList/VerticalList';

interface VerticalListProps {
    bookshelfId: string;
}

export default function Collection({ params }: { params: VerticalListProps }) {
    const { bookshelfId } = params;

    return <VerticalList bookshelfId={bookshelfId}></VerticalList>;
}
