import { render, fireEvent, getAllByText, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom'

import { ShortenedItemsList } from './storeitems';

const mockShortenedURLs = [
    {
        id: 1,
        original: '',
        shortened: 'https://link1',
        description: 'Test desc one'
    },
    {
        id: 2,
        original: '',
        shortened: 'https://link2',
        description: 'Test desc two'
    },

];

const { getByText } = render(
    <ShortenedItemsList
        shortenedURLs={mockShortenedURLs}
        onDeleteButtonClick={() => { }}
        onOpenButtonClick={() => { }}
    />
);

describe('ShortenedItemsList', () => {

    it('Rendering the list of shortened URLs', () => {

        // Verify that each shortened URL is rendered
        mockShortenedURLs.forEach((shortenedData) => {
            const shortenedUrl = getByText(shortenedData.shortened);
            const description = getByText(shortenedData.description);
            expect(shortenedUrl).toBeInTheDocument();
            expect(description).toBeInTheDocument();
        });
    });
});

it('Invoke on onDeleteButtonClick', () => {
    const onDeleteButtonClickMock = jest.fn();

    const deleteButton = getByText('Delete')
    fireEvent.click(deleteButton);

    // Verify that onDeleteButtonClickMock was called with the correct parameter
    expect(onDeleteButtonClickMock).toHaveBeenCalledWith(mockShortenedURLs[0].shortened);
});

it('Invoke on onOpenButtonClick', () => {
    const onOpenButtonClickMock = jest.fn();
    const { getByText } = render(
        <ShortenedItemsList
            shortenedURLs={mockShortenedURLs}
            onDeleteButtonClick={() => { }}
            onOpenButtonClick={onOpenButtonClickMock}
        />
    );

    const openButton = getByText('Open Page');
    fireEvent.click(openButton);

    // Verify that onOpenButtonClickMock was called with the correct parameter
    expect(onOpenButtonClickMock).toHaveBeenCalledWith(mockShortenedURLs[0].shortened);
}); 