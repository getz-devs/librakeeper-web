import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Carousel from '../components/Carousel/Carousel';

export default function HomePage() {
    return (
        <>
            <Welcome />
            <Carousel />
            <ColorSchemeToggle />
        </>
    );
}
