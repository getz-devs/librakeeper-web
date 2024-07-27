'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
            <div>
                <VerticalListSearch isAdv ISBN={search}></VerticalListSearch>
            </div>
        </div>
    );
}
