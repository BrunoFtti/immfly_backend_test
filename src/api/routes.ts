import express, { Request, Response } from 'express';
import { fetchCountries } from '../services/countries';
import { reverseWithUppercaseVowels } from '../services/stringUtils';
import arrayService from '../services/arrayUtils';
import { sendResponse } from '../utils/response';

type ResponseData = {
  error?: {
    code: number,
    details: string
  },
  data?: object
}

const app = express.Router();

app.get('/countries', async (req: Request, res: Response) => {
  const filter = req.query.filter?.toString();
  const order = req.query.order?.toString();

  const result: ResponseData = await fetchCountries(filter, order);

  if (result.error) sendResponse(res, result.error.code, { status: 'Error', details: result.error.details });
  else sendResponse(res, 200, { data: result.data });
});

app.get('/reverse/:word', (req: Request, res: Response) => {
  const result: ResponseData = reverseWithUppercaseVowels(req.params.word);

  if (result.error) sendResponse(res, result.error.code, { status: 'Error', details: result.error.details });
  else sendResponse(res, 200, { data: result.data });
});

app.post('/append', (req: Request, res: Response) => {
  const start = req.query.start?.toString();
  const end = req.query.end?.toString();

  const result: ResponseData = arrayService.addToArray(start, end);

  if (result.error) sendResponse(res, result.error.code, { status: 'Error', details: result.error.details });
  else sendResponse(res, 200, { data: result.data });
});

export default app;
