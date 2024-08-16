import { URL_SHORTENED_ENDPOINT } from "../utils/appconstants";

export const shortenURL = async (originalURL: string, description: string) => {

    const response = await fetch(URL_SHORTENED_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original: originalURL, description }),
    });

    return await response.json();
};

export const getShortenedURLs = async () => {

    const response = await fetch(URL_SHORTENED_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const deleteShortenedURL = async (shortURL: String) => {

    const url = `${URL_SHORTENED_ENDPOINT}?shorturl=${encodeURIComponent(shortURL.toString())}`;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};