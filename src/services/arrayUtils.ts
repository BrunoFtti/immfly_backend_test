import { simpleArray } from '../config/config';

class ArrayHolder {
  array: string[];

  constructor () {
    // Copy the parsed array from env, to prevent its modification
    this.array = [...simpleArray];
  };

  // Add strings to the beggining and/or end of the array
  addToArray = (start?: string, end?: string) => {
    // Return error if both parameters are missing
    if (!start && !end) {
      return {
        error: {
          code: 400,
          details: 'Missing query parameters. Use "start" and/or "end" to append values to the array.'
        }
      }
    }

    // If there is a start string, append it to the start of the array
    if (start) this.array.unshift(start);

    // If there is an end string, append it to the end of the array
    if (end) this.array.push(end);

    return { data: { array: this.array } };
  };
}

export default new ArrayHolder();
