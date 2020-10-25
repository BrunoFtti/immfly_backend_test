import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import routes from './api/routes';
import { sendResponse } from './utils/response';
import { port, requestTimeout } from './config/config';

const app = express();
app.use(cors());
app.use(morgan('[:date[clf]] :status :method :url - :response-time ms'));
app.use(express.json());
app.use((req, res, next) => {
  res.setTimeout(requestTimeout, () => {
    console.warn('Request has timed out');
    sendResponse(res, 408);
  });
  next();
});

app.use('/', routes);

app.listen(port, () => console.log(`Service running on port ${port}`));

export default app;
