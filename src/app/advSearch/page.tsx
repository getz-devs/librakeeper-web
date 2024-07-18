'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
                <VerticalListSearch isAdv ISBN={search}></VerticalListSearch>
            </div>
        </div>
    );
}
