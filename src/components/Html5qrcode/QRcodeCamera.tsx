'use client';

import Html5QrcodePlugin from './Html5QrcodeScannerPlugin';
import classes from './QRcodeCamera.module.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onNewScanResult = (decodedText: any, decodedResult: any) => {
    // handle decoded results here
    console.log(`Scan result: ${decodedText}`);
    alert(`Scan result: ${decodedText}`);
};

export function QRcodeCamera() {
    return (
        <div className={classes.camera}>
            <Html5QrcodePlugin
                fps={10}
                qrbox={260}
                disableFlip={false}
                aspectRatio={1.0}
                qrCodeSuccessCallback={onNewScanResult}
            />
        </div>
    );
}
