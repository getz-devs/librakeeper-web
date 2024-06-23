import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import GoogleAuthButton from '../components/GoogleAuthButton/GoogleAuthButton';

export default function HomePage() {
    return (
        <>
            <Welcome />
            <ColorSchemeToggle />
            <GoogleAuthButton />
        </>
    );
}
