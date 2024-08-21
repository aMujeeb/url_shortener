import '@testing-library/jest-dom'
import { deleteShortenedURL, getShortenedURLs, shortenURL } from './urlservices';
import { URL_SHORTENED_ENDPOINT } from '../utils/appconstants';

// Successfully deletes a shortened URL and returns a JSON response
it('should return JSON response when URL is successfully deleted', async () => {
    const shortURL = "testShortURL";
    const mockResponse = { success: true };

    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
    }) as jest.MockedFunction<typeof fetch>;

    const result = await deleteShortenedURL(shortURL);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
        "api/url/shorten?shorturl=testShortURL",
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
});

// Handles non-existent shortURL gracefully
it('should handle non-existent shortURL gracefully', async () => {
    const shortURL = 'nonexistent';
    const mockResponse = { error: 'URL not found' };

    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
        headers: {},
        ok: true,
        redirected: false,
        status: 200,
        statusText: 'OK',
    }) as jest.MockedFunction<typeof fetch>;

    const result = await deleteShortenedURL(shortURL);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
        `${URL_SHORTENED_ENDPOINT}?shorturl=${encodeURIComponent(shortURL)}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
});

// Fetches shortened URLs successfully
it('should fetch shortened URLs successfully when the API call is successful', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue([{ originalUrl: 'http://example.com', shortUrl: 'http://short.ly/abc123' }]),
        headers: {},
        ok: true,
        redirected: false,
        status: 200,
        statusText: 'OK',
    });

    const result = await getShortenedURLs();

    expect(result).toEqual([{ originalUrl: 'http://example.com', shortUrl: 'http://short.ly/abc123' }]);
    expect(fetch).toHaveBeenCalledWith("api/url/shorten", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
});

// Handles network failures gracefully
it('should handle network failures gracefully when the API call fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ error: 'Original URL cannot be empty' }),
        headers: {},
        ok: true,
        redirected: false,
        status: 200,
        statusText: 'OK',
    }) as jest.MockedFunction<typeof fetch>;

    try {
        await getShortenedURLs();
    } catch (error) {
        expect(error).toEqual(new Error('Network Error'));
    }

    expect(fetch).toHaveBeenCalledWith("api/url/shorten", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
});

// Successfully shortens a valid URL with a description
it('should return shortened URL when given a valid URL and description', async () => {
    const originalURL = 'https://example.com';
    const description = 'Example website';
    const mockResponse = { shortenedURL: 'https://short.ly/abc123' };

    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
        headers: {},
        ok: true,
        redirected: false,
        status: 200,
        statusText: 'OK',
    }) as jest.MockedFunction<typeof fetch>;

    const result = await shortenURL(originalURL, description);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(URL_SHORTENED_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original: originalURL, description }),
    });
});

// Handles an empty originalURL string
it('should handle empty originalURL string by returning an error', async () => {
    const originalURL = '';
    const description = 'Empty URL test';
    const mockErrorResponse = { error: 'Original URL cannot be empty' };

    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockErrorResponse),
    }) as jest.MockedFunction<typeof fetch>;

    const result = await shortenURL(originalURL, description);

    expect(result).toEqual(mockErrorResponse);
    expect(fetch).toHaveBeenCalledWith(URL_SHORTENED_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original: originalURL, description }),
    });
});