import { Response } from 'express';

// Sends a response with the data and status provided
export const sendResponse = (res: Response, statusCode: number, data?: object) => {
  // Checks if a response has already been sent
  if (res && !res.headersSent) {
    res.statusCode = statusCode;
    res.json(data);
  }
}
