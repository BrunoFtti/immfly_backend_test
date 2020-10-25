import { reverseWithUppercaseVowels } from '../services/stringUtils';

describe('Reverse string and convert vowels to uppercarse', () => {
  test('string in lowercase', () => {
    const sentence = 'hello, how are you?'

    // call function
    const result = reverseWithUppercaseVowels(sentence);

    // Should be in reverse order with vowels in uppercase
    expect(result).toMatchObject({
      data: {
        result: '?UOy ErA wOh ,OllEh'
      }
    });
  });

  test('string with some uppercase letters', () => {
    const sentence = 'Hello, How Are You?'

    // call function
    const result = reverseWithUppercaseVowels(sentence);

    // Should be in reverse order with its original uppercase letters and its vowels in uppercase
    expect(result).toMatchObject({
      data: {
        result: '?UOY ErA wOH ,OllEH'
      }
    });
  });
});
