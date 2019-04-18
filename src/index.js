import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes/index';

const app = express();

const port = '8080';

mongoose.connect('mongodb://localhost:27017/vizir', { useCreateIndex: true, useNewUrlParser: true })
  .then(() => process.stdout.write('MongoDB connected!\n'))
  .catch(err => process.stdout.write(err));

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => process.stdout.write(`Listening on port ${port}\n`));
