// Reverse a word and convert its vowels to uppercase
export const reverseWithUppercaseVowels = (word: string) => {
  // Split the word in array, reverse it and join it again
  let result : string = word.split('').reverse().join('');

  // Convert vowels to uppercase
  result = result.replace(/[aeiou]/g, letter => letter.toUpperCase());

  return { data: { word: result } };
}
