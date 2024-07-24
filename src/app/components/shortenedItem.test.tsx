import { render } from '@testing-library/react';
import { ShortUrlComponent } from './shortenedItem'; // Adjust the import path

describe('ShortUrlComponent', () => {
    it('renders the shortened URL correctly', () => {
        const data = {
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