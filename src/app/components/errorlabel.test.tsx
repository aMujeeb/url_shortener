import "@testing-library/jest-dom";
import React from 'react';
import { ErrorMessage } from './errorlabel';
import { describe, it } from 'node:test';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ErrorMessage Component', () => {
    it('renders the error message', () => {
        const testMessage = 'Test Error';

        render(<ErrorMessage message={testMessage} />);

        // Expect the message to be in the document
        const messageElement = screen.getByText(testMessage);
        expect(messageElement).toBeInTheDocument();
        expect(messageElement).toHaveClass('text-red-600');
    });

    it('renders without crashing', () => {
        const { container } = render(<ErrorMessage message="Test message" />);
        expect(container).toBeInTheDocument();
    });
});

