'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchBar() {
    const searchParams = useSearchParams();

    const search = searchParams.get('q');

    // URL -> `/dashboard?search=my-project`
    // `search` -> 'my-project'
    return <>Search: {search}</>;
}
