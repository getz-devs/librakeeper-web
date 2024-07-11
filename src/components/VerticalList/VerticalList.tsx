'use client';

/* eslint-disable arrow-body-style */

import React, { useState } from 'react';
import ListOfCards from './VerticalListForm';

interface Item {
    id: string;
    image: string;
    title: string;
    text: string;
}

const generateItems = (count: number): Item[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${i + 1}`,
        image: 'https://sun9-16.userapi.com/impf/c637718/v637718963/51fd9/nACCl1pDqvM.jpg?size=222x314&quality=96&sign=e71b016beb5daa4c8f7a968c83636cf2&type=album',
        title: `SuperJet ${i + 100}`,
        text: `This is the text for item ${i + 1}`,
    }));
};

const MyComponent: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [items, setItems] = useState<Item[]>(generateItems(10));

    return (
        <ListOfCards items={items} />
    );
};

export default MyComponent;
