// file = Html5QrcodePlugin.tsx
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = 'html5qr-code-full-region';

// Создание объекта конфигурации для Html5QrcodeScanner.
const createConfig = (props: Html5QrcodePluginProps): any => {
    const config: any = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

interface Html5QrcodePluginProps {
    fps?: number;
    qrbox?: number | { width: number; height: number };
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
    qrCodeErrorCallback?: (errorMessage: string) => void;
}

const Html5QrcodePlugin = (props: Html5QrcodePluginProps) => {
    useEffect(() => {
        const config = createConfig(props);
        const verbose = props.verbose === true;

        if (!props.qrCodeSuccessCallback) {
            throw new Error('qrCodeSuccessCallback is required.');
        }

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        return () => {
            html5QrcodeScanner.clear().catch((error) => {
                console.error('Failed to clear html5QrcodeScanner.', error);
            });
        };
    }, [props]);

    return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
