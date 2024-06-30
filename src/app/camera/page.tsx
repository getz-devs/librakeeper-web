import { Container } from '@mantine/core';
import { QRcodeCamera } from '@/src/components/Html5qrcode/QRcodeCamera';

export default function HomePage() {
    return (
        <Container size="xl" px={0}>
            <QRcodeCamera />
        </Container>
    );
}
