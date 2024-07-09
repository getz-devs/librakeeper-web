import { Title, Text, Button, Paper } from '@mantine/core';

export default function Card() {
    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url(${image})`,
            }}
            className={classes.card}
        >
            <div>
                <Title order={3} className={classes.title}>
                    1001 код на c++
                </Title>
                <Text className={classes.category} size="xs">
                    Откройте для себя c++ по новому
                </Text>
            </div>
        </Paper>
    );
}
