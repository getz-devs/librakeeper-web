'use client';

import { useState } from 'react';
import { Input } from '@mantine/core';
import Html5QrcodePlugin from './Html5QrcodeScannerPlugin';
import classes from './QRcodeCamera.module.css';

export function QRcodeCamera() {
    const [scanResult, setScanResult] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onNewScanResult = (decodedText : any, decodedResult : any) => {
        // handle decoded results here
        console.log(`Scan result: ${decodedText}`);
        // alert(`Scan result: ${decodedText}`);
        setScanResult(decodedText); // Записываем результат в состояние
    };

    return (
        <div>
            <div className={classes.camera}>
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={260}
                    disableFlip={false}
                    aspectRatio={1.0}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </div>
            <div className={classes.camera}>
                <Input placeholder="Input component" value={scanResult} />
            </div>
        </div>
    );
}
