'use client';

import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface AppFrameProps {
    children: React.ReactNode;
}

export function AppFrame({ children }: AppFrameProps) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 160, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <p>L</p>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                Navbar
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
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
