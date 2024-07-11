import Carousel from '@/src/components/Carousel/Carousel';
import AddButton from '@/src/components/AddButton/AddButton';
import VerticalList from '@/src/components/VerticalList/VerticalList';

export default function HomePage() {
    return (
        <>
            <Carousel />
            <VerticalList />
            <AddButton />
            {/* <ColorSchemeToggle /> */}
        </>
    );
}
