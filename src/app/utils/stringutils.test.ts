import { inputValidate } from './stringutils'
import "@testing-library/jest-dom";

describe('inputValidate function', () => {
  it('Accepting valid URLs', () => {
    const validUrl = 'https://url.shortener.com';
    expect(inputValidate(validUrl)).toBe(true);
  });

  it('Rejecting invalid URLs', () => {
    const invalidUrl = 'kjgfmhdhgcghcmgc';
    expect(inputValidate(invalidUrl)).toBe(false);
  });
});