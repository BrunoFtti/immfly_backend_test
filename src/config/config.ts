import { config } from 'dotenv';
import { join } from 'path';

// find the .env file path and load its content as environment variables
const envPath = join(__dirname, '.env.' + (process.env.NODE_ENV || 'development'));
const dotenvResult = config({ path: envPath });
if (dotenvResult.error) {
  console.warn(`Warning: Could not read configuration file ${envPath}. Using default values.\n`);
}

// Get port from configuration or set default
export const port:string = process.env.PORT || '8080';

// Swagger configuration
export const swaggerConfig = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Immfly Backend Test',
      version: '1.0.0'
    },
    servers: [{ url: `http://localhost:${port}` }]
  },
  apis: ['dist/api/routes.js']
};

export const requestTimeout: number = process.env.REQUEST_TIMEOUT ? parseInt(process.env.REQUEST_TIMEOUT, 10) : 30000;

const loadSimpleArray = () : string[] => {
  try {
    return JSON.parse(process.env.SIMPLE_ARRAY || '[]').map((val: any) => val.toString());
  } catch (error) {
    console.log('Error parsing SIMPLE_ARRAY environmental variable into an array. Using [] as default.');
    console.log('Correct the format of SIMPLE_ARRAY, e.g.: SIMPLE_ARRAY=["value1", "value2"]');
    return [];
  }
}

export const simpleArray: string[] = loadSimpleArray();

export const countriesUrl: string = process.env.COUNTRIES_API_URL || '';
