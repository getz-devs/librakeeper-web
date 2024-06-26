'use client';

import React, { useState } from 'react';
import { Loader } from '@mantine/core';
import InfiniteScrollArea from './InfiniteList';

interface Item {
    image: string;
    title: string;
    text: string;
}

const ExampleList: React.FC = () => {
    const [items, setItems] = useState<Item[]>(
        Array.from({ length: 20 }, (_, i) => ({
            title: `Item ${i + 1}`,
            text: `This is the text for item ${i + 1}`,
            image: 'https://animego.online/uploads/posts/2020-07/1593634011-volchica-i-pryanosti-poster.jpg',
        }))
    );

    const fetchMoreData = () =>
        new Promise<void>((resolve) => {
            setTimeout(() => {
                setItems((prevItems) => [
                    ...prevItems,
                    ...Array.from({ length: 20 }, (_, i) => ({
                        title: `Item ${prevItems.length + i + 1}`,
                        text: `This is the text for item ${prevItems.length + i + 1}`,
                        image: 'https://animego.online/uploads/posts/2020-07/1593634011-volchica-i-pryanosti-poster.jpg',
                    })),
                ]);
                resolve();
            }, 1500);
        });

    return (
        // items
        <InfiniteScrollArea
            items={items}
            fetchMoreData={fetchMoreData}
            loader={<Loader size="sm" />}
        />
    );
};
export default ExampleList;
