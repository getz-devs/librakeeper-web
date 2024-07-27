import { Card, Center, Divider, Text, Title, useMantineTheme } from '@mantine/core';

interface ErrorCardProps {
    error: string;
    desc: string;
}

export function ErrorCard({ error, desc }: ErrorCardProps) {
    const theme = useMantineTheme();
    return (
        <Center>
            <Card mb="md" maw={theme.breakpoints.xs}>
                <Title order={3}>{error}</Title>
                <Divider my="md" />
                <Text>{desc}</Text>
            </Card>
        </Center>
    );
}
