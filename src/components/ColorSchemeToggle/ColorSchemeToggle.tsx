'use client';

import cx from 'clsx';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActionIcon, Group, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './ActionToggle.module.css';

export function ColorSchemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <Group justify="center" className={classes.customGroup}>
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
            >
                <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
        </Group>
        // <Group justify="center">
        //     <Button onClick={() => setColorScheme('light')}>Light</Button>
        //     <Button onClick={() => setColorScheme('dark')}>Dark</Button>
        //     <Button onClick={() => setColorScheme('auto')}>Auto</Button>
        // </Group>
    );
}
