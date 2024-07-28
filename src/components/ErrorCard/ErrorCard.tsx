import { Card, Center, Divider, Text, Title, useMantineTheme } from '@mantine/core';

interface ErrorCardProps {
    error: string;
    desc: string;
}

export function ErrorCard({ error, desc }: ErrorCardProps) {
    const theme = useMantineTheme();
    return (
        <Center>
            <Card mb="md" w={theme.breakpoints.sm}>
                <Title order={3}>{error}</Title>
                <Divider my="md" />
                <Text>{desc}</Text>
            </Card>
        </Center>
    );
}
