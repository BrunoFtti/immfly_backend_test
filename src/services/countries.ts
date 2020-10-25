import axios from 'axios';
import { countriesUrl } from '../config/config';

type CountryData = {
  country: string,
  code: string,
  vat: number
};

// Fetch a list of countries from an API
// Allow to filter them by country or code, and order them by vat
export const fetchCountries = async (filter?: string, order?: string) => {
  // If there is a filter, convert it to lowercase
  const filterString = filter ? filter.toLowerCase() : '';

  // Validate order content
  if (order && !['asc', 'desc'].includes(order)) {
    return {
      error: {
        code: 400,
        details: `"order" can only be "asc" or "desc". Received: "${order}"`
      }
    }
  }

  // Make the request to the countries api
  let countries: CountryData[];
  try {
    const response = await axios.get(countriesUrl);

    // If there is no data in the response, return error
    if (response.data) countries = response.data;
    else {
      console.error(`Error - fetchCountries response has no data, status: ${response.status}`);
      return {
        error: {
          code: 502,
          details: 'An error has ocurred while trying to obtain the list of countries. Try again later.'
        }
      };
    }
  } catch (error) {
    console.error(`Error - fetchCountries request failed: ${error}`);
    return {
      error: {
        code: 502,
        details: 'An error has ocurred while trying to obtain the list of countries. Try again later.'
      }
    };
  };

  // If there is a filter, apply it by country and code
  if (filterString) {
    countries = countries.filter(data => data.country.toLowerCase().includes(filterString) || data.code.toLowerCase().includes(filterString));
  }

  // If there is an order, sort the countries by vat
  if (order) {
    const orderMult: number = order === 'asc' ? 1 : -1;
    countries.sort((a: CountryData, b: CountryData) => (a.vat - b.vat) * orderMult);
  }

  return { data: { countries } };
}
