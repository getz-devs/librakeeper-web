import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/src/app/theme';
import { AuthContextProvider } from '@/src/firebase/context';
import { AppFrame } from '@/src/components/AppFrame/AppFrame';

export const metadata = {
    title: 'LibraKeeper',
    description: 'A Personal Book Library Management App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme="dark">
                    <AuthContextProvider>
                        <AppFrame>{children}</AppFrame>
                    </AuthContextProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
