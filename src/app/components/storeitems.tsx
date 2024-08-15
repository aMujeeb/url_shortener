"use client";

import { navigateToPage } from "../utils/navigatetopage"
import { ShortUrlComponent } from "./shortenedItem";

interface Props {
    shortenedURLs: UrlShorter[],
    onDeleteButtonClick: (shortUrl: String) => void,
    onOpenButtonClick: (shortUrl: String) => void
}

export const ShortenedItemsList = ({ shortenedURLs, onDeleteButtonClick, onOpenButtonClick }: Props) => {

    const handleOpenClick = (param: String) => {
        onOpenButtonClick(param);
    };

    const handleDeleteClick = (param: String) => {
        onDeleteButtonClick(param);
    };

    return (<div>
        <h2 className="w-full text-l text-red-800 text-xl mt-4">Stored Items</h2>
        <ul className="shortened-list">
            {shortenedURLs.map((shortenedData) => (
                <li key={shortenedData.id}>
                    <ShortUrlComponent shortUrl={shortenedData} deleteButtonClick={handleDeleteClick} openButtonClick={handleOpenClick} />
                </li>
            ))}
        </ul>
    </div>
    )
}