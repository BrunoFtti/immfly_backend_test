import axios from 'axios';
import { fetchCountries } from './countries';

const allCountriesMock = [
  {
    country: 'Denmark',
    code: 'DK',
    vat: 24
  },
  {
    country: 'Germany',
    code: 'DE',
    vat: 19
  },
  {
    country: 'Ireland',
    code: 'IE',
    vat: 23
  },
  {
    country: 'Spain',
    code: 'ES',
    vat: 21
  },
  {
    country: 'Sweden',
    code: 'SW',
    vat: 25
  }
];

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Fetch countries', () => {
  // mock axios response for all tests
  mockedAxios.get.mockResolvedValue({ data: allCountriesMock });

  // Set filter
  const filter = 'DE';

  test('Without filter and order', async () => {
    // Fetch all countries without order or filter
    const result = await fetchCountries();

    // axios get should have been called
    expect(mockedAxios.get).toHaveBeenCalled();

    // countries should hold all countries, without order
    expect(result).toMatchObject({ data: { countries: allCountriesMock } });
  });

  test('Without filter and with invalid order', async () => {
    // Fetch all countries without filter and with invalid order
    const result = await fetchCountries(undefined, 'ASC');

    // axios get should have been called
    expect(mockedAxios.get).toHaveBeenCalled();

    // result should be an error with code 400 and its details
    expect(result).toMatchObject({
      error: {
        code: 400,
        details: '"order" can only be "asc" or "desc". Received: "ASC"'
      }
    });
  });

  test('With filter', async () => {
    // Fetch all countries with filter and without order
    const result = await fetchCountries(filter);

    // axios get should have been called
    expect(mockedAxios.get).toHaveBeenCalled();

    // Should be the ones that include the filter in their country or code, without order
    expect(result).toMatchObject({
      data: {
        countries: [
          {
            country: 'Denmark',
            code: 'DK',
            vat: 24
          },
          {
            country: 'Germany',
            code: 'DE',
            vat: 19
          },
          {
            country: 'Sweden',
            code: 'SW',
            vat: 25
          }
        ]
      }
    });
  });

  test('With filter, testing asc and desc order', async () => {
    // Fetch all countries filter and ascending order
    let result = await fetchCountries(filter, 'asc');

    // Should be the ones that include the filter in their country or code, in ascending order by vat
    expect(result).toMatchObject({
      data: {
        countries: [
          {
            country: 'Germany',
            code: 'DE',
            vat: 19
          },
          {
            country: 'Denmark',
            code: 'DK',
            vat: 24
          },
          {
            country: 'Sweden',
            code: 'SW',
            vat: 25
          }
        ]
      }
    });

    // Fetch all countries filter and descending order
    result = await fetchCountries(filter, 'desc');

    // Should be the ones that include the filter in their country or code, in descending order by vat
    expect(result).toMatchObject({
      data: {
        countries: [
          {
            country: 'Sweden',
            code: 'SW',
            vat: 25
          },
          {
            country: 'Denmark',
            code: 'DK',
            vat: 24
          },
          {
            country: 'Germany',
            code: 'DE',
            vat: 19
          }
        ]
      }
    });
  });
});
