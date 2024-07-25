"use client";

interface Props {
    shortUrl: UrlShorter,
    deleteButtonClick: (shortUrl: String) => void,
    openButtonClick: (shortUrl: String) => void
}

export const ShortUrlComponent = ({ shortUrl, deleteButtonClick, openButtonClick }: Props) => {

    const openLinkClickHandler = () => {
        openButtonClick(shortUrl.shortened);
    };

    const deleteLinkClickHandler = () => {
        deleteButtonClick(shortUrl.shortened);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <p className=' text-blue-600'>{shortUrl.shortened}</p>
                <p className='text-sm'>{shortUrl.description}</p>
            </div>
            <button className=' text-red-600' onClick={deleteLinkClickHandler}>Delete</button>
            <button className=' text-green-600' onClick={openLinkClickHandler}>Open Page</button>
        </div>
    );
};