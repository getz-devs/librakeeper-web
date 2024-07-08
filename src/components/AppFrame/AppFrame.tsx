'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AppShell, Burger, Group, Tooltip, UnstyledButton, Stack, rem, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
    // IconLogout,
    // IconSwitchHorizontal,
} from '@tabler/icons-react';
import { ColorSchemeToggle } from '@/src/components/ColorSchemeToggle/ColorSchemeToggle';

import classes from './AppFrame.module.css';
import GoogleAuthButton from '@/src/components/GoogleAuthButton/GoogleAuthButton';

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                onClick={onClick}
                className={classes.link}
                data-active={active || undefined}
            >
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconGauge, label: 'Dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    { icon: IconCalendarStats, label: 'Releases' },
    { icon: IconUser, label: 'Account' },
    { icon: IconFingerprint, label: 'Security' },
    { icon: IconSettings, label: 'Settings' },
];

interface AppFrameProps {
    children: React.ReactNode;
}

export function AppFrame({ children }: AppFrameProps) {
    const [active, setActive] = useState(0);
    const [opened, { toggle }] = useDisclosure();

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 90, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" style={{ justifyContent: 'space-between' }}>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Button variant="transparent" component={Link} href="/" className={classes.customLabel}> L </Button>
                    <div style={{ marginLeft: 'auto' }}> <ColorSchemeToggle /> </div>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Stack className={classes.navbarMain} justify="center" gap={3}>
                    {links}
                </Stack>
                <div>
                    <GoogleAuthButton></GoogleAuthButton>
                </div>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
}

// import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
// import { useState } from 'react';

// import {
//     IconHome2,
//     IconGauge,
//     IconDeviceDesktopAnalytics,
//     IconFingerprint,
//     IconCalendarStats,
//     IconUser,
//     IconSettings,
//     IconLogout,
//     IconSwitchHorizontal,
// } from '@tabler/icons-react';
// // import { MantineLogo } from '@mantinex/mantine-logo';
// import classes from './AppFrame.module.css';

// // import { useAuthContext } from '@/src/firebase/context';

// interface AppFrameProps {
//     children: React.ReactNode;
// }

// interface NavbarLinkProps {
//     icon: typeof IconHome2;
//     label: string;
//     active?: boolean;
//     onClick?: () => void;
// }

// function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
//     return (
//         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
//             <UnstyledButton
//                 onClick={onClick}
//                 className={classes.link}
//                 data-active={active || undefined}
//             >
//                 <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
//             </UnstyledButton>
//         </Tooltip>
//     );
// }

// const mockdata = [
//     { icon: IconHome2, label: 'Home' },
//     { icon: IconGauge, label: 'Dashboard' },
//     { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
//     { icon: IconCalendarStats, label: 'Releases' },
//     { icon: IconUser, label: 'Account' },
//     { icon: IconFingerprint, label: 'Security' },
//     { icon: IconSettings, label: 'Settings' },
// ];

// export function AppFrame({ children }: AppFrameProps) {
//     const [active, setActive] = useState(2);

//     const links = mockdata.map((link, index) => (
//         <NavbarLink
//             {...link}
//             key={link.label}
//             active={index === active}
//             onClick={() => setActive(index)}
//         />
//     ));

//     return (
//         <div className={classes.appFrame}>
//             <nav className={classes.navbar}>
//                 <Center>
//                     {/* <MantineLogo type="mark" size={30} /> */}
//                     <p>L</p>
//                 </Center>

//                 <div className={classes.navbarMain}>
//                     <Stack justify="center" gap={0}>
//                         {links}
//                     </Stack>
//                 </div>

//                 <Stack justify="center" gap={0}>
//                     <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
//                     <NavbarLink icon={IconLogout} label="Logout" />
//                 </Stack>
//             </nav>

//             <main className={classes.content}>
//                 {children}
//             </main>
//         </div>
//     );
// }
