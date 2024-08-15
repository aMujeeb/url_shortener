'use client'

import React, { useEffect, useState } from 'react';
import IntermediateLoading from '../components/intermediateLoading';

interface NavigateToPageProps {
    navigateUrl: String;
}

export default function NavigateToPage({ navigateUrl }: NavigateToPageProps) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.open('http://google.com', '_blank');
            setLoading(false);
        }, 4000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [navigateUrl]);

    return (
        <IntermediateLoading />
    );
}

{/* export default function NavigateToPage() {

    return (
        <div>
            <p>Navigation complete.</p>
        </div>
    );
}
 */}