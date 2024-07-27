'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@mantine/core';
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin';
import classes from './QRcodeCamera.module.css';

export function QRcodeCamera() {
    const [scanResult, setScanResult] = useState('');
    const [scannerKey, setScannerKey] = useState(Date.now());

    const onNewScanResult = (decodedText: any) => {
        console.log(`Scan result: ${decodedText}`);
        setScanResult(decodedText);
        setScannerKey(Date.now());
    };

    const handleInputChange = (event: any) => {
        setScanResult(event.target.value);
    };

    const removeHyphens = (input: string) => input.replace(/-/g, '');

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
                <Input placeholder="Your ISBN" value={scanResult} onChange={handleInputChange} />
                <div className={classes.customButton}>
                    <Button
                        className={classes.customText}
                        variant="light"
                        size="42"
                        component={Link}
                        href={{ pathname: '/search', query: { q: removeHyphens(scanResult) } }}
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}
