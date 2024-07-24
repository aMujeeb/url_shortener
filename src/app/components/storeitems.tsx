"use client";

import { navigateToPage } from "../utils/navigatetopage"
import { ShortUrlComponent } from "./shortenedItem";

interface Props {
    shortenedURLs: UrlShorter[]
}

export const ShortenedItemsList = ({ shortenedURLs }: Props) => {
    return (<div>
        <h2 className="w-full text-l text-red-800 text-xl">Stored Items</h2>
        <ul className="shortened-list">
            {shortenedURLs.map((shortenedData) => (
                <li key={shortenedData.id} onClick={() => navigateToPage(shortenedData.original)}>
                    <ShortUrlComponent shortUrl={shortenedData} />
                </li>
            ))}
        </ul>
    </div>
    )
}