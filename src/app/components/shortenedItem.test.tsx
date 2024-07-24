import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

import { ShortUrlComponent } from './shortenedItem';

describe('ShortUrlComponent', () => {
    it('renders the shortened URL correctly', () => {
        const data = {
            id: 0,
            original: '',
            shortened: 'https://link',
            description: 'Test desc',
        };

        const { getByText } = render(<ShortUrlComponent shortUrl={data} />);

        const shortenedUrlElement = getByText(data.shortened);
        const descriptionElement = getByText(data.description);

        expect(shortenedUrlElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
    });
});