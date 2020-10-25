import express, { Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { fetchCountries } from '../services/countries';
import { reverseWithUppercaseVowels } from '../services/stringUtils';
import arrayService from '../services/arrayUtils';
import { sendResponse } from '../utils/response';
import { swaggerConfig } from '../config/config';

type ResponseData = {
  error?: {
    code: number,
    details: string
  },
  data?: object
}

const api = express.Router();

const swaggerDocs = swaggerJsDoc(swaggerConfig);

// API documentation
api.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /countries:
 *  get:
 *    summary: Fetch a list of countries
 *    description: Use to get a list of countries filtered by country and code, and ordered by vat
 *    parameters:
 *      - in: query
 *        name: filter
 *        description: value through which the list of countries will be filtered
 *      - in: query
 *        name: order
 *        description: sort countries by vat in ascending ('asc') or descending ('desc') order
 *    responses:
 *      '200':
 *        description: Successfully obtained countries
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    countries:
 *                      type: array
 *                      items:
 *                        type: object
 *      '400':
 *        description: Error - order is different than asc or desc
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "Error"
 *                details:
 *                  type: string
 *                  example: "order can only be asc or desc. Received: ASC"
 *      '502':
 *        description: Error - the request to the countries api failed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "Error"
 *                details:
 *                  type: string
 *                  example: "An error has ocurred while trying to obtain the list of countries. Try again later."
 */
api.get('/countries', async (req: Request, res: Response) => {
  const filter = req.query.filter?.toString();
  const order = req.query.order?.toString();

  const result: ResponseData = await fetchCountries(filter, order);

  if (result.error) sendResponse(res, result.error.code, { status: 'Error', details: result.error.details });
  else sendResponse(res, 200, { data: result.data });
});

/**
 * @swagger
 * /reverse/{string}:
 *  get:
 *    summary: Reverse a string and convert its vowels to uppercase
 *    description: Use to get a string reversed with its vowels in uppercase
 *    parameters:
 *      - in: path
 *        name: string
 *        required: true
 *        description: string to process
 *    responses:
 *      '200':
 *        description: Successfully processed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    word:
 *                      type: string
 *                      example: 'OllEh'
 */
api.get('/reverse/:word', (req: Request, res: Response) => {
  const result: ResponseData = reverseWithUppercaseVowels(req.params.word);

  sendResponse(res, 200, { data: result.data });
});

/**
 * @swagger
 * /append:
 *  post:
 *    summary: Add a string to an array of strings
 *    description: Use to append a string to the start and/or end of an array initially loaded from configuration files
 *    parameters:
 *      - in: query
 *        name: start
 *        description: value to append to the start of the array
 *      - in: query
 *        name: end
 *        description: value to append to the end of the array
 *    responses:
 *      '200':
 *        description: Successfully appended
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    array:
 *                      type: array
 *                      items:
 *                        type: string
 *                      example: ["value added at the start","value1", "value2", "value3", "value added at the end"]
 *      '400':
 *        description: Error - missing query parameters
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "Error"
 *                details:
 *                  type: string
 *                  example: "Missing query parameters. Use 'start' and/or 'end' to append values to the array."
 */
api.post('/append', (req: Request, res: Response) => {
  const start = req.query.start?.toString();
  const end = req.query.end?.toString();

  const result: ResponseData = arrayService.addToArray(start, end);

  if (result.error) sendResponse(res, result.error.code, { status: 'Error', details: result.error.details });
  else sendResponse(res, 200, { data: result.data });
});

export default api;
