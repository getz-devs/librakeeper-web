'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@mantine/core';
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin';
import classes from './QRcodeCamera.module.css';

export function QRcodeCamera() {
    const [scanResult, setScanResult] = useState('');
    const [scannerKey, setScannerKey] = useState(Date.now());

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onNewScanResult = (decodedText: any, decodedResult: any) => {
        // handle decoded results here
        console.log(`Scan result: ${decodedText}`);
        // alert(`Scan result: ${decodedText}`);
        setScanResult(decodedText);
        setScannerKey(Date.now());
    };

    const handleInputChange = (event: any) => {
        setScanResult(event.target.value);
    };

    return (
        <div>
            <div className={classes.camera}>
                <Html5QrcodePlugin
                    key={scannerKey}
                    fps={10}
                    qrbox={260}
                    disableFlip={false}
                    aspectRatio={1.0}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </div>
            <div className={classes.camera}>
                <Input
                    placeholder="Input component"
                    value={scanResult}
                    onChange={handleInputChange}
                />
                <div className={classes.customButton}>
                    <Button
                        className={classes.customText}
                        size="42"
                        component={Link}
                        // href="/search"
                        // eslint-disable-next-line no-template-curly-in-string
                        // href={`/search?q=${scanResult}`}
                        href={{ pathname: '/search', query: { q: scanResult } }}
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}
