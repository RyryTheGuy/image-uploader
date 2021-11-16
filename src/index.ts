import config from './utils/config';
import express from 'express';
import imageRouter from './routes/images';

import middleware from './utils/middleware';

const app = express();

app.use(express.json());
app.use(express.static('build'));

app.get('/ping', (_request, response) => {
  response.send('pong');
});

app.use('/images', imageRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});