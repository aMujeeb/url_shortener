'use client';

import { useEffect, useState } from "react";
import IntermediateLoading from "./intermediateLoading";

interface LaunchRedirectUrlProps {
    originalUrl: string;
}

export default function LaunchRedirectUrl(urlProps: LaunchRedirectUrlProps) {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            window.open(urlProps.originalUrl, '_blank');
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    return (
        <IntermediateLoading />
    );
}
