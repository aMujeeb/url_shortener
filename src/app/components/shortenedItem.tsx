"use client";

const ShortUrlComponent = ( shortUrlData : UrlShorter ) => {
    return (
        <div>
            <p className=' text-blue-600'>{shortUrlData.shortened}</p>
            <p className='text-sm'>{shortUrlData.description}</p>
        </div>
    );
};

export default ShortUrlComponent;