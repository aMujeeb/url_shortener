import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import { ShortUrlComponent } from './shortenedItem';

describe('ShortUrlComponent', () => {

    const mockShortUrl = {
        id: 0,
        original: '',
        shortened: 'https://link',
        description: 'Test desc',
    };

    it('Invoke deleteButtonClick when Delete button is clicked', () => {
        const deleteButtonClickMock = jest.fn();
        const { getByText } = render(
            <ShortUrlComponent
                shortUrl={mockShortUrl}
                deleteButtonClick={deleteButtonClickMock}
                openButtonClick={() => { }}
            />
        );

        const deleteButton = getByText('Delete');
        fireEvent.click(deleteButton);

        expect(deleteButtonClickMock).toHaveBeenCalledWith(mockShortUrl.shortened);
    });

    it('Invoke openButtonClick when Open Page button is clicked', () => {
        const openButtonClickMock = jest.fn();
        const { getByText } = render(
            <ShortUrlComponent
                shortUrl={mockShortUrl}
                deleteButtonClick={() => { }}
                openButtonClick={openButtonClickMock}
            />
        );

        const openButton = getByText('Open Page');
        fireEvent.click(openButton);

        expect(openButtonClickMock).toHaveBeenCalledWith(mockShortUrl.shortened);
    });

    it('Rendering description', () => {
        const { getByText } = render(
            <ShortUrlComponent
                shortUrl={mockShortUrl}
                deleteButtonClick={() => { }}
                openButtonClick={() => { }}
            />
        );

        const shortenedUrl = getByText(mockShortUrl.shortened);
        const description = getByText(mockShortUrl.description);

        expect(shortenedUrl).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });
});