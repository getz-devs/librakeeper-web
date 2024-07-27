import AddButton from '@/src/components/AddButton/AddButton';
import Collections from '../components/Collections/Collections';
import AllBooks from '../components/Collections/AllBooks';

export default function HomePage() {
    return (
        <>
            <AllBooks />
            <Collections />
            <AddButton />
        </>
    );
}
