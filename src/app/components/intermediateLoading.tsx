'use client';

import React, { useState, useEffect } from 'react';
export default function IntermediateLoading() {
    const [seconds, setSeconds] = useState(3);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds]);

    return (
        <div>
            <h1>Loading...</h1>
            <div>
                {seconds > 0 ? <h1>{seconds}</h1> : <h1>Re-Directing.!</h1>}
            </div>
        </div>
    )
}