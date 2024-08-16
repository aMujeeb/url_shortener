'use client';

import { useEffect, useState } from "react";
import IntermediateLoading from "./intermediateLoading";
import { useRouter } from 'next/navigation';

interface LaunchRedirectUrlProps {
    originalUrl: string;
}

export default function LaunchRedirectUrl(urlProps: LaunchRedirectUrlProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            window.open(urlProps.originalUrl, '_blank');
            setLoading(false);
            handleBackNavigation();
        }, 5000);

        const handleBackNavigation = () => {
            router.back();
        };

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    return (
        <IntermediateLoading />
    );
}
