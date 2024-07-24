"use client";

interface Props {
    shortUrl: UrlShorter
}

export const ShortUrlComponent = ({ shortUrl }: Props) => {
    return (
        <div>
            <p className=' text-blue-600'>{shortUrl.shortened}</p>
            <p className='text-sm'>{shortUrl.description}</p>
        </div>
    );
};