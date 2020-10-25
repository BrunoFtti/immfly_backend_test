import { simpleArray } from '../config/config';

describe('Array Utils', () => {
  describe('Append to a new array', () => {
    // Before each test clear modules to keep arrayService fresh
    beforeEach(() => jest.resetModules());

    test('Without passing start or end', () => {
      // Get arrayService object
      const arrayService = require('./arrayUtils').default;

      // Call the function without arguments
      const result = arrayService.addToArray();

      // Should be an error with code 400 and its details
      expect(result).toMatchObject({
        error: {
          code: 400,
          details: 'Missing query parameters. Use "start" and/or "end" to append values to the array.'
        }
      });
    });

    test('To the start of the array', () => {
      // Get arrayService object
      const arrayService = require('./arrayUtils').default;

      // Call the function with only the first argument
      const result = arrayService.addToArray('value at the start');

      // array should have the added value first and then the rest of the configured array
      expect(result).toMatchObject({
        data: {
          array: ['value at the start', ...simpleArray]
        }
      });
    });

    test('To the end of the array', () => {
      // Get arrayService object
      const arrayService = require('./arrayUtils').default;

      // Call the function with only the second argument
      const result = arrayService.addToArray(undefined, 'value at the end');

      // array should have the configured array first and then the added value
      expect(result).toMatchObject({
        data: {
          array: [...simpleArray, 'value at the end']
        }
      });
    });

    test('To the start and end of the array', () => {
      // Get arrayService object
      const arrayService = require('./arrayUtils').default;

      // Call the function with both arguments
      const result = arrayService.addToArray('value at the start', 'value at the end');

      // array should have the configured array first and then the added value
      expect(result).toMatchObject({
        data: {
          array: ['value at the start', ...simpleArray, 'value at the end']
        }
      });
    });
  });

  describe('Append multiple times to an array', () => {
    // Before each test clear modules to keep arrayService fresh
    beforeEach(() => jest.resetModules());

    test('To the start of the array twice', () => {
      // Get arrayService object
      const arrayService = require('./arrayUtils').default;

      // Call the function with only the first argument
      arrayService.addToArray('first value added');

      // Call the function with only the first argument
      const result = arrayService.addToArray('second value added');

      // should have the added values at the start, and the last one added should be the first element
      expect(result).toMatchObject({
        data: {
          array: ['second value added', 'first value added', ...simpleArray]
        }
      });
    });

    test('To the end of the array twice', () => {
      // Get arrayService object
      const arrayService = require('./arrayUtils').default;

      // Call the function with only the second argument
      arrayService.addToArray(undefined, 'first value added');

      // Call the function with only the second argument
      const result = arrayService.addToArray(undefined, 'second value added');

      // should have the added values at the end, and the last one added should be the last element
      expect(result).toMatchObject({
        data: {
          array: [...simpleArray, 'first value added', 'second value added']
        }
      });
    });

    test('To the start and end of the array twice', () => {
      // Get arrayService object
      const arrayService = require('./arrayUtils').default;

      // Call the function with both arguments
      arrayService.addToArray('first start value', 'first end value');

      // Call the function with both arguments
      const result = arrayService.addToArray('second start value', 'second end value');

      // should have the added values, the second ones added should be the first and last strings
      expect(result).toMatchObject({
        data: {
          array: [
            'second start value',
            'first start value',
            ...simpleArray,
            'first end value',
            'second end value']
        }
      });
    });
  });
});
