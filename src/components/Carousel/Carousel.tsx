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
            title: `SuperJet 10${i + 1}`,
            text: `This is the text for item ${i + 1}`,
            // image: 'https://animego.online/uploads/posts/2020-07/1593634011-volchica-i-pryanosti-poster.jpg',
            image: 'https://sun9-16.userapi.com/impf/c637718/v637718963/51fd9/nACCl1pDqvM.jpg?size=222x314&quality=96&sign=e71b016beb5daa4c8f7a968c83636cf2&type=album',
        }))
    );

    const fetchMoreData = () =>
        new Promise<void>((resolve) => {
            setTimeout(() => {
                setItems((prevItems) => [
                    ...prevItems,
                    ...Array.from({ length: 20 }, (_, i) => ({
                        title: `SuperJet 10${prevItems.length + i + 1}`,
                        text: `This is the text for item ${prevItems.length + i + 1}`,
                        // image: 'https://animego.online/uploads/posts/2020-07/1593634011-volchica-i-pryanosti-poster.jpg',
                        image: 'https://sun9-16.userapi.com/impf/c637718/v637718963/51fd9/nACCl1pDqvM.jpg?size=222x314&quality=96&sign=e71b016beb5daa4c8f7a968c83636cf2&type=album',
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
            loader={<Loader size="md" />}
        />
    );
};
export default ExampleList;
