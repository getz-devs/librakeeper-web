'use client';

import React, { useState } from 'react';
import { Loader, Title } from '@mantine/core';
import InfiniteScrollArea from './InfiniteList';

interface Item {
    id: string;
    image: string;
    title: string;
    text: string;
}

const ExampleList: React.FC = () => {
    const [items, setItems] = useState<Item[]>(
        Array.from({ length: 20 }, (_, i) => ({
            title: `SuperJet ${i + 100}`,
            text: `This is the text for item ${i + 1}`,
            // image: 'https://animego.online/uploads/posts/2020-07/1593634011-volchica-i-pryanosti-poster.jpg',
            image: 'https://sun9-16.userapi.com/impf/c637718/v637718963/51fd9/nACCl1pDqvM.jpg?size=222x314&quality=96&sign=e71b016beb5daa4c8f7a968c83636cf2&type=album',
            id: `${i + 1}`,
        }))
    );

    const fetchMoreData = () =>
        new Promise<void>((resolve) => {
            setTimeout(() => {
                setItems((prevItems) => [
                    ...prevItems,
                    ...Array.from({ length: 20 }, (_, i) => ({
                        title: `SuperJet ${prevItems.length + i + 100}`,
                        text: `This is the text for item ${prevItems.length + i + 1}`,
                        // image: 'https://animego.online/uploads/posts/2020-07/1593634011-volchica-i-pryanosti-poster.jpg',
                        image: 'https://sun9-16.userapi.com/impf/c637718/v637718963/51fd9/nACCl1pDqvM.jpg?size=222x314&quality=96&sign=e71b016beb5daa4c8f7a968c83636cf2&type=album',
                        id: `${prevItems.length + i + 1}`,
                    })),
                ]);
                resolve();
            }, 1500);
        });

    return (
        // items
        <div>
            <Title
                order={2}
                ms={10}
                mb="xs"
                fw="bold"
            >
                Favorites
            </Title>
            <InfiniteScrollArea
                items={items}
                fetchMoreData={fetchMoreData}
                loader={<Loader size="md" />}
            />
        </div>
    );
};
export default ExampleList;
