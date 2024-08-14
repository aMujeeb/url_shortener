'use client';

interface LaunchRedirectUrlProps {
    originalUrl: string;
}

export default function LaunchRedirectUrl(urlProps: LaunchRedirectUrlProps) {
    window.open(urlProps.originalUrl.toString().trim(), '_blank')
}