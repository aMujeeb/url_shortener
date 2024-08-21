import { render, screen } from "@testing-library/react";
import Button from "./button";

it('render correctly with children when not loading', () => {
    const { getByText } = render(<Button callBackValue="test" loading={false} onButtonClick={() => { }} children="Click Me" />);
    expect(getByText('Click Me')).toBeInTheDocument();
});


it('should render correctly with no children', () => {
    const { container } = render(<Button callBackValue="test" loading={false} onButtonClick={() => { }} children={undefined} />);
    expect(container.querySelector('.shorten-button')).toBeInTheDocument();
    expect(container.querySelector('.shorten-button')?.textContent).toBe('');
});