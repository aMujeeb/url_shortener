"use client";

export const ErrorMessage = (message: String) => {
    return (
        <div>
            <p className="top-[12px] text-red-600">{message}</p>
        </div>
    );
};
