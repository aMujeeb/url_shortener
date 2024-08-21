import { render } from "@testing-library/react";
import InputText from "./inputText";

// Renders input field with provided value
it('should render input field with provided value', () => {
    const { getByDisplayValue } = render(<InputText value="test value" onChange={() => { }} placeholder="Enter text" disabled={false} />);
    expect(getByDisplayValue("test value")).toBeInTheDocument();
});

// Renders correctly with empty value
it('should render correctly with empty value', () => {
    const { getByPlaceholderText } = render(<InputText value="" onChange={() => { }} placeholder="Enter text" disabled={false} />);
    expect((getByPlaceholderText("Enter text") as HTMLInputElement).value).toBe("");
});