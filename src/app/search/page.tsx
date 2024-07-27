'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Center } from '@mantine/core';
import Link from 'next/link';
import VerticalListSearch from '@/src/components/VerticalList/VerticalListSearch';
import { Loading } from '@/src/components/Loading/Loading';

export default function SearchBar() {
    return (
        <Suspense fallback={<Loading />}>
            <SearchBarContent />
        </Suspense>
    );
}

function SearchBarContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get('q');

    return (
        <div>
            <VerticalListSearch ISBN={search}></VerticalListSearch>
            <Center>
                <Button component={Link} href={{ pathname: '/advSearch', query: { q: search } }}>
                    Advanced Search
                </Button>
            </Center>
        </div>
    );
}
