import { inputValidate } from '../src/app/utils/stringutils'
//import "@testing-library/jest-dom";

tdescribe('inputValidate function', () => {
  it('Accepting valid URLs', () => {
    const validUrl = 'https://example.com';
    expect(inputValidate(validUrl)).toBe(true);
  });

  it('Rejecting invalid URLs', () => {
    const invalidUrl = 'not-a-valid-url';
    expect(inputValidate(invalidUrl)).toBe(false);
  });
});