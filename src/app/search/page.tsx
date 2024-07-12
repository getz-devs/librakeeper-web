'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import VerticalList from '@/src/components/VerticalList/VerticalList';

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
            <>Search: {search}</>
            <VerticalList />
        </div>
    );
}
