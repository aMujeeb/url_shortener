"use client";
import React from 'react';

interface Props {
    message: string;
}

export const ErrorMessage = ({ message }: Props) => {
    return (
        <div>
            <p className="top-[12px] text-red-600">{message}</p>
        </div>
    );
};
