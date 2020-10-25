// Reverse a word and convert its vowels to uppercase
export const reverseWithUppercaseVowels = (originalString: string) => {
  // Split the word in array, reverse it and join it again
  let result : string = originalString.split('').reverse().join('');

  // Convert vowels to uppercase
  result = result.replace(/[aeiou]/g, letter => letter.toUpperCase());

  return { data: { result } };
}
