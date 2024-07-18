'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@mantine/core';
import Link from 'next/link';
import VerticalListSearch from '@/src/components/VerticalList/VerticalListSearch';

export default function SearchBar() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchBarContent />
        </Suspense>
    );
}

function SearchBarContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get('q');

    // URL -> `/dashboard?search=my-project`
    // `search` -> 'my-project'
    return (
        <div>
            <div>
                <VerticalListSearch ISBN={search}></VerticalListSearch>
            </div>
            <Button component={Link} href={{ pathname: '/advSearch', query: { q: search } }}>
                Здесь нет моей книги
            </Button>
        </div>
    );
}
