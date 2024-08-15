'use client'

import React, { useEffect, useState } from 'react';
import IntermediateLoading from './intermediateLoading';

interface NavigateToPageProps {
    navigateUrl: String;
}

export default function NavigateToPage({ navigateUrl }: NavigateToPageProps) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.open(navigateUrl.trim(), '_blank');
            setLoading(false);
        }, 10000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [navigateUrl]);

    return (
        <div>
            {loading ? <IntermediateLoading /> : <p>Navigation complete.</p>}
        </div>
    );
}